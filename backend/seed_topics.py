import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_db
from bson import ObjectId

async def seed():
    await connect_to_mongo()
    db = await get_db()
    
    # Check if topics exist
    if await db["topics"].count_documents({}) > 0:
        print("Topics already exist")
        await close_mongo_connection()
        return

    topics = [
        {
            "_id": ObjectId("60d5ecb8b3112c3f848b5d01"),
            "name": "Python Fundamentals",
            "description": "Programming fundamentals for beginners using Python.",
            "category": "Programming",
            "difficulty": "Beginner",
            "estimated_time": "2 hours"
        },
        {
            "_id": ObjectId("60d5ecb8b3112c3f848b5d02"),
            "name": "Introduction to React",
            "description": "Build modern user interfaces with React.",
            "category": "Web Development",
            "difficulty": "Intermediate",
            "estimated_time": "3 hours"
        },
        {
            "_id": ObjectId("60d5ecb8b3112c3f848b5d03"),
            "name": "Machine Learning Basics",
            "description": "An introduction to core concepts of ML.",
            "category": "AI / ML",
            "difficulty": "Advanced",
            "estimated_time": "5 hours"
        }
    ]
    
    await db["topics"].insert_many(topics)
    
    lessons = [
        {
            "topic_id": "60d5ecb8b3112c3f848b5d01",
            "title": "What is Python?",
            "content": "Python is a high-level, interpreted programming language known for its simplicity and readability.\n\n### Key Takeaways\n- It is easy to learn.\n- It has a large ecosystem.",
            "estimated_minutes": 10,
            "order": 1
        },
        {
            "topic_id": "60d5ecb8b3112c3f848b5d01",
            "title": "Variables and Data Types",
            "content": "Variables store data. Python has various data types like integers, strings, floats, and booleans.\n\n```python\nname = 'Alice'\nage = 25\n```\n\n### Key Takeaways\n- Variables are dynamically typed.\n- Use descriptive variable names.",
            "estimated_minutes": 15,
            "order": 2
        },
        {
            "topic_id": "60d5ecb8b3112c3f848b5d01",
            "title": "Control Flow",
            "content": "Control flow statements like if, else, and loops allow your program to make decisions.\n\n```python\nif age > 18:\n    print('Adult')\n```",
            "estimated_minutes": 20,
            "order": 3
        }
    ]
    
    await db["lessons"].insert_many(lessons)
    
    print("Seeded topics and lessons successfully.")
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed())
