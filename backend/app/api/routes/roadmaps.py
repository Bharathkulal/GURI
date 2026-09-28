from fastapi import APIRouter, Depends, HTTPException
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
