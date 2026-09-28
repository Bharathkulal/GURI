from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.db.mongodb import get_db

router = APIRouter()

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
