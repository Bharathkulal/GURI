from app.models.base import MongoBaseModel
from typing import List
from datetime import datetime

class AICoachSession(MongoBaseModel):
    user_id: str
    started_at: datetime = datetime.utcnow()
    messages: List[dict] # {"role": "user"|"ai", "content": "..."}

class AIRecommendation(MongoBaseModel):
    user_id: str
    context_used: dict
    recommendation: str
    timestamp: datetime = datetime.utcnow()
