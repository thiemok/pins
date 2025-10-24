import { FileIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';

export function FileDropArea() {
  return (
    <Card className="flex flex-col items-center">
      <FileIcon className="h-12 w-12" />
      <div>Drop a file to upload or click to pick one</div>
    </Card>
  );
}
