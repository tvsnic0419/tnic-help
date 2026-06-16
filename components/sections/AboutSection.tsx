'use client';

import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, Heart, User } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';

const pillars = [
  {
    icon: BookOpen,
    title: 'Educate First',
    desc: 'Every tool is paired with plain-language explanations, PubMed citations, and evidence tiers. You understand the why before the what.',
  },
  {
    icon: FlaskConical,
    title: 'Evidence-Graded',
    desc: 'Compounds earn Tier A, B, or C ratings based on human trial data — not marketing claims. Preclinical-only interventions are labeled clearly.',
  },
  {
    icon: Heart,
    title: 'Safety-Centered',
    desc: 'Per-compound contraindications, physician consultation prompts, and realistic outcome timelines. We under-promise and over-cite.',
  },
  {
    icon: User,
    title: 'Personal + General',
    desc: 'Modeled biomarker projections help you explore scenarios. Your lab results (when available) remain the gold standard — TNiC never replaces clinical diagnostics.',
  },
];

const scopeNote = {
  covered: ['NRF2 / glutathione pathways', 'NAD+ & mitochondrial renewal', '12 Hallmarks of Aging framework', 'GlyNAC, NMN, Ca-AKG, Sulforaphane, R-ALA, Resveratrol'],
  planned: ['Rapamycin / mTOR modulation (Tier C — physician-supervised only)', 'SIRT1/PGC-1α deep-dive module', 'Personal lab upload & analysis', 'Follistatin / myostatin pathway (research stage)'],
};

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      mod="MOD-ABT-00"
      theme="cyan"
      badge="About TNiC"
      title="An Educational Longevity Platform"
      subtitle="TNiC is not a supplement store or a personal health blog. It is a structured, science-backed resource for adults optimizing healthspan — with interactive tools to turn research into actionable protocols."
      className="bg-[#030712]"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <p.icon className="w-6 h-6 text-cyan-400 mb-4" />
            <h3 className="font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="gradient-border p-6">
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-3">Currently Covered</p>
          <ul className="space-y-2">
            {scopeNote.covered.map((item) => (
              <li key={item} className="text-sm text-zinc-300 flex items-start gap-2">
                <span className="text-emerald-400 shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="gradient-border p-6">
          <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-3">Planned / Advanced (Roadmap)</p>
          <ul className="space-y-2">
            {scopeNote.planned.map((item) => (
              <li key={item} className="text-sm text-zinc-400 flex items-start gap-2">
                <span className="text-amber-400 shrink-0">○</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-600 mt-4 border-t border-white/[0.06] pt-3">
            Advanced interventions like rapamycin require physician supervision. TNiC will document evidence and risks — never promote unsupervised use.
          </p>
        </div>
      </div>

      <p className="text-xs text-zinc-600 text-center mt-8 font-mono">
        Last reviewed: June 2026 · Content version 1.2 · Evidence tiers re-evaluated quarterly
      </p>
    </SectionShell>
  );
}