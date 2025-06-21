import { useMemo } from 'react';

export function useIsMac() {
  return useMemo(() => navigator.userAgent.toLowerCase().includes('mac'), []);
}
