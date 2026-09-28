import os
from pathlib import Path

def create_files(base_path: str):
    base = Path(base_path)
    
    files = {
        "app/models/roadmap.py": """from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class Roadmap(MongoBaseModel):
    title: str
    description: str
    career: str
    estimated_duration: str
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

class RoadmapModule(MongoBaseModel):
    roadmap_id: str
    title: str
    description: str
    order: int
    skills_covered: List[str] = []
""",
        "app/models/lesson.py": """from app.models.base import MongoBaseModel
from typing import Optional
from datetime import datetime

class Lesson(MongoBaseModel):
    module_id: str
    title: str
    content: str
    estimated_minutes: int
    order: int
    video_url: Optional[str] = None

class LessonProgress(MongoBaseModel):
    user_id: str
    lesson_id: str
    completed: bool = False
    completed_at: Optional[datetime] = None
""",
        "app/models/quiz.py": """from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class QuizQuestion(MongoBaseModel):
    question_text: str
    options: List[str]
    correct_option_index: int
    explanation: str

class Quiz(MongoBaseModel):
    module_id: str
    title: str
    questions: List[QuizQuestion]

class QuizAttempt(MongoBaseModel):
    user_id: str
    quiz_id: str
    score: int
    percentage: float
    answers: List[int]
    timestamp: datetime = datetime.utcnow()
""",
        "app/models/project.py": """from app.models.base import MongoBaseModel
from typing import List, Optional
from datetime import datetime

class Project(MongoBaseModel):
    roadmap_id: str
    title: str
    description: str
    difficulty: str
    tags: List[str]

class ProjectProgress(MongoBaseModel):
    user_id: str
    project_id: str
    status: str # "not_started", "in_progress", "completed"
    github_url: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
""",
        "app/models/skill.py": """from app.models.base import MongoBaseModel
from typing import List
from datetime import datetime

class Skill(MongoBaseModel):
    name: str
    category: str

class UserSkill(MongoBaseModel):
    user_id: str
    skill_id: str
    mastery_level: float = 0.0 # 0.0 to 100.0
    last_practiced_at: Optional[datetime] = None
""",
        "app/models/ai.py": """from app.models.base import MongoBaseModel
from typing import List
from datetime import datetime

class AICoachSession(MongoBaseModel):
    user_id: str
    started_at: datetime = datetime.utcnow()
    messages: List[dict] # {"role": "user"|"ai", "content": "..."}

class AIRecommendation(MongoBaseModel):
    user_id: str
    context_used: dict
    recommendation: str
    timestamp: datetime = datetime.utcnow()
"""
    }
    
    for filepath, content in files.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print(f"Generated models in {base_path}")

if __name__ == "__main__":
    create_files("d:/GURI/backend")
