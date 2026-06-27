'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, FlaskConical, Activity } from 'lucide-react';

const STATS = [
  { value: '12', label: 'Hallmarks of aging' },
  { value: '80+', label: 'Evidence-graded compounds' },
  { value: '500+', label: 'Cited studies' },
  { value: '6', label: 'Protocol tools' },
] as const;

const TOOL_PILLS = [
  { icon: BookOpen, label: 'Hallmark Library', href: '/library', color: 'text-accent-cyan' },
  { icon: Layers, label: 'Stack Architect', href: '/stacks', color: 'text-accent-emerald' },
  { icon: FlaskConical, label: 'Lab Tracker', href: '/labs', color: 'text-accent-violet' },
  { icon: Activity, label: 'Healthspan Tools', href: '/tools', color: 'text-accent-amber' },
] as const;

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  return (
    <section
      id="hero"
      className="relative hero-mesh noise min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 md:pt-24 pb-12 md:pb-16"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — copy + CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-7 text-sm text-foreground/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs tracking-wide">Evidence-first longevity science</span>
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight leading-[1.08] mb-6"
            >
              12 causes of aging.
              <br />
              <span className="text-accent-cyan">One place to fight</span>{' '}
              <span className="text-foreground">all of them.</span>
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1 }}
              className="text-body max-w-xl mb-8 mx-auto lg:mx-0"
            >
              Explore the science behind every hallmark of aging, build an evidence-graded protocol,
              and track biomarkers — all with primary citations and zero data leaving your device.
            </motion.p>

            {/* Stat row */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReduced ? undefined : { delay: 0.2 }}
              className="grid grid-cols-4 gap-3 mb-9 max-w-lg mx-auto lg:mx-0"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="font-display text-xl font-bold text-accent-cyan tabular-nums">{value}</p>
                  <p className="text-[10px] font-mono text-muted-foreground leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReduced ? undefined : { delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/library"
                className="focus-ring interactive group btn-gradient"
              >
                Explore the library
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/dashboard"
                className="focus-ring interactive btn-ghost-premium"
              >
                Open Longevity OS
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-caption font-mono mt-6 mx-auto lg:mx-0"
            >
              Educational only · Not medical advice · No account required
            </motion.p>
          </div>

          {/* Right — tool preview */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={prefersReduced ? undefined : { delay: 0.35, duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="glass rounded-2xl p-6 space-y-3">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Platform tools
              </p>
              {TOOL_PILLS.map(({ icon: Icon, label, href, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/40 bg-card/40 hover:border-border hover:bg-card/70 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-card/60 border border-border/40 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-accent-cyan transition-colors">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </Link>
              ))}

              <div className="pt-3 border-t border-border/30">
                <p className="text-[10px] font-mono text-muted-foreground mb-2">Science coverage</p>
                <div className="flex gap-1 flex-wrap">
                  {['Mitochondria', 'Senescence', 'Epigenetics', 'Proteostasis', 'Telomeres', 'Inflammation'].map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
