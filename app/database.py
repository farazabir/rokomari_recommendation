import sqlite3

DATABASE_PATH = "book.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  
    return conn
