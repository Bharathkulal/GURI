"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, CheckCircle2, Bookmark, FolderOpen, ArrowRight, Clock, Star, Brain, Code, Terminal, ChevronRight, X } from 'lucide-react';
import { fetchProjects, fetchRecommendedProjects, fetchMyProjects, toggleSaveProject, startProject } from '@/services/api';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimated_hours: string;
  skills: string[];
  concepts: string[];
  steps: number;
  icon: string;
};

type UserProject = {
  project_id: string;
  status: string;
  progress: number;
  current_step: number;
  total_steps: number;
  saved: boolean;
};

export default function ProjectsFlow({ token }: { token: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recommended, setRecommended] = useState<Project[]>([]);
  const [myProjects, setMyProjects] = useState<Record<string, UserProject>>({});
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'discover' | 'my_projects'>('discover');
  const [myProjectsTab, setMyProjectsTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Python', 'Web Development', 'AI / ML', 'Data Science', 'Java', 'DBMS'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    loadData();
  }, [categoryFilter, difficultyFilter]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadProjects();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recData, myData] = await Promise.all([
        fetchRecommendedProjects(token),
        fetchMyProjects(token)
      ]);
      setRecommended(recData);
      const myProjectsMap = myData.reduce((acc: any, p: UserProject) => {
        acc[p.project_id] = p;
        return acc;
      }, {});
      setMyProjects(myProjectsMap);
      await loadProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const data = await fetchProjects({
        category: categoryFilter,
        difficulty: difficultyFilter,
        q: searchQuery
      }, token);
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToggle = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    const isSaved = myProjects[projectId]?.saved || false;
    try {
      await toggleSaveProject(projectId, !isSaved, token);
      setMyProjects(prev => ({
        ...prev,
        [projectId]: { ...prev[projectId], saved: !isSaved }
      }));
    } catch (err) {
      console.error("Failed to save project", err);
    }
  };

  const handleStartProject = async (projectId: string) => {
    try {
      const res = await startProject(projectId, token);
      setMyProjects(prev => ({
        ...prev,
        [projectId]: res.data
      }));
      setSelectedProject(null); // Go back or go to a real project view
    } catch (err) {
      console.error("Failed to start project", err);
    }
  };

  const renderProjectCard = (p: Project, hideAction = false) => {
    const myP = myProjects[p.id];
    const isSaved = myP?.saved;
    const isStarted = myP?.status === 'IN_PROGRESS';
    const isCompleted = myP?.status === 'COMPLETED';

    return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        key={p.id} 
        onClick={() => setSelectedProject(p)}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all cursor-pointer group flex flex-col h-full"
      >
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800 text-lg">
                {p.icon || <Code size={18} />}
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-medium">{p.category}</div>
                <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors">{p.title}</h3>
              </div>
            </div>
            <button 
              onClick={(e) => handleSaveToggle(e, p.id)}
              className={`p-2 rounded-lg transition-colors ${isSaved ? 'text-emerald-400 bg-emerald-500/10' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}
            >
              <Bookmark size={18} className={isSaved ? "fill-emerald-400" : ""} />
            </button>
          </div>
          
          <p className="text-sm text-neutral-400 mb-4 line-clamp-2 flex-1">{p.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-neutral-300">
              {p.difficulty}
            </span>
            <span className="text-xs px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-neutral-300 flex items-center gap-1">
              <Clock size={12} /> {p.estimated_hours}
            </span>
          </div>

          {!hideAction && (
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between mt-auto">
              {isStarted ? (
                <div className="flex-1 mr-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-400">In Progress</span>
                    <span className="text-neutral-400">{myP.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${myP.progress}%` }}></div>
                  </div>
                </div>
              ) : isCompleted ? (
                <span className="text-sm text-blue-400 flex items-center gap-1"><CheckCircle2 size={16} /> Completed</span>
              ) : (
                <span className="text-sm text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">View Project <ChevronRight size={16} /></span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const inProgressProjects = projects.filter(p => myProjects[p.id]?.status === 'IN_PROGRESS');
  const activeProject = inProgressProjects[0]; // Just take first for "Continue Building"

  if (selectedProject) {
    const p = selectedProject;
    const myP = myProjects[p.id];
    const isSaved = myP?.saved;
    const isStarted = myP?.status === 'IN_PROGRESS';
    const isCompleted = myP?.status === 'COMPLETED';

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto pb-10">
        <button onClick={() => setSelectedProject(null)} className="text-neutral-400 hover:text-white mb-6 flex items-center gap-2 text-sm">
          <ArrowRight size={16} className="rotate-180" /> Back to Projects
        </button>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-neutral-800">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center border border-neutral-800 text-3xl">
                  {p.icon}
                </div>
                <div>
                  <div className="text-emerald-400 font-medium mb-1">{p.category}</div>
                  <h2 className="text-2xl font-serif text-white">{p.title}</h2>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
              <span className="flex items-center gap-1"><Terminal size={16} /> {p.difficulty}</span>
              <span className="flex items-center gap-1"><Clock size={16} /> {p.estimated_hours}</span>
              <span className="flex items-center gap-1"><FolderOpen size={16} /> {p.steps} Steps</span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <section>
              <h3 className="text-lg font-medium text-white mb-3">What you'll build</h3>
              <p className="text-neutral-300 leading-relaxed">{p.description}</p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-white mb-3">Skills & Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {p.skills.map(s => (
                  <span key={s} className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300">
                    {s}
                  </span>
                ))}
                {p.concepts.map(c => (
                  <span key={c} className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300">
                    {c}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-white mb-3">Project Journey</h3>
              <div className="space-y-3">
                {['Understand Requirements', 'Setup Environment', 'Implement Core Logic', 'Test & Debug', 'Final Polish'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-neutral-400 text-sm">
                    <div className="w-6 h-6 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xs">
                      {idx + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
            <button 
              onClick={(e) => handleSaveToggle(e, p.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isSaved ? 'text-emerald-400 bg-emerald-500/10' : 'text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white'}`}
            >
              <Bookmark size={18} className={isSaved ? "fill-emerald-400" : ""} />
              {isSaved ? 'Saved' : 'Save Project'}
            </button>

            {isStarted ? (
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                Continue Building
              </button>
            ) : isCompleted ? (
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                View Repository
              </button>
            ) : (
              <button 
                onClick={() => handleStartProject(p.id)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Start Project
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-tight mb-2">Projects</h1>
          <p className="text-neutral-400">Build your skills through real-world projects.</p>
        </div>
        
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'discover' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
          >
            Discover
          </button>
          <button 
            onClick={() => setActiveTab('my_projects')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'my_projects' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
          >
            My Projects
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
          
          {/* Continue Building Section */}
          {activeProject ? (
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-white tracking-wide uppercase text-xs">Continue Building</h2>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xl">
                    {activeProject.icon}
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 flex items-center gap-2">
                      {activeProject.category} • {activeProject.difficulty}
                    </div>
                    <h3 className="text-xl font-medium text-white">{activeProject.title}</h3>
                  </div>
                </div>
                
                <div className="w-full md:flex-1 max-w-md z-10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-300">Step {myProjects[activeProject.id].current_step} of {myProjects[activeProject.id].total_steps}</span>
                    <span className="text-emerald-400 font-medium">{myProjects[activeProject.id].progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${myProjects[activeProject.id].progress}%` }}></div>
                  </div>
                </div>

                <button onClick={() => setSelectedProject(activeProject)} className="w-full md:w-auto z-10 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </section>
          ) : (
            <section>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h3 className="text-xl font-medium text-white mb-2 relative z-10">Start your first project</h3>
                <p className="text-neutral-400 relative z-10">Turn what you&apos;ve learned into something real.</p>
              </div>
            </section>
          )}

          {/* Recommended Section */}
          {recommended.length > 0 && (
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-white">Recommended For You</h2>
                <p className="text-sm text-neutral-500">Based on your current roadmap and skills</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommended.map(p => renderProjectCard(p))}
              </div>
            </section>
          )}

          {/* Explore Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Explore Projects</h2>
              
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                      <X size={16} />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 appearance-none min-w-[140px]"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  
                  <select 
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 appearance-none min-w-[140px]"
                  >
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-64 bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {projects.map(p => renderProjectCard(p))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12 border border-neutral-800 rounded-2xl bg-neutral-900/50">
                <p className="text-neutral-400 mb-4">No projects found matching your criteria.</p>
                <button onClick={() => { setSearchQuery(''); setCategoryFilter('All'); setDifficultyFilter('All'); }} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  Clear Filters
                </button>
              </div>
            )}
          </section>

        </motion.div>
      )}

      {activeTab === 'my_projects' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex gap-4 border-b border-neutral-800 mb-6">
            <button 
              onClick={() => setMyProjectsTab('in_progress')}
              className={`pb-3 text-sm font-medium transition-colors ${myProjectsTab === 'in_progress' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setMyProjectsTab('completed')}
              className={`pb-3 text-sm font-medium transition-colors ${myProjectsTab === 'completed' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
            >
              Completed
            </button>
            <button 
              onClick={() => setMyProjectsTab('saved')}
              className={`pb-3 text-sm font-medium transition-colors ${myProjectsTab === 'saved' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-neutral-400 hover:text-white'}`}
            >
              Saved
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {projects.filter(p => {
                const myP = myProjects[p.id];
                if (!myP) return false;
                if (myProjectsTab === 'in_progress') return myP.status === 'IN_PROGRESS';
                if (myProjectsTab === 'completed') return myP.status === 'COMPLETED';
                if (myProjectsTab === 'saved') return myP.saved;
                return false;
              }).map(p => renderProjectCard(p))}
            </AnimatePresence>
            
            {projects.filter(p => {
              const myP = myProjects[p.id];
              if (!myP) return false;
              if (myProjectsTab === 'in_progress') return myP.status === 'IN_PROGRESS';
              if (myProjectsTab === 'completed') return myP.status === 'COMPLETED';
              if (myProjectsTab === 'saved') return myP.saved;
              return false;
            }).length === 0 && (
              <div className="col-span-full py-12 text-center border border-neutral-800 rounded-2xl bg-neutral-900/50">
                <p className="text-neutral-400 mb-4">
                  {myProjectsTab === 'in_progress' && "No projects in progress yet."}
                  {myProjectsTab === 'completed' && "You haven't completed any projects yet."}
                  {myProjectsTab === 'saved' && "You haven't saved any projects."}
                </p>
                <button onClick={() => setActiveTab('discover')} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                  Explore Projects
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}
