from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime

class Lesson(MongoBaseModel):
    module_id: str
    title: str
    content: str
    estimated_minutes: int
    order: int
    video_url: Optional[str] = None

class LessonProgress(MongoBaseModel):
    user_id: str
    lesson_id: str
    completed: bool = False
    completed_at: Optional[datetime] = None
