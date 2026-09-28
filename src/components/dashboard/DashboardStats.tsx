export default function DashboardStats({ stats }: { stats: any }) {
  if (!stats) return null;

  const statItems = [
    { label: "Skills", value: stats.skills || 0 },
    { label: "Overall Progress", value: `${stats.overall_progress || 0}%` },
    { label: "Practice", value: stats.practice || 0 },
    { label: "Streak", value: `${stats.streak || 0} days` },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="p-4 border border-white/5 rounded-xl bg-[#121212] hover:bg-[#161616] transition-colors">
          <div className="text-2xl font-semibold text-white">{item.value}</div>
          <div className="text-sm text-gray-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
