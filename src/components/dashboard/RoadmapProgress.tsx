import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RoadmapProgress({ roadmap }: { roadmap?: any }) {
  if (!roadmap) return null;
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Your Roadmap</h2>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6">
        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">{roadmap.title}</div>
        
        <div className="mt-4 flex items-center gap-4">
          <span className="text-neutral-300">Overall Progress</span>
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{width: `\${roadmap.progress}%`}}></div>
          </div>
          <span className="text-white">{roadmap.progress}%</span>
        </div>

        <button className="w-full mt-6 py-2.5 rounded-lg border border-neutral-800 text-sm font-semibold text-neutral-300 hover:bg-neutral-900 transition-colors">
          View Full Roadmap →
        </button>
      </div>
    </section>
  );
}
