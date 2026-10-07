from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class AICoachRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    mode: Optional[str] = "general"
    context: Optional[dict] = None

class AICoachResponse(BaseModel):
    message: str
    mode: str
    suggested_actions: List[str]
    conversation_id: str

class ConversationResponse(BaseModel):
    id: str
    title: str
    updated_at: str

@router.post("/chat", response_model=AICoachResponse)
async def ai_coach_chat(req: AICoachRequest, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    conv_id = req.conversation_id
    if not conv_id:
        new_conv = {
            "user_id": user_id,
            "title": req.message[:30] + "..." if len(req.message) > 30 else req.message,
            "messages": [],
            "updated_at": datetime.utcnow().isoformat()
        }
        res = await db["ai_conversations"].insert_one(new_conv)
        conv_id = str(res.inserted_id)
    else:
        if not ObjectId.is_valid(conv_id):
            raise HTTPException(status_code=400, detail="Invalid conversation ID")
        conv = await db["ai_conversations"].find_one({"_id": ObjectId(conv_id), "user_id": user_id})
        if not conv:
            raise HTTPException(status_code=404, detail="Conversation not found")

    await db["ai_conversations"].update_one(
        {"_id": ObjectId(conv_id)},
        {"$push": {"messages": {"role": "user", "content": req.message}}, "$set": {"updated_at": datetime.utcnow().isoformat()}}
    )

    mode = req.mode or "general"
    
    raise HTTPException(status_code=501, detail="BLOCKED — AI PROVIDER CONFIGURATION REQUIRED")

    # The following code is unreachable and was part of the stub implementation
    # It has been removed to avoid reference before assignment errors.

@router.get("/conversations", response_model=List[ConversationResponse])
async def get_conversations(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    cursor = db["ai_conversations"].find({"user_id": user_id}).sort("updated_at", -1)
    convs = await cursor.to_list(length=100)
    return [
        {"id": str(c["_id"]), "title": c["title"], "updated_at": c["updated_at"]}
        for c in convs
    ]

@router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    if not ObjectId.is_valid(conversation_id):
        raise HTTPException(status_code=400, detail="Invalid conversation ID")
    conv = await db["ai_conversations"].find_one({"_id": ObjectId(conversation_id), "user_id": user_id})
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    conv["id"] = str(conv.pop("_id"))
    return conv

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    if not ObjectId.is_valid(conversation_id):
        raise HTTPException(status_code=400, detail="Invalid conversation ID")
    await db["ai_conversations"].delete_one({"_id": ObjectId(conversation_id), "user_id": user_id})
    return {"status": "success"}

@router.get("/snapshot")
async def get_snapshot(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    # Retrieve actual data from db for snapshot
    roadmap_progress = await db["user_roadmaps"].find_one({"user_id": user_id, "active": True})
    roadmap_title = None
    if roadmap_progress:
        roadmap = await db["roadmaps"].find_one({"_id": roadmap_progress["roadmap_id"]})
        if roadmap:
            roadmap_title = roadmap.get("title")
            
    current_learning = await db["lesson_progress"].find_one({"user_id": user_id, "completed": False}, sort=[("started_at", -1)])
    learning_title = None
    if current_learning:
        lesson = await db["lessons"].find_one({"_id": current_learning["lesson_id"]})
        if lesson:
            learning_title = lesson.get("title")
            
    project = await db["user_projects"].find_one({"user_id": user_id, "status": "IN_PROGRESS"}, sort=[("_id", -1)])
    
    return {
        "currentRoadmap": roadmap_title,
        "currentTopic": learning_title,
        "practiceAccuracy": current_user.get("practice_accuracy", None),
        "activeProject": project.get("title") if project else None,
        "projectProgress": project.get("progress") if project else None,
        "weakArea": current_user.get("weak_area", None),
        "currentStreak": current_user.get("current_streak", 0)
    }
