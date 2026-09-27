import { Code2, ArrowRight } from 'lucide-react';

export default function ProjectCard() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Build Something</h2>
        <button className="text-sm font-medium text-neutral-500 hover:text-neutral-300 transition-colors">View All</button>
      </div>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6 group cursor-pointer hover:border-neutral-700 transition-colors">
        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
          <Code2 className="text-neutral-400" size={20} />
        </div>
        
        <div className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wide">AI Engineer Track</div>
        <h3 className="text-lg font-bold text-white mb-2">House Price Prediction</h3>
        
        <p className="text-sm text-neutral-400 mb-4">
          Apply your regression knowledge to build a model that predicts housing prices based on features like area and location.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {['Python', 'Pandas', 'Scikit-learn', 'Regression'].map(tag => (
            <span key={tag} className="text-[11px] font-medium text-neutral-400 bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs font-medium text-neutral-400">Intermediate</span>
          </div>
          <button className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
            Start Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}