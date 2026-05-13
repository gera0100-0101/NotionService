from pydantic import BaseModel
from datetime import datetime, time

class Deadline(BaseModel):
    name:str
    description:str
    created_at:datetime
    deadline_datetime:datetime
