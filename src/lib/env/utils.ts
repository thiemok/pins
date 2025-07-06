import { clientEnv } from '@/lib/env/client';

export function isDev() {
  return clientEnv.NEXT_PUBLIC_VERCEL_ENV === 'development';
}

export function isPreProduction() {
  return clientEnv.NEXT_PUBLIC_VERCEL_ENV !== 'production';
}
