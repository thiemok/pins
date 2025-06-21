import { useAuth } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCommand } from '@/lib/commands/command-registry-context';

export function GlobalCommands() {
  const { signOut } = useAuth();
  const router = useRouter();

  // Logout command
  useCommand({
    name: 'Logout',
    category: 'Authentication',
    description: 'Sign out of your account',
    icon: <LogOut className="h-4 w-4" />,
    shortcut: 'Control+Shift+q',
    execute: async () => {
      await signOut();
      // @ts-expect-error -- why next
      router.push('/sign-in');
    },
  });

  return null;
}
