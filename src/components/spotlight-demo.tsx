import React from "react";
import { Spotlight } from "@/components/ui/spotlight";

export default function SpotlightPreview() {
  return (
    <div className="relative min-h-screen w-full bg-black antialiased overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-40 md:pt-60">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl">
          Hi, I'm Bharath. <br /> I build amazing digital experiences.
        </h1>
        <p className="mt-4 max-w-lg text-base font-normal text-neutral-300">
          Welcome to my portfolio! I am a full-stack developer passionate about creating highly interactive, accessible, and performant web applications. 
          Scroll down to discover more about my journey, projects, and skills.
        </p>
      </div>
      
      {/* Scrollable Portfolio Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-40">
        <h2 className="text-3xl font-semibold text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">Project Alpha</h3>
            <p className="text-neutral-400">A cutting-edge SaaS platform built with Next.js and Tailwind CSS.</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">Project Beta</h3>
            <p className="text-neutral-400">An innovative e-commerce solution with dynamic AI recommendations.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-white mt-24 mb-8">My Skills</h2>
        <div className="flex flex-wrap gap-4">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"].map((skill) => (
            <span key={skill} className="bg-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
