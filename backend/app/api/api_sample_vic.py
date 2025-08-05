from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import requests

app = FastAPI()
templates = Jinja2Templates(directory="templates")

APP_ID = "1037063463336645372"  # あなたの Application ID に置き換えてください

@app.get("/", response_class=HTMLResponse)
def index(request: Request, keyword: str = ""):
    results = []
    if keyword:
        url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
        params = {
            "format": "json",
            "applicationId": APP_ID,
            "keyword": keyword,
            "genreId": 101213
        }
        response = requests.get(url, params=params)
        data = response.json()
        for item in data.get("Items", []):
            info = item["Item"]
            results.append({
                "name": info["itemName"],
                "url": info["itemUrl"],
                "image": info["mediumImageUrls"][0] if info["mediumImageUrls"] else None,
                "price": info["itemPrice"]
            })

    return templates.TemplateResponse("index.html", {"request": request, "results": results, "keyword": keyword})
