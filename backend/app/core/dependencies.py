from fastapi import Depends, HTTPException, status
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
