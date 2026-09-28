from fastapi import APIRouter, Depends, HTTPException
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
