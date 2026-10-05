from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Optional, List
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_projects(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    q: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    db = await get_db()
    query = {}
    if category:
        query["category"] = category
    if difficulty:
        query["difficulty"] = difficulty
    if q:
        query["title"] = {"$regex": q, "$options": "i"}
        
    cursor = db["projects"].find(query)
    projects = await cursor.to_list(length=100)
    for p in projects:
        p["id"] = str(p.pop("_id"))
    return projects

@router.get("/recommended")
async def get_recommended_projects(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    # Simple recommendation: just fetch latest 2 projects
    cursor = db["projects"].find({}).sort("_id", -1).limit(2)
    projects = await cursor.to_list(length=2)
    for p in projects:
        p["id"] = str(p.pop("_id"))
    return projects

@router.get("/my")
async def get_my_projects(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    cursor = db["user_projects"].find({"user_id": user_id})
    user_projects = await cursor.to_list(length=100)
    for p in user_projects:
        p["id"] = str(p.pop("_id"))
    return user_projects

@router.post("/{project_id}/start")
async def start_project(project_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
        
    project = await db["projects"].find_one({"_id": ObjectId(project_id)})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    user_project = await db["user_projects"].find_one({"user_id": user_id, "project_id": project_id})
    if not user_project:
        new_user_project = {
            "user_id": user_id,
            "project_id": project_id,
            "title": project["title"],
            "difficulty": project["difficulty"],
            "category": project["category"],
            "progress": 0,
            "completed_steps": 0,
            "total_steps": len(project.get("steps", [])),
            "status": "IN_PROGRESS",
            "saved": False
        }
        result = await db["user_projects"].insert_one(new_user_project)
        new_user_project["id"] = str(result.inserted_id)
        new_user_project.pop("_id")
        return {"message": "Project started", "data": new_user_project}
    else:
        user_project["id"] = str(user_project.pop("_id"))
        return {"message": "Project already started", "data": user_project}

@router.post("/{project_id}/save")
async def save_project(project_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
        
    await db["user_projects"].update_one(
        {"user_id": user_id, "project_id": project_id},
        {"$set": {"saved": True}},
        upsert=True
    )
    return {"message": "Project saved"}

@router.delete("/{project_id}/save")
async def unsave_project(project_id: str, current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    
    await db["user_projects"].update_one(
        {"user_id": user_id, "project_id": project_id},
        {"$set": {"saved": False}}
    )
    return {"message": "Project removed from saved"}
