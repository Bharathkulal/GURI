export default function RecommendationsSection({ recommendations }: { recommendations: any[] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-6 border border-white/5 rounded-2xl bg-[#121212] text-center">
        <p className="text-gray-400">No recommendations at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div key={index} className="p-5 border border-white/5 rounded-2xl bg-[#121212] hover:border-emerald-900/30 transition-all flex justify-between items-center group">
          <div>
            <h4 className="font-medium text-white">{rec.title}</h4>
            <div className="text-sm text-gray-400 mt-1 flex items-center space-x-2">
              <span>{rec.type}</span>
              <span>&middot;</span>
              <span>{rec.difficulty || 'All levels'}</span>
              <span>&middot;</span>
              <span>{rec.estimated_time || '10 min'}</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60 rounded-lg text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
            Start &rarr;
          </button>
        </div>
      ))}
    </div>
  );
}
