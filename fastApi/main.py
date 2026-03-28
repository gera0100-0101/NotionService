from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.responses import Response
from pydantic import BaseModel, Field
from api.time import router as ws_router

app = FastAPI()

app.include_router(ws_router)

BALANCE = {}

class Wallet(BaseModel):
    name: str = Field(min_length= 1)
    amount: int = Field(gt=0)

@app.post("/wallets/")
def create_wallet(wallet: Wallet):
    return wallet

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