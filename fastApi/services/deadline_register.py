from schemas.deadline import DeadlineCreate
from models import Deadline
from sqlalchemy.orm import Session
from fastapi import HTTPException

def deadline_register(user: int, db: Session, time: str, deadline: DeadlineCreate):
    def require(value, message):
        if value is None or value == "":
            raise HTTPException(status_code=401, detail=message)
        
    require(deadline.name, "variable name shouldn't be empty")
    require(deadline.deadline_datetime, "variable deadline_datetime shouldn't be empty")

    db_deadline = Deadline(
        name = deadline.name,
        description = deadline.description,
        created_at = time,
        deadline_datetime = deadline.deadline_datetime,
        user_id = user
    )

    db.add(db_deadline)
    db.commit()