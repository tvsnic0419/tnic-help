'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scale, ArrowRight, Pill, Layers } from 'lucide-react';
import { evidenceComparisons } from '@/lib/comparisons';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { ContextRail } from '@/components/ui/ContextRail';

const categoryIcon = {
  compound: Pill,
  stack: Layers,
  form: Scale,
};

export function HomepageCompareRow() {
  return (
    <section className="py-16 md:py-20 border-b border-border bg-background section-glow-cyan">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="text-label text-accent-cyan mb-3">EVIDENCE TOOLS</p>
            <h2 className="heading-section">Head-to-head comparisons</h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm">
              Six neutral tables — NMN vs NR, GlyNAC vs liposomal glutathione, stack vs stack. Every
              row PMID-anchored. No shop bias.
            </p>
          </div>
          <Link
            href="/library/compare"
            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan card-premium px-4 py-2 rounded-xl hover:bg-accent-cyan/10 transition shrink-0"
          >
            All comparisons <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ContextRail
          what="Six evidence comparison tables with PMID-anchored rows and honest verdicts."
          why="Advanced users need neutral head-to-head data before choosing compounds or stack presets."
          next="Open NMN vs NR if you are NAD+-curious, or Starter vs Hybrid if you are stack-shopping."
          theme="cyan"
          className="mb-8"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidenceComparisons.map((comp, i) => {
            const Icon = categoryIcon[comp.category];
            return (
              <motion.div
                key={comp.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/library/compare/${comp.slug}`}
                  className="focus-ring group block h-full rounded-2xl p-5 border border-border/60 card-premium bg-gradient-to-br from-accent-cyan/[0.06] to-transparent glow-hover-cyan transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-accent-cyan" />
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        {comp.category}
                      </span>
                    </div>
                    <EvidenceTag tier={comp.evidenceTier} size="sm" />
                  </div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-accent-cyan transition">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                    {comp.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-accent-violet">
                      {comp.labelA} vs {comp.labelB}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-cyan transition" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}