import { auth } from '@clerk/nextjs/server';

import { createRoute } from '@/lib/actions/routes/handlers';
import { createRouteRequestSchema } from '@/lib/actions/routes/schema';
import { withErrorHandler } from '@/lib/api-errors/error-handler';
import { UnexpectedlyNotAuthenticated } from '@/lib/api-errors/not-authenticated';
import { ZodRequestValidationError } from '@/lib/api-errors/zod-request-validation-error';

export const POST = withErrorHandler(async (req: Request) => {
  const { userId } = await auth();

  if (!userId) {
    throw new UnexpectedlyNotAuthenticated();
  }

  const payload = await req.json();
  const parsed = createRouteRequestSchema.safeParse(payload);

  if (!parsed.success) {
    throw new ZodRequestValidationError(parsed.error);
  }

  const res = await createRoute(parsed.data, userId);

  return Response.json(res);
});
