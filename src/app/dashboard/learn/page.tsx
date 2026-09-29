"use client";

import { useEffect, useState } from "react";
import { fetchTopics, fetchContinueLearning } from "@/services/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function LearnPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [continueTopic, setContinueTopic] = useState<any>(null);
  
  const categories = ["All", "Programming", "AI / ML", "Data", "Web Development", "Database", "Computer Science", "Tools", "Career"];

  useEffect(() => {
    loadTopics();
    loadContinueLearning();
  }, []);

  const loadContinueLearning = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const data = await fetchContinueLearning(token);
      setContinueTopic(data);
    } catch (err) {
      console.error("Failed to load continue learning", err);
    }
  };

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await fetchTopics();
      setTopics(data);
      setFilteredTopics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = topics;
    if (category !== "All") {
      result = result.filter(t => t.category === category);
    }
    if (search) {
      result = result.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredTopics(result);
  }, [search, category, topics]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">LEARN</h1>
        <p className="text-zinc-400 text-lg">Explore concepts, skills and technologies.</p>
      </div>
      
      {continueTopic && continueTopic.topic && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-zinc-900 to-zinc-800/50 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
            <Play className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="text-sm text-green-500 font-bold tracking-wider uppercase mb-2">Continue Learning</div>
            <h2 className="text-2xl font-bold mb-4">{continueTopic.topic.name}</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 max-w-md h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.round((continueTopic.progress.completed_lessons / (continueTopic.progress.total_lessons || 1)) * 100)}%` }}
                />
              </div>
              <div className="text-sm font-medium text-zinc-400">
                {Math.round((continueTopic.progress.completed_lessons / (continueTopic.progress.total_lessons || 1)) * 100)}% complete
              </div>
            </div>
            <Link href={`/dashboard/learn/${continueTopic.topic.id}`}>
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors inline-flex items-center gap-2">
                Continue <span className="text-lg leading-none">&rarr;</span>
              </button>
            </Link>
          </div>
        </motion.div>
      )}

      <div className="relative">
        <input 
          type="text" 
          placeholder="Search concepts, skills or topics..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full whitespace-nowrap border text-sm transition-all ${
              category === c 
                ? "bg-green-500/10 border-green-500 text-green-500" 
                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500">Loading topics...</div>
      ) : filteredTopics.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-zinc-800/50 rounded-2xl">
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={topic.id}
            >
              <Link href={`/dashboard/learn/${topic.id}`}>
                <div className="group border border-zinc-800 bg-zinc-900/50 p-6 rounded-2xl hover:border-green-500/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                  <div className="text-xs text-green-500 mb-3 font-mono tracking-wider uppercase">{topic.category}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{topic.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6 flex-grow">{topic.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex gap-3">
                      <span>{topic.difficulty}</span>
                      <span>•</span>
                      <span>{topic.estimated_time}</span>
                    </div>
                    <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
