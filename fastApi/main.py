from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.responses import Response
from pydantic import BaseModel, Field
from api.time import router as ws_router
from fastapi.middleware.cors import CORSMiddleware
from services.timeService import time_service
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

@app.on_event("startup")
async def startup():
    asyncio.create_task(time_service.start())

@app.websocket("/api/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        await websocket.send_json(time_service.get_time())
        await asyncio.sleep(1)