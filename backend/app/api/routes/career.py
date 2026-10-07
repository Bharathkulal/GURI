from fastapi import APIRouter, Depends, HTTPException
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/")
async def get_career(current_user: dict = Depends(get_current_user)):
    db = await get_db()
    user_id = str(current_user["_id"])
    raise HTTPException(status_code=501, detail="BLOCKED — REQUIREMENT NOT DEFINED")
