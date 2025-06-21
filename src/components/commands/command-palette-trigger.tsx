import { Button } from '@/components/ui/button';
import { useIsMac } from '@/hooks/use-is-mac';
import { useCommandRegistry } from '@/lib/commands/command-registry-context';

export function CommandPaletteTrigger() {
  const isMac = useIsMac();
  const { openCommandPalette } = useCommandRegistry();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openCommandPalette()}
      className="text-muted-foreground flex items-center gap-2"
    >
      <div className="flex items-center gap-1">
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          {isMac ? (
            <div>
              <span className="text-xs">⌘</span>+K
            </div>
          ) : (
            <div>
              <span className="text-xs">Ctrl</span>+K
            </div>
          )}
        </kbd>
      </div>
    </Button>
  );
}
