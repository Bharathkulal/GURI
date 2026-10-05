from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/")
async def get_dashboard(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    # Career Goal
    career_goal = current_user.get("career_goal", None)
    
    # Active Roadmap
    roadmap_progress = await db["user_roadmaps"].find_one({"user_id": user_id, "active": True})
    roadmap_data = None
    if roadmap_progress:
        roadmap = await db["roadmaps"].find_one({"_id": roadmap_progress["roadmap_id"]})
        if roadmap:
            roadmap_data = {
                "title": roadmap.get("title", "Active Roadmap"),
                "progress": roadmap_progress.get("progress", 0)
            }
            
    # Current Learning
    current_learning = await db["lesson_progress"].find_one({"user_id": user_id, "completed": False}, sort=[("started_at", -1)])
    learning_data = None
    if current_learning:
        lesson = await db["lessons"].find_one({"_id": current_learning["lesson_id"]})
        if lesson:
            learning_data = {
                "title": lesson.get("title", "Current Lesson"),
                "progress": current_learning.get("progress", 0)
            }
            
    # Today's Plan
    today_plan = await db["user_tasks"].find({"user_id": user_id, "date": "today"}).to_list(length=10)
    
    # Skills
    skills = current_user.get("skills", [])
    
    # Projects
    cursor = db["user_projects"].find({"user_id": user_id, "status": "IN_PROGRESS"}).limit(2)
    projects_docs = await cursor.to_list(length=2)
    projects_data = []
    for p in projects_docs:
        projects_data.append({"title": p.get("title"), "difficulty": p.get("difficulty")})
        
    # AI Recommendation
    ai_recommendation = await db["ai_recommendations"].find_one({"user_id": user_id}, sort=[("created_at", -1)])
    if ai_recommendation:
        ai_recommendation.pop("_id", None)
        ai_recommendation.pop("user_id", None)
    
    return {
        "user": current_user,
        "career_goal": career_goal,
        "roadmap": roadmap_data,
        "current_learning": learning_data,
        "today_plan": today_plan,
        "skills": skills,
        "projects": projects_data,
        "ai_recommendation": ai_recommendation
    }
