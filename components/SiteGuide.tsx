'use client';

import Link from 'next/link';
import { BookOpen, Wrench, Shield, ArrowRight } from 'lucide-react';

const paths = [
  {
    icon: BookOpen,
    title: 'Learn the Science',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    steps: [
      { label: '3-Min starter quiz', href: '/quiz' },
      { label: 'Learn hub', href: '/learn' },
      { label: 'FAQ — 12 answers', href: '/faq' },
      { label: 'Search library', href: '/library' },
      { label: 'Compound deep-dives', href: '/library/compounds/glynac' },
    ],
  },
  {
    icon: Wrench,
    title: 'Use the OS',
    color: 'text-accent-violet',
    bg: 'bg-accent-violet/10',
    steps: [
      { label: 'Personal dashboard', href: '/dashboard' },
      { label: 'Stack Architect', href: '/stacks' },
      { label: 'Defense scan', href: '/tools?tab=healthspan' },
      { label: 'Lab hub (local)', href: '/labs' },
    ],
  },
  {
    icon: Shield,
    title: 'Verify & Trust',
    color: 'text-accent-emerald',
    bg: 'bg-accent-emerald/10',
    steps: [
      { label: 'Evidence standards', href: '/trust/methodology' },
      { label: 'Safety & disclaimers', href: '/trust/disclaimers' },
      { label: 'Founder journey', href: '/trust/journey' },
      { label: 'Platform updates', href: '/trust/updates' },
    ],
  },
];

export function SiteGuide() {
  return (
    <section className="py-16 border-b border-border bg-[#0a0f1a]/40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">
          How to use this site
        </p>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">Three paths through TNiC</h2>
        <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-10">
          New to longevity science? Start with the library. Ready to build? Open your OS. Skeptical? Trust
          comes first.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div key={path.title} className="glass rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-xl ${path.bg} flex items-center justify-center mb-4`}>
                <path.icon className={`w-5 h-5 ${path.color}`} />
              </div>
              <h3 className={`font-bold mb-4 ${path.color}`}>{path.title}</h3>
              <ul className="space-y-2">
                {path.steps.map((step) => (
                  <li key={step.label}>
                    <Link
                      href={step.href}
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition group py-1"
                    >
                      {step.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}