from pydantic_settings import BaseSettings, SettingsConfigDict
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
