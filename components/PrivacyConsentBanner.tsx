'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';

export function PrivacyConsentBanner() {
  const { privacyConsent, acceptPrivacyConsent } = usePlatform();
  const [dismissed, setDismissed] = useState(false);

  if (privacyConsent || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="privacy-banner-title"
      aria-describedby="privacy-banner-desc"
      className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6"
    >
      <div className="container-page max-w-3xl mx-auto glass border border-emerald-400/20 rounded-xl p-4 md:p-5 shadow-2xl">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p id="privacy-banner-title" className="text-sm font-semibold text-white mb-1">
              Local-only health data
            </p>
            <p id="privacy-banner-desc" className="text-xs text-zinc-500 leading-relaxed">
              Labs, stacks, and notes stay in your browser — never on TNiC servers. You control export and deletion.{' '}
              <Link href="/labs" className="text-cyan-400 hover:text-emerald-400">
                Privacy panel
              </Link>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={acceptPrivacyConsent}
                className="focus-ring interactive px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-400 text-xs font-semibold border border-emerald-400/30"
              >
                Got it
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="focus-ring interactive px-4 py-2 rounded-lg text-xs font-semibold text-zinc-500 hover:text-zinc-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}