"use client";

import { useEffect, useState } from "react";
import { fetchTopicLessons, completeLesson } from "@/services/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function LessonPage() {
  const { topicId, lessonId } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [topicId, lessonId]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || ""; 
      const lData = await fetchTopicLessons(topicId as string, token);
      setLessons(lData);
      const current = lData.find((l: any) => l.id === lessonId);
      setLesson(current);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setCompleting(true);
      const token = localStorage.getItem("token") || ""; 
      await completeLesson(lessonId as string, token);
      
      // Find next lesson
      const currentIndex = lessons.findIndex(l => l.id === lessonId);
      const nextLesson = lessons[currentIndex + 1];
      
      if (nextLesson) {
        router.push(`/dashboard/learn/${topicId}/lessons/${nextLesson.id}`);
      } else {
        router.push(`/dashboard/learn/${topicId}`);
      }
    } catch (err) {
      console.error(err);
      setCompleting(false);
    }
  };

  if (loading) return <div className="p-8 max-w-3xl mx-auto text-zinc-500">Loading lesson...</div>;
  if (!lesson) return <div className="p-8 max-w-3xl mx-auto text-red-500">Lesson not found.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href={`/dashboard/learn/${topicId}`} className="text-zinc-500 hover:text-zinc-300 text-sm mb-8 inline-block">&larr; Back to Topic</Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="border-b border-zinc-800 pb-8">
          <div className="text-sm text-green-500 font-mono mb-2">LESSON {String(lesson.order).padStart(2, '0')}</div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>{lesson.estimated_minutes} min read</span>
            {lesson.status === "completed" && (
              <span className="flex items-center gap-1 text-green-500"><CheckCircle2 className="w-4 h-4" /> Completed</span>
            )}
          </div>
        </div>

        <div className="prose prose-invert prose-green max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </div>

        <div className="pt-12 border-t border-zinc-800 flex justify-end">
          <button 
            onClick={handleComplete}
            disabled={completing}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all ${
              lesson.status === "completed"
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : "bg-green-500 text-black hover:bg-green-400"
            }`}
          >
            {completing ? "Saving..." : lesson.status === "completed" ? "Continue to Next" : "Mark as Complete"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
