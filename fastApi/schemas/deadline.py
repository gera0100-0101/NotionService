from pydantic import BaseModel
from datetime import datetime, time

class DeadlineCreate(BaseModel):
    name:str
    description:str
    deadline_datetime:datetime
