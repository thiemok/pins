import { type ReactNode } from 'react';

export interface Command {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string; // keyboardJS format e.g. "cmd+k" or "ctrl+shift+p"
  enabled?: boolean;
  execute: () => void;
}

export type CommandRegistration = Omit<Command, 'id'>;
