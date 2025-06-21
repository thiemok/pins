'use client';

import { Command } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function TopBar() {
  const isMobile = useIsMobile();

  const handleOpenCommandPalette = () => {
    const event = new CustomEvent('open-command-palette');
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-background flex h-12 items-center justify-between border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenCommandPalette}
          className="text-muted-foreground flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              {isMobile ? (
                <Command className="h-3 w-3" />
              ) : (
                <>
                  <span className="text-xs">⌘</span>K
                </>
              )}
            </kbd>
          </div>
        </Button>
      </div>
    </div>
  );
}
