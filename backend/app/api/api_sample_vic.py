from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
import requests
import concurrent.futures
from pydantic import BaseModel
import os 

from .database import database, requests as requests_table


router = APIRouter()

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "templates")
templates = Jinja2Templates(directory=TEMPLATE_DIR)

# --- データ定義 ---
APP_ID = "1037063463336645372"
ANIMAL_TYPES = ["犬", "猫", "ハムスター", "インコ"]
DOG_BREEDS = ["チワワ", "トイプードル", "柴犬", "ミニチュアダックス"]
CAT_BREEDS = ["スコティッシュフォールド", "マンチカン", "アメリカンショートヘア"]
DOG_SIZES = ["小型犬", "中型犬", "大型犬"]
LIFE_STAGES = ["子犬", "成犬", "シニア"]


ALLERGY_OPTIONS = {"yes": "アレルギー有", "no": "アレルギー無"}

SUPPORT_CATEGORIES = {"food": "食べ物", "medicine": "薬・サプリ", "supplies": "生活用品", "toys": "おもちゃ"}
SORT_OPTIONS = {"-reviewCount": "人気順", "-itemPrice": "価格が高い順", "+itemPrice": "価格が安い順", "-updateTimestamp": "新着順"}

# 既存の療法食リスト
DOG_FOOD_MATRIX_ALLERGY = {
    "小型犬": {"子犬": {"code": "izumiyashop:10000942"}, "成犬": {"code": "nyanzaq:10069565"}, "シニア": {"code": "wwpc:10071802"}},
    "中型犬": {"子犬": {"code": "wwpc:10000355"}, "成犬": {"code": "wwpc:10000355"}, "シニア": {"code": "nyanzaq:10069564"}},
    "大型犬": {"子犬": {"code": "retailer:10062480"}, "成犬": {"code": "wwpc:10000355"}, "シニア": {"code": "nyanzaq:10069564"}}}

DOG_FOOD_MATRIX_GENERAL = {
    "小型犬": {
        "子犬": {"code": "nyanzaq:10046889"}, "成犬": {"code": "nyanzaq:10020856"}, "シニア": {"code": "dog-kan:10014635"}
    },
    "中型犬": {
        "子犬": {"code": "dog-penet:10000032"}, "成犬": {"code": "sweet-pet:10000136"}, "シニア": {"code": "chanet:10300916"}
    },
    "大型犬": {
        "子犬": {"code": "dog-penet:10000042"}, "成犬": {"code": "familypet:10001142"}, "シニア": {"code": "sweet-pet:10000159"}
    }
}
# (Pydanticモデルや関数の定義は変更なし)
class RequestItem(BaseModel):
    item_code: str
    item_name: str
    item_price: int
    shop_name: str

def get_base_context():
    return {"animal_types": ANIMAL_TYPES, "dog_breeds": DOG_BREEDS, "cat_breeds": CAT_BREEDS,
            "dog_sizes": DOG_SIZES, "life_stages": LIFE_STAGES,
            "allergy_options": ALLERGY_OPTIONS, # ★追加
            "support_categories": SUPPORT_CATEGORIES, "sort_options": SORT_OPTIONS,
            "general_items": [], "selected_animal": "", "selected_breed": "",
            "selected_dog_size": "", "selected_life_stage": "",
            "selected_allergy": "", # ★追加
            "selected_category": "", "selected_sort": "-reviewCount",
            "input_keyword": "", "keyword": ""}

def fetch_rakuten_item(params: dict):
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        if data.get("Items"):
            info = data["Items"][0]["Item"]
            return {"name": info["itemName"], "url": info["itemUrl"], "image": info["mediumImageUrls"][0]["imageUrl"].replace("?_ex=128x128", "") if info.get("mediumImageUrls") else "https://placehold.co/128x128?text=No+Image", "price": info["itemPrice"], "shop": info["shopName"], "review_count": info.get("reviewCount", 0), "review_average": float(info.get("reviewAverage", 0)), "item_code": info["itemCode"]}
    except Exception as e:
        print(f"楽天API取得エラー: {e}")
    return None

def fetch_items_in_parallel(item_codes):
    """商品コードのリストから並列で商品情報を取得する"""
    items = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        params_list = [{"format": "json", "applicationId": APP_ID, "itemCode": code} for code in item_codes]
        results = executor.map(fetch_rakuten_item, params_list)
        items = [item for item in results if item]
    return items

@router.get("", response_class=HTMLResponse)
@router.get("/", response_class=HTMLResponse)
async def search_items(
    request: Request,
    animal: str = "",
    breed: str = "",
    dog_size: str = "",
    life_stage: str = "",
    allergy_status: str = "", # ★追加
    category: str = "",
    keyword: str = "",
    sort: str = "-reviewCount"
):
    context = get_base_context()
    context.update({
        "request": request, "selected_animal": animal, "selected_breed": breed,
        "selected_dog_size": dog_size, "selected_life_stage": life_stage,
        "selected_allergy": allergy_status, 
        "selected_category": category, "selected_sort": sort, "input_keyword": keyword})


    if animal == "犬":
        recommended_items = []
        target_matrix = None
        
        # 1. どのフードリストを使うか選択
        if allergy_status == "yes":
            target_matrix = DOG_FOOD_MATRIX_ALLERGY
            context["keyword"] = "【推薦】アレルギー対応ドッグフード"
        elif allergy_status == "no":
            target_matrix = DOG_FOOD_MATRIX_GENERAL
            context["keyword"] = "【推薦】一般ドッグフード"
        
        # 2. 推薦リストを生成
        if target_matrix and dog_size and life_stage:
            # サイズとステージで1つに絞り込み
            product = target_matrix.get(dog_size, {}).get(life_stage)
            if product:
                recommended_items = fetch_items_in_parallel([product["code"]])
        elif target_matrix:
            # サイズかステージが未選択の場合、リストの全商品を表示
            all_codes = set(p["code"] for size in target_matrix.values() for p in size.values())
            recommended_items = fetch_items_in_parallel(all_codes)
        else:
            # アレルギー有無が未選択の場合、両方のリストから代表的なものを表示
            context["keyword"] = "【推薦】犬向けのフード一覧"
            allergy_codes = set(p["code"] for size in DOG_FOOD_MATRIX_ALLERGY.values() for p in size.values())
            general_codes = set(p["code"] for size in DOG_FOOD_MATRIX_GENERAL.values() for p in size.values())
            recommended_items = fetch_items_in_parallel(list(allergy_codes | general_codes))
        
        context["general_items"] = recommended_items

    # --- 犬以外が選択された場合：通常のキーワード検索ロジック ---
    else:
        search_terms = list(filter(None, [animal, breed, SUPPORT_CATEGORIES.get(category, ""), keyword]))
        combined_keyword = " ".join(search_terms)
        context["keyword"] = combined_keyword

        if combined_keyword:
            # (通常検索のロジックは変更なし)
            params = {"format": "json", "applicationId": APP_ID, "keyword": combined_keyword, "sort": sort, "hits": 30}
            url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
            response = requests.get(url, params=params)
            data = response.json()
            items = []
            for item in data.get("Items", []):
                info = item["Item"]
                items.append({"name": info["itemName"], "url": info["itemUrl"], "image": info["mediumImageUrls"][0]["imageUrl"].replace("?_ex=128x128", "") if info.get("mediumImageUrls") else "https://placehold.co/128x128?text=No+Image", "price": info["itemPrice"], "shop": info["shopName"], "review_count": info.get("reviewCount", 0), "review_average": float(info.get("reviewAverage", 0)), "item_code": info["itemCode"]})
            context["general_items"] = items

    return templates.TemplateResponse("index.html", context)

# (get_item_detail, add_request_to_db APIエンドポイントは変更なし)
@router.get("/api/item/{item_code:path}")
async def get_item_detail(item_code: str):
    params = {"format": "json", "applicationId": APP_ID, "itemCode": item_code}
    item_detail = fetch_rakuten_item(params)
    if item_detail:
        return JSONResponse(content=item_detail)
    else:
        return JSONResponse(content={"error": "Item not found"}, status_code=404)

@router.post("/api/request")
async def add_request_to_db(item: RequestItem):
    query = requests_table.insert().values(user_id=1, item_id=item.item_code, amount="1")
    try:
        await database.execute(query)
        return JSONResponse(content={"status": "success"})
    except Exception as e:
        print(f"データベース保存エラー: {e}")
        return JSONResponse(content={"status": "error", "message": "DB error"}, status_code=500)

# JSON API endpoint for frontend
@router.get("/api", response_class=JSONResponse)
async def search_items_json(
    animal: str = "",
    breed: str = "",
    dog_size: str = "",
    life_stage: str = "",
    allergy: str = "",
    category: str = "",
    keyword: str = "",
    sort: str = "-reviewCount"
):
    items = []
    
    if animal == "犬":
        recommended_items = []
        target_matrix = None
        
        # 1. どのフードリストを使うか選択
        if allergy == "yes":
            target_matrix = DOG_FOOD_MATRIX_ALLERGY
        elif allergy == "no":
            target_matrix = DOG_FOOD_MATRIX_GENERAL
        
        # 2. 推薦リストを生成
        if target_matrix and dog_size and life_stage:
            # サイズとステージで1つに絞り込み
            product = target_matrix.get(dog_size, {}).get(life_stage)
            if product:
                recommended_items = fetch_items_in_parallel([product["code"]])
        elif target_matrix:
            # サイズかステージが未選択の場合、リストの全商品を表示
            all_codes = set(p["code"] for size in target_matrix.values() for p in size.values())
            recommended_items = fetch_items_in_parallel(all_codes)
        else:
            # アレルギー有無が未選択の場合、両方のリストから代表的なものを表示
            allergy_codes = set(p["code"] for size in DOG_FOOD_MATRIX_ALLERGY.values() for p in size.values())
            general_codes = set(p["code"] for size in DOG_FOOD_MATRIX_GENERAL.values() for p in size.values())
            recommended_items = fetch_items_in_parallel(list(allergy_codes | general_codes))
        
        items = recommended_items

    # --- 犬以外が選択された場合：通常のキーワード検索ロジック ---
    else:
        search_terms = list(filter(None, [animal, breed, SUPPORT_CATEGORIES.get(category, ""), keyword]))
        combined_keyword = " ".join(search_terms)

        if combined_keyword:
            params = {"format": "json", "applicationId": APP_ID, "keyword": combined_keyword, "sort": sort, "hits": 30}
            url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
            response = requests.get(url, params=params)
            data = response.json()
            for item in data.get("Items", []):
                info = item["Item"]
                items.append({
                    "name": info["itemName"], 
                    "url": info["itemUrl"], 
                    "image": info["mediumImageUrls"][0]["imageUrl"].replace("?_ex=128x128", "") if info.get("mediumImageUrls") else "https://placehold.co/128x128?text=No+Image", 
                    "price": info["itemPrice"], 
                    "shop": info["shopName"], 
                    "review_count": info.get("reviewCount", 0), 
                    "review_average": float(info.get("reviewAverage", 0)), 
                    "item_code": info["itemCode"]
                })

    return JSONResponse(content=items)