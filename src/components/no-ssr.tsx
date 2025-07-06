import dynamic from 'next/dynamic';
import { type PropsWithChildren } from 'react';

const NoSSRInternal = ({ children }: PropsWithChildren) => <>{children}</>;

export const NoSSR = dynamic(() => Promise.resolve(NoSSRInternal), {
  ssr: false,
});
