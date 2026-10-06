import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopNavbar from '@/components/layout/TopNavbar';
import MobileNavigation from '@/components/layout/MobileNavigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-black antialiased selection:bg-emerald-900 selection:text-emerald-100">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        <TopNavbar user={session.user} />
        <main className="flex-1 p-4 sm:p-8 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
