from pydantic import BaseModel, ConfigDict, Field

class NotionShort(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class DeadlineShort(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    name:str
    email:str

class UserRead(BaseModel):
    id:int
    name:str
    email:str

    notions: list[NotionShort] = Field(default_factory=list)
    deadlines: list[DeadlineShort] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)
