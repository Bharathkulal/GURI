import os
from pathlib import Path
import shutil

def setup_mongo_backend(base_path: str):
    base = Path(base_path)
    
    # Remove previous backend if exists
    if base.exists():
        shutil.rmtree(base)
        
    dirs = [
        "app/api/routes",
        "app/core",
        "app/db",
        "app/models",
        "app/schemas",
        "app/services",
        "app/utils",
        "scripts",
        "tests",
    ]
    
    base.mkdir(parents=True, exist_ok=True)
    
    for d in dirs:
        (base / d).mkdir(parents=True, exist_ok=True)
        parts = d.split('/')
        current = base
        for part in parts:
            current = current / part
            if part not in ["scripts"]:
                (current / "__init__.py").touch(exist_ok=True)
                
    files = {
        "app/main.py": """from fastapi import FastAPI
from app.api.router import api_router
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import connect_to_mongo, close_mongo_connection

app = FastAPI(
    title="GURI API",
    version="1.0.0",
    description="Backend API for GURI AI-powered career learning platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/health")
async def health_check():
    from app.db.mongodb import db
    try:
        # Ping the database
        await db.command("ping")
        return {"status": "ok", "database": "connected", "service": "guri-backend"}
    except Exception:
        return {"status": "error", "database": "disconnected", "service": "guri-backend"}
""",
        "app/api/router.py": """from fastapi import APIRouter
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
""",
        "app/core/config.py": """from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    MONGODB_URI: str = "mongodb://localhost:27017"
    MONGODB_DATABASE: str = "guri"
    
    FRONTEND_URL: str = "http://localhost:3000"
    
    AI_PROVIDER: str = "gemini"
    AI_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
""",
        "app/db/mongodb.py": """from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.MONGODB_DATABASE]

async def close_mongo_connection():
    global client
    if client:
        client.close()

async def get_db():
    return db
""",
        "app/models/base.py": """from bson import ObjectId
from pydantic import BaseModel, Field
from typing import Optional, Any
from pydantic_core import core_schema

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(
            cls, _source_type: Any, _handler: Any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
""",
        "app/models/user.py": """from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime

class User(MongoBaseModel):
    auth_id: str
    name: Optional[str] = None
    email: str
    avatar: Optional[str] = None
    college: Optional[str] = None
    year: Optional[str] = None
    career_goal_id: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
""",
        "app/core/dependencies.py": """from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
from app.db.mongodb import get_db

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # This should verify the token. 
    # For now, we simulate checking the DB.
    db = await get_db()
    token = credentials.credentials
    
    # In a real app, verify the token and extract auth_id
    # We will just fetch a test user for development if no token logic is implemented
    user = await db["users"].find_one({})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return user
""",
        "requirements.txt": """fastapi[standard]>=0.115.0
pydantic>=2.9.0
pydantic-settings>=2.5.0
motor>=3.3.1
httpx>=0.27.2
python-dotenv>=1.0.1
pytest>=8.3.3
""",
        ".env.example": """MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=guri
FRONTEND_URL=http://localhost:3000
AI_PROVIDER=gemini
AI_API_KEY=
ENVIRONMENT=development
"""
    }
    
    # Create empty route files
    route_names = ["auth", "users", "dashboard", "roadmaps", "lessons", "quizzes", "projects", "skills", "progress", "ai"]
    for route in route_names:
        files[f"app/api/routes/{route}.py"] = f"""from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()
"""
    
    for filepath, content in files.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print(f"Scaffolded MongoDB backend structure in {base_path}")

if __name__ == "__main__":
    setup_mongo_backend("d:/GURI/backend")
