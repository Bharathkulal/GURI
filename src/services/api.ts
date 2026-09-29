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
