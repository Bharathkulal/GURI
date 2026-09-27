"use client";
import { Bell, Search, LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function TopNavbar({ user }: { user: any }) {
  const firstName = user?.name?.split(' ')[0] || 'Student';
  const avatarUrl = user?.image || 'https://api.dicebear.com/7.x/notionists/svg?seed=' + firstName;

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800 h-16 flex items-center justify-between px-4 sm:px-8">
      <div className="flex-1 max-w-xl relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input 
          type="text" 
          placeholder="Search concepts, skills or projects..." 
          className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-500 text-white"
        />
      </div>
      
      <div className="flex items-center justify-end flex-1 sm:flex-none gap-4 sm:gap-6 ml-auto">
        <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-6 sm:border-l border-neutral-800">
          <span className="text-sm font-medium text-neutral-300 hidden sm:block">{firstName}</span>
          <div className="w-9 h-9 rounded-full bg-neutral-800 overflow-hidden ring-2 ring-transparent hover:ring-emerald-500/30 transition-all cursor-pointer">
            <Image src={avatarUrl} alt={firstName} width={36} height={36} className="object-cover" />
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 ml-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-colors"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}