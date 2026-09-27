import os
from pathlib import Path

def create_structure(base_path: str):
    dirs = [
        "app/api/auth",
        "app/api/users",
        "app/api/roadmaps",
        "app/api/lessons",
        "app/api/quizzes",
        "app/api/projects",
        "app/api/progress",
        "app/api/skills",
        "app/api/ai",
        "app/core",
        "app/db",
        "app/models",
        "app/schemas",
        "app/services",
        "app/utils",
        "migrations/versions",
        "tests",
    ]
    
    base = Path(base_path)
    base.mkdir(parents=True, exist_ok=True)
    
    for d in dirs:
        (base / d).mkdir(parents=True, exist_ok=True)
        # Create __init__.py in all python packages
        parts = d.split('/')
        current = base
        for part in parts:
            current = current / part
            if part not in ["migrations", "versions"]:
                (current / "__init__.py").touch()
                
    # Create necessary files
    files = {
        "app/main.py": """from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GURI API",
    version="1.0.0",
    description="Backend API for GURI AI-powered career learning platform"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "guri-backend"}
""",
        "app/api/router.py": """from fastapi import APIRouter
from app.api.users.routes import router as users_router
from app.api.roadmaps.routes import router as roadmaps_router

api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(roadmaps_router, prefix="/roadmaps", tags=["roadmaps"])
# ... other routers ...
""",
        "app/core/config.py": """from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    
    AI_PROVIDER: str = "gemini"
    AI_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
""",
        "app/api/users/routes.py": """from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
def get_me():
    return {"message": "Current user"}
""",
        "app/api/roadmaps/routes.py": """from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_roadmaps():
    return []
""",
        "requirements.txt": """fastapi[standard]>=0.115.0
pydantic>=2.9.0
pydantic-settings>=2.5.0
SQLAlchemy>=2.0.35
alembic>=1.13.3
psycopg2-binary>=2.9.9
httpx>=0.27.2
python-dotenv>=1.0.1
pytest>=8.3.3
""",
        ".env.example": """DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AI_PROVIDER=
AI_API_KEY=
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
"""
    }
    
    for filepath, content in files.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print(f"Scaffolded backend structure in {base_path}")

if __name__ == "__main__":
    create_structure("d:/GURI/backend")
