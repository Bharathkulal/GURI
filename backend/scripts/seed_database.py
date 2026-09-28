import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

async def seed_database():
    uri = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")
    client = AsyncIOMotorClient(uri)
    db = client["guri"]

    # Clear existing data
    await db["roadmaps"].delete_many({})
    await db["roadmap_modules"].delete_many({})
    await db["skills"].delete_many({})
    await db["lessons"].delete_many({})
    await db["projects"].delete_many({})

    # Roadmaps
    roadmaps = [
        {"_id": "ai-engineer", "title": "AI Engineer", "career": "AI Engineer", "description": "Master Machine Learning, Deep Learning, and LLMs.", "estimated_duration": "6 months"},
        {"_id": "full-stack", "title": "Full Stack Developer", "career": "Software Engineer", "description": "Master React, Node.js, and Databases.", "estimated_duration": "5 months"},
        {"_id": "data-analyst", "title": "Data Analyst", "career": "Data Analyst", "description": "Master SQL, Python, and Data Visualization.", "estimated_duration": "4 months"}
    ]
    await db["roadmaps"].insert_many(roadmaps)

    # Modules
    modules = [
        {"_id": "ai-mod-1", "roadmap_id": "ai-engineer", "title": "Python for AI", "description": "Learn advanced Python concepts.", "order": 1, "skills_covered": ["Python"]},
        {"_id": "ai-mod-2", "roadmap_id": "ai-engineer", "title": "Machine Learning", "description": "Supervised and Unsupervised learning.", "order": 2, "skills_covered": ["Machine Learning"]},
    ]
    await db["roadmap_modules"].insert_many(modules)

    # Lessons
    lessons = [
        {"_id": "ai-les-1", "module_id": "ai-mod-1", "title": "Python Fundamentals", "content": "Variables, Loops, and Functions.", "estimated_minutes": 45, "order": 1},
        {"_id": "ai-les-2", "module_id": "ai-mod-2", "title": "Linear Regression", "content": "Predict continuous values.", "estimated_minutes": 60, "order": 1},
    ]
    await db["lessons"].insert_many(lessons)

    # Skills
    skills = [
        {"_id": "python", "name": "Python", "category": "Programming"},
        {"_id": "ml", "name": "Machine Learning", "category": "AI"},
        {"_id": "sql", "name": "SQL", "category": "Database"},
    ]
    await db["skills"].insert_many(skills)
    
    # Projects
    projects = [
        {"_id": "proj-1", "roadmap_id": "ai-engineer", "title": "House Price Prediction", "description": "Use regression to predict prices.", "difficulty": "Intermediate", "tags": ["Python", "Regression"]}
    ]
    await db["projects"].insert_many(projects)

    print("Database seeded successfully with base Roadmaps, Modules, Lessons, Skills, and Projects.")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
