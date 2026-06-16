'use client';

import { PlatformProvider } from '@/context/PlatformContext';
import { PrivacyConsentBanner } from '@/components/PrivacyConsentBanner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { CommandPalette } from '@/components/os/CommandPalette';
import type { ReactNode } from 'react';

export function PlatformProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PlatformProvider>
        <CommandPalette />
        {children}
        <PrivacyConsentBanner />
      </PlatformProvider>
    </ThemeProvider>
  );
}