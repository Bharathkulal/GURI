from fastapi import APIRouter
from app.api.routes import auth, users, dashboard, roadmaps, lessons, quizzes, projects, skills, progress, ai

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(roadmaps.router, prefix="/roadmaps", tags=["roadmaps"])
api_router.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
api_router.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
