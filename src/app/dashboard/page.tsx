import { auth } from '@/auth';
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

  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] || 'Student';
  const currentGoal = 'AI Engineer';
  const overallProgress = 62;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      
      <WelcomeHeader name={firstName} goal={currentGoal} progress={overallProgress} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ContinueLearning />
          <TodayPlan />
          <SkillProgress />
          <ProjectCard />
        </div>

        <div className="space-y-8">
          <AICoachCard />
          <RoadmapProgress />
          <CareerReadiness />
        </div>
      </div>

      <div className="pt-12 pb-8 text-center border-t border-neutral-800 mt-12">
        <h3 className="text-xl font-bold text-white mb-2">Small progress every day becomes a career.</h3>
        <p className="text-neutral-400 mb-6 max-w-md mx-auto">
          You don't need to learn everything today. Just learn the next thing.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors inline-flex items-center">
          Continue Learning <span className="ml-2">→</span>
        </button>
      </div>

    </div>
  );
}