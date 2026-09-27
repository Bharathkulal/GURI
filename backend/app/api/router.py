from fastapi import APIRouter
from app.api.users.routes import router as users_router
from app.api.roadmaps.routes import router as roadmaps_router

api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(roadmaps_router, prefix="/roadmaps", tags=["roadmaps"])
# ... other routers ...
