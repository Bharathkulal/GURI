import os
from pathlib import Path

def update_components(base_path: str):
    base = Path(base_path)
    
    components = {
        "src/app/dashboard/page.tsx": """import { auth } from '@/auth';
import { fetchDashboard } from '@/services/api';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import ContinueLearning from '@/components/dashboard/ContinueLearning';
import TodayPlan from '@/components/dashboard/TodayPlan';
import RoadmapProgress from '@/components/dashboard/RoadmapProgress';
import AICoachCard from '@/components/dashboard/AICoachCard';
import SkillProgress from '@/components/dashboard/SkillProgress';
import ProjectCard from '@/components/dashboard/ProjectCard';
import CareerReadiness from '@/components/dashboard/CareerReadiness';

export const metadata = {
  title: 'Dashboard | GURI',
  description: 'Your GURI student command center.',
};

export default async function DashboardPage() {
  const session = await auth();

  // Fetch real data from MongoDB backend
  let data = null;
  let error = false;
  try {
    // Pass session token if available (or empty for dev if unauthenticated check bypassed)
    data = await fetchDashboard(session?.user?.email || "dev-token");
  } catch (e) {
    error = true;
  }

  if (error || !data) {
    return <div className="text-white p-8">Unable to load your dashboard. Please try again later.</div>;
  }

  const user = session?.user || data.user;
  const firstName = user?.name?.split(' ')[0] || 'Student';
  const currentGoal = data.career_goal?.name || 'Goal Not Set';
  const overallProgress = data.roadmap?.progress || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      
      <WelcomeHeader name={firstName} goal={currentGoal} progress={overallProgress} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ContinueLearning learning={data.current_learning} />
          <TodayPlan plan={data.today_plan} />
          <SkillProgress skills={data.skills} />
          <ProjectCard projects={data.projects} />
        </div>

        <div className="space-y-8">
          <AICoachCard recommendation={data.ai_recommendation} />
          <RoadmapProgress roadmap={data.roadmap} />
          <CareerReadiness />
        </div>
      </div>

    </div>
  );
}
"""
    }
    
    for filepath, content in components.items():
        with open(base / filepath, "w") as f:
            f.write(content)
            
    print("Frontend components updated for integration")

if __name__ == "__main__":
    update_components("d:/GURI")
