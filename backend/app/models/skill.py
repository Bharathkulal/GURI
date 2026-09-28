from app.models.base import MongoBaseModel
from typing import List
from datetime import datetime

class Skill(MongoBaseModel):
    name: str
    category: str

class UserSkill(MongoBaseModel):
    user_id: str
    skill_id: str
    mastery_level: float = 0.0 # 0.0 to 100.0
    last_practiced_at: Optional[datetime] = None
