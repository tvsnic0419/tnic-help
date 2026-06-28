'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FlaskConical, Lock } from 'lucide-react';
import { ELITE_8_COMPOUNDS, calcLQScore } from '@/lib/elite-8-data';
import { EvidenceTag } from '@/components/trust/EvidenceTag';

const CONFIDENCE_LABELS = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Preliminary data',
  modeled: 'Modeled estimate',
} as const;

const CONFIDENCE_COLORS = {
  high: 'text-accent-emerald',
  moderate: 'text-accent-cyan',
  low: 'text-accent-amber',
  modeled: 'text-muted-foreground',
} as const;

export function CompoundShowcase() {
  const scored = ELITE_8_COMPOUNDS
    .map((c) => ({ ...c, score: Math.round(calcLQScore(c)) }))
    .sort((a, b) => b.score - a.score);

  return (
    <section
      className="relative py-20 md:py-28 border-t border-border"
      aria-labelledby="compound-showcase-heading"
    >
      <div className="container-page">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="text-label text-accent-cyan mb-3">
            LQ Score · 8 Clinical Dimensions · PMID-traceable
          </p>
          <h2 id="compound-showcase-heading" className="heading-section mb-4">
            Evidence-ranked compounds,
            <br className="hidden sm:block" />
            <span className="text-accent-cyan">not influencer picks.</span>
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl">
            Each compound scored across clinical evidence, epigenetic biomarkers, effect size,
            evolutionary conservation, safety, and bioavailability. Rx-only protocols clearly marked.
          </p>
        </motion.div>

        {/* Compound grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scored.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.065, duration: 0.5, ease: 'easeOut' }}
            >
              <Link
                href={c.libraryHref ?? '/elite-8'}
                className="group focus-ring block card-ultra card-ultra-hover p-5 h-full flex flex-col gap-3 rounded-2xl"
              >
                {/* Category + Rx flag */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
                    style={{
                      color: c.color,
                      background: `${c.color}18`,
                      border: `1px solid ${c.color}35`,
                    }}
                  >
                    {c.category}
                  </span>
                  {c.isRx && (
                    <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-accent-amber">
                      <Lock className="w-2.5 h-2.5" aria-hidden="true" />
                      Rx only
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <h3
                    className="text-lg font-bold leading-tight"
                    style={{ color: c.color }}
                  >
                    {c.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {c.full}
                  </p>
                </div>

                {/* LQ score bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      LQ Score
                    </span>
                    <span
                      className="text-sm font-black font-mono"
                      style={{ color: c.color }}
                    >
                      {c.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.score}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.065 + 0.3,
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>

                {/* Mechanism snippet */}
                <p className="text-[12px] text-muted-foreground leading-snug flex-1">
                  {c.mechanism.includes('→')
                    ? c.mechanism.split('→')[0].trim()
                    : c.mechanism}
                </p>

                {/* Clock impact */}
                <div className="pt-2.5 border-t border-white/[0.06]">
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                    Epigenetic clock
                  </p>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">
                    {c.clock}
                  </p>
                  <p
                    className={`text-[10px] font-mono mt-1 ${CONFIDENCE_COLORS[c.clockConfidence]}`}
                  >
                    {CONFIDENCE_LABELS[c.clockConfidence]}
                  </p>
                </div>

                {/* Footer: evidence tier + arrow */}
                <div className="flex items-center justify-between">
                  {c.evidenceTier ? (
                    <EvidenceTag tier={c.evidenceTier} size="sm" showTooltip={false} />
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground">
                      See evidence
                    </span>
                  )}
                  <ArrowRight
                    className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            href="/elite-8"
            className="focus-ring btn-gradient text-sm inline-flex items-center gap-2"
          >
            <FlaskConical className="w-4 h-4" aria-hidden="true" />
            Full Elite 8 scoring matrix
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <p className="text-caption text-muted-foreground mt-3">
            Scores computed from published RCTs. No affiliate incentives. PMIDs on every compound page.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
