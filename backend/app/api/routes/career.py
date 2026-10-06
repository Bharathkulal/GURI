from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/")
async def get_career(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    # Simple placeholder logic to fetch real data eventually
    skills = current_user.get("skills", [])
    career_goal = current_user.get("career_goal", "Not Set")
    
    # Get recommended jobs based on skills (stubbed for DB fetch)
    cursor = db["jobs"].find({"skills": {"$in": skills}}).limit(3)
    recommended_jobs = await cursor.to_list(length=3)
    
    return {
        "career_goal": career_goal,
        "skills": skills,
        "recommended_jobs": recommended_jobs,
        "resume_status": "complete" if "resume" in current_user else "missing"
    }
