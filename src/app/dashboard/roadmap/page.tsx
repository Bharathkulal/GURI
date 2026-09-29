import React from "react";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Roadmap</h1>
          <p className="text-gray-400 text-lg">Your personalized path to reach your career goal.</p>
        </header>

        <section className="mb-12 border border-gray-800 rounded-xl p-8 bg-zinc-900/50">
          <h2 className="text-xl font-semibold mb-6">AI Engineer</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="text-green-500 font-medium">32%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "32%" }}></div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-1">Continue Learning:</p>
            <p className="text-lg font-medium mb-4">Machine Learning → Linear Regression</p>
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Continue Learning →
            </button>
          </div>
        </section>
        
        <section>
            <div className="space-y-4">
                {/* Stage Example */}
                <div className="border border-gray-800 rounded-xl p-6 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="text-2xl font-light text-gray-500">01</span>
                        <div>
                            <h3 className="text-lg font-medium">Python Fundamentals</h3>
                            <p className="text-sm text-gray-400">Core concepts and programming basics</p>
                        </div>
                    </div>
                    <div className="text-green-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                    </div>
                </div>

                <div className="border border-gray-800 rounded-xl p-6 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="text-2xl font-light text-gray-500">02</span>
                        <div>
                            <h3 className="text-lg font-medium">Machine Learning</h3>
                            <p className="text-sm text-gray-400">Algorithms and statistical models</p>
                        </div>
                    </div>
                    <div className="text-yellow-500 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        In Progress (48%)
                    </div>
                </div>

                <div className="border border-gray-800 rounded-xl p-6 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors cursor-pointer flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-6">
                        <span className="text-2xl font-light text-gray-500">03</span>
                        <div>
                            <h3 className="text-lg font-medium">Deep Learning</h3>
                            <p className="text-sm text-gray-400">Neural networks and advanced models</p>
                        </div>
                    </div>
                    <div className="text-gray-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Locked
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
