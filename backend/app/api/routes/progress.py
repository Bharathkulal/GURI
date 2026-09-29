from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pydantic import BaseModel
from bson import ObjectId
from app.db.mongodb import get_db
from app.core.dependencies import get_current_user

router = APIRouter()

class ProgressUpdate(BaseModel):
    roadmap_id: str
    stage_id: str
    topic_id: str
    status: str # "started", "completed"
    score: int = 0

@router.get("/")
async def get_user_progress(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    progress = await db["user_progress"].find({"user_id": str(current_user["_id"])}).to_list(length=100)
    for p in progress:
        p["id"] = str(p.pop("_id"))
    return progress

@router.post("/update")
async def update_progress(data: ProgressUpdate, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    # Check if progress exists
    existing = await db["user_progress"].find_one({
        "user_id": user_id,
        "roadmap_id": data.roadmap_id,
        "topic_id": data.topic_id
    })
    
    if existing:
        await db["user_progress"].update_one(
            {"_id": existing["_id"]},
            {"$set": {"status": data.status, "score": data.score}}
        )
    else:
        await db["user_progress"].insert_one({
            "user_id": user_id,
            "roadmap_id": data.roadmap_id,
            "stage_id": data.stage_id,
            "topic_id": data.topic_id,
            "status": data.status,
            "score": data.score
        })
        
    return {"message": "Progress updated successfully"}
