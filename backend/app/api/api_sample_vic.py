from fastapi import FastAPI, Request, Query
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import requests

app = FastAPI()
templates = Jinja2Templates(directory="templates")

APP_ID = "1037063463336645372"

# -------------------------
# 1. 楽天市場 商品検索 API
# -------------------------
@app.get("/", response_class=HTMLResponse)
def search_items(
    request: Request,
    animal: str = "",
    category: str = "",
    keyword: str = "",
):
    # 動物＋カテゴリの組み合わせで検索キーワードを自動生成
    combined_keyword = f"{animal} {category}".strip() if animal or category else keyword

    results = []
    if combined_keyword:
        url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
        params = {
            "format": "json",
            "applicationId": APP_ID,
            "keyword": combined_keyword,
            "sort": "-reviewCount",  # 人気順
            "hits": 30
        }
        response = requests.get(url, params=params)
        data = response.json()
        for item in data.get("Items", []):
            info = item["Item"]
            results.append({
                "name": info["itemName"],
                "url": info["itemUrl"],
                "image": info["mediumImageUrls"][0]["imageUrl"] if info["mediumImageUrls"] else None,
                "price": info["itemPrice"]
            })

    return templates.TemplateResponse("index.html", {
        "request": request,
        "results": results,
        "keyword": combined_keyword
    })



# -------------------------
# 2. 楽天市場 商品ランキング API
# -------------------------
@app.get("/ranking", response_class=HTMLResponse)
def get_ranking(request: Request, genreId: int = 100283):
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628"
    params = {"format": "json", "applicationId": APP_ID, "genreId": genreId}
    response = requests.get(url, params=params)
    data = response.json()

    results = []
    for item in data.get("Items", []):
        info = item["Item"]
        results.append({
            "name": info["itemName"],
            "url": info["itemUrl"],
            "image": info["mediumImageUrls"][0]["imageUrl"] if info["mediumImageUrls"] else None,
            "price": info["itemPrice"]
        })

    return templates.TemplateResponse("index.html", {
        "request": request,
        "results": results,
        "keyword": f"ジャンルID: {genreId}"
    })


# -------------------------
# 3. 楽天市場 ジャンル検索 API
# -------------------------
@app.get("/genre", response_class=HTMLResponse)
def get_genres(request: Request, genreId: int = 0):
    url = "https://app.rakuten.co.jp/services/api/IchibaGenre/Search/20140222"
    params = {"format": "json", "applicationId": APP_ID, "genreId": genreId}
    response = requests.get(url, params=params)
    data = response.json()

    genres = []
    for genre in data.get("children", []):
        genre_info = genre["child"]
        genres.append({
            "id": genre_info["genreId"],
            "name": genre_info["genreName"],
            "path": genre_info["genreNamePath"]
        })

    return templates.TemplateResponse("genre.html", {
        "request": request,
        "genres": genres,
        "genreId": genreId
    })


# -------------------------
# 4. 楽天市場 商品コード検索 API
# -------------------------
@app.get("/code", response_class=HTMLResponse)
def get_item_by_code(request: Request, itemCode: str = Query(...)):
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
    params = {"format": "json", "applicationId": APP_ID, "itemCode": itemCode}
    response = requests.get(url, params=params)
    data = response.json()

    results = []
    for item in data.get("Items", []):
        info = item["Item"]
        results.append({
            "name": info["itemName"],
            "url": info["itemUrl"],
            "image": info["mediumImageUrls"][0]["imageUrl"] if info["mediumImageUrls"] else None,
            "price": info["itemPrice"]
        })

    return templates.TemplateResponse("index.html", {
        "request": request,
        "results": results,
        "keyword": f"商品コード: {itemCode}"
    })


# -------------------------
# 5. 楽天市場 商品情報取得 API
# -------------------------
@app.get("/lookup", response_class=HTMLResponse)
def lookup_item(request: Request, itemCode: str = Query(...)):
    url = "https://app.rakuten.co.jp/services/api/IchibaItem/ItemLookup/20170426"
    params = {"format": "json", "applicationId": APP_ID, "itemCode": itemCode}
    response = requests.get(url, params=params)
    data = response.json()

    results = []
    for item in data.get("Items", []):
        info = item["Item"]
        results.append({
            "name": info["itemName"],
            "url": info["itemUrl"],
            "image": info["mediumImageUrls"][0]["imageUrl"] if info["mediumImageUrls"] else None,
            "price": info["itemPrice"]
        })

    return templates.TemplateResponse("index.html", {
        "request": request,
        "results": results,
        "keyword": f"Lookup: {itemCode}"
    })
