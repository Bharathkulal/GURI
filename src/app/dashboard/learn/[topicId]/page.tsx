"use client";

import { useEffect, useState } from "react";
import { fetchTopic, fetchTopicLessons, startTopic } from "@/services/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export default function TopicPage() {
  const { topicId } = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) loadData();
  }, [topicId, session]);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = (session?.backendToken as string) || ""; 
      const [tData, lData] = await Promise.all([
        fetchTopic(topicId as string, token),
        fetchTopicLessons(topicId as string, token)
      ]);
      setTopic(tData);
      setLessons(lData);
      
      if (tData.progress.status === "not_started") {
        await startTopic(topicId as string, token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 max-w-4xl mx-auto text-zinc-500">Loading topic...</div>;
  }

  if (!topic) {
    return <div className="p-8 max-w-4xl mx-auto text-red-500">Topic not found.</div>;
  }

  const completedCount = lessons.filter(l => l.status === "completed").length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <Link href="/dashboard/learn" className="text-zinc-500 hover:text-zinc-300 text-sm mb-6 inline-block">&larr; Back to Learn</Link>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-green-500 font-mono tracking-wider uppercase mb-2">{topic.category}</div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{topic.name}</h1>
            <p className="text-zinc-400 text-lg max-w-2xl">{topic.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{progressPercent}%</div>
            <div className="text-sm text-zinc-500">Completed</div>
          </div>
        </div>
        
        <div className="mt-8 flex gap-6 text-sm text-zinc-400 border-t border-zinc-800 pt-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> {topic.estimated_time}
          </div>
          <div>{lessons.length} lessons</div>
          <div>{topic.difficulty}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Lessons</h2>
        <div className="space-y-3">
          {lessons.map((lesson, idx) => (
            <Link key={lesson.id} href={`/dashboard/learn/${topicId}/lessons/${lesson.id}`}>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  lesson.status === "completed" 
                    ? "border-green-500/30 bg-green-500/5 hover:bg-green-500/10" 
                    : lesson.status === "in_progress"
                    ? "border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800"
                }`}
              >
                <div className="mr-4">
                  {lesson.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : lesson.status === "in_progress" ? (
                    <div className="w-6 h-6 rounded-full border-2 border-zinc-500 border-t-green-500 animate-spin" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-700" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="text-xs text-zinc-500 font-mono mb-1">
                    {String(lesson.order).padStart(2, '0')}
                  </div>
                  <h3 className={`font-medium ${lesson.status === "completed" ? "text-zinc-200" : "text-zinc-300"}`}>
                    {lesson.title}
                  </h3>
                </div>
                <div className="text-sm text-zinc-500">
                  {lesson.estimated_minutes} min
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
