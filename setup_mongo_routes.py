import os
from pathlib import Path

def create_routes(base_path: str):
    base = Path(base_path)
    
    files = {
        "app/api/routes/dashboard.py": """from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/")
async def get_dashboard(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    
    # Mock data aggregation - in real app, query from collections
    # fetch roadmap, user skills, projects, current learning
    
    return {
        "user": current_user,
        "career_goal": {"name": "AI Engineer"},
        "roadmap": {"title": "AI Engineer Track", "progress": 62},
        "current_learning": {"title": "Linear Regression", "progress": 72},
        "today_plan": [
            {"title": "Review Python", "duration": "20 min", "status": "done"},
            {"title": "Learn Linear Regression", "duration": "45 min", "status": "current"}
        ],
        "skills": [
            {"name": "Python", "progress": 90},
            {"name": "Machine Learning", "progress": 52}
        ],
        "projects": [
            {"title": "House Price Prediction", "difficulty": "Intermediate"}
        ],
        "ai_recommendation": {
            "title": "Decision Trees",
            "reason": "Mastered supervised learning basics."
        }
    }
""",
        "app/api/routes/users.py": """from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
""",
        "app/api/routes/roadmaps.py": """from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.db.mongodb import get_db
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_roadmaps():
    db = await get_db()
    cursor = db["roadmaps"].find({})
    roadmaps = await cursor.to_list(length=100)
    for r in roadmaps:
        r["id"] = str(r.pop("_id"))
    return roadmaps

@router.get("/{roadmap_id}")
async def get_roadmap(roadmap_id: str):
    db = await get_db()
    if not ObjectId.is_valid(roadmap_id):
        raise HTTPException(status_code=400, detail="Invalid roadmap ID")
    
    roadmap = await db["roadmaps"].find_one({"_id": ObjectId(roadmap_id)})
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
        
    roadmap["id"] = str(roadmap.pop("_id"))
    return roadmap
""",
        "app/api/routes/lessons.py": """from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/{lesson_id}/complete")
async def complete_lesson(lesson_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    if not ObjectId.is_valid(lesson_id):
        raise HTTPException(status_code=400, detail="Invalid lesson ID")
        
    # Check if lesson exists
    lesson = await db["lessons"].find_one({"_id": ObjectId(lesson_id)})
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
        
    # Mark as complete
    user_id = current_user.get("_id")
    await db["lesson_progress"].update_one(
        {"user_id": user_id, "lesson_id": lesson_id},
        {"$set": {"completed": True, "completed_at": datetime.utcnow()}},
        upsert=True
    )
    
    return {"success": True, "message": "Lesson completed"}
""",
        "app/api/routes/ai.py": """from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from pydantic import BaseModel

router = APIRouter()

class AICoachRequest(BaseModel):
    message: str

@router.post("/coach")
async def ai_coach(req: AICoachRequest, current_user: dict = Depends(get_current_user)):
    # Integrate with AI Provider here (e.g. Gemini)
    # Gather context from DB
    
    return {
        "reply": f"AI Response to: {req.message}",
        "context_used": ["career_goal", "roadmap_progress"]
    }
"""
    }
    
    for filepath, content in files.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print(f"Generated routes in {base_path}")

if __name__ == "__main__":
    create_routes("d:/GURI/backend")
