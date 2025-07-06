import { type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export type QueryStatus = 'success' | 'loading' | 'error' | 'empty';

type UseStatusOverride = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
};

function makeUseQueryResultStatus(result: UseQueryResult) {
  return (args?: UseStatusOverride): QueryStatus => {
    if (args?.isError || result.isError) return 'error';
    if (args?.isLoading || result.isLoading) return 'loading';
    if (args?.isEmpty || !result.data) return 'empty';
    return 'success';
  };
}

export function useQueryResult<T extends UseQueryResult>(result: T) {
  return useMemo(
    () => ({
      ...result,
      useStatus: makeUseQueryResultStatus(result),
    }),
    [result]
  );
}
