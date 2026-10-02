"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, BookOpen, Target, Rocket, Map, Plus, MoreHorizontal, History, RefreshCw, XCircle } from 'lucide-react';
import { fetchAISnapshot, fetchAIConversations, fetchAIConversation, askAICoachChat } from '@/services/api';

type Snapshot = {
  currentRoadmap: string;
  currentTopic: string;
  practiceAccuracy: number;
  activeProject: string;
  projectProgress: number;
  weakArea: string;
  currentStreak: number;
};

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

type ConversationMeta = {
  id: string;
  title: string;
  updated_at: string;
};

export default function AICoachFlow({ token }: { token: string }) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("general");
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const loadInitialData = async () => {
    try {
      const [snap, convs] = await Promise.all([
        fetchAISnapshot(token),
        fetchAIConversations(token)
      ]);
      setSnapshot(snap);
      setConversations(convs);
    } catch (err) {
      console.error(err);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      setLoading(true);
      const conv = await fetchAIConversation(id, token);
      setCurrentConvId(conv.id);
      setMessages(conv.messages);
      setSuggestedActions([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentConvId(null);
    setMessages([]);
    setSuggestedActions([]);
    setMode("general");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text: string, forceMode?: string) => {
    if (!text.trim()) return;
    
    const userMsg = text.trim();
    setInputText("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setSuggestedActions([]);
    setLoading(true);
    
    try {
      const response = await askAICoachChat({
        message: userMsg,
        conversation_id: currentConvId || undefined,
        mode: forceMode || mode,
        context: snapshot
      }, token);

      setCurrentConvId(response.conversation_id);
      setMessages(prev => [...prev, { role: 'ai', content: response.message }]);
      setMode(response.mode);
      setSuggestedActions(response.suggested_actions || []);
      
      // refresh sidebar
      const convs = await fetchAIConversations(token);
      setConversations(convs);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: "GURI Coach couldn't respond right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionMode: string, label: string) => {
    setMode(actionMode);
    sendMessage(`I need help with my ${label.toLowerCase()}.`, actionMode);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const quickActions = [
    { mode: 'learn', icon: BookOpen, label: 'Learn', desc: 'Understand concepts' },
    { mode: 'practice', icon: Target, label: 'Practice', desc: 'Understand mistakes' },
    { mode: 'project', icon: Rocket, label: 'Project', desc: 'Get project help' },
    { mode: 'roadmap', icon: Map, label: 'Roadmap', desc: 'Plan your learning' }
  ];

  const emptyPrompts = [
    "Explain a concept simply",
    "What should I learn next?",
    "Give me a real-world example",
    "Help me debug my code",
    "Quiz me on Python",
    "Explain my mistake"
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      
      {/* LEFT COLUMN: Main Chat Area */}
      <div className="flex-1 flex flex-col bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Bot size={22} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="font-serif text-white font-medium">GURI Coach</h2>
              <p className="text-xs text-neutral-400">Your personal learning companion</p>
            </div>
          </div>
          <button 
            onClick={startNewChat}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Plus size={16} /> <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Bot size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Hi there, what would you like to work on today?</h3>
              <p className="text-neutral-400 mb-8">I can help you understand concepts, practice, build projects, and navigate your roadmap.</p>
              
              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                {quickActions.map(action => (
                  <button 
                    key={action.mode}
                    onClick={() => handleQuickAction(action.mode, action.label)}
                    className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-left hover:border-emerald-500/50 transition-colors group flex items-start gap-3"
                  >
                    <div className="mt-0.5 text-neutral-400 group-hover:text-emerald-400 transition-colors">
                      <action.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-1">{action.label}</div>
                      <div className="text-xs text-neutral-500">{action.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="w-full">
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Suggested Prompts</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {emptyPrompts.map(prompt => (
                    <button 
                      key={prompt}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="px-4 py-2 bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-neutral-800' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neutral-800 text-white rounded-tr-sm' 
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-3xl">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-tl-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </motion.div>
              )}

              {suggestedActions.length > 0 && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 ml-12">
                  {suggestedActions.map(action => (
                    <button 
                      key={action}
                      onClick={() => handleSuggestedPrompt(action)}
                      className="px-4 py-2 bg-neutral-900 border border-neutral-700 text-emerald-400 text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }}
            className="flex items-end gap-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-2 focus-within:border-emerald-500/50 transition-colors"
          >
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputText);
                }
              }}
              placeholder="Ask GURI anything..." 
              className="flex-1 bg-transparent border-none text-white text-sm resize-none focus:outline-none p-3 max-h-32 min-h-[44px]"
              rows={1}
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white rounded-xl transition-colors mb-1 mr-1"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: Context & History */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        
        {/* Learning Snapshot */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5">
          <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">Your Learning Snapshot</h3>
          {snapshot ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 mb-1">Current Roadmap</div>
                <div className="text-sm text-neutral-300 font-medium">{snapshot.currentRoadmap}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1">Current Topic</div>
                <div className="text-sm text-emerald-400 font-medium">{snapshot.currentTopic}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-neutral-500">Practice Accuracy</div>
                <div className="text-sm text-white font-medium">{snapshot.practiceAccuracy}%</div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-neutral-500">Active Project</div>
                  <div className="text-xs text-emerald-400">{snapshot.projectProgress}%</div>
                </div>
                <div className="text-sm text-neutral-300 font-medium truncate">{snapshot.activeProject}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1"><XCircle size={12} className="text-rose-400" /> Weak Area</div>
                <div className="text-sm text-rose-400 font-medium">{snapshot.weakArea}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-neutral-800 rounded w-2/3"></div>
              <div className="h-4 bg-neutral-800 rounded w-full"></div>
              <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-neutral-800 flex items-center gap-2">
            <History size={16} className="text-neutral-400" />
            <h3 className="text-sm font-medium text-white">Recent Conversations</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {conversations.length > 0 ? (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => loadConversation(conv.id)}
                  className={`w-full text-left p-3 rounded-xl text-sm transition-colors ${currentConvId === conv.id ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'}`}
                >
                  <div className="truncate">{conv.title}</div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-neutral-500">
                No past conversations.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
