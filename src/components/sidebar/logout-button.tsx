'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCommandRegistry } from '@/lib/commands/command-registry-context';

export function LogoutButton() {
  const { getCommand } = useCommandRegistry();

  const handleLogout = () => {
    const logoutCommand = getCommand('Logout');
    if (logoutCommand) {
      logoutCommand.execute();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-muted-foreground hover:text-foreground w-full justify-start gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
