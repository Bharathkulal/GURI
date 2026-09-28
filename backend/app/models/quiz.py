from app.models.base import MongoBaseModel
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
