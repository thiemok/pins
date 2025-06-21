'use client';

import { CommandPaletteTrigger } from '@/components/commands/command-palette-trigger';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function TopBar() {
  return (
    <div className="bg-background flex h-12 w-full items-center justify-between border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <CommandPaletteTrigger />
      </div>
    </div>
  );
}
