import { AppProviders } from '@/app/(core)/app-providers';
import { TopBar } from '@/components/layout/top-bar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <AppSidebar />
      <main className="flex h-full w-full flex-col">
        <TopBar />
        <div className="flex-1 p-4">{children}</div>
      </main>
    </AppProviders>
  );
}
