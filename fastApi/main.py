from fastapi import FastAPI, WebSocket, Depends, Request, Body
from auth.jwt import get_current_user
#services
from services.login_token import login_token
from services.register_token import register_token
from services.notion_register import notion_register
from services.deadline_register import deadline_register
#db
from database import get_db
from schemas.user import UserCreate, UserLogin
from schemas.notion import NotionCreate
from schemas.deadline import DeadlineCreate
from models import Notion, User
from sqlalchemy.orm import Session
from sqlalchemy import select
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

@app.post("/notion_create")
def create_notion(notion: NotionCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    notion_register(current_user, db, time_service.get_time()["dateTime"], notion)
    
    return {"message": "ok"}

@app.get("/notion_get_all")
def get_all_notion(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    stmt  = select(Notion).where(Notion.user_id == current_user)
    result = db.execute(stmt)
    notions = result.scalars().all()
    return notions

@app.post("/deadline_create")
def create_deadline(deadline: DeadlineCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    deadline_register(current_user, db, time_service.get_time()["dateTime"], deadline)

    return {"message": "ok"}

@app.post("/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    register_token(user, db)

    return {"message": "ok"}

@app.post("/user_checkout")
async def user_checkout(token: str = Body()):
    is_user_exists = get_current_user(token)

    if is_user_exists:
        return True
    else:
        return False

@app.post("/user_check")
async def user_checkout(token: str = Body()):
    user = get_current_user(token)
    return user

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = login_token(user, db)

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