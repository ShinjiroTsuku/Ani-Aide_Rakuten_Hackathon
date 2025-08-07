# backend/app/main.py

import sys
sys.path.append('../')
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
from .admin_backend import admin_main
from database import database
from app.api import login as supporter_login
from app.api import products


app = FastAPI()
app.include_router(admin_main.router)
app.include_router(supporter_login.router, prefix="/supporter")
app.include_router(products.router, prefix="/supporter")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # Or specify http://localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data models
class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    token: str

class DataItem(BaseModel):
    title: str
    content: str
    timestamp: Optional[str] = None

class DataItemResponse(BaseModel):
    id: str
    title: str
    content: str
    timestamp: str

# Mock data storage
users_db = {
    "test@example.com": {
        "id": "user-1",
        "username": "testuser",
        "password": "password123",
        "email": "test@example.com"
    }
}

data_db = [
    {
        "id": "data-1",
        "title": "Sample Data 1",
        "content": "This is the first sample data",
        "timestamp": "2024-01-01T00:00:00Z"
    },
    {
        "id": "data-2", 
        "title": "Sample Data 2",
        "content": "This is the second sample data",
        "timestamp": "2024-01-02T00:00:00Z"
    }
]

database.db_init()

@app.get("/")
def read_root():
    return {"message": "Hello, FasAPI"}

@app.post("/auth/login", response_model=UserResponse)
def login(user: UserLogin):
    if user.username in users_db and users_db[user.username]["password"] == user.password:
        user_data = users_db[user.username]
        return UserResponse(
            id=user_data["id"],
            username=user_data["username"],
            email=user_data["email"],
            token="mock-jwt-token-" + str(uuid.uuid4())
        )
    raise HTTPException(status_code=401, detail="Invalid username or password")

@app.post("/auth/register", response_model=UserResponse)
def register(user: UserLogin):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_id = "user-" + str(uuid.uuid4())
    users_db[user.username] = {
        "id": user_id,
        "username": user.username.split("@")[0],
        "password": user.password,
        "email": user.username
    }
    
    return UserResponse(
        id=user_id,
        username=users_db[user.username]["username"],
        email=user.username,
        token="mock-jwt-token-" + str(uuid.uuid4())
    )

@app.post("/auth/logout")
def logout():
    return {"message": "Logout successful"}

@app.get("/users/me", response_model=UserResponse)
def get_user_info():
    # Should get user info from JWT token
    # For demo, return mock data
    return UserResponse(
        id="user-1",
        username="testuser",
        email="test@example.com",
        token="mock-jwt-token"
    )

@app.get("/data", response_model=List[DataItemResponse])
def get_all_data():
    return data_db

@app.get("/data/{item_id}", response_model=DataItemResponse)
def get_data_by_id(item_id: str):
    for item in data_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Data not found")

@app.post("/data", response_model=DataItemResponse)
def create_data(data: DataItem):
    new_item = {
        "id": "data-" + str(uuid.uuid4()),
        "title": data.title,
        "content": data.content,
        "timestamp": data.timestamp or datetime.now().isoformat() + "Z"
    }
    data_db.append(new_item)
    return new_item

@app.put("/data/{item_id}", response_model=DataItemResponse)
def update_data(item_id: str, data: DataItem):
    for i, item in enumerate(data_db):
        if item["id"] == item_id:
            data_db[i] = {
                "id": item_id,
                "title": data.title,
                "content": data.content,
                "timestamp": data.timestamp or datetime.now().isoformat() + "Z"
            }
            return data_db[i]
    raise HTTPException(status_code=404, detail="Data not found")

@app.delete("/data/{item_id}")
def delete_data(item_id: str):
    for i, item in enumerate(data_db):
        if item["id"] == item_id:
            deleted_item = data_db.pop(i)
            return {"message": f"Data {deleted_item['title']} deleted"}
    raise HTTPException(status_code=404, detail="Data not found")

@app.post("/upload")
def upload_file():
    # Should handle file upload here
    # For demo, return mock response
    return {"message": "File uploaded successfully", "filename": "example.txt"}

print("main.py loaded")
