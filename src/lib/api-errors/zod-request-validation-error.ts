import { constants } from 'node:http2';

import { z, type ZodError } from 'zod/v4';

import { BaseError } from '@/lib/api-errors/base-errors';

export class ZodRequestValidationError extends BaseError<
  undefined,
  { issues: unknown }
> {
  constructor(error: ZodError) {
    super(
      'Invalid Request',
      'validation-failed',
      constants.HTTP_STATUS_BAD_REQUEST,
      undefined,
      { issues: z.treeifyError(error) }
    );
  }
}
