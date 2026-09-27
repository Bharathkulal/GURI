export default function CareerReadiness() {
  const readiness = [
    { label: 'Skills Mastery', value: 72 },
    { label: 'Portfolio Projects', value: 40 },
    { label: 'Resume Strength', value: 80 },
    { label: 'Interview Prep', value: 25 },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Career Readiness</h2>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6">
        <div className="space-y-4">
          {readiness.map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">{item.label}</span>
              <div className="flex items-center gap-3 w-1/2">
                <div className="flex-1 h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-500 rounded-full" style={{ width: `${item.value}%` }}></div>
                </div>
                <span className="text-xs font-bold text-white w-8 text-right">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}