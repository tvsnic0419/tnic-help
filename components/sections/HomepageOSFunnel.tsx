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
import { usePlatform } from '@/context/PlatformContext';
import { getOsFunnelOrder } from '@/lib/homepage-personalization';

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
    desc: 'Your personal command center. See your active stack, hallmark coverage map, lab biomarker status, outcome milestones, and protocol export — all unified in one living dashboard.',
    context: 'The central hub that ties every module together. At a glance: which hallmarks you\'re targeting, whether your biomarkers are trending toward optimal, and what to adjust next.',
    href: '/dashboard',
    cta: 'Open dashboard',
    accent: 'emerald' as AccentKey,
    featured: true,
    step: '01',
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Design evidence-grade protocols with live synergy scoring, pathway-level contraindication checks, and Tier A/B/C compound ratings from human clinical trials.',
    context: 'Not a random supplement bundle. Every compound is mechanism-mapped to a hallmark, synergy-checked against others in your stack, and graded before it enters a preset.',
    href: '/stacks',
    cta: 'Architect your stack',
    accent: 'violet' as AccentKey,
    step: '02',
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log and trend your real biomarkers — NAD+, hs-CRP, glutathione, HbA1c, IGF-1. Compare your bloodwork against modeled longevity projections with retest nudges and CSV export.',
    context: 'All data stays in your browser. No cloud accounts, no third-party data sharing. Compare your actual labs to protocol benchmarks and visualize progress over time.',
    href: '/labs',
    cta: 'Track your labs',
    accent: 'cyan' as AccentKey,
    step: '03',
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: 'Deep-dive into all 12 Hallmarks of Aging with compound-level evidence dossiers, pathway synergy guides, mechanism diagrams, and primary PMID citations for every claim.',
    context: 'Every entry links directly to the originating human trial. Search by compound, hallmark, pathway, or symptom. Evidence-graded and updated as the science evolves.',
    href: '/library',
    cta: 'Explore the library',
    accent: 'amber' as AccentKey,
    step: '04',
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Six interactive simulators: stack interaction network, biomarker forecasting, defense scan, biological age calculator, hallmark coverage analyzer, and protocol timeline.',
    context: 'Run scenarios before you commit to a protocol. All local-first, no paywall, no account required. Model how compound combinations affect your hallmark coverage score.',
    href: '/tools',
    cta: 'Run the tools',
    accent: 'rose' as AccentKey,
    step: '05',
  },
] as const;

const funnelNextByGoal: Record<string, string> = {
  learn: 'Start at the Library for mechanism-mapped deep-dives, then take the quiz for a stack preset.',
  defense: 'Run Defense Scan first, then build an NRF2-focused stack with synergy scoring.',
  energy: 'Open Stack Architect for mitochondrial presets, then log NAD+ and inflammation labs.',
  full: 'Open your dashboard for the full OS picture, then customize the Hybrid preset in Stack Architect.',
};

export function HomepageOSFunnel() {
  const { quizResult } = usePlatform();
  const order = getOsFunnelOrder(quizResult?.goal);
  const sorted = [...osPaths].sort((a, b) => order.indexOf(a.href) - order.indexOf(b.href));
  const featuredHref = order[0];
  const contextNext = funnelNextByGoal[quizResult?.goal ?? ''] ?? 'Start at the dashboard for the full picture, or jump directly to the module you need right now.';

  return (
    <section id="os" className="py-16 md:py-24 border-b border-border bg-card section-glow-emerald section-mesh">
      <div className="container-page">
        <div className="text-center mb-8 md:mb-10 section-header-mesh">
          <p className="text-eyebrow text-accent-emerald mb-4">Longevity OS · Platform Architecture</p>
          <h2 className="headline-editorial mb-5">
            One OS.<br />
            <span className="shimmer-text">Five modules. Zero excuses.</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto leading-relaxed">
            Every module is free, local-first, and held to the same rigorous evidence standard that grades every compound in the library. No paywalls. No accounts. No supplement agenda driving the recommendations.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-caption font-mono text-accent-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              Free forever
            </span>
            <span className="inline-flex items-center gap-1.5 text-caption font-mono text-accent-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              Local-first · No cloud
            </span>
            <span className="inline-flex items-center gap-1.5 text-caption font-mono text-accent-violet">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
              No accounts required
            </span>
          </div>
        </div>

        <ContextRail
          what="Five evidence-grounded modules — stack architect, biomarker tracker, library, tools, and dashboard — built around the 12 Hallmarks of Aging."
          why="Most people combine supplements from multiple sources with no synergy check and no outcome tracking. TNiC maps every compound to a specific hallmark, checks pathway interactions, and tracks results over time."
          next={contextNext}
          theme="emerald"
          className="mb-10 md:mb-14 max-w-4xl mx-auto"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((path, i) => {
            const Icon = path.icon;
            const cfg = accentConfig[path.accent];
            const isFeatured = path.href === featuredHref;

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
                    'focus-ring group block h-full rounded-2xl p-6 card-premium',
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