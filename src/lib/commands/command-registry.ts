'use client';

import keyboardJS from 'keyboardjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import { type Command, type CommandRegistration } from './types';

export class CommandRegistry {
  private commands = new Map<string, Command>();
  private shortcuts = new Map<string, string[]>();
  private listeners = new Set<() => void>();
  private nextId = 0;

  register(registration: CommandRegistration): string {
    const id = `cmd-${this.nextId++}`;

    if (this.commands.has(registration.name)) {
      throw new Error(
        `Command with name "${registration.name}" already exists`
      );
    }

    const command: Command = {
      id,
      ...registration,
    };

    this.commands.set(registration.name, command);

    if (registration.shortcut) {
      if (!this.shortcuts.has(registration.shortcut)) {
        this.shortcuts.set(registration.shortcut, []);
      }
      this.shortcuts.get(registration.shortcut)!.push(registration.name);
      this.updateShortcutBinding(registration.shortcut);
    }

    this.notifyListeners();
    return id;
  }

  unregister(name: string): void {
    const command = this.commands.get(name);
    if (!command) return;

    this.commands.delete(name);

    if (command.shortcut) {
      const shortcutCommands = this.shortcuts.get(command.shortcut);
      if (shortcutCommands) {
        const index = shortcutCommands.indexOf(name);
        if (index > -1) {
          shortcutCommands.splice(index, 1);
        }
        if (shortcutCommands.length === 0) {
          this.shortcuts.delete(command.shortcut);
          keyboardJS.unbind(command.shortcut);
        } else {
          this.updateShortcutBinding(command.shortcut);
        }
      }
    }

    this.notifyListeners();
  }

  getCommand(name: string): Command | undefined {
    return this.commands.get(name);
  }

  getAllCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  getCommandsByShortcut(shortcut: string): Command[] {
    const commandNames = this.shortcuts.get(shortcut) || [];
    return commandNames.map((name) => this.commands.get(name)!).filter(Boolean);
  }

  executeCommand(name: string): boolean {
    const command = this.commands.get(name);
    if (!command || !command.enabled) return false;

    command.execute();
    return true;
  }

  private updateShortcutBinding(shortcut: string): void {
    keyboardJS.unbind(shortcut);

    const commands = this.getCommandsByShortcut(shortcut);
    if (commands.length === 0) return;

    keyboardJS.bind(shortcut, (e) => {
      e?.preventDefault();

      const enabledCommands = commands.filter((cmd) => cmd.enabled);
      if (enabledCommands.length === 0) return;

      if (enabledCommands.length === 1) {
        enabledCommands[0].execute();
      } else {
        // Multiple commands with same shortcut - open command palette filtered
        this.openCommandPalette(shortcut);
      }
    });
  }

  private openCommandPalette(filterShortcut?: string): void {
    // This will be implemented when we create the command palette
    const event = new CustomEvent('open-command-palette', {
      detail: { filterShortcut },
    });
    window.dispatchEvent(event);
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const commandRegistry = new CommandRegistry();

export function useCommandRegistry() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return commandRegistry.subscribe(() => {
      forceUpdate((prev) => prev + 1);
    });
  }, [forceUpdate]);

  return {
    commands: commandRegistry.getAllCommands(),
    register: commandRegistry.register.bind(commandRegistry),
    unregister: commandRegistry.unregister.bind(commandRegistry),
    execute: commandRegistry.executeCommand.bind(commandRegistry),
    getCommand: commandRegistry.getCommand.bind(commandRegistry),
  };
}

export function useCommand(registration: CommandRegistration) {
  const commandRef = useRef<string | null>(null);

  const execute = useCallback(() => {
    if (commandRef.current) {
      commandRegistry.executeCommand(registration.name);
    }
  }, [registration.name]);

  useEffect(() => {
    try {
      commandRef.current = commandRegistry.register(registration);
      return () => {
        if (commandRef.current) {
          commandRegistry.unregister(registration.name);
          commandRef.current = null;
        }
      };
    } catch (error) {
      console.warn(`Failed to register command "${registration.name}":`, error);
      return () => {};
    }
  }, [registration]);

  return { execute };
}
