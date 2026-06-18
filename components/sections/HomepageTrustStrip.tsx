'use client';

import {
  Shield,
  HardDrive,
  Scale,
  FileText,
  Download,
  BadgeCheck,
} from 'lucide-react';

const badges = [
  { icon: BadgeCheck, label: 'Tier A/B/C graded', desc: 'Human trial honesty' },
  { icon: HardDrive, label: 'Local-first data', desc: 'No accounts required' },
  { icon: Scale, label: 'No shop bias', desc: 'Intelligence, not inventory' },
  { icon: FileText, label: 'MDX + PMID cited', desc: 'Traceable sources' },
  { icon: Download, label: 'Export your data', desc: 'CSV & JSON kit' },
  { icon: Shield, label: 'Evidence-first', desc: 'Est. 2025' },
] as const;

export function HomepageTrustStrip() {
  return (
    <section aria-label="Trust indicators" className="border-b border-border bg-card/30">
      <div className="container-page py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="glass rounded-xl p-4 text-center hover:border-accent-emerald/20 transition-colors"
            >
              <badge.icon
                className="w-5 h-5 text-accent-emerald mx-auto mb-2"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold leading-tight">{badge.label}</p>
              <p className="text-caption font-mono mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}