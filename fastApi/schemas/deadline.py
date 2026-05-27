from pydantic import BaseModel
from datetime import datetime, time

class DeadlineCreate(BaseModel):
    name:str
    description:str
    created_at:datetime
    deadline_datetime:datetime
