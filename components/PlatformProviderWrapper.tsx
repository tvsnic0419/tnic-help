'use client';

import { PlatformProvider } from '@/context/PlatformContext';
import type { ReactNode } from 'react';

export function PlatformProviderWrapper({ children }: { children: ReactNode }) {
  return <PlatformProvider>{children}</PlatformProvider>;
}