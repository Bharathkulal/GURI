import { Target } from 'lucide-react';

export default function WelcomeHeader({ name, goal, progress }: { name: string, goal: string, progress: number }) {
  return (
    <div className="bg-neutral-950 rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Good morning, {name} 👋</h1>
        <p className="text-neutral-400">Let's continue building your career.</p>
      </div>

      <div className="w-full md:w-auto bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center gap-4">
        <div className="w-12 h-12 bg-neutral-950 rounded-lg shadow-sm border border-neutral-800 flex items-center justify-center flex-shrink-0">
          <Target className="text-emerald-500" size={24} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-1.5">
            <div>
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide mb-0.5">Your GURI</p>
              <p className="text-white font-bold leading-tight">{goal}</p>
            </div>
            <span className="text-sm font-semibold text-white">{progress}%</span>
          </div>
          <div className="w-48 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `\${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
