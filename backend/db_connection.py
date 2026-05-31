import pymysql, os
from dotenv import load_dotenv
load_dotenv() #env는 특수한 친구임 

conn = pymysql.connect(
    host=os.getenv("DB_HOST", "127.0.0.1"),
    user=os.getenv("DB_USER", "admin"),
    password=os.getenv("Database_Password") ,
    port=int(os.getenv("DB_PORT", "13306")),
    database=os.getenv("DB_NAME", "vending")
)

cursor = conn.cursor()


cursor.execute("SELECT * FROM users;")
for row in cursor.fetchall():
    print(row)
conn.close()
