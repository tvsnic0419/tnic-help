'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { ThemeAccent } from '@/lib/design-system';
import { themes } from '@/lib/design-system';

interface SectionShellProps {
  id: string;
  mod?: string;
  theme: ThemeAccent;
  title: string;
  subtitle: string;
  badge: string;
  children: ReactNode;
  className?: string;
}

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
  const t = themes[theme];

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`py-16 md:py-24 lg:py-32 relative ${t.glow} ${className}`}>
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className={`absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none`} aria-hidden="true" />

      <div className="relative container-page">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {mod && (
                  <span className={`text-label ${t.text} opacity-80 hidden sm:inline`}>{mod}</span>
                )}
                <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
                <span className={`text-label ${t.text}`}>{badge}</span>
              </div>
              <h2 id={`${id}-heading`} className="heading-section mb-3">{title}</h2>
              <p className="text-body">{subtitle}</p>
            </div>
          </div>
        </motion.header>

        {children}
      </div>
    </section>
  );
}