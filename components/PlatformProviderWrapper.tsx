'use client';

import { PlatformProvider } from '@/context/PlatformContext';
import { PrivacyConsentBanner } from '@/components/PrivacyConsentBanner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import type { ReactNode } from 'react';

export function PlatformProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PlatformProvider>
        {children}
        <PrivacyConsentBanner />
      </PlatformProvider>
    </ThemeProvider>
  );
}