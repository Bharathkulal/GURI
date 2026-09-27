from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: Optional[str] = None
    email: str
    avatar: Optional[str] = None
    college: Optional[str] = None
    year: Optional[str] = None
    career_goal: Optional[str] = None

class UserCreate(UserBase):
    id: str

class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
