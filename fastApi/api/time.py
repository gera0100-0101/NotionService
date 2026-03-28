from fastapi import APIRouter, WebSocket
from services.timeService import time_service
import asyncio

router = APIRouter()

@router.websocket("/ws")
async def getTime(websocket: WebSocket):
    await websocket.accept()
    asyncio.create_task(time_service.startTimeService())

    try:
        while True:
            dataJson = time_service.get_time()

            if dataJson:
                await websocket.send_json(dataJson)

            await asyncio.sleep(1)
    except Exception:
        print("Client disconnected")

# python -m uvicorn main:app --reload        