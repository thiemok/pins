import { CommandProvider } from '@/components/commands/command-provider';
import { TopBar } from '@/components/layout/top-bar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { GlobalCommands } from '@/config/global-commands';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CommandProvider>
      <GlobalCommands />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex h-full flex-col">
          <TopBar />
          <div className="flex-1 p-4">{children}</div>
        </main>
      </SidebarProvider>
    </CommandProvider>
  );
}
