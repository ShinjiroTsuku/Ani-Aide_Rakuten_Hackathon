from fastapi import APIRouter
import sqlite3
import json
import re

router = APIRouter()

@router.get("/request")
async def adminrequest():
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()

    exists = [(0, 0)]

    pet = ['犬', '猫']
    shelter = ['避難所A', '避難所B', '避難所C']
    item = ['水', 'ペットフード']
    quantity = ['5kg', '10kg', '15kg']
    date = ['2025-08-08']

    cursor.execute('SELECT * FROM request')
    req_list = cursor.fetchall()
    data = []
    id = 1
    stats = {
            "totalRequests": 0,
            "pendingRequests": 0,
            "completedSupports": 0,
            "activeShelters": 0
        }

    #Stats関連
    totalRequests = 0
    pendingRequests = 0
    completedSupports = 0
    activeShelters = 0

    for req in req_list:
        user_id = req[0]
        item_id = req[1]
        amount = req[2]
        cursor.execute('SELECT area_id FROM user WHERE user_id = '+str(user_id))
        area_id = list(cursor.fetchall()[0])[0]

        if ( user_id, item_id ) in exists:
            for d in data:
                if d['area_id'] == area_id and d['item'] == item_id:
                    d['quantity'] = re.sub(r'[^0-9]', '', d['quantity'])
                    d['quantity'] = int(d['quantity']) + int(amount)
                    d['quantity'] = str(d['quantity']) + '個'
                    break
            continue

        cursor.execute('SELECT prefecture_name, municipality_name FROM area WHERE area_id = '+str(area_id))
        area = list(cursor.fetchall()[0])
        #area = area[0] + area[1]
        cursor.execute('SELECT amount FROM supply WHERE user_id = ? AND item_id = ?', (user_id, item_id))
        supply_amount = cursor.fetchall()
        sum = 0
        for am in supply_amount:
            sum += int(am[0])
        status = ''

    

        if sum == 0:
            status = 'pending'
        elif sum / int(amount) < 1:
            status = 'stop'
            pendingRequests += 1
        else:
            status = 'completed'
            completedSupports += 1

        tmp = {
                "id": id,
                "area_id": area_id,
                "location": area, 
                "shelter": shelter[id % 3], 
                "petType": pet[id % 2], 
                "item": item_id,#item[id % 2], 
                "quantity": str(amount)+"個", 
                "status": status,
                "date": date
            }
        #print(int(amount) / sum)
        data.append(tmp)
        exists.append((user_id, item_id))
        id = id + 1
        if activeShelters < 3: activeShelters += 1
        totalRequests += 1
    
    stats = {
        "totalRequests": totalRequests,
        "pendingRequests": pendingRequests,
        "completedSupports": completedSupports,
        "activeShelters": activeShelters
    }
    conn.close()
    datas = {'requests': data, 'stats': stats}
    return datas

@router.get("/addrequest")
async def read_users():
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO request(user_id, item_id, amount) values(1, 4, 10)')
    conn.commit()
    conn.close()
    return "追加しました"

@router.get("/addsupply")
async def read_users():
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO supply(user_id, item_id, amount) values(1, 4, 5)')
    conn.commit()
    conn.close()
    return "追加しました"

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
    
    conn.close()
    return [item_id, amount, area_id]

