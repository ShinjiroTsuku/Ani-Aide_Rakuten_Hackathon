# database.py

import sqlalchemy
from databases import Database


DATABASE_URL = "sqlite:///./database/app.db"

database = Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()


requests = sqlalchemy.Table(
    "request", 
    metadata,
    sqlalchemy.Column("user_id", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("item_id", sqlalchemy.String, nullable=False), 
    sqlalchemy.Column("amount", sqlalchemy.String, nullable=False)
    
)
