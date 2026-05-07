from pydantic import BaseModel
from datetime import datetime, time
from enum import Enum

class User(BaseModel):
    name:str
    email:str

    notions: list[Notion]
    deadlines: list[Deadline]

    class Config:
        orm_mode = True

class Notion(BaseModel):
    name:str
    description:str
    created_at:datetime
    notion_datetime:datetime
    is_cycle:bool
    cycle_type:CycleType
    cycle_time:time
    day_of_weak:DayOfWeak
    day_of_month:int

    class Config:
        orm_mode = True

class Deadline(BaseModel):
    name:str
    description:str
    created_at:datetime
    deadline_datetime:datetime

class CycleType(str, Enum):
    everyDay = "everyDay"
    everyWeak = "everyWeak"
    everyMonth = "everyMonth"

class DayOfWeak(str, Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    sunday = "sunday"