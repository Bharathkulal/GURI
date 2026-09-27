import os
from pathlib import Path

def create_files(base_path: str):
    base = Path(base_path)
    
    files = {
        "app/db/base.py": """from sqlalchemy.orm import declarative_base

Base = declarative_base()
""",
        "app/db/database.py": """from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
""",
        "app/models/user.py": """from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # UUID from Supabase Auth
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    avatar = Column(String, nullable=True)
    college = Column(String, nullable=True)
    year = Column(String, nullable=True)
    career_goal = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
""",
        "app/schemas/user.py": """from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: Optional[str] = None
    email: str
    avatar: Optional[str] = None
    college: Optional[str] = None
    year: Optional[str] = None
    career_goal: Optional[str] = None

class UserCreate(UserBase):
    id: str

class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
""",
        "app/core/dependencies.py": """from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.db.database import get_db
import httpx
from app.core.config import settings

security = HTTPBearer()

def verify_supabase_token(token: str) -> dict:
    # A lightweight verification assuming Supabase is used.
    # In production, use python-jose to verify JWT signature using SUPABASE_JWT_SECRET
    # Or call Supabase auth endpoint
    
    headers = {
        "apikey": settings.SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {token}"
    }
    response = httpx.get(f"{settings.SUPABASE_URL}/auth/v1/user", headers=headers)
    
    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return response.json()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    user_data = verify_supabase_token(token)
    
    # In a real app, query the db to get the user
    # from app.models.user import User
    # user = db.query(User).filter(User.id == user_data["id"]).first()
    # if not user:
    #    raise HTTPException(status_code=404, detail="User not found")
    
    return user_data
""",
    }
    
    for filepath, content in files.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print(f"Generated DB, models, schemas in {base_path}")

if __name__ == "__main__":
    create_files("d:/GURI/backend")
