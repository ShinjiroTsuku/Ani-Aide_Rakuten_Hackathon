import sqlite3

def db_init():
    conn = sqlite3.connect('./TEST.db')
    conn.close()

