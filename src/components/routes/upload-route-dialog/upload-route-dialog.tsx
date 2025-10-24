import { FileDropArea } from '@/components/file-drop-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function UploadRouteDialog() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload new route</DialogTitle>
          <DialogDescription>
            Create a new route by uploading a gpx file
          </DialogDescription>
        </DialogHeader>
        <FileDropArea />
        <DialogFooter>
          <Button>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
