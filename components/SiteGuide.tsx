'use client';

import { BookOpen, Wrench, Shield, ArrowRight } from 'lucide-react';

const paths = [
  {
    icon: BookOpen,
    title: 'Learn the Science',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    steps: [
      { label: 'Start Here guide', href: '#learn' },
      { label: '12 Hallmarks', href: '#science' },
      { label: 'Research Intel', href: '#research' },
      { label: 'Glossary', href: '#learn' },
    ],
  },
  {
    icon: Wrench,
    title: 'Use the Tools',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    steps: [
      { label: 'Lab tracker (local)', href: '/labs' },
      { label: 'Stack Architect + share', href: '#stacks' },
      { label: 'Bio Age calculator', href: '#calculator' },
      { label: 'Synced daily protocol', href: '#protocol' },
    ],
  },
  {
    icon: Shield,
    title: 'Verify & Trust',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    steps: [
      { label: 'Evidence standards', href: '/trust' },
      { label: 'Safety center', href: '/trust/disclaimers' },
      { label: 'FAQ', href: '#learn' },
      { label: 'Red flags guide', href: '#learn' },
    ],
  },
];

export function SiteGuide() {
  return (
    <section className="py-16 border-b border-white/[0.06] bg-[#0a0f1a]/40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
          How to use this site
        </p>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
          Three Paths Through TNiC
        </h2>
        <p className="text-center text-sm text-zinc-500 max-w-xl mx-auto mb-10">
          New to longevity science? Start with Learn. Ready to build? Jump to Tools. Skeptical? Trust comes first.
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
                    <a
                      href={step.href}
                      className="flex items-center justify-between text-sm text-zinc-400 hover:text-white transition group py-1"
                    >
                      {step.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
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