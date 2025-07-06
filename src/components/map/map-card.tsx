import { GpxViewer } from '@/components/map/gpx-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MapCardProps = {
  className?: string;
};

export function MapCard({ className }: MapCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Map</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch">
        <GpxViewer />
      </CardContent>
    </Card>
  );
}
