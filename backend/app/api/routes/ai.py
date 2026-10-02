from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

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

# Dummy in-memory DB for conversations
CONVERSATIONS = {}

@router.post("/chat", response_model=AICoachResponse)
async def ai_coach_chat(req: AICoachRequest, current_user: dict = Depends(get_current_user)):
    conv_id = req.conversation_id or str(uuid.uuid4())
    
    if conv_id not in CONVERSATIONS:
        CONVERSATIONS[conv_id] = {
            "id": conv_id,
            "title": req.message[:30] + "..." if len(req.message) > 30 else req.message,
            "messages": [],
            "updated_at": datetime.utcnow().isoformat()
        }
    
    CONVERSATIONS[conv_id]["messages"].append({"role": "user", "content": req.message})
    CONVERSATIONS[conv_id]["updated_at"] = datetime.utcnow().isoformat()

    mode = req.mode or "general"
    reply_msg = ""
    actions = []

    msg = req.message.lower()

    if mode == "learn" or "explain" in msg:
        reply_msg = f"Let's break down this concept. {req.message} can be understood as..."
        actions = ["Real-world Example", "Coding Example", "Practice This"]
    elif mode == "practice" or "hint" in msg or "stuck" in msg:
        reply_msg = "You're close! Think about what happens when you..."
        actions = ["Give Me Another Hint", "Explain Fully", "Practice Similar Question"]
    elif mode == "project" or "debug" in msg or "code" in msg:
        reply_msg = "I see what you're trying to do. Let's look at the error first..."
        actions = ["Explain the error", "Suggest Fix", "Show Corrected Version"]
    elif mode == "roadmap" or "next" in msg:
        reply_msg = "Based on your roadmap, your next focus should be..."
        actions = ["Start Learning", "Practice Functions"]
    else:
        reply_msg = f"I'm here to help with your learning journey. You asked about: {req.message}"
        actions = ["Explain a Concept", "Help With Practice", "Help With Project", "Roadmap Guidance"]

    CONVERSATIONS[conv_id]["messages"].append({"role": "ai", "content": reply_msg})

    return {
        "message": reply_msg,
        "mode": mode,
        "suggested_actions": actions,
        "conversation_id": conv_id
    }

@router.get("/conversations", response_model=List[ConversationResponse])
async def get_conversations(current_user: dict = Depends(get_current_user)):
    return [
        {"id": v["id"], "title": v["title"], "updated_at": v["updated_at"]}
        for v in sorted(CONVERSATIONS.values(), key=lambda x: x["updated_at"], reverse=True)
    ]

@router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    if conversation_id not in CONVERSATIONS:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return CONVERSATIONS[conversation_id]

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    if conversation_id in CONVERSATIONS:
        del CONVERSATIONS[conversation_id]
    return {"status": "success"}

@router.get("/snapshot")
async def get_snapshot(current_user: dict = Depends(get_current_user)):
    return {
        "currentRoadmap": "AI Engineer",
        "currentTopic": "Python Functions",
        "practiceAccuracy": 82,
        "activeProject": "Expense Tracker",
        "projectProgress": 64,
        "weakArea": "SQL Joins",
        "currentStreak": 7
    }
