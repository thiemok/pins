import { z } from 'zod/v4';

export const timestampsSchema = z.object({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime().optional(),
});
