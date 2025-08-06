from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()

class LoginRequest(BaseModel):
    username_or_email: str
    password: str

@router.post("/login")
def login(request: LoginRequest):

    #DBへの問い合わせ処理実装
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()
    cursor.execute('SELECT password FROM user WHERE email = ?', (request.username_or_email, ))
    password = cursor.fetchall()

    if not password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    else:
        print(list(password[0])[0])
        if request.password == list(password[0])[0]:
            return {"success": True, "message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")

"""
    # Hardcoded check for demo
    if request.username_or_email == "hanako@example.com" and request.password == "cde123":
        return {"success": True, "message": "Login successful"}

    # If it doesn't match
    raise HTTPException(status_code=401, detail="Invalid email or password")
"""

    # db = SessionLocal()
    # # Search user by username or email
    # user = db.query(User).filter(
    #     (User.username == request.username_or_email) |
    #     (User.email == request.username_or_email)
    # ).first()

    # if not user:
    #     raise HTTPException(status_code=401, detail="User not found")

    # # Compare password (plain-text for demo)
    # if user.password != request.password:
    #     raise HTTPException(status_code=401, detail="Invalid password")

    # return {"success": True, "message": "Login successful"}
