export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchDashboard(token: string) {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function fetchRoadmaps() {
  const res = await fetch(`${API_URL}/roadmaps`);
  if (!res.ok) throw new Error("Failed to fetch roadmaps");
  return res.json();
}

export async function completeLesson(lessonId: string, token: string) {
  const res = await fetch(`${API_URL}/lessons/${lessonId}/complete`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to complete lesson");
  return res.json();
}

export async function askAICoach(message: string, token: string) {
  const res = await fetch(`${API_URL}/ai/coach`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error("Failed to ask AI coach");
  return res.json();
}

export async function fetchTopics(category?: string, query?: string) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (query) params.append("q", query);
  
  const res = await fetch(`${API_URL}/topics?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
}

export async function fetchTopic(topicId: string, token: string) {
  const res = await fetch(`${API_URL}/topics/${topicId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch topic details");
  return res.json();
}

export async function fetchTopicLessons(topicId: string, token: string) {
  const res = await fetch(`${API_URL}/topics/${topicId}/lessons`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch lessons");
  return res.json();
}

export async function startTopic(topicId: string, token: string) {
  const res = await fetch(`${API_URL}/topics/${topicId}/start`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to start topic");
  return res.json();
}

export async function fetchContinueLearning(token: string) {
  const res = await fetch(`${API_URL}/topics/continue`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch continue learning");
  return res.json();
}

export async function fetchProjects(params?: { category?: string, difficulty?: string, q?: string }, token?: string) {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
  if (params?.q) searchParams.append('q', params.q);
  const res = await fetch(`${API_URL}/projects?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchRecommendedProjects(token: string) {
  const res = await fetch(`${API_URL}/projects/recommended`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch recommended projects');
  return res.json();
}

export async function fetchMyProjects(token: string) {
  const res = await fetch(`${API_URL}/projects/my`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch my projects');
  return res.json();
}

export async function toggleSaveProject(projectId: string, save: boolean, token: string) {
  const res = await fetch(`${API_URL}/projects/${projectId}/save`, {
    method: save ? 'POST' : 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to toggle save project');
  return res.json();
}

export async function startProject(projectId: string, token: string) {
  const res = await fetch(`${API_URL}/projects/${projectId}/start`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to start project');
  return res.json();
}

export async function askAICoachChat(payload: { message: string, conversation_id?: string, mode?: string, context?: any }, token: string) {
  const res = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to send AI message');
  return res.json();
}

export async function fetchAIConversations(token: string) {
  const res = await fetch(`${API_URL}/ai/conversations`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch AI conversations');
  return res.json();
}

export async function fetchAIConversation(conversationId: string, token: string) {
  const res = await fetch(`${API_URL}/ai/conversations/${conversationId}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch AI conversation');
  return res.json();
}

export async function fetchAISnapshot(token: string) {
  const res = await fetch(`${API_URL}/ai/snapshot`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch AI snapshot');
  return res.json();
}

export async function fetchProgress(token: string) {
  // If the backend has an endpoint, use it. Since it doesn't, we mock it here.
  // In a real implementation, this would fetch from `${API_URL}/progress`
  try {
    const res = await fetch(`${API_URL}/progress`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.log("Mocking progress data as endpoint failed/unavailable");
  }

  // Mock Data conforming to the Progress UI requirements
  return {
    overall: {
      percentage: 64,
      completed_activities: 124,
      remaining_activities: 71,
      status: "On Track"
    },
    roadmap: {
      title: "AI Engineer Track",
      percentage: 62,
      completed_milestones: 4,
      total_milestones: 7,
      current_milestone: "Neural Networks Fundamentals",
      next_milestone: "Computer Vision"
    },
    skills: [
      { name: "Python", progress: 82 },
      { name: "SQL", progress: 64 },
      { name: "Machine Learning", progress: 58 }
    ],
    practice: {
      questions_attempted: 342,
      accuracy: 78,
      strongest_topic: "Data Preprocessing",
      weakest_topic: "SQL JOINs"
    },
    projects: [
      { id: "1", title: "House Price Prediction", status: "Completed", percentage: 100, stage: "Done" },
      { id: "2", title: "Customer Churn Analysis", status: "Active", percentage: 40, stage: "Feature Engineering" }
    ],
    activity: {
      summary: "30-day view",
      concepts_learned: 24,
      practice_completed: 156,
      projects_worked: 2,
      ai_sessions: 12
    },
    achievements: [
      { id: "a1", title: "First Concept Completed", date: "2026-09-01", icon: "CheckCircle" },
      { id: "a2", title: "50 Practice Questions", date: "2026-09-15", icon: "Target" },
      { id: "a3", title: "Roadmap Milestone 1", date: "2026-09-20", icon: "MapPin" }
    ],
    insights: {
      analysis: "Your Python progress is strong, but your SQL practice accuracy is low.",
      suggestion: "Try SQL JOIN practice next to improve your weakest topic.",
      action_link: "/dashboard/practice?topic=sql-joins",
      action_text: "Practice SQL"
    },
    goals: {
      type: "Weekly",
      target_hours: 5,
      current_hours: 3.5
    }
  };
}

export async function fetchCareer(token: string) {
  try {
    const res = await fetch(`${API_URL}/career`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.log("Mocking career data as endpoint failed/unavailable");
  }

  // Mock Data conforming to the Career UI requirements
  return {
    goal: {
      target_role: "AI/ML Engineer",
      description: "Develops machine learning models, neural networks, and AI systems.",
      required_skills: ["Python", "Machine Learning", "Deep Learning", "SQL", "Mathematics"],
      recommended_skills: ["Docker", "AWS/GCP", "MLOps"]
    },
    readiness: {
      overall: 72,
      breakdown: {
        skills: 80,
        projects: 65,
        resume: 85,
        interview: 58
      }
    },
    roadmap: {
      title: "AI Engineer Track",
      items: [
        { name: "Python", status: "completed" },
        { name: "NumPy & Pandas", status: "completed" },
        { name: "Machine Learning", status: "current" },
        { name: "Deep Learning", status: "pending" },
        { name: "NLP", status: "pending" },
        { name: "Model Deployment", status: "pending" }
      ]
    },
    skill_gap: [
      { name: "Python", status: "Strong", action: "None" },
      { name: "Pandas", status: "Strong", action: "None" },
      { name: "Machine Learning", status: "Good", action: "None" },
      { name: "SQL", status: "Needs Practice", action: "Practice" },
      { name: "Deep Learning", status: "Missing", action: "Learn" },
      { name: "Docker", status: "Missing", action: "Learn" }
    ],
    recommended_projects: [
      { id: "3", title: "End-to-End ML Pipeline", difficulty: "Advanced", skills: ["Python", "MLOps", "Docker"] }
    ],
    resume: {
      status: "Good",
      completeness: 85,
      ats_readiness: 78
    },
    opportunities: [], // Empty state to test "No opportunities available right now"
    interview_prep: [
      { type: "Technical", label: "Technical Interview" },
      { type: "HR", label: "HR Interview" },
      { type: "Coding", label: "Coding Interview" },
      { type: "Mock", label: "Role-specific Mock" }
    ],
    insight: {
      message: "You are progressing well toward AI/ML Engineering. Your next priority should be SQL and one deployment-focused project.",
      actions: [
        { label: "Learn SQL", href: "/dashboard/learn?q=sql" },
        { label: "Practice SQL", href: "/dashboard/practice?topic=sql" }
      ]
    }
  };
}
