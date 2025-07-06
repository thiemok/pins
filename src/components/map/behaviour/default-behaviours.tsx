import { DEFAULT_ZOOM } from '@/components/map/internal/constants';
import { type UseInitialPositionBehaviour } from '@/components/map/types';

export function useDefaultCenter(): ReturnType<UseInitialPositionBehaviour> {
  return { initialCenter: [0, 0] };
}

export function useDefaultZoomLevel() {
  return DEFAULT_ZOOM;
}
