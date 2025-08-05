import sqlite3

def db_init():
    conn = sqlite3.connect('database/app.db')
    cursor = conn.cursor()

    with open("./database/init_query.sql", "r", encoding="utf-8") as file:
        sql_script = file.read()

    cursor.executescript(sql_script)

    conn.commit()

    cursor.execute("SELECT name from sqlite_master where type='table';")
    print('table一覧: ', cursor.fetchall())

    cursor.execute('SELECT * FROM user')
    print(cursor.fetchall())

    conn.close()

