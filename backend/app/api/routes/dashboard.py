from fastapi import APIRouter, Depends
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
