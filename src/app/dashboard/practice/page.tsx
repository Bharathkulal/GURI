import React from 'react';
import PracticeFlow from '@/components/practice/PracticeFlow';

export const metadata = {
  title: 'Practice | GURI',
  description: 'Strengthen what you\'ve learned with personalized practice sessions.',
};

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-serif text-white tracking-tight">Practice</h1>
        <p className="text-neutral-400">Strengthen what you&apos;ve learned.</p>
      </div>

      <PracticeFlow />
    </div>
  );
}
