import os
import asyncio
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from collections import defaultdict
from dotenv import load_dotenv

router = APIRouter()
load_dotenv()

dummy_orders = [
    {"user_id": 1, "item_code": "izumiyashop:10000942", "quantity": 2},
    {"user_id": 2, "item_code": "nyanzaq:10069565", "quantity": 1},
    {"user_id": 3, "item_code": "wwpc:10071802", "quantity": 3},
    {"user_id": 4, "item_code": "wwpc:10000355", "quantity": 1},
    {"user_id": 5, "item_code": "nyanzaq:10069564", "quantity": 2},
    {"user_id": 6, "item_code": "retailer:10062480", "quantity": 1},
    {"user_id": 7, "item_code": "nyanzaq:10069565", "quantity": 4},
    {"user_id": 8, "item_code": "wwpc:10071802", "quantity": 1},
]

class ProductSummary(BaseModel):
    product_id: str
    name: str
    image_url: str
    price: int
    total_requests: int

RAKUTEN_APP_ID = os.getenv("APP_ID")
RAKUTEN_SEARCH_ENDPOINT = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"

async def fetch_rakuten_item(client: httpx.AsyncClient, item_code: str):
    if not RAKUTEN_APP_ID:
        raise HTTPException(status_code=500, detail="Rakuten APP ID not set")

    params = {
        "applicationId": RAKUTEN_APP_ID,
        "itemCode": item_code,
        "format": "json",
        "hits": 1,
    }
    try:
        resp = await client.get(RAKUTEN_SEARCH_ENDPOINT, params=params, timeout=10.0)
        resp.raise_for_status()
        data = resp.json()
        items = data.get("Items", [])
        if not items:
            return {"name": None, "image_url": None, "price": None}

        item = items[0].get("Item", {})
        name = item.get("itemName")
        price = item.get("itemPrice")
        img_list = item.get("mediumImageUrls") or []
        img_url = img_list[0].get("imageUrl") if img_list else None
    
        return {"name": name, "image_url": img_url, "price": price}

    except Exception as e:
        print(f"Rakuten API error for {item_code}: {e}")
        return {"name": None, "image_url": None, "price": None}


@router.get("/products/summary", response_model=List[ProductSummary])
async def get_products_summary():
    totals = defaultdict(int)
    for order in dummy_orders:
        totals[order["item_code"]] += order["quantity"]

    rakuten_results = []
    async with httpx.AsyncClient() as client:
        for pid in totals.keys():
            data = await fetch_rakuten_item(client, pid)
            rakuten_results.append(data)
            await asyncio.sleep(1)  # Delay to avoid hitting Rakuten API limit


    results = []
    for (pid, total_req), rakuten_data in zip(totals.items(), rakuten_results):
        results.append(
            ProductSummary(
                product_id=pid,
                name=rakuten_data["name"] or "不明な商品",
                image_url=rakuten_data["image_url"] or "",
                price=rakuten_data["price"] or 0,
                total_requests=total_req,
            )
        )

    return results
