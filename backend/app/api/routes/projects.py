from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from app.core.dependencies import get_current_user

router = APIRouter()

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    difficulty: str
    estimated_hours: str
    skills: List[str]
    concepts: List[str]
    steps: int
    icon: str

class UserProjectProgress(BaseModel):
    project_id: str
    status: str
    progress: int
    current_step: int
    total_steps: int
    saved: bool

# Dummy Database for Projects
DUMMY_PROJECTS = [
    {
        "id": "p1",
        "title": "Expense Tracker",
        "description": "Build a simple application to manage daily expenses and visualize spending.",
        "category": "Python",
        "difficulty": "Beginner",
        "estimated_hours": "4-6 hours",
        "skills": ["Python", "Functions", "File Handling"],
        "concepts": ["Variables", "Loops", "Conditions"],
        "steps": 7,
        "icon": "🐍"
    },
    {
        "id": "p2",
        "title": "Student Predictor",
        "description": "A machine learning model to predict student performance based on historical data.",
        "category": "AI / ML",
        "difficulty": "Intermediate",
        "estimated_hours": "8-12 hours",
        "skills": ["Pandas", "Scikit-learn", "Classification"],
        "concepts": ["Machine Learning", "Data Processing"],
        "steps": 10,
        "icon": "🤖"
    },
    {
        "id": "p3",
        "title": "Portfolio Website",
        "description": "Create a responsive personal portfolio to showcase your skills and projects.",
        "category": "Web Development",
        "difficulty": "Beginner",
        "estimated_hours": "3-5 hours",
        "skills": ["HTML", "CSS", "Flexbox"],
        "concepts": ["UI Design", "Responsiveness"],
        "steps": 5,
        "icon": "🌐"
    }
]

DUMMY_USER_PROJECTS = {
    "p1": {
        "project_id": "p1",
        "status": "IN_PROGRESS",
        "progress": 72,
        "current_step": 5,
        "total_steps": 7,
        "saved": False
    },
    "p2": {
        "project_id": "p2",
        "status": "SAVED",
        "progress": 0,
        "current_step": 0,
        "total_steps": 10,
        "saved": True
    }
}

@router.get("/", response_model=List[ProjectResponse])
async def get_all_projects(category: Optional[str] = None, difficulty: Optional[str] = None, q: Optional[str] = None):
    results = DUMMY_PROJECTS
    if category and category != 'All':
        results = [p for p in results if p['category'] == category]
    if difficulty and difficulty != 'All':
        results = [p for p in results if p['difficulty'] == difficulty]
    if q:
        q = q.lower()
        results = [p for p in results if q in p['title'].lower() or q in p['description'].lower() or any(q in s.lower() for s in p['skills'])]
    return results

@router.get("/recommended", response_model=List[ProjectResponse])
async def get_recommended_projects(current_user: dict = Depends(get_current_user)):
    return [DUMMY_PROJECTS[0], DUMMY_PROJECTS[1]]

@router.get("/my", response_model=List[UserProjectProgress])
async def get_my_projects(current_user: dict = Depends(get_current_user)):
    return list(DUMMY_USER_PROJECTS.values())

@router.post("/{project_id}/start")
async def start_project(project_id: str, current_user: dict = Depends(get_current_user)):
    if project_id not in [p['id'] for p in DUMMY_PROJECTS]:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project_id not in DUMMY_USER_PROJECTS:
        DUMMY_USER_PROJECTS[project_id] = {
            "project_id": project_id,
            "status": "IN_PROGRESS",
            "progress": 0,
            "current_step": 1,
            "total_steps": next(p['steps'] for p in DUMMY_PROJECTS if p['id'] == project_id),
            "saved": False
        }
    else:
        DUMMY_USER_PROJECTS[project_id]["status"] = "IN_PROGRESS"

    return {"message": "Project started", "data": DUMMY_USER_PROJECTS[project_id]}

@router.post("/{project_id}/save")
async def save_project(project_id: str, current_user: dict = Depends(get_current_user)):
    if project_id not in DUMMY_USER_PROJECTS:
        DUMMY_USER_PROJECTS[project_id] = {
            "project_id": project_id,
            "status": "NOT_STARTED",
            "progress": 0,
            "current_step": 0,
            "total_steps": next(p['steps'] for p in DUMMY_PROJECTS if p['id'] == project_id),
            "saved": True
        }
    else:
        DUMMY_USER_PROJECTS[project_id]["saved"] = True
    return {"message": "Project saved"}

@router.delete("/{project_id}/save")
async def unsave_project(project_id: str, current_user: dict = Depends(get_current_user)):
    if project_id in DUMMY_USER_PROJECTS:
        DUMMY_USER_PROJECTS[project_id]["saved"] = False
    return {"message": "Project unsaved"}
