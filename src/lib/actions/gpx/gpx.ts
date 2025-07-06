'use server';

import { readFile } from 'node:fs/promises';

import GpxParser, { type Track as GPXTrack } from 'gpxparser';

import {
  type GetTestTrackResponse,
  type Track,
  type TrackBounds,
  type TrackPoint,
} from '@/lib/actions/gpx/schema';

export async function getGpxData(): Promise<GetTestTrackResponse> {
  const data = await readFile('./public/testTrack.gpx', { encoding: 'utf-8' });
  const gpx = new GpxParser();
  gpx.parse(data);

  const track = gpx.tracks[0];

  if (!track) throw new Error('GPX Data did not contain a track');

  return {
    name: gpx.metadata.name,
    track: mapTrack(track),
    bounds: findBounds(track.points),
  };
}

function findBounds(track: TrackPoint[]): TrackBounds {
  const minLat = Math.min(...track.map(({ lat }) => lat));
  const minLon = Math.min(...track.map(({ lon }) => lon));
  const maxLat = Math.max(...track.map(({ lat }) => lat));
  const maxLon = Math.max(...track.map(({ lon }) => lon));

  return [
    { lat: minLat, lon: minLon },
    { lat: maxLat, lon: maxLon },
  ];
}

function mapTrack(track: GPXTrack): Track {
  return {
    points: track.points.map((p) => ({
      lat: p.lat,
      lon: p.lon,
      ele: p.ele,
      time: p.time ?? undefined,
    })),
  };
}
