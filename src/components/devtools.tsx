import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function AppDevTools() {
  return <ReactQueryDevtools initialIsOpen={false} />;
}
