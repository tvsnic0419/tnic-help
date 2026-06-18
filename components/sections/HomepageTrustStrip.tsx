'use client';

import Link from 'next/link';
import {
  Shield,
  HardDrive,
  Scale,
  FileText,
  Download,
  BadgeCheck,
} from 'lucide-react';

const badges = [
  { icon: BadgeCheck, label: 'Tier A/B/C graded', desc: 'Human trial honesty', href: '/trust/methodology' },
  { icon: HardDrive, label: 'Local-first data', desc: 'No accounts required', href: '/trust/disclaimers' },
  { icon: Scale, label: 'No shop bias', desc: 'Intelligence, not inventory', href: '/shop' },
  { icon: FileText, label: 'MDX + PMID cited', desc: 'Traceable sources', href: '/library' },
  { icon: Download, label: 'Export your data', desc: 'CSV & JSON kit', href: '/dashboard' },
  { icon: Shield, label: 'Evidence-first', desc: 'Est. 2025', href: '/trust' },
] as const;

export function HomepageTrustStrip() {
  return (
    <section aria-label="Trust indicators" className="border-b border-border bg-card/30">
      <div className="container-page py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {badges.map((badge) => (
            <Link
              key={badge.label}
              href={badge.href}
              className="focus-ring glass rounded-xl p-4 text-center hover:border-accent-emerald/30 hover:bg-accent-emerald/5 transition-all group block"
            >
              <badge.icon
                className="w-5 h-5 text-accent-emerald mx-auto mb-2 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold leading-tight group-hover:text-accent-emerald transition-colors">{badge.label}</p>
              <p className="text-caption font-mono mt-1">{badge.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}