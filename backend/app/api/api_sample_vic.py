from fastapi import FastAPI, Request, Query
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import requests
import os

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

APP_ID = "1037063463336645372"  # 楽天APIアプリID

@app.get("/", response_class=HTMLResponse)
def index(
    request: Request,
    keyword: str = "",
    min_price: int = Query(None),
    max_price: int = Query(None),
    sort: str = Query(None, description="例: -itemPrice, +reviewCount"),
    availability: int = Query(1),
    postage_flag: int = Query(0)
):
    results = []
    if keyword:
        url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
        params = {
            "format": "json",
            "applicationId": APP_ID,
            "keyword": keyword,
            "genreId": 101213,  # ペット用品
            "availability": availability,
            "postageFlag": postage_flag
        }
        if min_price is not None:
            params["minPrice"] = min_price
        if max_price is not None:
            params["maxPrice"] = max_price
        if sort:
            params["sort"] = sort

        response = requests.get(url, params=params)
        data = response.json()
        for item in data.get("Items", []):
            info = item["Item"]
            results.append({
                "name": info["itemName"],
                "url": info["itemUrl"],
                "image": info["mediumImageUrls"][0] if info["mediumImageUrls"] else None,
                "price": info["itemPrice"],
                "review": info.get("reviewAverage", "-")
            })

    return templates.TemplateResponse("index.html", {
        "request": request,
        "results": results,
        "keyword": keyword
    })
