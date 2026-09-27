import { Sparkles } from 'lucide-react';

export default function AICoachCard() {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        Your AI Learning Coach
        <Sparkles size={16} className="text-emerald-400" />
      </h2>
      
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]"></div>
        
        <div className="relative z-10">
          <p className="text-neutral-400 text-sm mb-4">
            You completed 3 Machine Learning lessons this week. Excellent pace!
          </p>
          
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/5 mb-6">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">Next Recommended Step</div>
            <h3 className="text-lg font-bold text-white mb-2">Decision Trees</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              You have mastered the fundamentals of supervised learning and are fully prepared for tree-based models.
            </p>
          </div>

          <button className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center shadow-lg">
            Ask AI Coach <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}