from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
from app.db.mongodb import get_db

security = HTTPBearer()

SHARED_SECRET = os.getenv("API_JWT_SECRET", "super-secret-default-key")
ALGORITHM = "HS256"

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SHARED_SECRET, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials (missing sub)",
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    
    db = await get_db()
    # Find user by email, or create a mock/placeholder if we want for now?
    # No, we must reject if user doesn't exist, but maybe we can upsert from JWT 
    # to support OAuth providers without manual registration in backend.
    user = await db["users"].find_one({"email": email})
    
    if not user:
        # Auto-create user from JWT info for seamless OAuth
        new_user = {
            "email": email,
            "name": payload.get("name", "Unknown User"),
            "provider_id": payload.get("id"),
            "role": "user"
        }
        await db["users"].insert_one(new_user)
        user = await db["users"].find_one({"email": email})
        
    return user
