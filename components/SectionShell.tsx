'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionShellProps {
  id: string;
  mod: string;
  theme: 'cyan' | 'emerald' | 'amber' | 'violet' | 'rose';
  title: string;
  subtitle: string;
  badge: string;
  children: ReactNode;
  className?: string;
}

const themeMap = {
  cyan: {
    badge: 'text-cyan-400',
    glow: 'section-glow-cyan',
    accent: 'from-cyan-400/10 to-transparent',
    dot: 'bg-cyan-400',
  },
  emerald: {
    badge: 'text-emerald-400',
    glow: 'section-glow-emerald',
    accent: 'from-emerald-400/10 to-transparent',
    dot: 'bg-emerald-400',
  },
  amber: {
    badge: 'text-amber-400',
    glow: 'section-glow-amber',
    accent: 'from-amber-400/10 to-transparent',
    dot: 'bg-amber-400',
  },
  violet: {
    badge: 'text-violet-400',
    glow: 'section-glow-violet',
    accent: 'from-violet-400/10 to-transparent',
    dot: 'bg-violet-400',
  },
  rose: {
    badge: 'text-rose-400',
    glow: 'section-glow-rose',
    accent: 'from-rose-400/10 to-transparent',
    dot: 'bg-rose-400',
  },
};

export function SectionShell({
  id,
  mod,
  theme,
  title,
  subtitle,
  badge,
  children,
  className = '',
}: SectionShellProps) {
  const t = themeMap[theme];

  return (
    <section id={id} className={`py-28 md:py-36 relative ${t.glow} ${className}`}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className={`absolute inset-0 bg-gradient-to-b ${t.accent} pointer-events-none`} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-mono text-[10px] tracking-widest ${t.badge} opacity-70`}>
                  {mod}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${t.dot} pulse-ring`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${t.badge}`}>
                  {badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">{title}</h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>
            <div className="glass rounded-xl px-4 py-3 font-mono text-xs text-zinc-500 shrink-0">
              <span className={t.badge}>●</span> MODULE ACTIVE
            </div>
          </div>
        </motion.div>

        {children}
      </div>
    </section>
  );
}