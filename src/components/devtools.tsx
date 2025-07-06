'use client';

import { useAuth } from '@clerk/nextjs';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';

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

  return <ReactQueryDevtools initialIsOpen={false} />;
}
