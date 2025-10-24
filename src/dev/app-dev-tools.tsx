'use client';

import { useAuth } from '@clerk/nextjs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

import { useCreateTestRouteCommand } from '@/dev/use-create-test-route-command';
import { isPreProduction } from '@/lib/env/utils';

declare global {
  interface Window {
    pins: unknown;
  }
}

export function AppDevTools() {
  const auth = useAuth();
  useEffect(() => {
    if (!isPreProduction()) return;

    window.pins = {
      user: auth,
    };
  }, [auth]);

  useCreateTestRouteCommand();

  return <ReactQueryDevtools initialIsOpen={false} />;
}
