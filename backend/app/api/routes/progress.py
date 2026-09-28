from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()
