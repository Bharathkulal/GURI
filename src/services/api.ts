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
