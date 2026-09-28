import { Code2, ArrowRight } from 'lucide-react';

export default function ProjectCard({ projects }: { projects?: any[] }) {
  if (!projects || projects.length === 0) return null;
  const project = projects[0];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Build Something</h2>
      </div>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6 group cursor-pointer hover:border-neutral-700 transition-colors">
        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
          <Code2 className="text-neutral-400" size={20} />
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
        
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-400">Difficulty: {project.difficulty}</span>
          </div>
          <button className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
            Start Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
