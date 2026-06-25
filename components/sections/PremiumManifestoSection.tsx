'use client';

import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Fingerprint, FlaskConical, TrendingUp } from 'lucide-react';

const ACCENT = '#22d3ee';
const ACCENT_BG = 'rgba(34,211,238,0.05)';
const ACCENT_BORDER = 'rgba(255,255,255,0.06)';

const pillars = [
  {
    icon: FlaskConical,
    stat: '14+',
    label: 'Compounds',
    claim: 'Every entry requires a human-trial citation. No PMID, no protocol.',
  },
  {
    icon: TrendingUp,
    stat: 'A / B / C',
    label: 'Evidence Tiers',
    claim: 'RCT-grade, observational, and mechanistic evidence graded separately — never blended.',
  },
  {
    icon: Fingerprint,
    stat: '100%',
    label: 'Local-First',
    claim: 'Your biomarkers, stack, and lab results live in your browser. Never on our servers.',
  },
  {
    icon: ShieldCheck,
    stat: '$0',
    label: 'Commission',
    claim: 'We earn nothing from product sales. COA checklists, not affiliate links.',
  },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export function PremiumManifestoSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden section-deep">
      {/* Faint grid overlay */}
      <div className="absolute inset-0 section-deep pointer-events-none" aria-hidden="true" />

      <div className="relative container-page">
        {/* Editorial headline block */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-20"
        >
          <p className="text-eyebrow text-accent-cyan mb-6">Why we built this differently</p>

          <h2 className="headline-editorial mb-6">
            Longevity science has a<br />
            <span className="gradient-sweep-text">transparency problem.</span>
          </h2>

          <p className="manifesto-text max-w-2xl">
            Supplement companies cite rodent studies as human proof. Platforms sell protocols
            before explaining the mechanism. Research is locked behind paywalls. We built TNiC
            to fix all three — open science, graded evidence, and zero financial conflict.
          </p>
        </motion.div>

        {/* Bento grid of proof pillars */}
        <div className="bento-grid">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="bento-cell tnic-card p-8 flex flex-col gap-5"
              style={{
                background: ACCENT_BG,
                borderColor: ACCENT_BORDER,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
                aria-hidden="true"
              >
                <p.icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>

              <div>
                <span
                  className="font-mono text-3xl font-black tracking-tight block leading-none mb-1 text-white"
                >
                  {p.stat}
                </span>
                <span
                  className="font-mono text-xs font-bold tracking-widest uppercase text-white/50"
                >
                  {p.label}
                </span>
              </div>

              <p className="text-body-sm leading-relaxed mt-auto text-white/70">{p.claim}</p>

              <div
                className="h-px w-full mt-2"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT}30, transparent)`,
                }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Divider rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 origin-left"
        >
          <div className="gradient-rule-orb">
            <span className="gradient-rule-orb-dot" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
