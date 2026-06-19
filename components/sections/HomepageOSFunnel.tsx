'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Layers,
  FlaskConical,
  Library,
  Wand2,
  ArrowRight,
} from 'lucide-react';

type AccentKey = 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose';

const accentConfig: Record<AccentKey, {
  gradFrom: string;
  iconBadge: string;
  iconText: string;
  ctaText: string;
  featuredRing: string;
}> = {
  emerald: {
    gradFrom: 'from-accent-emerald/[0.09]',
    iconBadge: 'icon-badge-emerald',
    iconText: 'text-accent-emerald',
    ctaText: 'text-accent-emerald',
    featuredRing: 'ring-1 ring-accent-emerald/20',
  },
  violet: {
    gradFrom: 'from-accent-violet/[0.09]',
    iconBadge: 'icon-badge-violet',
    iconText: 'text-accent-violet',
    ctaText: 'text-accent-violet',
    featuredRing: '',
  },
  cyan: {
    gradFrom: 'from-accent-cyan/[0.09]',
    iconBadge: 'icon-badge-cyan',
    iconText: 'text-accent-cyan',
    ctaText: 'text-accent-cyan',
    featuredRing: '',
  },
  amber: {
    gradFrom: 'from-accent-amber/[0.09]',
    iconBadge: 'icon-badge-amber',
    iconText: 'text-accent-amber',
    ctaText: 'text-accent-amber',
    featuredRing: '',
  },
  rose: {
    gradFrom: 'from-accent-rose/[0.09]',
    iconBadge: 'icon-badge-rose',
    iconText: 'text-accent-rose',
    ctaText: 'text-accent-rose',
    featuredRing: '',
  },
};

const osPaths = [
  {
    icon: LayoutDashboard,
    title: 'My Longevity OS',
    desc: 'Command center — stack, labs, milestones, hallmark coverage, export kit.',
    href: '/dashboard',
    cta: 'Open dashboard',
    accent: 'emerald' as AccentKey,
    featured: true,
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Build protocols with live synergy scoring and shareable URLs.',
    href: '/stacks',
    cta: 'Build stack',
    accent: 'violet' as AccentKey,
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log biomarkers locally. Trends, retest nudges, CSV export.',
    href: '/labs',
    cta: 'Track labs',
    accent: 'cyan' as AccentKey,
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: '12 hallmarks, compounds, synergies — searchable and evidence-graded.',
    href: '/library',
    cta: 'Search library',
    accent: 'amber' as AccentKey,
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Simulator, protocol engine, biomarker forecasts, defense scan.',
    href: '/tools',
    cta: 'Open tools',
    accent: 'rose' as AccentKey,
  },
] as const;

export function HomepageOSFunnel() {
  return (
    <section id="os" className="py-16 md:py-24 border-b border-border bg-card section-glow-emerald">
      <div className="container-page">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-label text-accent-emerald mb-2">Longevity OS</p>
          <h2 className="heading-section">
            One operating system. Five entry points.
          </h2>
          <p className="text-body-sm mt-3 max-w-xl mx-auto">
            No paywall, no accounts. Pick your module — everything syncs through your personal OS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {osPaths.map((path, i) => {
            const Icon = path.icon;
            const cfg = accentConfig[path.accent];
            const isFeatured = 'featured' in path && path.featured;

            return (
              <motion.div
                key={path.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  href={path.href}
                  className={[
                    'focus-ring group block h-full rounded-2xl p-6 border border-border/60',
                    'bg-gradient-to-br', cfg.gradFrom, 'to-transparent',
                    'backdrop-blur-md',
                    `glow-hover-${path.accent}`,
                    isFeatured ? cfg.featuredRing : '',
                  ].join(' ')}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${cfg.iconBadge}`}>
                    <Icon className={`w-5 h-5 ${cfg.iconText}`} aria-hidden="true" />
                  </div>

                  <h3 className="font-bold text-lg mb-2 leading-snug">{path.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{path.desc}</p>

                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold mt-5 group-hover:gap-3 transition-all duration-300 ${cfg.ctaText}`}>
                    {path.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
