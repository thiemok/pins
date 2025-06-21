'use client';

import { useEffect, useState } from 'react';

import { CommandPalette } from './command-palette';

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterShortcut, setFilterShortcut] = useState<string | undefined>();

  useEffect(() => {
    const handleOpenCommandPalette = (event: CustomEvent) => {
      setFilterShortcut(event.detail?.filterShortcut);
      setIsOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Cmd+K / Ctrl+K to open command palette
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setFilterShortcut(undefined);
        setIsOpen(true);
      }
    };

    window.addEventListener(
      'open-command-palette',
      handleOpenCommandPalette as EventListener
    );
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'open-command-palette',
        handleOpenCommandPalette as EventListener
      );
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFilterShortcut(undefined);
    }
  };

  return (
    <>
      {children}
      <CommandPalette
        open={isOpen}
        onOpenChange={handleOpenChange}
        filterShortcut={filterShortcut}
      />
    </>
  );
}
