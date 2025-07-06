import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { type MapCoordinates } from '@/components/map/types';

type TrackProps = {
  points: MapCoordinates[];
};

export function Track({ points }: TrackProps) {
  const PolylineComponent = usePolylineComponent();
  return <PolylineComponent positions={points} />;
}

function usePolylineComponent() {
  return useMemo(
    () =>
      dynamic(
        async () => {
          const { Polyline } = await import('react-leaflet');
          return Polyline;
        },
        { ssr: false }
      ),
    []
  );
}
