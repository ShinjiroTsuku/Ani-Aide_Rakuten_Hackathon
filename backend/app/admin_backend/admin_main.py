from fastapi import APIRouter
import sqlite3

router = APIRouter()

@router.get("/admin/", tags=["admin"])
async def read_users():
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM request')
    req_list = cursor.fetchall()
    for req in req_list:
        user_id = req[0]
        item_id = req[1]
        amount = req[2]
        cursor.execute('SELECT area_id FROM user WHERE user_id = '+str(user_id))
        area_id = list(cursor.fetchall()[0])[0]
        print(area_id)

    return [item_id, amount, area_id]

