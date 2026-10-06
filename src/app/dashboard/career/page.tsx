import { Suspense } from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { fetchCareer } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Target, Map, BarChart3, Code, FileText, CheckCircle, ChevronRight, XCircle, AlertCircle, BrainCircuit } from 'lucide-react';

export const metadata = {
  title: 'Career | GURI',
  description: 'Build your path from learning to your career.',
};

function CareerGoal({ goal }: { goal: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-emerald-500" size={20} />
          <h2 className="font-medium text-lg text-white">My Career Goal</h2>
        </div>
        <button className="text-xs text-emerald-400 hover:text-emerald-300">Change Career</button>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{goal.target_role}</h3>
      <p className="text-sm text-gray-400 mb-4">{goal.description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {goal.required_skills.map((skill: string, idx: number) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase">Recommended Skills</h4>
          <div className="flex flex-wrap gap-2">
            {goal.recommended_skills.map((skill: string, idx: number) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerReadiness({ readiness }: { readiness: any }) {
  const getReadinessColor = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Career Readiness</h2>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <span className="text-3xl font-bold text-white">{readiness.overall}%</span>
        <span className="text-sm text-emerald-400">On Track</span>
      </div>
      <Progress value={readiness.overall} className="h-2 mb-8" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Skills</p>
          <p className={`font-semibold ${getReadinessColor(readiness.breakdown.skills)}`}>{readiness.breakdown.skills}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Projects</p>
          <p className={`font-semibold ${getReadinessColor(readiness.breakdown.projects)}`}>{readiness.breakdown.projects}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Resume</p>
          <p className={`font-semibold ${getReadinessColor(readiness.breakdown.resume)}`}>{readiness.breakdown.resume}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Interview</p>
          <p className={`font-semibold ${getReadinessColor(readiness.breakdown.interview)}`}>{readiness.breakdown.interview}%</p>
        </div>
      </div>
    </div>
  );
}

function CareerRoadmap({ roadmap }: { roadmap: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Map className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Career Roadmap</h2>
      </div>
      <p className="text-sm text-gray-400 mb-4">{roadmap.title}</p>
      
      <div className="space-y-4 flex-1">
        {roadmap.items.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            {item.status === 'completed' && <CheckCircle size={18} className="text-emerald-500" />}
            {item.status === 'current' && <ChevronRight size={18} className="text-emerald-400" />}
            {item.status === 'pending' && <div className="w-[18px] h-[18px] border-2 border-gray-600 rounded-full" />}
            <span className={`text-sm ${item.status === 'pending' ? 'text-gray-500' : 'text-gray-200'}`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
      
      <Link href="/dashboard/roadmap" className="mt-6 flex items-center justify-center w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">
        Continue Learning
      </Link>
    </div>
  );
}

function SkillGap({ skillGap }: { skillGap: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Skill Gap Analysis</h2>
      </div>
      
      <div className="space-y-3">
        {skillGap.map((skill: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div>
              <p className="text-sm font-medium text-white mb-1">{skill.name}</p>
              <div className="flex items-center gap-2">
                {skill.status === 'Strong' && <span className="text-xs text-emerald-400">Strong</span>}
                {skill.status === 'Good' && <span className="text-xs text-blue-400">Good</span>}
                {skill.status === 'Needs Practice' && <span className="text-xs text-yellow-400">Needs Practice</span>}
                {skill.status === 'Missing' && <span className="text-xs text-red-400">Missing</span>}
              </div>
            </div>
            
            {skill.action === 'Learn' && (
              <Link href="/dashboard/learn" className="px-4 py-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 rounded-lg text-xs font-medium transition-colors">
                Learn
              </Link>
            )}
            {skill.action === 'Practice' && (
              <Link href="/dashboard/practice" className="px-4 py-1.5 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 rounded-lg text-xs font-medium transition-colors">
                Practice
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerInsight({ insight }: { insight: any }) {
  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[50px] -mr-10 -mt-10 rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="text-emerald-400" size={20} />
        <h2 className="font-medium text-lg text-white">GURI Career Insight</h2>
      </div>
      
      <p className="text-sm text-gray-300 leading-relaxed mb-6">{insight.message}</p>
      
      <div className="flex flex-wrap gap-3">
        {insight.actions.map((action: any, idx: number) => (
          <Link key={idx} href={action.href} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ResumeSection({ resume }: { resume: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Resume Readiness</h2>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status</span>
          <span className="text-white">{resume.status}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completeness</span>
            <span className="text-emerald-400">{resume.completeness}%</span>
          </div>
          <Progress value={resume.completeness} className="h-1.5" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">ATS Readiness</span>
            <span className="text-emerald-400">{resume.ats_readiness}%</span>
          </div>
          <Progress value={resume.ats_readiness} className="h-1.5" />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">View Resume</button>
        <button className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">Improve</button>
      </div>
    </div>
  );
}

function InternshipsAndJobs({ opportunities }: { opportunities: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Internships & Jobs</h2>
      </div>
      
      {(!opportunities || opportunities.length === 0) ? (
        <div className="py-8 text-center border border-dashed border-white/10 rounded-xl">
          <p className="text-sm text-gray-500">No opportunities available right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map((job: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white mb-1">{job.title}</p>
                <p className="text-xs text-gray-400">{job.company} • {job.type}</p>
              </div>
              <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecommendedProjects({ projects }: { projects: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Code className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Recommended Projects</h2>
      </div>
      
      <div className="space-y-4">
        {projects.map((project: any, idx: number) => (
          <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-white">{project.title}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{project.difficulty}</span>
            </div>
            <div className="flex gap-2 mb-4">
              {project.skills.map((skill: string, sIdx: number) => (
                <span key={sIdx} className="text-[10px] text-gray-400">{skill}</span>
              ))}
            </div>
            <Link href={`/dashboard/projects/${project.id}`} className="block text-center py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-medium transition-colors border border-white/10">
              Start Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewPreparation({ prep }: { prep: any[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-emerald-500" size={20} />
        <h2 className="font-medium text-lg text-white">Interview Preparation</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {prep.map((item: any, idx: number) => (
          <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl text-center flex flex-col justify-center items-center h-20 hover:bg-white/10 cursor-pointer transition-colors">
            <span className="text-sm font-medium text-white">{item.label}</span>
          </div>
        ))}
      </div>
      
      <Link href="/dashboard/coach?mode=interview" className="flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
        Start Mock Interview
      </Link>
    </div>
  );
}

async function CareerContent({ session }: { session: any }) {
  let data = null;
  try {
    data = await fetchCareer(session?.backendToken as string);
  } catch (e) {
    console.error("Career API failed", e);
  }

  if (!data) {
    return (
      <div className="p-8 border border-red-900/50 bg-red-950/20 rounded-xl text-red-200">
        Failed to load career data. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CareerGoal goal={data.goal} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <CareerReadiness readiness={data.readiness} />
          <CareerInsight insight={data.insight} />
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CareerRoadmap roadmap={data.roadmap} />
        </div>
        <div className="lg:col-span-1">
          <SkillGap skillGap={data.skill_gap} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ResumeSection resume={data.resume} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecommendedProjects projects={data.recommended_projects} />
        </div>
        <div className="lg:col-span-1">
          <InternshipsAndJobs opportunities={data.opportunities} />
        </div>
        <div className="lg:col-span-1">
          <InterviewPreparation prep={data.interview_prep} />
        </div>
      </div>

    </div>
  );
}

export default async function CareerDashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Career</h1>
          <p className="text-gray-400">Build your path from learning to your career.</p>
        </div>

        <Suspense fallback={
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="lg:col-span-1 h-64 w-full bg-white/5 rounded-2xl" />
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-32 w-full bg-white/5 rounded-2xl" />
                <Skeleton className="h-32 w-full bg-white/5 rounded-2xl" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-80 w-full bg-white/5 rounded-2xl" />
              <Skeleton className="h-80 w-full bg-white/5 rounded-2xl" />
              <Skeleton className="h-80 w-full bg-white/5 rounded-2xl" />
            </div>
          </div>
        }>
          <CareerContent session={session} />
        </Suspense>

      </div>
    </div>
  );
}
