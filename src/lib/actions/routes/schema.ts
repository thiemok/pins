import { z } from 'zod/v4';

import { timestampsSchema } from '@/lib/actions/common-schemas';

export const createRouteRequestSchema = z.object({
  name: z.string(),
  track: z.string(),
});

const pointSchema = z.tuple([z.number(), z.number(), z.number().optional()]);

const trackSchema = z.object({
  points: z.array(pointSchema),
});

export const getRouteResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  owner: z.string(),
  track: trackSchema,
  ...timestampsSchema.shape,
});

export type CreateRouteRequest = z.infer<typeof createRouteRequestSchema>;
export type GetRouteResponse = z.infer<typeof getRouteResponseSchema>;
