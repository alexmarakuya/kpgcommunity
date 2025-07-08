'use client';
import { useEffect } from 'react';
import posthog from 'posthog-js';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      posthog.init(
        process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_nB3JwgBQAjlPyEDS5YQ5MMBQ9M6s6Ux8Vpx5BMKBrda',
        {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        }
      );
    }
  }, []);

  useEffect(() => {
    posthog.capture('$pageview');
  }, [pathname]);

  return <>{children}</>;
} 