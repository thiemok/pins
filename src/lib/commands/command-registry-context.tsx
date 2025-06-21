import { Keystrokes } from '@rwh/keystrokes';
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useIsMac } from '@/hooks/use-is-mac';
import { useRequiredContext } from '@/hooks/use-required-context';
import { CommandRegistry } from '@/lib/commands/command-registry';
import type { CommandRegistration } from '@/lib/commands/types';
import { readableId } from '@/lib/ids';

const COMMAND_REGISTRY_CONTEXT = createContext<CommandRegistry | undefined>(
  undefined
);

export function CommandRegistryProvider({
  onOpenCommandPalette,
  children,
}: PropsWithChildren<{
  onOpenCommandPalette: (filterShortcut?: string) => void;
}>) {
  const contextId = useMemo(() => readableId(), []);
  const registryRef = useRef<CommandRegistry | undefined>(undefined);

  const registry = useMemo(() => {
    if (registryRef.current) {
      registryRef.current.setCommandPaletteHandler(onOpenCommandPalette);
    } else {
      registryRef.current = new CommandRegistry(
        contextId,
        onOpenCommandPalette,
        new Keystrokes()
      );
    }

    return registryRef.current;
  }, [contextId, onOpenCommandPalette]);

  useEffect(() => () => registry.shutdown(), [registry]);

  return (
    <COMMAND_REGISTRY_CONTEXT.Provider value={registry}>
      {children}
    </COMMAND_REGISTRY_CONTEXT.Provider>
  );
}

export function useCommandRegistry() {
  const commandRegistry = useRequiredContext(COMMAND_REGISTRY_CONTEXT);
  const [, triggerForcedUpdate] = useState(0);

  useEffect(() => {
    const h = () => triggerForcedUpdate((s) => s + 1);
    commandRegistry.onCommandUpdate(h);
    return () => commandRegistry.offCommandUpdate(h);
  }, [commandRegistry]);

  return useMemo(
    () => ({
      getAllCommands: commandRegistry.getAllCommands.bind(commandRegistry),
      execute: commandRegistry.executeCommand.bind(commandRegistry),
      getCommand: commandRegistry.getCommand.bind(commandRegistry),
      openCommandPalette:
        commandRegistry.openCommandPalette.bind(commandRegistry),
    }),
    [commandRegistry]
  );
}

export function useCommand(registration: CommandRegistration) {
  const commandRegistry = useRequiredContext(COMMAND_REGISTRY_CONTEXT);
  const isMac = useIsMac();

  useEffect(() => {
    if (isMac) {
      registration.shortcut?.replace('Control', 'Meta');
    }

    try {
      commandRegistry.register(registration);
      return () => {
        commandRegistry.unregister(registration.name);
      };
    } catch (error) {
      console.warn(`Failed to register command "${registration.name}":`, error);
    }
  }, [registration, commandRegistry, isMac]);

  return useMemo(() => {
    const execute = () => {
      commandRegistry.executeCommand(registration.name);
    };

    return { execute };
  }, [commandRegistry, registration.name]);
}
