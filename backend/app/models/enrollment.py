from app.models.base import MongoBaseModel
from typing import List
from datetime import datetime
from pydantic import Field

class Enrollment(MongoBaseModel):
    user_id: str
    roadmap_id: str
    order_id: str
    progress: float = 0.0
    completed_modules: List[str] = []
    status: str = "active" # active, completed, cancelled
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
