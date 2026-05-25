from pydantic import BaseModel
from datetime import datetime, time
from enum import Enum
from typing import Optional

class NotionCreate(BaseModel):
    name:str
    description:str
    notion_datetime: Optional[datetime] = None
    is_cycle:bool
    cycle_type: Optional["CycleType"] = None
    cycle_time: Optional[time] = None
    day_of_week: Optional["DayOfWeek"] = None
    day_of_month: Optional[int] = None

    class Config:
        orm_mode = True

class CycleType(str, Enum):
    everyday = "everyday"
    everyweek = "everyweek"
    everymonth = "everymonth"

class DayOfWeek(str, Enum):
    monday = "monday"
    tuesday = "tuesday"
    wednesday = "wednesday"
    thursday = "thursday"
    friday = "friday"
    saturday = "saturday"
    sunday = "sunday"