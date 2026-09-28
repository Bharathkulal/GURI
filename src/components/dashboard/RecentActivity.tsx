export default function RecentActivity({ activities }: { activities: any[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 border border-white/5 rounded-2xl bg-[#121212] text-center">
        <p className="text-gray-400 text-sm">No activity yet. Your learning activity will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
      {activities.map((activity, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-[#121212] text-emerald-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            {activity.type === 'completed' ? '✓' : '→'}
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-[#121212] shadow">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-medium text-white">{activity.title}</div>
              <time className="text-xs text-gray-500">{activity.time_ago}</time>
            </div>
            <div className="text-sm text-gray-400">{activity.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
