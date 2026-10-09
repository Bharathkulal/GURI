from fastapi import APIRouter, Depends, Request, HTTPException
from typing import Optional, Dict, Any
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db
import os
import hmac
import hashlib
from datetime import datetime

router = APIRouter()

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")
RAZORPAY_WEBHOOK_SECRET = os.getenv("RAZORPAY_WEBHOOK_SECRET")

def check_gateway_configured():
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise HTTPException(status_code=501, detail="BLOCKED — REQUIRES CONFIGURATION: Razorpay API keys are missing.")

@router.post("/create")
async def create_subscription(current_user: dict = Depends(get_current_user)):
    check_gateway_configured()
    # In a fully configured environment, we would use the Razorpay Python SDK to create a subscription
    # plan_id would be configured in the dashboard for Rs. 100/month
    raise HTTPException(status_code=501, detail="BLOCKED — REQUIRES CONFIGURATION: Razorpay plan ID needs to be configured.")

@router.get("/me")
async def get_my_subscription(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    sub = await db["subscriptions"].find_one({"user_id": user_id})
    if not sub:
        return {"status": "none"}
        
    sub["id"] = str(sub.pop("_id"))
    return sub

@router.post("/webhook")
async def razorpay_webhook(request: Request):
    if not RAZORPAY_WEBHOOK_SECRET:
        raise HTTPException(status_code=501, detail="BLOCKED — REQUIRES CONFIGURATION")
        
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature")
    
    if not signature:
        raise HTTPException(status_code=400, detail="Missing signature")
        
    expected_signature = hmac.new(
        key=RAZORPAY_WEBHOOK_SECRET.encode(),
        msg=body,
        digestmod=hashlib.sha256
    ).hexdigest()
    
    if expected_signature != signature:
        raise HTTPException(status_code=400, detail="Invalid signature")
        
    # Process webhook events (e.g., subscription.charged, subscription.cancelled)
    payload = await request.json()
    event = payload.get("event")
    db = await get_db()
    
    if event == "subscription.charged":
        sub_id = payload["payload"]["subscription"]["entity"]["id"]
        # Update MongoDB idempotently
        await db["subscriptions"].update_one(
            {"gateway_subscription_id": sub_id},
            {"$set": {"status": "active", "updated_at": datetime.utcnow()}}
        )
        
    return {"status": "ok"}
