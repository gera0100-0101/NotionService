from fastapi import FastAPI, WebSocket, Depends
#db
from database import get_db
from schemas.user import UserRead, UserCreate
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

@app.post("/user", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        name=user.name,
        email=user.email
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/user")
def get_users(db: Session = Depends(get_db)):
    all_users = db.query(User).all()
    return all_users

@app.on_event("startup")
async def startup():
    asyncio.create_task(time_service.start())

@app.websocket("/api/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        await websocket.send_json(time_service.get_time())
        await asyncio.sleep(1)