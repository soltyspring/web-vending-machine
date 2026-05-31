import os

import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        user=os.getenv("DB_USER", "admin"),
        password=os.getenv("Database_Password"),
        port=int(os.getenv("DB_PORT", "13306")),
        database=os.getenv("DB_NAME", "vending"),
    )


def main():
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users;")
        for row in cursor.fetchall():
            print(row)
    finally:
        conn.close()


if __name__ == "__main__":
    main()
