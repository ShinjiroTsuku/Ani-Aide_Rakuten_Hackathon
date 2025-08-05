from fastapi import APIRouter

router = APIRouter()

@router.get("/admin/", tags=["admin"])
async def read_users():
    return [{"username": "水", "amount": 25, "pos": "石川県金沢市", "募集数": 30, "status": "0/30"},]

