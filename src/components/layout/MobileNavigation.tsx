import Link from 'next/link';
import { Home, Map, BookOpen, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard', active: true },
  { name: 'Roadmap', icon: Map, href: '/dashboard/roadmap' },
  { name: 'Learn', icon: BookOpen, href: '/dashboard/learn' },
  { name: 'AI', icon: BrainCircuit, href: '/dashboard/coach' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export default function MobileNavigation() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-neutral-950 border-t border-neutral-800 pb-safe z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
            <item.icon size={22} className={cn(item.active ? "text-emerald-500" : "text-neutral-500")} />
            <span className={cn("text-[10px] font-medium", item.active ? "text-emerald-400" : "text-neutral-500")}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}