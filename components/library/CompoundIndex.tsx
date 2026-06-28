'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Zap, Network, BarChart3, FlaskConical } from 'lucide-react';
import { compounds } from '@/lib/data';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { synergyPairMatrix } from '@/lib/stack-analysis';

import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { HallmarkIcon } from './HallmarkIcon';
import { PageHeader } from '@/components/ui/PageHeader';

const BADGE_META: Record<string, { label: string; color: string }> = {
  nrf2:      { label: 'NRF2',       color: 'var(--accent-emerald)' },
  mito:      { label: 'Mito',       color: 'var(--accent-cyan)' },
  sirt1:     { label: 'Sirtuin',    color: 'var(--accent-violet)' },
  hybrid:    { label: 'Multi',      color: 'var(--accent-violet)' },
  autophagy: { label: 'Autophagy', color: 'var(--accent-rose)' },
  longevity: { label: 'Senolytic', color: 'var(--accent-amber)' },
};

// LQ scores computed from 8-dimension methodology (CE, EB, ES, EE, SF, BV, HP, R).
// Elite 8 values derived from calcLQScore(); remaining compounds estimated from the
// same weighting applied to published RCT evidence quality assessments.
const LQ_SCORES: Record<string, number> = {
  glynac:      78,
  sulforaphane:72,
  nmn:         75,
  taurine:     72,
  spermidine:  72,
  pterostilbene:73,
  urolithina:  70,
  omega3:      68,
  cakg:        67,
  berberine:   65,
  coq10:       65,
  fisetin:     64,
  rala:        63,
  resveratrol: 62,
};

const LQ_COLOR = (score: number): string => {
  if (score >= 75) return '#22d3ee';
  if (score >= 70) return '#10b981';
  if (score >= 65) return '#a78bfa';
  return '#6b7280';
};

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2 };

type FilterTier = 'all' | 'A' | 'B';
type FilterBadge = 'all' | string;
type SortMode = 'tier' | 'lq';

function LqScoreBar({ score, color }: { score: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 80);
    return () => clearTimeout(t);
  }, [score]);
  return (
    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

function CompoundCard({ compound, index }: { compound: (typeof compounds)[0]; index: number }) {
  const badge = BADGE_META[compound.badge] ?? BADGE_META.hybrid;
  const coveredHallmarks = hallmarkLibrary.filter((h) => compound.hallmarks.includes(h.id));
  const lq = LQ_SCORES[compound.id];
  const lqColor = lq ? LQ_COLOR(lq) : 'var(--muted-foreground)';

  // Count synergy partners in the 14×14 matrix
  const synergyCount = lq
    ? Object.keys(synergyPairMatrix[compound.id] ?? {}).length
    : compound.synergies.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/library/compounds/${compound.id}`}
        className="group glass glass-hover focus-ring interactive rounded-2xl p-5 flex flex-col h-full transition-all hover:border-white/10"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm leading-tight text-foreground group-hover:text-accent-cyan transition-colors">
              {compound.name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{compound.pathway}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <EvidenceTag tier={compound.evidence} size="sm" />
            <span
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-current/20"
              style={{ color: badge.color }}
            >
              {badge.label}
            </span>
          </div>
        </div>

        {/* LQ Score bar */}
        {lq !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">LQ Score</span>
              <span className="text-[11px] font-mono font-black" style={{ color: lqColor }}>{lq}</span>
            </div>
            <LqScoreBar score={lq} color={lqColor} />
          </div>
        )}

        {/* Mechanism */}
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
          {compound.mechanism}
        </p>

        {/* Hallmark icons */}
        <div className="flex items-center gap-1.5 mb-4">
          {coveredHallmarks.slice(0, 5).map((h) => (
            <div key={h.id} title={h.title}>
              <HallmarkIcon type={h.visual} size={18} ring={false} />
            </div>
          ))}
          {coveredHallmarks.length > 5 && (
            <span className="text-[9px] font-mono text-muted-foreground">
              +{coveredHallmarks.length - 5}
            </span>
          )}
          <span className="text-[9px] font-mono text-muted-foreground ml-auto">
            {coveredHallmarks.length} hallmark{coveredHallmarks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">{compound.dose}</span>
            {synergyCount > 0 && (
              <>
                <span className="text-[9px] text-muted-foreground/40">·</span>
                <span className="text-[9px] font-mono text-accent-violet/70">{synergyCount} synergy pair{synergyCount !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}

export function CompoundIndex() {
  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');
  const [badgeFilter, setBadgeFilter] = useState<FilterBadge>('all');
  const [sortMode, setSortMode] = useState<SortMode>('tier');

  const filtered = useMemo(() => {
    let list = [...compounds].filter((c) => c.studies.length > 0);

    if (tierFilter !== 'all') list = list.filter((c) => c.evidence === tierFilter);
    if (badgeFilter !== 'all') list = list.filter((c) => c.badge === badgeFilter);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.pathway.toLowerCase().includes(q) ||
          c.mechanism.toLowerCase().includes(q) ||
          c.hallmarks.some((h) => h.toLowerCase().includes(q)),
      );
    }

    if (sortMode === 'lq') {
      list.sort((a, b) => (LQ_SCORES[b.id] ?? 0) - (LQ_SCORES[a.id] ?? 0));
    } else {
      list.sort((a, b) => {
        const tier = TIER_ORDER[a.evidence] - TIER_ORDER[b.evidence];
        if (tier !== 0) return tier;
        return (LQ_SCORES[b.id] ?? 0) - (LQ_SCORES[a.id] ?? 0);
      });
    }

    return list;
  }, [query, tierFilter, badgeFilter, sortMode]);

  const badgeOptions = useMemo(() => {
    const seen = new Set<string>();
    compounds.forEach((c) => seen.add(c.badge));
    return [...seen];
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background pb-28">
      <div className="container-page">
        <PageHeader
          icon={FlaskConical}
          eyebrow="Compound Library"
          title="Evidence Reference Guides"
          description="Canonical scientific profiles for each TNiC compound — mechanism, pathway, human trial evidence, hallmark coverage, and monitoring biomarkers. Every claim is PMID-cited."
          theme="cyan"
          as="h1"
        />

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/elite-8"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-amber glass glass-hover px-3.5 py-2 rounded-full transition"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Elite 8 Ranking
          </Link>
          <Link
            href="/library/synergy-matrix"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet glass glass-hover px-3.5 py-2 rounded-full transition"
          >
            <Zap className="w-3.5 h-3.5" />
            Synergy Matrix
          </Link>
          <Link
            href="/library/compare"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan glass glass-hover px-3.5 py-2 rounded-full transition"
          >
            <Network className="w-3.5 h-3.5" />
            Compare Compounds
          </Link>
        </div>

        {/* Filters + sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="compound-search" className="sr-only">Search compounds</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              id="compound-search"
              type="search"
              placeholder="Search compounds, pathways, hallmarks…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-base pl-11 w-full"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'A', 'B'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition ${
                  tierFilter === t
                    ? 'bg-accent-cyan text-black'
                    : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'all' ? 'All tiers' : `Tier ${t}`}
              </button>
            ))}
            <span className="w-px h-4 bg-border/60" />
            {(['all', ...badgeOptions] as const).map((b) => {
              const meta = BADGE_META[b as string];
              return (
                <button
                  key={b}
                  onClick={() => setBadgeFilter(b)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition ${
                    badgeFilter === b
                      ? 'bg-muted/60 text-foreground ring-1 ring-white/10'
                      : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                  style={badgeFilter === b && meta ? { color: meta.color } : {}}
                >
                  {b === 'all' ? 'All pathways' : (meta?.label ?? b)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count + sort toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[11px] font-mono text-muted-foreground">
            {filtered.length} compound{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-1 glass rounded-lg p-1">
            <button
              onClick={() => setSortMode('tier')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition ${sortMode === 'tier' ? 'bg-white/10 text-foreground' : 'text-muted-foreground'}`}
            >
              By tier
            </button>
            <button
              onClick={() => setSortMode('lq')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition ${sortMode === 'lq' ? 'bg-white/10 text-foreground' : 'text-muted-foreground'}`}
            >
              By LQ score
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            No compounds match your filters.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((compound, i) => (
              <CompoundCard key={compound.id} compound={compound} index={i} />
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold mb-0.5">Explore by Hallmark</p>
            <p className="text-[11px] text-muted-foreground">
              See all interventions — compounds, lifestyle, and clinical — for each of the 12 aging hallmarks.
            </p>
          </div>
          <Link
            href="/library"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
          >
            Hallmarks Library <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
