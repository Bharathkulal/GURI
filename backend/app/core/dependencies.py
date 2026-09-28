from fastapi import Depends, HTTPException, status
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
