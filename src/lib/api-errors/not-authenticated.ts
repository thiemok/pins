import { constants } from 'node:http2';

import { BaseError } from '@/lib/api-errors/base-errors';

export class UnexpectedlyNotAuthenticated extends BaseError<string> {
  constructor() {
    super(
      'Not Authenticated',
      'not-authenticated',
      constants.HTTP_STATUS_UNAUTHORIZED,
      'Unexpectedly not authenticated, make sure the route is protected'
    );
  }
}
