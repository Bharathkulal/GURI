import React from 'react';
import { auth } from '@/auth';
import ProjectsFlow from '@/components/projects/ProjectsFlow';

export const metadata = {
  title: 'Projects | GURI',
  description: 'Build your skills through real-world projects.',
};

export default async function ProjectsPage() {
  const session = await auth();
  const token = session?.user?.email || "dev-token"; // Using email as a mock token for local testing based on dashboard.tsx
  
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ProjectsFlow token={token} />
    </div>
  );
}
