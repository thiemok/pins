import { bindKeyCombo, unbindKeyCombo } from '@rwh/keystrokes';
import { useCallback, useEffect, useState } from 'react';

import { GlobalCommands } from '@/config/global-commands';
import { useIsMac } from '@/hooks/use-is-mac';
import { CommandRegistryProvider } from '@/lib/commands/command-registry-context';

import { CommandPalette } from './command-palette';

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterShortcut, setFilterShortcut] = useState<string | undefined>();
  const isMac = useIsMac();

  const onOpenCommandPalette = useCallback((filter?: string) => {
    setFilterShortcut(filter);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const combo = isMac ? 'Meta+k' : 'Control+k';
    bindKeyCombo(combo, ({ finalKeyEvent }) => {
      finalKeyEvent.preventDefault();
      setFilterShortcut(undefined);
      setIsOpen(true);
    });

    return () => unbindKeyCombo(combo);
  }, [isMac]);

  return (
    <CommandRegistryProvider onOpenCommandPalette={onOpenCommandPalette}>
      {children}
      <GlobalCommands />
      <CommandPalette
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        filterShortcut={filterShortcut}
      />
    </CommandRegistryProvider>
  );
}
