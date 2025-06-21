'use client';

import { type PropsWithChildren } from 'react';

import { CommandProvider } from '@/components/commands/command-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <CommandProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </CommandProvider>
  );
}
