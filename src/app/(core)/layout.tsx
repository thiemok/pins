import { AppProviders } from '@/app/(core)/app-providers';
import { TopBar } from '@/components/layout/top-bar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { GlobalDialogs } from '@/config/global-dialogs';
import { AppDevTools } from '@/dev/app-dev-tools';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <AppSidebar />
      <main className="flex h-full w-full flex-col">
        <GlobalDialogs />
        <TopBar />
        <div className="h-full w-full flex-1 p-4">{children}</div>
        <AppDevTools />
      </main>
    </AppProviders>
  );
}
