import React from 'react';
import { auth } from '@/auth';
import AICoachFlow from '@/components/coach/AICoachFlow';

export const metadata = {
  title: 'AI Coach | GURI',
  description: 'Your personal learning companion.',
};

export default async function AICoachPage() {
  const session = await auth();
  const token = session?.user?.email || "dev-token"; 
  
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 hidden md:block">
        <h1 className="text-3xl font-serif text-white tracking-tight mb-2">AI Coach</h1>
        <p className="text-neutral-400">Your personal learning companion.</p>
      </div>
      <AICoachFlow token={token} />
    </div>
  );
}
