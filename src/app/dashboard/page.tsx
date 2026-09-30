import { Suspense } from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { fetchDashboard } from '@/services/api';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import ContinueLearning from '@/components/dashboard/ContinueLearning';
import RoadmapProgress from '@/components/dashboard/RoadmapProgress';
// We would create these new components to match the new design:
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecommendationsSection from '@/components/dashboard/RecommendationsSection';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Dashboard | GURI',
  description: 'Your premium learning command center.',
};

// Error Boundary Component for section-level errors
function SectionError({ message }: { message: string }) {
  return (
    <div className="p-4 border border-red-900/50 bg-red-950/20 rounded-xl text-red-200 text-sm flex items-center justify-between">
      <span>{message}</span>
      <button className="px-3 py-1 bg-red-900/40 hover:bg-red-900/60 rounded-md transition-colors">Retry</button>
    </div>
  );
}

// Data fetching component
async function DashboardContent({ session }: { session: any }) {
  let data = null;
  try {
    data = await fetchDashboard(session?.user?.email || "dev-token");
  } catch (e) {
    // If the entire dashboard API fails, we throw to the nearest error boundary
    // But since we want partial loading, ideally the API would be split into smaller endpoints.
    // For now, if this fails, we will render empty states/errors for the sections.
    console.error("Dashboard API failed", e);
  }

  const user = session?.user || data?.user || {};
  const firstName = user?.name?.split(' ')[0] || 'Student';
  const currentGoal = data?.career_goal?.name || null;
  const overallProgress = data?.roadmap?.progress || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <WelcomeHeader name={firstName} goal={currentGoal} />

      {data?.current_learning ? (
        <ContinueLearning learning={data.current_learning} />
      ) : (
        <div className="p-8 border border-white/10 rounded-2xl bg-[#121212] flex flex-col items-center justify-center text-center space-y-4">
           <h3 className="text-xl font-medium text-white">Start your learning journey</h3>
           <p className="text-gray-400">Choose a roadmap to begin.</p>
           <Link href="/dashboard/learn">
             <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">Explore Roadmaps →</button>
           </Link>
        </div>
      )}

      {/* Stats Section */}
      {data?.stats ? (
        <DashboardStats stats={data.stats} />
      ) : (
         <SectionError message="Couldn't load your statistics" />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <h3 className="text-lg font-medium text-white">Your Roadmap</h3>
          {data?.roadmap ? (
            <RoadmapProgress roadmap={data.roadmap} />
          ) : (
            <SectionError message="Couldn't load roadmap data" />
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <h3 className="text-lg font-medium text-white">Recommended For You</h3>
          {data?.recommendations ? (
            <RecommendationsSection recommendations={data.recommendations} />
          ) : (
            <SectionError message="Couldn't load recommendations" />
          )}

          <h3 className="text-lg font-medium text-white pt-4">Recent Activity</h3>
          {data?.recent_activity ? (
            <RecentActivity activities={data.recent_activity} />
          ) : (
            <div className="text-gray-500 text-sm">No activity yet. Your learning activity will appear here.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <Suspense fallback={
          <div className="space-y-8">
            <Skeleton className="h-24 w-full bg-white/5 rounded-2xl" />
            <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-24 w-full bg-white/5 rounded-xl" />
            </div>
          </div>
        }>
          <DashboardContent session={session} />
        </Suspense>
      </div>
    </div>
  );
}
