export type MapCoordinates = [x: number, y: number];
export type BoundsOptions = {
  animate?: boolean | undefined;
  padding?: MapCoordinates;
};
export type UseInitialPositionBehaviour = () =>
  | { initialCenter: MapCoordinates }
  | {
      initialBounds: {
        bounds: [MapCoordinates, MapCoordinates];
        options?: BoundsOptions;
      };
    };
export type UseInitialZoomLevelBehaviour = () => number;
