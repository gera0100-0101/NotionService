import httpx
import asyncio

# current_time = None
# URL = "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow"

# async def startTimeService():
#     global current_time
#     async with httpx.AsyncClient() as client:
#         while True:
#             r = await client.get(URL)
#             current_time = r.json()
#             await asyncio.sleep(1)

class TimeService:
    def __init__(self):
        self.current_time = None
        self.URL = "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Moscow"

    async def start(self):
        async with httpx.AsyncClient() as client:
            while True:
                r = await client.get(self.URL)
                self.current_time = r.json()
                await asyncio.sleep(1)

    def get_time(self):
        return self.current_time

time_service = TimeService()