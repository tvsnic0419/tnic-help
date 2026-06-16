'use client';

import { Shield, BookOpen, AlertCircle } from 'lucide-react';

export function TrustBanner() {
  return (
    <div className="bg-emerald-400/5 border-y border-emerald-400/10">
      <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-caption">
        <span className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          Evidence-graded · PubMed-cited
        </span>
        <span className="hidden sm:block text-zinc-700">|</span>
        <span className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <a href="/trust/methodology" className="focus-ring hover:text-cyan-400 transition-colors rounded">Transparent methodology</a>
        </span>
        <span className="hidden sm:block text-zinc-700">|</span>
        <span className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <a href="/trust" className="focus-ring hover:text-amber-400 transition-colors rounded">Safety data for every compound</a>
        </span>
      </div>
    </div>
  );
}