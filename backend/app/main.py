from fastapi import FastAPI
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
