from fastapi import APIRouter, Depends
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
