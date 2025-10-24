import { WrenchIcon } from 'lucide-react';
import { useCallback, useRef } from 'react';

import { DEV_TOOLS_COMMAND_CATEGORY } from '@/dev/constants';
import { useCreateRoute } from '@/lib/actions/routes/use-create-route';
import { useCommand } from '@/lib/commands/command-registry-context';
import { slugify } from '@/lib/utils/slugify';

export function useCreateTestRouteCommand() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createRoute } = useCreateRoute();
  const handleCreateRoute = useCallback(() => {
    const file = inputRef.current?.files?.[0];

    if (!file) return;

    const name = slugify(file.name.replace(/\..*$/, ''));

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

      if (result && typeof result === 'string' && !Buffer.isBuffer(result)) {
        createRoute({
          name: name,
          track: reader.result as string,
        });
      }

      console.error('file content was not string');
    };
    reader.onerror = () => {
      console.error('Failed to read file');
    };

    reader.readAsText(file);
  }, [createRoute]);

  const handleExecute = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  useCommand({
    name: 'Create Test Route',
    category: DEV_TOOLS_COMMAND_CATEGORY,
    icon: (
      <div>
        <WrenchIcon className="h-4 w-4" />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="text/*"
          onChange={handleCreateRoute}
        />
      </div>
    ),
    execute: handleExecute,
  });
}
