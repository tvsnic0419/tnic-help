'use client';

import { PlatformProvider } from '@/context/PlatformContext';
import { PrivacyConsentBanner } from '@/components/PrivacyConsentBanner';
import type { ReactNode } from 'react';

export function PlatformProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <PlatformProvider>
      {children}
      <PrivacyConsentBanner />
    </PlatformProvider>
  );
}