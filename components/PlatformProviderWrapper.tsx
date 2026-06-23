'use client';

import { PlatformProvider } from '@/context/PlatformContext';
import { PrivacyConsentBanner } from '@/components/PrivacyConsentBanner';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { CommandPalette } from '@/components/os/CommandPalette';
import { ExportKitModal } from '@/components/os/ExportKitModal';
import { OnboardingModal } from '@/components/os/OnboardingModal';
import type { ReactNode } from 'react';

export function PlatformProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PlatformProvider>
        <CommandPalette />
        <ExportKitModal />
        <OnboardingModal />
        {children}
        <PrivacyConsentBanner />
      </PlatformProvider>
    </ThemeProvider>
  );
}