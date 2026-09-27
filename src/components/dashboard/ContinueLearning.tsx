import { Play } from 'lucide-react';

export default function ContinueLearning() {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Continue Learning</h2>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6 group hover:border-emerald-500/50 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="text-sm font-medium text-emerald-400 mb-2">Machine Learning</div>
            <h3 className="text-xl font-bold text-white mb-2">Linear Regression</h3>
            <p className="text-neutral-400 text-sm max-w-lg mb-6">
              Understand how machines learn relationships between data points and make continuous predictions.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                <span className="text-neutral-300">Progress</span>
                <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[72%]"></div>
                </div>
                <span className="text-white">72%</span>
              </div>
              <div className="text-neutral-600">•</div>
              <div className="text-neutral-400">45 min remaining</div>
            </div>
          </div>
          
          <button className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
            Continue <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>
    </section>
  );
}