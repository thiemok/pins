import { useMutation } from '@tanstack/react-query';

import { useMutationResult } from '@/hooks/use-mutation-result';
import {
  type CreateRouteRequest,
  getRouteResponseSchema,
} from '@/lib/actions/routes/schema';

export function useCreateRoute() {
  const mutation = useMutation({
    mutationKey: ['routes'],
    mutationFn: async (payload: CreateRouteRequest) => {
      const res = await fetch('/api/routes', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.status != 200) {
        throw new Error(`Request returned ${res.status}`);
      }

      const data = await res.json();
      return getRouteResponseSchema.parse(data);
    },
  });

  return useMutationResult(mutation);
}
