import z from 'zod/v4';

const pointSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  ele: z.number(),
  time: z.date().optional(),
});

const trackSchema = z.object({
  points: z.array(pointSchema),
});

const boundsSchema = z.tuple([
  pointSchema.pick({ lat: true, lon: true }),
  pointSchema.pick({ lat: true, lon: true }),
]);

export const getTestTrackResponseSchema = z.object({
  name: z.string(),
  track: trackSchema,
  bounds: boundsSchema,
});

export type TrackPoint = z.infer<typeof pointSchema>;
export type TrackBounds = z.infer<typeof boundsSchema>;
export type Track = z.infer<typeof trackSchema>;
export type GetTestTrackResponse = z.infer<typeof getTestTrackResponseSchema>;
