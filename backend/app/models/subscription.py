from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime

class Subscription(MongoBaseModel):
    user_id: str
    plan_id: str
    gateway: str = "razorpay"
    gateway_subscription_id: Optional[str] = None
    gateway_customer_id: Optional[str] = None
    status: str = "incomplete" # incomplete, active, past_due, cancelled, expired, failed
    start_date: Optional[datetime] = None
    renewal_date: Optional[datetime] = None
    cancellation_date: Optional[datetime] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
