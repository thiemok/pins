import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';

export function ShortcutLabel({ shortcut }: { shortcut?: string }) {
  const label = useMemo(
    () => shortcut?.replace('Control', 'Ctrl').replace('Meta', '⌘'),
    [shortcut]
  );

  if (!label) return null;

  return <Badge variant="secondary">{label}</Badge>;
}
