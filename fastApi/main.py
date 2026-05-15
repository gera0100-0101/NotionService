from fastapi import FastAPI, WebSocket, Depends, HTTPException, Request
from auth.hashing import hash_password, verify_password
from auth.jwt import create_access_token
#db
from database import get_db
from schemas.user import UserCreate, UserLogin
from sqlalchemy.orm import Session
from models import User
#CORS
from fastapi.middleware.cors import CORSMiddleware
#WS
from services.timeService import time_service
from api.time import router as ws_router
import asyncio

app = FastAPI()
app.include_router(ws_router)

BALANCE = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = hash_password(user.password)
    db_user = User(name=user.name, email=user.email, password=hashed_password)

    db.add(db_user)
    db.commit()

    return {"message": "ok"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = (
        db.query(User).filter(User.email == user.email).first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="invalid credentials(user has not been found)"
        )
    
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="invalid credentials(wrong password)"
        )
    
    token = create_access_token({"sub": str(db_user.id)})

    return {
    "access_token": token,
    "token_type": "bearer"
    }

@app.get("/debug")
def debug(request: Request):

    print(request.headers)

    return{
        "headers": dict(request.headers)
    }

@app.on_event("startup")
async def startup():
    asyncio.create_task(time_service.start())

@app.websocket("/api/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        await websocket.send_json(time_service.get_time())
        await asyncio.sleep(1)