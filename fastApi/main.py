from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.responses import Response
from pydantic import BaseModel, Field
import os
import psycopg2
from api.time import router as ws_router
from fastapi.middleware.cors import CORSMiddleware
from services.timeService import time_service
import asyncio

app = FastAPI()
app.include_router(ws_router)

DATABASE_URL = os.getenv("postgresql://postgres:postgres@db:5432/app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_conn():
    return psycopg2.connect(DATABASE_URL)

@app.get("/notion")
def get_notion():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT * FROM notion")
    rows = cur.fetchall()

    conn.close()

    return {"notion": rows}

@app.on_event("startup")
async def startup():
    asyncio.create_task(time_service.start())

@app.websocket("/auth/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        await websocket.send_json(time_service.get_time())
        await asyncio.sleep(1)

# @app.get("/balance")
# def get_balance(wallet_name: str | None = None):
#     if wallet_name is None:
#         return {"total_balance": sum(BALANCE.values())}
    
#     if wallet_name not in BALANCE:
#         raise HTTPException(
#             status_code=404,
#             detail=f"Wallet '{wallet_name}' not found"
#         ) 
    
#     return {"wallet": wallet_name, "balance": BALANCE[wallet_name]}

# @app.post("/createWallet")
# def post_wallet(wallet_name: str):
#     if wallet_name is None:
#         return {"You have to name a wallet"}
#     elif wallet_name in BALANCE:
#         return {"This wallet is already exists"}
#     else:
#         BALANCE[wallet_name] = 0
#         return {f"Wallet {wallet_name} has been created"}
    
# @app.post("/changeBalance")
# def post_balance(wallet_name: str, balance: int):
#     if wallet_name is None:
#         return {"You didn't write any wallet name, write your wallet name and try again"}
    
#     if wallet_name in BALANCE:
#         BALANCE[wallet_name] = balance
#     else:
#         return {"This wallet doesnt exist"}