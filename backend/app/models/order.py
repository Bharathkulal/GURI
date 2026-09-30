from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime
from pydantic import Field

class Order(MongoBaseModel):
    user_id: str
    roadmap_id: str
    amount: float
    currency: str = "INR"
    status: str = "pending" # pending, paid, failed, cancelled
    payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
