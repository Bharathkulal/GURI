import { CheckCircle2, Circle } from 'lucide-react';
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
      <h2 className="text-lg font-bold text-white mb-4">Your Roadmap</h2>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6">
        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">AI Engineer</div>
        <div className="mb-6 text-sm text-neutral-400">Next milestone: Deep Learning</div>
        
        <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-neutral-800">
          {roadmapNodes.slice(0, 6).map((node) => (
            <div key={node.name} className="flex items-center relative z-10">
              <div className="bg-neutral-950 rounded-full flex-shrink-0">
                {node.status === 'done' && <CheckCircle2 className="text-emerald-500 bg-neutral-950" size={24} />}
                {node.status === 'current' && (
                  <div className="w-6 h-6 flex items-center justify-center bg-neutral-950 rounded-full">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-emerald-900"></div>
                  </div>
                )}
                {node.status === 'pending' && <Circle className="text-neutral-700 bg-neutral-950" size={24} />}
              </div>
              <span className={cn(
                "ml-4 text-sm font-medium",
                node.status === 'done' ? "text-neutral-500" : 
                node.status === 'current' ? "text-white font-bold" : "text-neutral-400"
              )}>
                {node.name}
              </span>
            </div>
          ))}
          <div className="pl-10 text-xs font-medium text-neutral-600">+ 4 more modules</div>
        </div>

        <button className="w-full mt-6 py-2.5 rounded-lg border border-neutral-800 text-sm font-semibold text-neutral-300 hover:bg-neutral-900 transition-colors">
          View Full Roadmap →
        </button>
      </div>
    </section>
  );
}