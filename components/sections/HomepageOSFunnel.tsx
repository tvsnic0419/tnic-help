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

const osPaths = [
  {
    icon: LayoutDashboard,
    title: 'My Longevity OS',
    desc: 'Command center — stack, labs, milestones, hallmark coverage, export kit.',
    href: '/dashboard',
    cta: 'Open dashboard',
    accent: 'emerald',
    featured: true,
  },
  {
    icon: Layers,
    title: 'Stack Architect',
    desc: 'Build protocols with live synergy scoring and shareable URLs.',
    href: '/stacks',
    cta: 'Build stack',
    accent: 'violet',
  },
  {
    icon: FlaskConical,
    title: 'Lab Hub',
    desc: 'Log biomarkers locally. Trends, retest nudges, CSV export.',
    href: '/labs',
    cta: 'Track labs',
    accent: 'cyan',
  },
  {
    icon: Library,
    title: 'Anti-Aging Library',
    desc: '12 hallmarks, compounds, synergies — searchable and evidence-graded.',
    href: '/library',
    cta: 'Search library',
    accent: 'amber',
  },
  {
    icon: Wand2,
    title: 'Longevity Tools',
    desc: 'Simulator, protocol engine, biomarker forecasts, defense scan.',
    href: '/tools',
    cta: 'Open tools',
    accent: 'rose',
  },
] as const;

const accentBorder: Record<string, string> = {
  emerald: 'hover:border-accent-emerald/40',
  violet: 'hover:border-accent-violet/40',
  cyan: 'hover:border-accent-cyan/40',
  amber: 'hover:border-accent-amber/40',
  rose: 'hover:border-accent-rose/40',
};

export function HomepageOSFunnel() {
  return (
    <section id="os" className="py-16 md:py-24 border-b border-border">
      <div className="container-page">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-label text-accent-emerald mb-2">Longevity OS</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            One operating system. Five entry points.
          </h2>
          <p className="text-body-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            No paywall, no accounts. Pick your module — everything syncs through your personal OS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {osPaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={'featured' in path && path.featured ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <Link
                  href={path.href}
                  className={`focus-ring glass glass-hover rounded-2xl p-6 h-full flex flex-col border border-border transition-colors group ${accentBorder[path.accent]} ${'featured' in path && path.featured ? 'lg:row-span-1 ring-1 ring-accent-emerald/20' : ''}`}
                >
                  <Icon
                    className={`w-6 h-6 mb-4 ${'featured' in path && path.featured ? 'text-accent-emerald' : 'text-muted-foreground group-hover:text-accent-cyan'} transition-colors`}
                    aria-hidden="true"
                  />
                  <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{path.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-emerald mt-4 group-hover:gap-2 transition-all">
                    {path.cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
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