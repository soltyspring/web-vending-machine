import pymysql, os
from dotenv import load_dotenv
load_dotenv() #env는 특수한 친구임 

conn = pymysql.connect(
    host="127.0.0.1",
    user="admin",
    password=os.getenv("Database_Password") ,
    port=13306,
    database="vending"   # 🔥 이거 추가
)

cursor = conn.cursor()

cursor.execute("DESCRIBE sites;")
for table in cursor.fetchall():
    print(table[0])

cursor.execute("SELECT * FROM users;")
for row in cursor.fetchall():
    print(row)
conn.close()