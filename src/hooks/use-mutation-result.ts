import { type UseMutationResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export type MutationStatus = 'idle' | 'pending' | 'error' | 'success';

export function useMutationResult<T extends UseMutationResult>(mutation: T) {
  return useMemo(
    () => ({
      ...mutation,
      useMutationStatus: () => {
        if (mutation.isError) return 'error';
        if (mutation.isSuccess) return 'success';
        if (mutation.isPending) return 'pending';
        return 'idle';
      },
    }),
    [mutation]
  );
}
