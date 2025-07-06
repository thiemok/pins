import { BaseError, ServerError } from '@/lib/api-errors/base-errors';
import { isDev } from '@/lib/env/utils';

function handleError(err: unknown): Response {
  if (err instanceof ServerError) {
    console.error(err.message, err);
  }

  if (err instanceof BaseError) {
    return Response.json(
      {
        message: err.message,
        code: err.errorCode,
        metadata: err.metadata,
        details: isDev() ? err.details : undefined,
      },
      { status: err.statusCode }
    );
  }

  return handleError(
    new ServerError('Internal Server Error', 'unhandled-server-error', {
      cause: err,
    })
  );
}

export function withErrorHandler(handler: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    try {
      return handler(req);
    } catch (err) {
      return handleError(err);
    }
  };
}
