import { useCallback, useEffect, useMemo } from 'react';

import { ShortcutLabel } from '@/components/commands/shortcut-label';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { useCommandRegistry } from '@/lib/commands/command-registry-context';
import { type Command } from '@/lib/commands/types';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterShortcut?: string;
}

export function CommandPalette({
  open,
  onOpenChange,
  filterShortcut,
}: CommandPaletteProps) {
  const { getAllCommands } = useCommandRegistry();
  const commands = getAllCommands();

  const { filteredCommands, groupedCommands } = useMemo(() => {
    const filteredCommands = commands
      .filter((cmd) => cmd.enabled !== false)
      .filter((cmd) => {
        if (filterShortcut) {
          return cmd.shortcut === filterShortcut;
        }
        return true;
      })
      .sort((a, b) => {
        // Sort by category first, then by name
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.name.localeCompare(b.name);
      });

    const groupedCommands = filteredCommands.reduce(
      (groups, command) => {
        if (!groups[command.category]) {
          groups[command.category] = [];
        }
        groups[command.category].push(command);
        return groups;
      },
      {} as Record<string, Command[]>
    );

    return { filteredCommands, groupedCommands };
  }, [commands, filterShortcut]);

  const executeCommand = useCallback(
    (command: Command) => {
      onOpenChange(false);
      command.execute();
    },
    [onOpenChange]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && filterShortcut && /^[1-9]$/.test(e.key)) {
        // Number shortcuts for duplicate shortcut commands
        const index = parseInt(e.key) - 1;
        const command = filteredCommands[index];
        if (command) {
          executeCommand(command);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filterShortcut, filteredCommands, executeCommand]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={
          filterShortcut ? 'Select a command...' : 'Type a command or search...'
        }
        disabled={!!filterShortcut}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
          <CommandGroup key={category} heading={category}>
            {categoryCommands.map((command, categoryIndex) => (
              <CommandItem
                key={command.id}
                value={`${command.name} ${command.description || ''}`}
                onSelect={() => executeCommand(command)}
              >
                <div className="flex w-full items-center gap-2">
                  {command.icon && (
                    <div className="flex-shrink-0">{command.icon}</div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {command.name}
                    </div>
                    {command.description && (
                      <div className="text-muted-foreground text-sm">
                        {command.description}
                      </div>
                    )}
                  </div>
                  {(command.shortcut || filterShortcut) && (
                    <CommandShortcut>
                      <ShortcutLabel
                        shortcut={
                          filterShortcut
                            ? `${categoryIndex + 1}`
                            : command.shortcut
                        }
                      />
                    </CommandShortcut>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        {filterShortcut && filteredCommands.length > 0 && (
          <div className="text-muted-foreground px-2 py-1 text-xs">
            Press 1-{filteredCommands.length} to select a command
          </div>
        )}
      </CommandList>
    </CommandDialog>
  );
}
