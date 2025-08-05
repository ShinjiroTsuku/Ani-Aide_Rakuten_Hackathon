# app/api/login.py

from fastapi import APIRouter, HTTPException
# from app.schemas.auth import LoginRequest
# from app.services.auth_service import authenticate_user

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest):
    if authenticate_user(data.email, data.password):
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
