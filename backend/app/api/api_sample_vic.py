from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import requests
import random

app = FastAPI()
templates = Jinja2Templates(directory="templates")

APP_ID = "1037063463336645372"

ANIMAL_TYPES = ["犬", "猫", "ハムスター", "インコ"]
DOG_BREEDS = [
    "柴犬", "トイプードル", "チワワ", "ミニチュアダックスフンド", "ポメラニアン", 
    "ミニチュアシュナウザー", "フレンチブルドッグ", "ゴールデンレトリバー", "ラブラドールレトリバー", "シーズー"
]
CAT_BREEDS = [
    "スコティッシュフォールド", "マンチカン", "アメリカンショートヘア", "ラグドール", "ブリティッシュショートヘア",
    "ノルウェージャンフォレストキャット", "メインクーン", "ロシアンブルー", "ベンガル", "三毛猫"
]
SUPPORT_CATEGORIES = {
    "フード 水": "食品（フード・水）",
    "サプリ 薬": "健康（薬・サプリ）",
    "トイレ ケージ ベッド": "日用品（トイレ・ケージなど）",
    "キャリーバッグ リード 迷子札": "避難用品（キャリー・首輪）",
    "おもちゃ おやつ": "ストレスケア（おやつ・おもちゃ）"
}
SORT_OPTIONS = {
    "-reviewCount": "人気順",
    "-itemPrice": "価格が高い順",
    "+itemPrice": "価格が安い順",
    "-updateTimestamp": "新着順",
}

def get_base_context():
    return {
        "animal_types": ANIMAL_TYPES,
        "dog_breeds": DOG_BREEDS,
        "cat_breeds": CAT_BREEDS,
        "support_categories": SUPPORT_CATEGORIES,
        "sort_options": SORT_OPTIONS,
        "results": [],
        "suggested_results": {},
        "keyword": "",
        "selected_animal": "",
        "selected_breed": "",
        "selected_category": "",
        "input_keyword": "",
        "selected_sort": "-reviewCount",
    }

def fetch_rakuten_items(params: dict):
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
    items = []
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        for item in data.get("Items", []):
            info = item["Item"]
            items.append({
                "name": info["itemName"],
                "url": info["itemUrl"],
                "image": info["mediumImageUrls"][0]["imageUrl"].replace("?_ex=128x128", "") if info.get("mediumImageUrls") else "https://placehold.co/128x128/eee/ccc?text=No+Image",
                "price": info["itemPrice"],
                "shop": info["shopName"],
                "review_count": info.get("reviewCount", 0),
                "review_average": float(info.get("reviewAverage", 0))
            })
    except requests.exceptions.RequestException as e:
        print(f"APIリクエストエラー: {e}")
    except Exception as e:
        print(f"予期せぬエラー: {e}")
    return items

@app.get("/", response_class=HTMLResponse)
async def search_items(
    request: Request,
    animal: str = "",
    breed: str = "",
    category: str = "",
    keyword: str = "",
    sort: str = "-reviewCount",
):
    context = get_base_context()
    context["request"] = request

    search_parts = [animal, breed, category, keyword]
    combined_keyword = " ".join(part for part in search_parts if part).strip()

    results = []
    suggested_results = {}

    if combined_keyword:
        main_hits = 30

        main_params = {
            "format": "json", "applicationId": APP_ID, "keyword": combined_keyword,
            "sort": sort, "hits": main_hits
        }
        results = fetch_rakuten_items(main_params)

        if category:
            all_category_keys = list(SUPPORT_CATEGORIES.keys())
            other_categories = [cat for cat in all_category_keys if cat != category]
            suggestions_to_fetch = random.sample(other_categories, k=min(len(other_categories), 2))

            for suggested_cat_key in suggestions_to_fetch:
                suggested_keyword = " ".join(part for part in [animal, breed, suggested_cat_key] if part).strip()
                if not suggested_keyword: continue

                suggest_params = {
                    "format": "json", "applicationId": APP_ID, "keyword": suggested_keyword,
                    "sort": "-reviewCount", "hits": 3
                }
                suggested_items = fetch_rakuten_items(suggest_params)

                if suggested_items:
                    suggested_results[SUPPORT_CATEGORIES[suggested_cat_key]] = suggested_items

    context.update({
        "results": results,
        "suggested_results": suggested_results,
        "keyword": combined_keyword,
        "selected_animal": animal,
        "selected_breed": breed,
        "selected_category": category,
        "input_keyword": keyword,
        "selected_sort": sort,
    })

    return templates.TemplateResponse("index.html", context)
