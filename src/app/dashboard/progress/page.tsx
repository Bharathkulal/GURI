import { Suspense } from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { fetchProgress } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Target, TrendingUp, Map, BookOpen, PenTool, Code, BrainCircuit, ChevronRight, CheckCircle, Award, BarChart3, Star, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const metadata = {
  title: 'Progress | GURI',
  description: 'Track your learning progress, skills, and goals.',
};

// Sub-components for each section

function OverallProgress({ data }: { data: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center space-y-2">
        <div className="relative h-32 w-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/10" strokeWidth="3"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - data.percentage} strokeLinecap="round"></circle>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{data.percentage}%</span>
          </div>
        </div>
        <p className="text-sm font-medium text-emerald-400">{data.status}</p>
      </div>
      
      <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <p className="text-sm text-gray-400 mb-1">Completed Activities</p>
          <p className="text-2xl font-semibold text-white">{data.completed_activities}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <p className="text-sm text-gray-400 mb-1">Remaining Activities</p>
          <p className="text-2xl font-semibold text-white">{data.remaining_activities}</p>
        </div>
      </div>
    </div>
  );
}

function RoadmapProgressCard({ data }: { data: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Map size={20} />
          </div>
          <h3 className="font-medium text-lg text-white">Roadmap Progress</h3>
        </div>
        
        <p className="text-gray-400 text-sm mb-1">{data.title}</p>
        <div className="flex justify-between items-end mb-2">
          <span className="text-2xl font-semibold text-white">{data.percentage}%</span>
          <span className="text-xs text-gray-500">{data.completed_milestones} / {data.total_milestones} milestones</span>
        </div>
        <Progress value={data.percentage} className="h-2 mb-6" />

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-emerald-500 mt-0.5" size={16} />
            <div>
              <p className="text-xs text-emerald-400 font-medium">CURRENT MILESTONE</p>
              <p className="text-sm text-white">{data.current_milestone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 opacity-60">
            <div className="w-4 h-4 rounded-full border border-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 font-medium">NEXT UP</p>
              <p className="text-sm text-white">{data.next_milestone}</p>
            </div>
          </div>
        </div>
      </div>
      
      <Link href="/dashboard/roadmap" className="mt-6 flex items-center justify-center w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
        Continue Roadmap
      </Link>
    </div>
  );
}

function AIInsightsCard({ data }: { data: any }) {
  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -mr-10 -mt-10 rounded-full pointer-events-none" />
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <BrainCircuit size={20} />
          </div>
          <h3 className="font-medium text-lg text-white">GURI Insights</h3>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{data.analysis}</p>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
          <p className="text-sm text-emerald-100">{data.suggestion}</p>
        </div>
      </div>
      
      <Link href={data.action_link} className="mt-6 flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
        {data.action_text}
      </Link>
    </div>
  );
}

function SkillsProgress({ skills }: { skills: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-lg text-white">Skill Progress</h3>
      </div>
      
      <div className="space-y-5">
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-200">{skill.name}</span>
              <span className="text-emerald-400 font-medium">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticePerformance({ data }: { data: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <PenTool size={20} className="text-emerald-500" />
        <h3 className="font-medium text-lg text-white">Practice Performance</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-semibold text-white mb-1">{data.questions_attempted}</span>
          <span className="text-xs text-gray-400">Questions Attempted</span>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-semibold text-emerald-400 mb-1">{data.accuracy}%</span>
          <span className="text-xs text-gray-400">Accuracy</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
          <span className="text-gray-400">Strongest</span>
          <span className="text-emerald-400 font-medium text-right">{data.strongest_topic}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
          <span className="text-gray-400">Weakest</span>
          <span className="text-red-400 font-medium text-right">{data.weakest_topic}</span>
        </div>
      </div>
      
      <Link href="/dashboard/practice" className="flex items-center justify-center w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
        Practice Now
      </Link>
    </div>
  );
}

function ProjectProgress({ projects }: { projects: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Code size={20} className="text-emerald-500" />
        <h3 className="font-medium text-lg text-white">Project Progress</h3>
      </div>
      
      <div className="flex-1 space-y-4">
        {projects.map((project, idx) => (
          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-medium text-white">{project.title}</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${project.percentage === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {project.status}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span>{project.stage}</span>
              <span>{project.percentage}%</span>
            </div>
            <Progress value={project.percentage} className="h-1.5" />
          </div>
        ))}
      </div>
      
      <Link href="/dashboard/projects" className="mt-6 flex items-center justify-center w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
        Continue Project
      </Link>
    </div>
  );
}

function LearningActivity({ data }: { data: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-emerald-500" />
          <h3 className="font-medium text-lg text-white">Learning Activity</h3>
        </div>
        <span className="text-xs text-gray-500">{data.summary}</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-semibold text-white">{data.concepts_learned}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><BookOpen size={12} /> Concepts</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-semibold text-white">{data.practice_completed}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><PenTool size={12} /> Practice Qs</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-semibold text-white">{data.projects_worked}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Code size={12} /> Projects</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-semibold text-white">{data.ai_sessions}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><BrainCircuit size={12} /> AI Sessions</span>
        </div>
      </div>
    </div>
  );
}

function GoalsAndAchievements({ goals, achievements }: { goals: any, achievements: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row gap-8">
      {/* Goals */}
      <div className="flex-1 lg:border-r lg:border-white/10 lg:pr-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target size={20} className="text-emerald-500" />
            <h3 className="font-medium text-lg text-white">My Goals</h3>
          </div>
          <button className="text-xs text-emerald-400 hover:text-emerald-300">Edit Goal</button>
        </div>
        
        <div className="flex items-end justify-between mb-2">
          <p className="text-sm text-gray-400">{goals.type} Goal: <span className="text-white font-medium">{goals.target_hours} hours</span></p>
          <span className="text-lg font-semibold text-white">{goals.current_hours} <span className="text-sm text-gray-500 font-normal">/ {goals.target_hours}h</span></span>
        </div>
        <Progress value={(goals.current_hours / goals.target_hours) * 100} className="h-2 mb-4" />
        <p className="text-xs text-gray-500">Keep it up! You are on track to hit your weekly goal.</p>
      </div>

      {/* Achievements */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <Award size={20} className="text-emerald-500" />
          <h3 className="font-medium text-lg text-white">Recent Achievements</h3>
        </div>
        
        <div className="space-y-4">
          {achievements.slice(0, 3).map((ach, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                <Star size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{ach.title}</p>
                <p className="text-xs text-gray-500">{new Date(ach.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Page Content component
async function ProgressContent({ session }: { session: any }) {
  let data = null;
  try {
    data = await fetchProgress(session?.backendToken as string);
  } catch (e) {
    console.error("Progress API failed", e);
  }

  if (!data) {
    return (
      <div className="p-8 border border-red-900/50 bg-red-950/20 rounded-xl text-red-200">
        Failed to load progress data. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverallProgress data={data.overall} />
        </div>
        <div className="lg:col-span-1">
           <AIInsightsCard data={data.insights} />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RoadmapProgressCard data={data.roadmap} />
        <SkillsProgress skills={data.skills} />
        <PracticePerformance data={data.practice} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProjectProgress projects={data.projects} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <LearningActivity data={data.activity} />
          <GoalsAndAchievements goals={data.goals} achievements={data.achievements} />
        </div>
      </div>

    </div>
  );
}

export default async function ProgressDashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Progress</h1>
          <p className="text-gray-400">Track your learning journey, skills, and overall performance.</p>
        </div>

        <Suspense fallback={
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-2 h-40 w-full bg-white/5 rounded-2xl" />
              <Skeleton className="lg:col-span-1 h-40 w-full bg-white/5 rounded-2xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
              <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
              <Skeleton className="h-64 w-full bg-white/5 rounded-2xl" />
            </div>
          </div>
        }>
          <ProgressContent session={session} />
        </Suspense>

      </div>
    </div>
  );
}
