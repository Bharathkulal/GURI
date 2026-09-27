from sqlalchemy import Column, String, DateTime, Text
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
