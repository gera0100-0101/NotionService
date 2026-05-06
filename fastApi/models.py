# models.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, Time
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String(100))

class Notion(Base):
    __tablename__ = "notion"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    notion_datetime = Column(DateTime, nullable=True)
    is_cycle = Column(Boolean, nullable=False)
    cycle_type = Column(Enum("everyday", "everyweak", "everymonth", name="cycle_type"))
    cycle_time = Column(Time, nullable=True)
    day_of_weak = Column(Enum("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", name="day_of_weak"), nullable=True)
    day_of_month = Column(Integer, nullable=True)
    
class Deadline(Base):
    __tablename__ = "deadline"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
    deadline_datetime = Column(DateTime, nullable=False)