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


