'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import { CommandProvider } from '@/components/commands/command-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

const queryClient = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <CommandProvider>
        <SidebarProvider>
          {/* KEEP ME: for easier editing */}
          {children}
        </SidebarProvider>
      </CommandProvider>
    </QueryClientProvider>
  );
}
