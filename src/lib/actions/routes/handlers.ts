import { constants } from 'node:http2';

import GpxParser from 'gpxparser';

import { dbClient } from '@/db/client';
import { routes } from '@/db/schema';
import {
  type CreateRouteRequest,
  type GetRouteResponse,
} from '@/lib/actions/routes/schema';
import { BaseError } from '@/lib/api-errors/base-errors';
import { readableId } from '@/lib/ids';

export async function createRoute(
  data: CreateRouteRequest,
  userId: string
): Promise<GetRouteResponse> {
  const gpx = new GpxParser();

  try {
    gpx.parse(data.track);
  } catch (e) {
    throw new BaseError(
      'Unable to parse track',
      'invalid-gpx-track',
      constants.HTTP_STATUS_BAD_REQUEST,
      { cause: e }
    );
  }

  const track = gpx.tracks[0];

  if (!track) {
    throw new BaseError(
      'Gpx data did not contain a track',
      'missing-gpx-track',
      constants.HTTP_STATUS_BAD_REQUEST
    );
  }

  const [result] = await dbClient
    .insert(routes)
    .values({
      name: data.name,
      owner: userId,
      slug: readableId(),
      track: track.points.map((p) => [p.lat, p.lon, p.ele]),
    })
    .returning()
    .onConflictDoUpdate({
      target: routes.slug,
      set: { slug: readableId() },
    });

  return {
    slug: result.slug,
    name: result.name,
    owner: result.owner,
    createdAt: result.created_at.toISOString(),
    updatedAt: result.updated_at?.toISOString(),
    track: { points: result.track },
  };
}
