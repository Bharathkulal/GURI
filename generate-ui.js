const fs = require('fs');
const path = require('path');

const files = {
  'src/components/layout/Sidebar.tsx': `import Link from 'next/link';
import Image from 'next/image';
import { Home, Map, BookOpen, PenTool, Code, BrainCircuit, Target, Briefcase, Settings, HelpCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard', active: true },
  { name: 'My Roadmap', icon: Map, href: '/dashboard/roadmap' },
  { name: 'Learn', icon: BookOpen, href: '/dashboard/learn' },
  { name: 'Practice', icon: PenTool, href: '/dashboard/practice' },
  { name: 'Projects', icon: Code, href: '/dashboard/projects' },
  { name: 'AI Coach', icon: BrainCircuit, href: '/dashboard/coach' },
  { name: 'Progress', icon: Target, href: '/dashboard/progress' },
  { name: 'Career', icon: Briefcase, href: '/dashboard/career' },
];

const bottomItems = [
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help', icon: HelpCircle, href: '/help' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-neutral-200 z-50 overflow-y-auto">
      <div className="p-6 flex items-center gap-2">
        <Image src="/logo.png" alt="GURI" width={28} height={28} className="rounded" />
        <span className="font-bold text-xl tracking-tight text-neutral-900">GURI</span>
      </div>
      
      <div className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            item.active ? "bg-emerald-50 text-emerald-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          )}>
            <item.icon size={18} className={item.active ? "text-emerald-600" : "text-neutral-500"} />
            {item.name}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-neutral-100 space-y-1">
        {bottomItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
            <item.icon size={18} className="text-neutral-500" />
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}`,
  'src/components/layout/TopNavbar.tsx': `import { Bell, Search } from 'lucide-react';
import Image from 'next/image';

export default function TopNavbar({ user }: { user: any }) {
  const firstName = user?.name?.split(' ')[0] || 'Student';
  const avatarUrl = user?.image || 'https://api.dicebear.com/7.x/notionists/svg?seed=' + firstName;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 h-16 flex items-center justify-between px-4 sm:px-8">
      <div className="flex-1 max-w-xl relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input 
          type="text" 
          placeholder="Search concepts, skills or projects..." 
          className="w-full bg-neutral-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-neutral-500 text-neutral-900"
        />
      </div>
      
      <div className="flex items-center justify-end flex-1 sm:flex-none gap-4 sm:gap-6 ml-auto">
        <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-6 sm:border-l border-neutral-200 cursor-pointer">
          <span className="text-sm font-medium text-neutral-700 hidden sm:block">{firstName}</span>
          <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden ring-2 ring-transparent hover:ring-emerald-100 transition-all">
            <Image src={avatarUrl} alt={firstName} width={36} height={36} className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}`,
  'src/components/layout/MobileNavigation.tsx': `import Link from 'next/link';
import { Home, Map, BookOpen, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard', active: true },
  { name: 'Roadmap', icon: Map, href: '/dashboard/roadmap' },
  { name: 'Learn', icon: BookOpen, href: '/dashboard/learn' },
  { name: 'AI', icon: BrainCircuit, href: '/dashboard/coach' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export default function MobileNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 pb-safe z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
            <item.icon size={22} className={cn(item.active ? "text-emerald-600" : "text-neutral-400")} />
            <span className={cn("text-[10px] font-medium", item.active ? "text-emerald-700" : "text-neutral-500")}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
  'src/components/dashboard/WelcomeHeader.tsx': `import { Target } from 'lucide-react';

export default function WelcomeHeader({ name, goal, progress }: { name: string, goal: string, progress: number }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Good morning, {name} 👋</h1>
        <p className="text-neutral-500">Let's continue building your career.</p>
      </div>

      <div className="w-full md:w-auto bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-neutral-200 flex items-center justify-center flex-shrink-0">
          <Target className="text-emerald-600" size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-1.5">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">Your GURI</p>
              <p className="text-neutral-900 font-bold leading-tight">{goal}</p>
            </div>
            <span className="text-sm font-semibold text-neutral-900">{progress}%</span>
          </div>
          <div className="w-48 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: \`\${progress}%\` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  'src/components/dashboard/ContinueLearning.tsx': `import { Play } from 'lucide-react';

export default function ContinueLearning() {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Continue Learning</h2>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 group hover:border-emerald-200 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="text-sm font-medium text-emerald-600 mb-2">Machine Learning</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Linear Regression</h3>
            <p className="text-neutral-500 text-sm max-w-lg mb-6">
              Understand how machines learn relationships between data points and make continuous predictions.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                <span className="text-neutral-700">Progress</span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[72%]"></div>
                </div>
                <span className="text-neutral-900">72%</span>
              </div>
              <div className="text-neutral-400">•</div>
              <div className="text-neutral-500">45 min remaining</div>
            </div>
          </div>
          
          <button className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group-hover:bg-emerald-600">
            Continue <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>
    </section>
  );
}`,
  'src/components/dashboard/TodayPlan.tsx': `import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const planItems = [
  { title: 'Review Python fundamentals', duration: '20 min', status: 'done' },
  { title: 'Learn Linear Regression', duration: '45 min', status: 'current' },
  { title: 'Complete ML practice quiz', duration: '15 min', status: 'pending' },
  { title: 'Build mini prediction model', duration: '60 min', status: 'pending' },
];

export default function TodayPlan() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">Today's Learning Plan</h2>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Generated by AI</span>
      </div>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {planItems.map((item, index) => (
          <div key={index} className={cn(
            "flex items-center justify-between p-4 sm:p-5 transition-colors",
            index !== planItems.length - 1 && "border-b border-neutral-100",
            item.status === 'current' ? "bg-emerald-50/30" : "hover:bg-neutral-50"
          )}>
            <div className="flex items-center gap-3 sm:gap-4">
              {item.status === 'done' && <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />}
              {item.status === 'current' && <PlayCircle className="text-emerald-600 flex-shrink-0" size={20} />}
              {item.status === 'pending' && <Circle className="text-neutral-300 flex-shrink-0" size={20} />}
              
              <span className={cn(
                "text-sm sm:text-base font-medium",
                item.status === 'done' ? "text-neutral-400 line-through decoration-neutral-300" : 
                item.status === 'current' ? "text-emerald-900" : "text-neutral-700"
              )}>
                {item.title}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs sm:text-sm font-medium text-neutral-500">{item.duration}</span>
              {item.status === 'current' && (
                <button className="hidden sm:block text-xs font-semibold text-white bg-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">
                  Start
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}`,
  'src/components/dashboard/RoadmapProgress.tsx': `import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const roadmapNodes = [
  { name: 'Python', status: 'done' },
  { name: 'Git & GitHub', status: 'done' },
  { name: 'SQL', status: 'done' },
  { name: 'Mathematics', status: 'done' },
  { name: 'Machine Learning', status: 'current' },
  { name: 'Deep Learning', status: 'pending' },
  { name: 'Transformers', status: 'pending' },
  { name: 'LLM Engineering', status: 'pending' },
];

export default function RoadmapProgress() {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Your Roadmap</h2>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">AI Engineer</div>
        <div className="mb-6 text-sm text-neutral-500">Next milestone: Deep Learning</div>
        
        <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-neutral-100">
          {roadmapNodes.slice(0, 6).map((node) => (
            <div key={node.name} className="flex items-center relative z-10">
              <div className="bg-white rounded-full flex-shrink-0">
                {node.status === 'done' && <CheckCircle2 className="text-emerald-500 bg-white" size={24} />}
                {node.status === 'current' && (
                  <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full ring-4 ring-emerald-100"></div>
                  </div>
                )}
                {node.status === 'pending' && <Circle className="text-neutral-300 bg-white" size={24} />}
              </div>
              <span className={cn(
                "ml-4 text-sm font-medium",
                node.status === 'done' ? "text-neutral-500" : 
                node.status === 'current' ? "text-neutral-900 font-bold" : "text-neutral-600"
              )}>
                {node.name}
              </span>
            </div>
          ))}
          <div className="pl-10 text-xs font-medium text-neutral-400">+ 4 more modules</div>
        </div>

        <button className="w-full mt-6 py-2.5 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
          View Full Roadmap →
        </button>
      </div>
    </section>
  );
}`,
  'src/components/dashboard/AICoachCard.tsx': `import { Sparkles } from 'lucide-react';

export default function AICoachCard() {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
        Your AI Learning Coach
        <Sparkles size={16} className="text-emerald-500" />
      </h2>
      
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-800 shadow-xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]"></div>
        
        <div className="relative z-10">
          <p className="text-neutral-300 text-sm mb-4">
            You completed 3 Machine Learning lessons this week. Excellent pace!
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-6">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">Next Recommended Step</div>
            <h3 className="text-lg font-bold text-white mb-2">Decision Trees</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              You have mastered the fundamentals of supervised learning and are fully prepared for tree-based models.
            </p>
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center shadow-lg">
            Ask AI Coach <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}`,
  'src/components/dashboard/SkillProgress.tsx': `const skills = [
  { name: 'Python', progress: 90 },
  { name: 'Git & GitHub', progress: 85 },
  { name: 'SQL', progress: 70 },
  { name: 'Machine Learning', progress: 52 },
];

export default function SkillProgress() {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Your Skills</h2>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-5">
        {skills.map(skill => (
          <div key={skill.name}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-neutral-800">{skill.name}</span>
              <span className="text-xs font-bold text-neutral-500">{skill.progress}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-neutral-900 rounded-full" style={{ width: \`\${skill.progress}%\` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}`,
  'src/components/dashboard/ProjectCard.tsx': `import { Code2, ArrowRight } from 'lucide-react';

export default function ProjectCard() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">Build Something</h2>
        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">View All</button>
      </div>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 group cursor-pointer hover:border-neutral-300 transition-colors">
        <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
          <Code2 className="text-neutral-700" size={20} />
        </div>
        
        <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase tracking-wide">AI Engineer Track</div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">House Price Prediction</h3>
        
        <p className="text-sm text-neutral-500 mb-4">
          Apply your regression knowledge to build a model that predicts housing prices based on features like area and location.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {['Python', 'Pandas', 'Scikit-learn', 'Regression'].map(tag => (
            <span key={tag} className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-xs font-medium text-neutral-600">Intermediate</span>
          </div>
          <button className="text-sm font-bold text-neutral-900 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
            Start Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}`,
  'src/components/dashboard/CareerReadiness.tsx': `export default function CareerReadiness() {
  const readiness = [
    { label: 'Skills Mastery', value: 72 },
    { label: 'Portfolio Projects', value: 40 },
    { label: 'Resume Strength', value: 80 },
    { label: 'Interview Prep', value: 25 },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Career Readiness</h2>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
        <div className="space-y-4">
          {readiness.map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">{item.label}</span>
              <div className="flex items-center gap-3 w-1/2">
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-400 rounded-full" style={{ width: \`\${item.value}%\` }}></div>
                </div>
                <span className="text-xs font-bold text-neutral-900 w-8 text-right">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join('d:/GURI', filepath), content);
}

console.log('All components generated successfully.');
