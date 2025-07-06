import { useMemo } from 'react';

import {
  type MapCoordinates,
  type UseInitialPositionBehaviour,
} from '@/components/map/types';
import { type Track, type TrackBounds } from '@/lib/actions/gpx/schema';

export function useGpxInitialPosition(bounds: TrackBounds) {
  return useMemo(() => {
    const result: ReturnType<UseInitialPositionBehaviour> = {
      initialBounds: {
        bounds: [
          [bounds[0].lat, bounds[0].lon],
          [bounds[1].lat, bounds[1].lon],
        ] satisfies [MapCoordinates, MapCoordinates],
      },
    };
    return () => result;
  }, [bounds]);
}

export function useGpxPoints(track: Track): MapCoordinates[] {
  return useMemo(
    () =>
      track.points.map(({ lat, lon }) => [lat, lon] satisfies MapCoordinates),
    [track]
  );
}
