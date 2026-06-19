'use client';

import Link from 'next/link';
import { ArrowRight, Scan, BookOpen, LayoutDashboard } from 'lucide-react';

type AccentKey = 'cyan' | 'rose' | 'emerald';

const paths = [
  {
    icon: BookOpen,
    title: 'Search the library',
    desc: 'Hallmarks, compounds, synergies — full-text search with evidence tiers.',
    href: '/library',
    cta: 'Open Library',
    accent: 'cyan' as AccentKey,
  },
  {
    icon: Scan,
    title: 'Run defense scan',
    desc: 'Estimate biological age from lifestyle inputs. Sets your OS profile locally.',
    href: '/tools?tab=healthspan',
    cta: 'Defense Scan',
    accent: 'rose' as AccentKey,
  },
  {
    icon: LayoutDashboard,
    title: 'Launch command center',
    desc: 'Stack, labs, milestones, hallmark grid — unified dashboard. Data stays local.',
    href: '/dashboard',
    cta: 'Open Dashboard',
    accent: 'emerald' as AccentKey,
  },
];

const accentConfig: Record<AccentKey, {
  iconBadge: string;
  iconText: string;
  gradFrom: string;
  ctaText: string;
  glowHover: string;
}> = {
  cyan: {
    iconBadge: 'icon-badge-cyan',
    iconText: 'text-accent-cyan',
    gradFrom: 'from-accent-cyan/[0.08]',
    ctaText: 'text-accent-cyan',
    glowHover: 'glow-hover-cyan',
  },
  rose: {
    iconBadge: 'icon-badge-rose',
    iconText: 'text-accent-rose',
    gradFrom: 'from-accent-rose/[0.08]',
    ctaText: 'text-accent-rose',
    glowHover: 'glow-hover-rose',
  },
  emerald: {
    iconBadge: 'icon-badge-emerald',
    iconText: 'text-accent-emerald',
    gradFrom: 'from-accent-emerald/[0.08]',
    ctaText: 'text-accent-emerald',
    glowHover: 'glow-hover-emerald',
  },
};

export function HomepageCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-card section-glow-cyan">
      <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/5 via-transparent to-violet-400/5 pointer-events-none" />
      <div className="relative container-page">
        <div className="text-center mb-12">
          <h2 className="heading-section mb-4">
            Three steps into your OS.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Learn → scan → command center. Every path leads to the same local-first Longevity OS.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {paths.map((path) => {
            const cfg = accentConfig[path.accent];
            return (
              <Link
                key={path.title}
                href={path.href}
                className={`group block rounded-2xl p-7 border border-border/60 bg-gradient-to-br ${cfg.gradFrom} to-transparent backdrop-blur-sm transition-all duration-300 ${cfg.glowHover}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${cfg.iconBadge}`}>
                  <path.icon className={`w-5 h-5 ${cfg.iconText}`} aria-hidden="true" />
                </div>
                <h3 className="font-bold mb-2">{path.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{path.desc}</p>
                <span className={`inline-flex items-center gap-2 text-sm font-semibold ${cfg.ctaText} group-hover:gap-3 transition-all`}>
                  {path.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="gradient-border p-8 md:p-12 text-center max-w-3xl mx-auto">
          <p className="text-label text-accent-violet mb-3">YOUR OS AWAITS</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
            Everything in one place.<br className="hidden sm:block" /> Free. Local. Yours.
          </h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Stack architect, lab hub, 12-hallmark library, six evidence tools — all running in your browser with no account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="focus-ring glow-hover-emerald bg-gradient-to-r from-accent-cyan to-accent-emerald text-black px-8 py-3.5 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Launch Longevity OS
            </Link>
            <Link
              href="/library"
              className="focus-ring glass glow-hover-violet px-8 py-3.5 rounded-xl font-semibold text-sm text-accent-violet flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Browse Library <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
