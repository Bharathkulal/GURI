"use client";

import React, { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import {
  Map,
  Target,
  BrainCircuit,
  Trophy,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Code2,
  LineChart,
  PlayCircle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-black/80 backdrop-blur-md border-neutral-800 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="GURI Logo" width={32} height={32} className="rounded-md" />
          <div className="font-bold text-2xl tracking-tight text-white">GURI</div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#roadmaps" className="hover:text-white transition-colors">Roadmaps</a>
          <a href="#ai-coach" className="hover:text-white transition-colors">AI Coach</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Login</Link>
          <Link href="/login" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors inline-block">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col space-y-4">
          <a href="#how-it-works" className="text-neutral-300 font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#roadmaps" className="text-neutral-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Roadmaps</a>
          <a href="#ai-coach" className="text-neutral-300 font-medium" onClick={() => setMobileMenuOpen(false)}>AI Coach</a>
          <a href="#pricing" className="text-neutral-300 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <div className="pt-4 flex flex-col space-y-3">
            <Link href="/login" className="text-neutral-300 font-medium text-left">Login</Link>
            <Link href="/login" className="bg-white text-black px-5 py-3 rounded-md font-semibold text-center block">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-neutral-800 selection:text-white antialiased overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-neutral-900/50 border border-neutral-800 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-neutral-300">AI-Powered Career Learning Platform</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Your Career Goal. <br className="hidden md:block" />
            <span className="text-neutral-400">Your Roadmap.</span> <br className="hidden md:block" />
            Your GURI.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed"
          >
            GURI helps college students choose a career goal, follow a structured roadmap, learn the right skills, build practical projects, and stay on track with personalized AI guidance.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8"
          >
            <Link href="/login" className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center">
              Start Your Journey <ChevronRight className="ml-2" size={18} />
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-neutral-900 text-white border border-neutral-800 px-8 py-4 rounded-full font-semibold hover:bg-neutral-800 transition-colors text-center inline-block">
              Explore Roadmaps
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-neutral-500 font-medium"
          >
            Built for students who want direction, not information overload.
          </motion.p>
        </div>

        {/* PRODUCT PREVIEW VISUAL */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-10 max-w-5xl mx-auto mt-20"
        >
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Preview */}
            <div className="md:w-1/3 bg-neutral-900/50 p-6 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Your Goal</div>
              <div className="text-xl font-bold text-white mb-8">AI Engineer</div>
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center text-neutral-300">
                  <CheckCircle2 className="text-green-500 mr-3" size={18} /> <span>Python</span>
                </div>
                <div className="flex items-center text-neutral-300">
                  <CheckCircle2 className="text-green-500 mr-3" size={18} /> <span>Git & GitHub</span>
                </div>
                <div className="flex items-center text-neutral-300">
                  <CheckCircle2 className="text-green-500 mr-3" size={18} /> <span>SQL</span>
                </div>
                
                <div className="pt-4 mt-4 border-t border-neutral-800">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center font-semibold text-white">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                      Machine Learning
                    </div>
                    <span className="text-sm text-neutral-400">72%</span>
                  </div>
                  <div className="pl-5 space-y-3 text-sm text-neutral-400">
                    <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full border border-neutral-500 mr-3"/> Deep Learning</div>
                    <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full border border-neutral-500 mr-3"/> Transformers</div>
                    <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full border border-neutral-500 mr-3"/> LLMs & RAG</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Area Preview */}
            <div className="md:w-2/3 p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                  <BrainCircuit className="text-blue-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Coach</h3>
                  <p className="text-sm text-neutral-400">“What should I learn today?”</p>
                </div>
              </div>
              
              <div className="space-y-3 pl-4 border-l-2 border-neutral-800 ml-5">
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-center">
                  <PlayCircle className="text-neutral-400 mr-4" size={20} />
                  <span className="text-neutral-200">Study Machine Learning concepts</span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-center">
                  <Target className="text-neutral-400 mr-4" size={20} />
                  <span className="text-neutral-200">Complete Linear Regression practice</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex items-center">
                  <Code2 className="text-blue-400 mr-4" size={20} />
                  <span className="text-blue-100 font-medium">Build your first ML project</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Learning is everywhere. <br className="hidden md:block"/> <span className="text-neutral-500">Direction isn't.</span></h2>
          <p className="text-xl text-neutral-400 mb-16">
            College students face too many courses, random YouTube tutorials, outdated roadmaps, and no clear learning order. 
            It's hard to know what to learn next or if you're truly job-ready.
          </p>
          
          <div className="inline-block bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-2">GURI turns scattered learning into one structured journey.</h3>
          </div>
        </div>
      </section>

      {/* HOW GURI WORKS */}
      <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How GURI Works</h2>
          <p className="text-lg text-neutral-400">Four simple steps to transform your career preparation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Choose Your Goal", desc: "Select the career you want to pursue (e.g. AI Engineer, Full Stack).", icon: Target },
            { step: "02", title: "Get Your Roadmap", desc: "GURI creates a structured path from fundamentals to advanced skills.", icon: Map },
            { step: "03", title: "Learn & Build", desc: "Learn concepts, practice, complete quizzes, and build real projects.", icon: Code2 },
            { step: "04", title: "Become Career Ready", desc: "Track skills, prepare for interviews, and receive AI guidance.", icon: Trophy },
          ].map((item, i) => (
            <div key={i} className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex flex-col relative overflow-hidden group hover:border-neutral-700 transition-colors">
              <div className="text-5xl font-black text-neutral-800 mb-6 group-hover:text-neutral-700 transition-colors">{item.step}</div>
              <item.icon className="text-blue-500 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section id="roadmaps" className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">One goal. One clear path.</h2>
            <p className="text-lg text-neutral-400">Follow industry-aligned curriculums designed to make you hireable.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Engineer",
                desc: "Master data, machine learning, and modern AI.",
                path: ["Python", "Mathematics", "SQL", "Machine Learning", "Deep Learning", "LLMs & RAG", "AI Projects"]
              },
              {
                title: "Full Stack Developer",
                desc: "Build complete end-to-end web applications.",
                path: ["HTML & CSS", "JavaScript", "React", "Node.js", "Databases", "APIs & Auth", "Deployment"]
              },
              {
                title: "Data Analyst",
                desc: "Turn raw data into actionable business insights.",
                path: ["Excel", "SQL", "Statistics", "Python", "Pandas", "Data Visualization", "Power BI"]
              }
            ].map((roadmap, i) => (
              <div key={i} className="bg-black border border-neutral-800 p-8 rounded-2xl flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
                <p className="text-neutral-400 mb-8">{roadmap.desc}</p>
                
                <div className="flex-1 space-y-4 mb-8">
                  {roadmap.path.map((step, j) => (
                    <div key={j} className="flex items-center text-sm font-medium text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-3" />
                      {step}
                    </div>
                  ))}
                </div>
                
                <Link href="/login" className="w-full py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors border border-neutral-800 text-center block">
                  View Roadmap &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI COACH & EXPERIENCE */}
      <section id="ai-coach" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Never wonder what to learn next.</h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              Your AI Learning Coach understands your career goal, roadmap progress, quiz performance, and available study time. It creates a personalized learning plan every time you log in.
            </p>
            
            <div className="space-y-6 border-l border-neutral-800 pl-6">
              <div>
                <div className="font-semibold text-white flex items-center mb-1"><BookOpen size={16} className="mr-2 text-neutral-400"/> Understand</div>
                <div className="text-sm text-neutral-500">Read simple explanations and real-world examples.</div>
              </div>
              <div>
                <div className="font-semibold text-white flex items-center mb-1"><Code2 size={16} className="mr-2 text-neutral-400"/> Practice & Build</div>
                <div className="text-sm text-neutral-500">Don't just watch. Learn by doing real technical activities.</div>
              </div>
              <div>
                <div className="font-semibold text-white flex items-center mb-1"><LineChart size={16} className="mr-2 text-neutral-400"/> Track & Test</div>
                <div className="text-sm text-neutral-500">Complete quizzes and see your skill proficiency grow.</div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10">
              <div className="text-neutral-400 mb-2">Good morning, Bharath 👋</div>
              <div className="text-xl font-bold mb-8">Your goal: <span className="text-blue-400">AI Engineer</span></div>
              
              <div className="bg-black border border-neutral-800 rounded-xl p-5 mb-6">
                <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Today's Focus</div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-200"><span className="text-neutral-500 mr-2">01</span> Learn Linear Regression</span>
                    <span className="text-neutral-500">45 min</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-200"><span className="text-neutral-500 mr-2">02</span> Practice 5 questions</span>
                    <span className="text-neutral-500">15 min</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-200"><span className="text-neutral-500 mr-2">03</span> Build a mini ML model</span>
                    <span className="text-neutral-500">60 min</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-neutral-500 block mb-1">Next recommended skill:</span>
                <span className="font-medium text-white inline-flex items-center">
                  Decision Trees <ChevronRight size={14} className="ml-1 text-neutral-500" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS & CAREER */}
      <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn knowledge into proof.</h2>
              <p className="text-lg text-neutral-400 mb-10">
                GURI connects learning with practical projects so you can demonstrate what you actually know.
              </p>
              
              <div className="space-y-6">
                <div className="bg-black border border-neutral-800 p-5 rounded-xl">
                  <div className="text-sm text-blue-400 font-medium mb-2">AI Engineer Projects</div>
                  <ul className="text-neutral-300 text-sm space-y-2">
                    <li>• Spam Email Classifier</li>
                    <li>• House Price Prediction</li>
                    <li>• RAG Document Assistant</li>
                  </ul>
                </div>
                <div className="bg-black border border-neutral-800 p-5 rounded-xl">
                  <div className="text-sm text-green-400 font-medium mb-2">Full Stack Projects</div>
                  <ul className="text-neutral-300 text-sm space-y-2">
                    <li>• E-Commerce Application</li>
                    <li>• Real-Time Chat System</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Learning should lead somewhere.</h2>
              <p className="text-lg text-neutral-400 mb-10">
                GURI connects learning progress with actual career preparation.
              </p>
              
              <ul className="space-y-4 text-neutral-300 mb-10">
                <li className="flex items-center"><CheckCircle2 size={18} className="text-neutral-500 mr-3"/> Resume preparation</li>
                <li className="flex items-center"><CheckCircle2 size={18} className="text-neutral-500 mr-3"/> Portfolio & GitHub guidance</li>
                <li className="flex items-center"><CheckCircle2 size={18} className="text-neutral-500 mr-3"/> Interview preparation</li>
                <li className="flex items-center"><CheckCircle2 size={18} className="text-neutral-500 mr-3"/> Skill-gap identification</li>
              </ul>
              
              <Link href="/login" className="text-white font-medium inline-flex items-center hover:text-neutral-300 transition-colors">
                Build Your Career Path <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Pricing.</h2>
          <p className="text-lg text-neutral-400 mb-12">Everything you need to become career-ready.</p>
          
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 md:p-10 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
            
            <h3 className="text-xl font-bold mb-2">GURI Premium</h3>
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-5xl font-bold tracking-tight">₹100</span>
              <span className="text-neutral-400 font-medium">/ month</span>
            </div>
            
            <ul className="space-y-4 text-left mb-10 text-sm">
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> Career roadmaps</li>
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> Structured learning</li>
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> Practice & quizzes</li>
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> Real-world projects</li>
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> AI Learning Coach</li>
              <li className="flex items-center"><CheckCircle2 size={16} className="text-white mr-3"/> Career preparation</li>
            </ul>
            
            <Link href="/login" className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-neutral-200 transition-colors block text-center">
              Start for ₹100/month
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Your career doesn't need more confusion. <br className="hidden md:block"/>
            <span className="text-neutral-500">It needs direction.</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12">
            Choose your goal. Follow your roadmap. Build your future with GURI.
          </p>
          <Link href="/login" className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors inline-flex items-center shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Start Your Journey <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 py-16 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="GURI Logo" width={32} height={32} className="rounded-md" />
              <div className="font-bold text-2xl tracking-tight text-white">GURI</div>
            </Link>
            <p className="text-neutral-500 text-sm max-w-sm">
              Your goal. Your roadmap. Your journey.<br/>
              An AI-powered career learning platform designed for college students.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-white transition-colors">Roadmaps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900 text-center text-sm text-neutral-600">
          © {new Date().getFullYear()} GURI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
