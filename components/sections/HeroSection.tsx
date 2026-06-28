'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Clock, Activity } from 'lucide-react';

const STATS = [
  { value: '12', label: 'Hallmarks of aging' },
  { value: '80+', label: 'Evidence-graded compounds' },
  { value: '500+', label: 'Cited studies' },
  { value: '6', label: 'Protocol tools' },
] as const;

// Foundation stack preview — hardcoded to avoid heavy imports in the critical path
const PREVIEW_STACK = [
  {
    id: 'nmn',
    name: 'NMN',
    full: 'Nicotinamide Mononucleotide',
    category: 'NAD+ Precursor',
    lqScore: 79,
    dose: '500 mg · AM fasted',
    clockImpact: '−2.1 yr',
    hallmarks: 4,
    color: '#22d3ee',
    evidenceTier: 'A',
  },
  {
    id: 'glynac',
    name: 'GlyNAC',
    full: 'Glycine + N-Acetylcysteine',
    category: 'Glutathione Precursor',
    lqScore: 77,
    dose: '1.8 g + 0.9 g · with meals',
    clockImpact: '−3.0 yr',
    hallmarks: 3,
    color: '#fb923c',
    evidenceTier: 'A',
  },
  {
    id: 'sulforaphane',
    name: 'Sulforaphane',
    full: 'Broccoli Sprout Extract',
    category: 'NRF2 Activator',
    lqScore: 74,
    dose: '30 mg equiv. · AM fasted',
    clockImpact: '−0.9 yr',
    hallmarks: 3,
    color: '#10b981',
    evidenceTier: 'A',
  },
] as const;

const SYNERGY_SCORE = 9;
const HALLMARK_COVERAGE = 7;
const EST_CLOCK_SHIFT = '−5.8 yr';

function ScoreBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 120 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

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
              <Link href="/library" className="focus-ring interactive group btn-gradient">
                Explore the library
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/dashboard" className="focus-ring interactive btn-ghost-premium">
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

          {/* Right — Foundation Stack Preview widget */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={prefersReduced ? undefined : { delay: 0.35, duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
              {/* Header */}
              <div className="px-5 pt-5 pb-4 border-b border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    Foundation Stack Preview
                  </p>
                  <span className="text-[9px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded-full">
                    3 compounds · All Tier A
                  </span>
                </div>

                {/* Synergy + clock row */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-accent-cyan" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-accent-cyan">{SYNERGY_SCORE}/10</span>
                    <span className="text-[10px] text-muted-foreground">synergy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent-emerald" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-accent-emerald">{EST_CLOCK_SHIFT}</span>
                    <span className="text-[10px] text-muted-foreground">est. clock</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-accent-violet" aria-hidden="true" />
                    <span className="font-mono text-xs font-black text-accent-violet">{HALLMARK_COVERAGE}/12</span>
                    <span className="text-[10px] text-muted-foreground">hallmarks</span>
                  </div>
                </div>
              </div>

              {/* Compound rows */}
              <div className="divide-y divide-border/20">
                {PREVIEW_STACK.map((c, i) => {
                  const isActive = activeId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveId(isActive ? null : c.id)}
                      className="w-full text-left px-5 py-4 hover:bg-white/[0.02] transition-colors group focus-ring"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-3">
                        {/* Color dot + rank */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-mono font-black"
                          style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}
                        >
                          {i + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm font-semibold">{c.name}</span>
                            <span
                              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                              style={{ color: c.color, background: `${c.color}15` }}
                            >
                              {c.evidenceTier}
                            </span>
                            <span className="ml-auto font-mono text-xs font-black" style={{ color: c.color }}>
                              {c.lqScore}
                            </span>
                          </div>
                          <ScoreBar value={c.lqScore} color={c.color} delay={i * 80} />
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isActive && (
                        <div className="mt-3 ml-11 space-y-1.5">
                          <p className="text-[11px] text-muted-foreground">{c.full}</p>
                          <p className="text-[10px] font-mono text-foreground/50">{c.dose}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] text-accent-emerald font-mono">{c.clockImpact} est. clock</span>
                            <span className="text-[10px] text-muted-foreground/60">{c.hallmarks} hallmarks</span>
                            <Link
                              href={`/library/compounds/${c.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] font-mono text-accent-cyan hover:underline ml-auto"
                            >
                              Deep dive →
                            </Link>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(to right, rgba(34,211,238,0.04), transparent)' }}
              >
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground">
                    Tap any compound to preview · Customize in Stack Architect
                  </p>
                </div>
                <Link
                  href="/stacks"
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
                >
                  Build stack <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>

              {/* Elite 8 teaser */}
              <div className="border-t border-border/30 px-5 py-3 flex items-center gap-3">
                <div className="flex -space-x-1">
                  {['#22d3ee', '#fb923c', '#10b981', '#a78bfa', '#38bdf8'].map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-background"
                      style={{ background: c }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Link href="/elite-8" className="text-[10px] font-mono text-muted-foreground hover:text-accent-amber transition-colors">
                  See the Elite 8 ranking →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
