'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { compounds } from '@/lib/data';
import { hallmarkLibrary } from '@/lib/hallmarks-library';

import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { HallmarkIcon } from './HallmarkIcon';
import { PageHeader } from '@/components/ui/PageHeader';
import { FlaskConical } from 'lucide-react';

const BADGE_META: Record<string, { label: string; color: string }> = {
  nrf2:      { label: 'NRF2',        color: 'var(--accent-emerald)' },
  mito:      { label: 'Mito',        color: 'var(--accent-cyan)' },
  sirt1:     { label: 'Sirtuin',     color: 'var(--accent-violet)' },
  hybrid:    { label: 'Multi',       color: 'var(--accent-violet)' },
  autophagy: { label: 'Autophagy',  color: 'var(--accent-rose)' },
  longevity: { label: 'Senolytic',  color: 'var(--accent-amber)' },
};

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2 };

type FilterTier = 'all' | 'A' | 'B';
type FilterBadge = 'all' | string;

function CompoundCard({ compound, index }: { compound: (typeof compounds)[0]; index: number }) {
  const badge = BADGE_META[compound.badge] ?? BADGE_META.hybrid;
  const coveredHallmarks = hallmarkLibrary.filter((h) => compound.hallmarks.includes(h.id));

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

        {/* Mechanism */}
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
          {compound.mechanism}
        </p>

        {/* Hallmark icons */}
        <div className="flex items-center gap-1.5 mb-4">
          {coveredHallmarks.slice(0, 6).map((h) => (
            <div key={h.id} title={h.title}>
              <HallmarkIcon type={h.visual} size={18} ring={false} />
            </div>
          ))}
          {coveredHallmarks.length > 6 && (
            <span className="text-[9px] font-mono text-muted-foreground">
              +{coveredHallmarks.length - 6}
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
            <span className="text-[9px] text-muted-foreground/40">·</span>
            <span className="text-[10px] font-mono text-muted-foreground">{compound.timing}</span>
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

  const filtered = useMemo(() => {
    let list = [...compounds]
      .filter((c) => c.studies.length > 0)
      .sort((a, b) => TIER_ORDER[a.evidence] - TIER_ORDER[b.evidence] || a.name.localeCompare(b.name));

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
    return list;
  }, [query, tierFilter, badgeFilter]);

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
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

        {/* Results count */}
        <p className="text-[11px] font-mono text-muted-foreground mb-6">
          {filtered.length} compound{filtered.length !== 1 ? 's' : ''} — ranked by evidence tier
        </p>

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
