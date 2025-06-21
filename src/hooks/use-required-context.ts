import { type Context, useContext } from 'react';

export function useRequiredContext<T>(context: Context<T | undefined>) {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error(
      `context ${context.displayName} has not been provided, but is required`
    );
  }

  return ctx;
}
