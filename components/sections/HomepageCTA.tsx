'use client';

import Link from 'next/link';
import { ArrowRight, Scan, BookOpen, LayoutDashboard } from 'lucide-react';

const paths = [
  {
    icon: BookOpen,
    title: 'Search the library',
    desc: 'Hallmarks, compounds, synergies — full-text search with evidence tiers.',
    href: '/library',
    cta: 'Open Library',
    accent: 'cyan',
  },
  {
    icon: Scan,
    title: 'Run defense scan',
    desc: 'Estimate biological age from lifestyle inputs. Sets your OS profile locally.',
    href: '/tools?tab=healthspan',
    cta: 'Defense Scan',
    accent: 'rose',
  },
  {
    icon: LayoutDashboard,
    title: 'Launch command center',
    desc: 'Stack, labs, milestones, hallmark grid — unified dashboard. Data stays local.',
    href: '/dashboard',
    cta: 'Open Dashboard',
    accent: 'emerald',
  },
];

const accentMap = {
  cyan: 'hover:border-accent-cyan/40 group-hover:text-accent-cyan',
  rose: 'hover:border-accent-rose/40 group-hover:text-accent-rose',
  emerald: 'hover:border-accent-emerald/40 group-hover:text-accent-emerald',
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

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {paths.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className={`glass glass-hover rounded-2xl p-7 group transition-all ${accentMap[path.accent as keyof typeof accentMap]}`}
            >
              <path.icon className="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-transform mb-4" />
              <h3 className="font-bold mb-2">{path.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{path.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold transition">
                {path.cta}{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
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
              className="bg-white text-black px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-emerald transition-all text-center flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Launch Longevity OS
            </Link>
            <Link
              href="/library"
              className="glass px-8 py-3.5 rounded-xl font-semibold text-sm hover:border-accent-violet/40 transition-all flex items-center justify-center gap-2"
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