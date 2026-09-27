"use client";
import React, { useState, useEffect } from "react";
import SparklesPreview from "@/components/sparkles-demo";
import LandingPage from "@/components/landing-page";
import { motion, AnimatePresence } from "motion/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let isAuth = false;
    getSession().then((session) => {
      if (session) isAuth = true;
    });

    // Show loading screen for 4 seconds
    const timer = setTimeout(() => {
      if (isAuth) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <SparklesPreview />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
