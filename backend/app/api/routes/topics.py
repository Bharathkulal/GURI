from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from app.db.mongodb import get_db
from bson import ObjectId
from app.core.dependencies import get_current_user
from datetime import datetime

router = APIRouter()

@router.get("/")
async def get_topics(category: Optional[str] = None, q: Optional[str] = None):
    db = await get_db()
    query = {}
    if category:
        query["category"] = category
    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}}
        ]
        
    cursor = db["topics"].find(query)
    topics = await cursor.to_list(length=100)
    for t in topics:
        t["id"] = str(t.pop("_id"))
    return topics

@router.get("/continue")
async def get_continue_learning(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    # Find the most recently updated topic progress that is in_progress
    progress = await db["topic_progress"].find_one(
        {"user_id": user_id, "status": "in_progress"},
        sort=[("updated_at", -1)]
    )
    
    if not progress:
        return None
        
    topic = await db["topics"].find_one({"_id": ObjectId(progress["topic_id"])})
    if not topic:
        return None
        
    topic["id"] = str(topic.pop("_id"))
    
    return {
        "topic": topic,
        "progress": {
            "completed_lessons": progress["completed_lessons"],
            "total_lessons": progress["total_lessons"]
        }
    }

@router.get("/categories")
async def get_categories():
    db = await get_db()
    categories = await db["topics"].distinct("category")
    return categories

@router.get("/{topic_id}")
async def get_topic(topic_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    if not ObjectId.is_valid(topic_id):
        raise HTTPException(status_code=400, detail="Invalid topic ID")
        
    topic = await db["topics"].find_one({"_id": ObjectId(topic_id)})
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
        
    topic["id"] = str(topic.pop("_id"))
    
    # Get user progress
    user_id = str(current_user["_id"])
    progress = await db["topic_progress"].find_one({"user_id": user_id, "topic_id": topic["id"]})
    
    if progress:
        progress["id"] = str(progress.pop("_id"))
        topic["progress"] = progress
    else:
        topic["progress"] = {
            "status": "not_started",
            "completed_lessons": 0,
            "total_lessons": await db["lessons"].count_documents({"topic_id": topic["id"]})
        }
        
    return topic

@router.get("/{topic_id}/lessons")
async def get_topic_lessons(topic_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    
    lessons_cursor = db["lessons"].find({"topic_id": topic_id}).sort("order", 1)
    lessons = await lessons_cursor.to_list(length=100)
    
    user_id = current_user.get("_id")
    
    for l in lessons:
        l["id"] = str(l.pop("_id"))
        # Check progress
        progress = await db["lesson_progress"].find_one({
            "user_id": user_id,
            "lesson_id": l["id"]
        })
        if progress and progress.get("completed"):
            l["status"] = "completed"
        elif progress:
            l["status"] = "in_progress"
        else:
            l["status"] = "not_started"
            
    return lessons

@router.post("/{topic_id}/start")
async def start_topic(topic_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    existing = await db["topic_progress"].find_one({"user_id": user_id, "topic_id": topic_id})
    if not existing:
        total_lessons = await db["lessons"].count_documents({"topic_id": topic_id})
        await db["topic_progress"].insert_one({
            "user_id": user_id,
            "topic_id": topic_id,
            "status": "in_progress",
            "completed_lessons": 0,
            "total_lessons": total_lessons,
            "updated_at": datetime.utcnow()
        })
    
    return {"message": "Topic started"}
