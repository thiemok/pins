import {
  useGpxInitialPosition,
  useGpxPoints,
} from '@/components/map/behaviour/gpx-behaviour';
import { Map } from '@/components/map/map';
import { Track } from '@/components/map/track';
import { type GetTestTrackResponse } from '@/lib/actions/gpx/schema';
import { useTestTrack } from '@/lib/actions/gpx/use-test-track';

export function GpxViewer() {
  const { data, useStatus } = useTestTrack();
  const status = useStatus();

  return (
    <div className="flex h-[800px] w-full flex-col items-stretch">
      {status === 'success' && <GpxViewerImpl data={data!} />}
    </div>
  );
}

function GpxViewerImpl({ data }: { data: GetTestTrackResponse }) {
  const useInitialPosition = useGpxInitialPosition(data.bounds);
  const points = useGpxPoints(data.track);

  return (
    <Map useInitialPosition={useInitialPosition}>
      <Track points={points} />
    </Map>
  );
}
