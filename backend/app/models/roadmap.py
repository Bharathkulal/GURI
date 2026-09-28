from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class Roadmap(MongoBaseModel):
    title: str
    description: str
    career: str
    estimated_duration: str
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

class RoadmapModule(MongoBaseModel):
    roadmap_id: str
    title: str
    description: str
    order: int
    skills_covered: List[str] = []
