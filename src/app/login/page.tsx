"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, Circle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    // Simulate API call for now (replace with actual credentials auth later)
    setTimeout(() => {
      setLoading(false);
      setError("Invalid email or password.");
    }, 1500);
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row antialiased selection:bg-neutral-800">
      {/* LEFT SIDE - BRANDING & VISUAL */}
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] flex-col justify-between p-12 lg:p-20 relative overflow-hidden bg-black border-r border-neutral-900">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-neutral-800/20 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-3 mb-16 hover:opacity-80 transition-opacity w-max">
            <Image src="/logo.png" alt="GURI Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-3xl font-bold tracking-tight">GURI</span>
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Your goal. <br/>
              <span className="text-neutral-500">Your roadmap.</span> <br/>
              Your journey.
            </h1>
            <p className="text-lg text-neutral-400 max-w-md">
              Turn your career goal into a clear learning path and know exactly what to learn next.
            </p>
          </motion.div>
        </div>

        {/* Product Preview Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 mt-12 max-w-md"
        >
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Your Career Goal</div>
            <div className="text-xl font-bold text-white mb-6">AI Engineer</div>
            
            <div className="space-y-4">
              {[
                { name: "Python", status: "done" },
                { name: "Git & GitHub", status: "done" },
                { name: "SQL", status: "done" },
                { name: "Machine Learning", status: "current" },
                { name: "Deep Learning", status: "pending" },
                { name: "LLM Engineering", status: "pending" },
              ].map((item, i) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                  className="flex items-center text-sm"
                >
                  {item.status === "done" && <CheckCircle2 className="text-blue-500 mr-3" size={18} />}
                  {item.status === "current" && (
                    <div className="relative mr-3 w-[18px] h-[18px] flex items-center justify-center">
                      <div className="absolute w-full h-full bg-blue-500/20 rounded-full animate-ping" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    </div>
                  )}
                  {item.status === "pending" && <Circle className="text-neutral-700 mr-3" size={18} />}
                  
                  <span className={cn(
                    "font-medium",
                    item.status === "done" ? "text-neutral-400" : 
                    item.status === "current" ? "text-white" : "text-neutral-600"
                  )}>
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/50 flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-400">Progress</span>
              <span className="text-sm font-bold text-white">62%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <Link href="/" className="md:hidden flex items-center space-x-2 mb-12 w-max">
            <Image src="/logo.png" alt="GURI Logo" width={32} height={32} className="rounded-md" />
            <span className="text-3xl font-bold tracking-tight block">GURI</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-neutral-400 text-sm mb-8">Continue your journey with GURI.</p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleLogin} 
            className="space-y-5"
          >
            {error && (
              <div className="p-3 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-neutral-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-neutral-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-neutral-800"></div>
              <span className="flex-shrink-0 mx-4 text-neutral-500 text-xs font-medium">or continue with</span>
              <div className="flex-grow border-t border-neutral-800"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                className="w-full bg-neutral-900 border border-neutral-800 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                className="w-full bg-neutral-900 border border-neutral-800 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-neutral-400">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-white hover:underline transition-all">
                Create your GURI account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
