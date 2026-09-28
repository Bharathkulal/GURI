from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime

class User(MongoBaseModel):
    auth_id: str
    name: Optional[str] = None
    email: str
    avatar: Optional[str] = None
    college: Optional[str] = None
    year: Optional[str] = None
    career_goal_id: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
