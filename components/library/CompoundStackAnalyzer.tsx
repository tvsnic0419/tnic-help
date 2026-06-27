'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { analyzeStackCoverage, getPathwaysForHallmark, getEmergentEffectsForHallmark } from '@/lib/relations';

const HALLMARK_META: Record<string, { label: string; accent: string; accentClass: string; href: string }> = {
  genomic:      { label: 'Genomic Instability',      accent: '#22d3ee', accentClass: 'text-accent-cyan',    href: '/library/genomic-instability' },
  telomeres:    { label: 'Telomere Attrition',        accent: '#fbbf24', accentClass: 'text-accent-amber',  href: '/library/telomere-attrition' },
  epigenetic:   { label: 'Epigenetic Alterations',   accent: '#a78bfa', accentClass: 'text-accent-violet',  href: '/library/epigenetic-alterations' },
  proteostasis: { label: 'Loss of Proteostasis',     accent: '#a78bfa', accentClass: 'text-accent-violet',  href: '/library/loss-of-proteostasis' },
  autophagy:    { label: 'Disabled Autophagy',       accent: '#22d3ee', accentClass: 'text-accent-cyan',    href: '/library/disabled-autophagy' },
  mito:         { label: 'Mitochondrial Dysfunction', accent: '#34d399', accentClass: 'text-accent-emerald', href: '/library/mitochondrial-dysfunction' },
  senescence:   { label: 'Cellular Senescence',      accent: '#fb7185', accentClass: 'text-accent-rose',    href: '/library/cellular-senescence' },
  stem:         { label: 'Stem Cell Exhaustion',     accent: '#a78bfa', accentClass: 'text-accent-violet',  href: '/library/stem-cell-exhaustion' },
  communication:{ label: 'Altered Communication',    accent: '#fbbf24', accentClass: 'text-accent-amber',  href: '/library/altered-intercellular-communication' },
  inflammation: { label: 'Chronic Inflammation',     accent: '#fb7185', accentClass: 'text-accent-rose',    href: '/library/chronic-inflammation' },
  dysbiosis:    { label: 'Dysbiosis',                accent: '#34d399', accentClass: 'text-accent-emerald', href: '/library/dysbiosis' },
  nutrient:     { label: 'Nutrient Sensing',         accent: '#fbbf24', accentClass: 'text-accent-amber',  href: '/library/nutrient-sensing-deregulation' },
};

const COMPOUND_NAMES: Record<string, string> = {
  nmn: 'NMN', cakg: 'Ca-AKG', resveratrol: 'Resveratrol', sulforaphane: 'Sulforaphane',
  glynac: 'GlyNAC', rala: 'R-ALA', fisetin: 'Fisetin', quercetin: 'Quercetin',
  omega3: 'Omega-3', urolithina: 'Urolithin A', spermidine: 'Spermidine',
  taurine: 'Taurine', berberine: 'Berberine', coq10: 'CoQ10',
};

interface CompoundStackAnalyzerProps {
  compoundIds: string[];
  className?: string;
  showGapRecommendations?: boolean;
}

export function CompoundStackAnalyzer({
  compoundIds,
  className,
  showGapRecommendations = true,
}: CompoundStackAnalyzerProps) {
  const analysis = useMemo(() => analyzeStackCoverage(compoundIds), [compoundIds]);

  if (compoundIds.length === 0) {
    return (
      <div className={cn('flex flex-col items-center gap-3 py-10 text-muted-foreground', className)}>
        <Target className="w-8 h-8 opacity-25" />
        <p className="text-sm">Add compounds to your stack to see hallmark coverage.</p>
      </div>
    );
  }

  const gapHallmarks = analysis.coverage.filter((c) => !c.covered);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Summary bar */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Stack Coverage</p>
            <p className="text-2xl font-bold mt-0.5">
              {analysis.coveredCount}
              <span className="text-base font-normal text-muted-foreground">/12 hallmarks</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-accent-emerald">{analysis.coveragePct}%</p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase">covered</p>
          </div>
        </div>
        {/* Coverage bar */}
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysis.coveragePct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-muted-foreground">
            {gapHallmarks.length} gap{gapHallmarks.length !== 1 ? 's' : ''} remaining
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {compoundIds.length} compound{compoundIds.length !== 1 ? 's' : ''} active
          </p>
        </div>
      </div>

      {/* Hallmark grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {analysis.coverage.map((item, i) => {
          const meta = HALLMARK_META[item.hallmarkId];
          if (!meta) return null;
          const pathways = getPathwaysForHallmark(item.hallmarkId);
          const emergent = getEmergentEffectsForHallmark(item.hallmarkId);

          return (
            <motion.div
              key={item.hallmarkId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'rounded-xl border p-3.5 flex items-start gap-3 transition-colors',
                item.covered
                  ? 'border-border/60 bg-card/30'
                  : 'border-dashed border-border/40 bg-muted/10 opacity-70',
              )}
            >
              {item.covered ? (
                <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Link
                    href={meta.href}
                    className={cn('text-xs font-semibold hover:underline leading-tight', meta.accentClass)}
                  >
                    {meta.label}
                  </Link>
                  {emergent.length > 0 && item.covered && (
                    <span className="text-[9px] font-mono text-accent-violet bg-accent-violet/10 border border-accent-violet/20 px-1.5 py-0.5 rounded-full">
                      {emergent.length} synergy
                    </span>
                  )}
                </div>
                {item.covered ? (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    via {item.compounds.map((c) => COMPOUND_NAMES[c] ?? c).join(', ')}
                  </p>
                ) : (
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5">Not covered</p>
                )}
                {item.covered && pathways.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {pathways.slice(0, 2).map((p) => (
                      <span key={p.id} className="text-[9px] font-mono text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded-full">
                        {p.name.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gap recommendations */}
      {showGapRecommendations && gapHallmarks.length > 0 && (
        <div className="rounded-2xl border border-accent-amber/25 bg-accent-amber/[0.04] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-accent-amber" />
            <p className="text-[10px] font-mono text-accent-amber uppercase tracking-wider">Coverage Gaps</p>
          </div>
          <div className="space-y-2">
            {gapHallmarks.slice(0, 4).map((gap) => {
              const meta = HALLMARK_META[gap.hallmarkId];
              const pathways = getPathwaysForHallmark(gap.hallmarkId);
              const topCompound = pathways[0]?.compoundIds[0];
              return (
                <div key={gap.hallmarkId} className="flex items-center justify-between gap-3">
                  <Link
                    href={meta?.href ?? '/library'}
                    className={cn('text-xs font-medium hover:underline', meta?.accentClass ?? 'text-foreground')}
                  >
                    {meta?.label ?? gap.hallmarkId}
                  </Link>
                  {topCompound && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      consider {COMPOUND_NAMES[topCompound] ?? topCompound}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              );
            })}
            {gapHallmarks.length > 4 && (
              <p className="text-[10px] text-muted-foreground pt-1">+{gapHallmarks.length - 4} more gaps</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
