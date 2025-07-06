import dynamic from 'next/dynamic';
import { type PropsWithChildren, useMemo } from 'react';

import {
  useDefaultCenter,
  useDefaultZoomLevel,
} from '@/components/map/behaviour/default-behaviours';
import {
  type UseInitialPositionBehaviour,
  type UseInitialZoomLevelBehaviour,
} from '@/components/map/types';

export type MapProps = {
  useInitialPosition?: UseInitialPositionBehaviour;
  useInitialZoomLevel?: UseInitialZoomLevelBehaviour;
};

export function Map({
  useInitialPosition = useDefaultCenter,
  useInitialZoomLevel = useDefaultZoomLevel,
  children,
}: PropsWithChildren<MapProps>) {
  const MapComponent = useMapComponent();

  const initialPosition = useInitialPosition();
  const initialZoom = useInitialZoomLevel();

  return (
    <MapComponent initialZoom={initialZoom} {...initialPosition}>
      {children}
    </MapComponent>
  );
}

function useMapComponent() {
  return useMemo(
    () =>
      dynamic(
        async () => {
          const { LeafletMap } = await import(
            '@/components/map/internal/leaflet-map'
          );
          return LeafletMap;
        },
        { ssr: false, loading: Skeleton }
      ),
    []
  );
}

function Skeleton() {
  return 'Loading';
}
