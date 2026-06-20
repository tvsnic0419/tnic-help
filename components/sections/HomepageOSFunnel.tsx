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
import { ContextRail } from '@/components/ui/ContextRail';

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
    featuredRing: 'ring-1 ring-accent-emerald/25',
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
    context: 'Your personal dashboard that ties every module together.',
    href: '/dashboard',
    cta: 'Open dashboard',
    accent: 'emerald' as AccentKey,
    featured: true,
    step: '01',
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Build protocols with live synergy scoring and shareable URLs.',
    context: 'Design evidence-graded supplement stacks with interaction checks.',
    href: '/stacks',
    cta: 'Build stack',
    accent: 'violet' as AccentKey,
    step: '02',
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log biomarkers locally. Trends, retest nudges, CSV export.',
    context: 'Track NAD+, inflammation, and metabolic markers over time.',
    href: '/labs',
    cta: 'Track labs',
    accent: 'cyan' as AccentKey,
    step: '03',
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: '12 hallmarks, compounds, synergies — searchable and evidence-graded.',
    context: 'Deep-dive modules with PMID citations and buyer guides.',
    href: '/library',
    cta: 'Search library',
    accent: 'amber' as AccentKey,
    step: '04',
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Simulator, protocol engine, biomarker forecasts, defense scan.',
    context: 'Six interactive calculators — all local, no paywall.',
    href: '/tools',
    cta: 'Open tools',
    accent: 'rose' as AccentKey,
    step: '05',
  },
] as const;

export function HomepageOSFunnel() {
  return (
    <section id="os" className="py-16 md:py-24 border-b border-border bg-card section-glow-emerald section-mesh">
      <div className="container-page">
        <div className="text-center mb-8 md:mb-10 section-header-mesh">
          <p className="text-label text-accent-emerald mb-2">Longevity OS</p>
          <h2 className="heading-section">
            One operating system. Five entry points.
          </h2>
          <p className="text-body-sm mt-3 max-w-xl mx-auto">
            No paywall, no accounts. Pick your module — everything syncs through your personal OS.
          </p>
        </div>

        <ContextRail
          what="Five interconnected modules that form your personal longevity command center."
          why="Fragmented advice leads to bad stacks. TNiC unifies research, tools, and tracking in one OS."
          next="Start at the dashboard for the full picture, or jump directly to the module you need."
          theme="emerald"
          className="mb-10 md:mb-14 max-w-4xl mx-auto"
        />

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
                    'focus-ring group block h-full rounded-2xl p-6 border border-border/60 card-premium',
                    'bg-gradient-to-br', cfg.gradFrom, 'to-transparent',
                    `glow-hover-${path.accent}`,
                    isFeatured ? cfg.featuredRing : '',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cfg.iconBadge}`}>
                      <Icon className={`w-5 h-5 ${cfg.iconText}`} aria-hidden="true" />
                    </div>
                    <span className="os-card-number">{path.step}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-1.5 leading-snug">{path.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mb-2 leading-relaxed">{path.context}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{path.desc}</p>

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