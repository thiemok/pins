import { useQuery } from '@tanstack/react-query';

import { useQueryResult } from '@/hooks/use-query-result';
import { getTestTrackResponseSchema } from '@/lib/actions/gpx/schema';

export function useTestTrack() {
  const result = useQuery({
    queryKey: ['track'],
    queryFn: async () => {
      const res = await fetch('/api/test/gpx');

      if (res.status != 200) {
        throw new Error(`Request returned ${res.status}`);
      }

      const data = await res.json();
      return getTestTrackResponseSchema.parse(data);
    },
  });

  return useQueryResult(result);
}
