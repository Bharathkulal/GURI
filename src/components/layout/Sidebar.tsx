"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, PenTool, Code, BrainCircuit, Target, Briefcase, Settings, HelpCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'My Roadmap', icon: Map, href: '/dashboard/roadmap' },
  { name: 'Learn', icon: BookOpen, href: '/dashboard/learn' },
  { name: 'Practice', icon: PenTool, href: '/dashboard/practice' },
  { name: 'Projects', icon: Code, href: '/dashboard/projects' },
  { name: 'AI Coach', icon: BrainCircuit, href: '/dashboard/coach' },
  { name: 'Progress', icon: Target, href: '/dashboard/progress' },
  { name: 'Career', icon: Briefcase, href: '/dashboard/career' },
];

const bottomItems = [
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help', icon: HelpCircle, href: '/help' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-neutral-950 border-r border-neutral-800 z-50 overflow-y-auto text-white">
      <div className="p-6 flex items-center gap-2">
        <Image src="/logo.png" alt="GURI" width={28} height={28} className="rounded" />
        <span className="font-bold text-xl tracking-tight text-white">GURI</span>
      </div>
      
      <div className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-emerald-500/10 text-emerald-400" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
            )}>
              <item.icon size={18} className={isActive ? "text-emerald-500" : "text-neutral-500"} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-neutral-800 space-y-1">
        {bottomItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors">
            <item.icon size={18} className="text-neutral-500" />
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}