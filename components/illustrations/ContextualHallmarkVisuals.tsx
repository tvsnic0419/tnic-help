'use client';

import React from 'react';
import { GenomicInstabilityVisual, MitochondrialDysfunctionVisual, ProteostasisVisual } from './HallmarkVisuals';

interface ContextualProps {
  className?: string;
  showContext?: boolean;
  contextLevel?: 'brief' | 'detailed';
}

/**
 * UI-enriched contextual wrappers for Hallmark visuals.
 * Adds scientific context, cross-hallmark connections, and rich presentation.
 * Designed for Library cards, hallmark pages, and Stack Architect.
 * Solidifies Pillar 3 with contextual depth + UI polish.
 */

export const ContextualGenomicInstability: React.FC<ContextualProps> = ({
  className = '',
  showContext = true,
  contextLevel = 'detailed'
}) => (
  <div className={`group rounded-2xl border border-white/10 bg-[#0a0f1a] p-6 transition-all hover:border-cyan-400/30 hover:shadow-xl ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-xs uppercase tracking-[2px] text-cyan-400/70">Hallmark 1</div>
        <h3 className="text-xl font-semibold text-white">Genomic Instability</h3>
      </div>
      <div className="text-right text-xs text-white/50">Tier A • Core Driver</div>
    </div>

    <GenomicInstabilityVisual className="w-full mb-6" accentColor="cyan" />

    {showContext && (
      <div className="space-y-4 text-sm text-white/80">
        <p className="leading-relaxed">
          DNA damage accumulates faster than repair after ~age 40. PARP consumes NAD+; NRF2/glutathione intercept oxidative adducts. 
          <span className="text-cyan-400">Primary amplifier</span> of downstream hallmarks (mitochondrial ROS, senescence, inflammation).
        </p>
        {contextLevel === 'detailed' && (
          <div className="pt-3 border-t border-white/10 text-xs space-y-1 text-white/70">
            <div><span className="text-emerald-400">→ Mitochondrial link:</span> Excess ROS from dysfunctional mitochondria accelerates DNA lesions.</div>
            <div><span className="text-violet-400">→ Senescence link:</span> Unrepaired damage triggers p53/p21 senescence programs.</div>
            <div><span className="text-amber-400">→ GlyNAC impact:</span> Strongly reduces 8-OHdG and γ-H2AX (multi-hallmark protection).</div>
          </div>
        )}
      </div>
    )}

    <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-white/60">
      <span className="rounded bg-white/5 px-2 py-0.5">NAD+ • PARP</span>
      <span className="rounded bg-white/5 px-2 py-0.5">NRF2 • GSH</span>
      <span className="rounded bg-white/5 px-2 py-0.5">8-OHdG ↓</span>
    </div>
  </div>
);

export const ContextualMitochondrialDysfunction: React.FC<ContextualProps> = ({
  className = '',
  showContext = true,
  contextLevel = 'detailed'
}) => (
  <div className={`group rounded-2xl border border-white/10 bg-[#0a0f1a] p-6 transition-all hover:border-emerald-400/30 hover:shadow-xl ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="text-xs uppercase tracking-[2px] text-emerald-400/70">Hallmark 6</div>
        <h3 className="text-xl font-semibold text-white">Mitochondrial Dysfunction</h3>
      </div>
      <div className="text-right text-xs text-white/50">Tier A • Highest Stack Coverage</div>
    </div>

    <MitochondrialDysfunctionVisual className="w-full mb-6" accentColor="emerald" />

    {showContext && (
      <div className="space-y-4 text-sm text-white/80">
        <p className="leading-relaxed">
          NAD+ depletion starves SIRT3/PGC-1α. Damaged mitochondria leak ROS and fail mitophagy. 
          <span className="text-emerald-400">Central bottleneck</span> that amplifies almost every other hallmark.
        </p>
        {contextLevel === 'detailed' && (
          <div className="pt-3 border-t border-white/10 text-xs space-y-1 text-white/70">
            <div><span className="text-cyan-400">→ Genomic link:</span> Mitochondrial ROS is a major driver of oxidative DNA damage.</div>
            <div><span className="text-rose-400">→ Inflammation link:</span> mtDNA leakage and ROS activate NLRP3 inflammasome.</div>
            <div><span className="text-violet-400">→ GlyNAC + NMN synergy:</span> Protects existing mitochondria while restoring biogenesis (highest leverage combo).</div>
          </div>
        )}
      </div>
    )}

    <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-white/60">
      <span className="rounded bg-white/5 px-2 py-0.5">NAD+ • SIRT3</span>
      <span className="rounded bg-white/5 px-2 py-0.5">PGC-1α • Mitophagy</span>
      <span className="rounded bg-white/5 px-2 py-0.5">ROS ↓</span>
    </div>
  </div>
);

// Additional contextual wrappers can be added following the exact same enriched card pattern
// This solidifies UI (hover states, contextual text, cross-hallmark links) + scientific depth
