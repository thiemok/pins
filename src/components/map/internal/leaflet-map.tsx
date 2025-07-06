'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { type LatLngExpression } from 'leaflet';
import { type PropsWithChildren } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { DEFAULT_ZOOM } from '@/components/map/internal/constants';
import {
  type BoundsOptions,
  type MapCoordinates,
} from '@/components/map/types';

type InitialBoundsOptions = {
  bounds: [MapCoordinates, MapCoordinates];
  options?: BoundsOptions;
};

type LeafletMapProps = {
  initialZoom?: number;
  initialCenter?: LatLngExpression;
  initialBounds?: InitialBoundsOptions;
};

export function LeafletMap({
  initialZoom = DEFAULT_ZOOM,
  initialCenter,
  initialBounds,
  children,
}: PropsWithChildren<LeafletMapProps>) {
  return (
    <MapContainer
      center={initialCenter}
      bounds={initialBounds?.bounds}
      boundsOptions={
        initialBounds
          ? {
              animate: initialBounds.options?.animate,
              padding: initialBounds.options?.padding,
            }
          : undefined
      }
      zoom={initialZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
