from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class Project(MongoBaseModel):
    roadmap_id: str
    title: str
    description: str
    difficulty: str
    tags: List[str]

class ProjectProgress(MongoBaseModel):
    user_id: str
    project_id: str
    status: str # "not_started", "in_progress", "completed"
    github_url: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
