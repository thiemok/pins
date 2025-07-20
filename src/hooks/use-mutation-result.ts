import type { DefaultError } from '@tanstack/query-core';
import { type UseMutationResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export type MutationStatus = 'idle' | 'pending' | 'error' | 'success';

export function useMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
>(mutation: UseMutationResult<TData, TError, TVariables, TContext>) {
  return useMemo(
    () => ({
      ...mutation,
      useMutationStatus: (): MutationStatus => {
        if (mutation.isError) return 'error';
        if (mutation.isSuccess) return 'success';
        if (mutation.isPending) return 'pending';
        return 'idle';
      },
    }),
    [mutation]
  );
}
