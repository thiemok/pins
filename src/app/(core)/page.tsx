'use client';

import { HomePageContent } from '@/components/home-page-content';
import { NoSSR } from '@/components/no-ssr';

export default function Home() {
  return (
    <NoSSR>
      <HomePageContent />
    </NoSSR>
  );
}
