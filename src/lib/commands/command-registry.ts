'use client';

import { type Keystrokes } from '@rwh/keystrokes';

import { type Command, type CommandRegistration } from './types';

type ShortcutHandler = Parameters<Keystrokes['bindKeyCombo']>[1];

export class CommandRegistry {
  private commands = new Map<string, Command>();
  private shortcuts = new Map<string, string[]>();
  private listeners: Array<() => void> = [];
  private handlers = new Map<string, ShortcutHandler>();
  private nextId = 0;

  private onOpenCommandPalette: (filterShortcut?: string) => void;
  private readonly keystrokes: Keystrokes;

  readonly id: string;

  constructor(
    id: string,
    openCommandPalette: typeof this.onOpenCommandPalette,
    keystrokes: Keystrokes
  ) {
    this.id = id;
    this.onOpenCommandPalette = openCommandPalette;
    this.keystrokes = keystrokes;
  }

  shutdown() {
    this.handlers.forEach((handler, shortcut) => {
      this.keystrokes.unbindKeyCombo(shortcut, handler);
    });
  }

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
          this.keystrokes.unbindKeyCombo(
            command.shortcut,
            this.handlers.get(command.shortcut)
          );
          this.handlers.delete(command.shortcut);
        } else {
          this.updateShortcutBinding(command.shortcut);
        }
      }
    }
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
    if (!command || command.enabled === false) return false;

    command.execute();
    return true;
  }

  setCommandPaletteHandler(callback: typeof this.openCommandPalette) {
    this.onOpenCommandPalette = callback;
  }

  openCommandPalette(filter?: string) {
    this.onOpenCommandPalette(filter);
  }

  onCommandUpdate(listener: () => void) {
    this.listeners.push(listener);
  }

  offCommandUpdate(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private updateShortcutBinding(shortcut: string): void {
    const commands = this.getCommandsByShortcut(shortcut);
    if (commands.length === 0) return;

    if (!this.handlers.has(shortcut)) {
      const handler: ShortcutHandler = ({ finalKeyEvent }) => {
        finalKeyEvent.preventDefault();
        // Do not reuse commands from outside of this scope,
        // since we need this to dynamically update without recreating the handler
        const enabledCommands = this.getCommandsByShortcut(shortcut).filter(
          (cmd) => cmd.enabled !== false
        );

        if (enabledCommands.length === 0) return;

        if (enabledCommands.length === 1) {
          enabledCommands[0].execute();
        } else {
          // Multiple commands with same shortcut - open command palette filtered
          this.openCommandPalette(shortcut);
        }
      };
      this.handlers.set(shortcut, handler);
      this.keystrokes.bindKeyCombo(shortcut, handler);
    }

    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l());
  }
}
