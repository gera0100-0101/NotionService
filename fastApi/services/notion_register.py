from schemas.notion import NotionCreate
from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import Notion
from schemas.notion import CycleType, DayOfWeek

def notion_register(user: int, db: Session, time: str, notion: NotionCreate):
    def require(value, message):
        if value is None or value == "":
            raise HTTPException(status_code=401, detail=message)


    require(notion.name, "variable name shouldn't be empty")

    if notion.is_cycle:
        require(notion.cycle_time, "variable cycle_time shouldn't be empty")
        require(notion.cycle_type, "variable cycle_type shouldn't be empty")

        if notion.cycle_type == CycleType.everyweek:
            require(notion.day_of_week, "variable day_of_week shouldn't be empty")
        elif notion.cycle_type == CycleType.everymonth:
            require(notion.day_of_month, "variable day_of_month shouldn't be empty")

    else:
        require(notion.notion_datetime, "variable notion_datetime shouldn't be empty")

    db_notion = Notion(
        name = notion.name,
        description = notion.description,
        created_at = time,
        notion_datetime = notion.notion_datetime,
        is_cycle = notion.is_cycle,
        cycle_type = notion.cycle_type,
        cycle_time = notion.cycle_time,
        day_of_week = notion.day_of_week,
        day_of_month = notion.day_of_month,
        user_id = user
    )

    db.add(db_notion)
    db.commit()