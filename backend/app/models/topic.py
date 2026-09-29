from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class Topic(MongoBaseModel):
    name: str
    description: str
    category: str
    difficulty: str
    estimated_time: str
    tags: List[str] = []

class TopicProgress(MongoBaseModel):
    user_id: str
    topic_id: str
    status: str
    completed_lessons: int = 0
    total_lessons: int = 0
    updated_at: datetime = datetime.utcnow()
