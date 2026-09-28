export default function SkillProgress({ skills }: { skills?: any[] }) {
  const skillsList = skills || [];
  if (skillsList.length === 0) return null;
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Your Skills</h2>
      
      <div className="bg-neutral-950 rounded-2xl border border-neutral-800 shadow-sm p-6 space-y-5">
        {skillsList.map(skill => (
          <div key={skill.name}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-neutral-300">{skill.name}</span>
              <span className="text-xs font-bold text-neutral-500">{skill.progress}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `\${skill.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
