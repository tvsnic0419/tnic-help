'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Info } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { compounds } from '@/lib/data';
import { getHallmarkVisual } from '@/lib/hallmark-visuals';

// Compound column order: by LQ score descending
const COLUMN_IDS = [
  'glynac', 'nmn', 'sulforaphane', 'taurine', 'spermidine',
  'pterostilbene', 'urolithina', 'omega3', 'cakg',
  'berberine', 'coq10', 'fisetin', 'rala', 'resveratrol',
];

const COMPOUND_SHORT: Record<string, string> = {
  glynac:       'GlyNAC',
  nmn:          'NMN',
  sulforaphane: 'Sulf.',
  taurine:      'Tau',
  spermidine:   'Sperm.',
  pterostilbene:'Ptero.',
  urolithina:   'Uro A',
  omega3:       'Ω-3',
  cakg:         'Ca-AKG',
  berberine:    'Berb.',
  coq10:        'CoQ10',
  fisetin:      'Fisetin',
  rala:         'R-ALA',
  resveratrol:  'Resv.',
};

const LQ_SCORES: Record<string, number> = {
  glynac: 78, nmn: 75, sulforaphane: 72, taurine: 72, spermidine: 72,
  pterostilbene: 73, urolithina: 70, omega3: 68, cakg: 67,
  berberine: 65, coq10: 65, fisetin: 64, rala: 63, resveratrol: 62,
};

const LQ_COLOR = (score: number): string => {
  if (score >= 75) return '#22d3ee';
  if (score >= 70) return '#10b981';
  if (score >= 65) return '#a78bfa';
  return '#6b7280';
};

interface CellData {
  evidence: 'A' | 'B' | 'C';
  impact: number;
  rank: number;
  interventionName: string;
  pmid?: string;
}

function buildMatrix(): Map<string, Map<string, CellData>> {
  const matrix = new Map<string, Map<string, CellData>>();

  for (const hallmark of hallmarkLibrary) {
    const row = new Map<string, CellData>();
    for (const intervention of hallmark.interventions) {
      if (intervention.category === 'compound' && intervention.compoundId) {
        const cid = intervention.compoundId;
        if (!row.has(cid) || intervention.rank < (row.get(cid)!.rank)) {
          row.set(cid, {
            evidence: intervention.evidence as 'A' | 'B' | 'C',
            impact: intervention.impact,
            rank: intervention.rank,
            interventionName: intervention.name,
            pmid: (intervention as { pmid?: string }).pmid,
          });
        }
      }
    }
    // Also add relatedCompoundIds that may not have a specific intervention entry
    for (const cid of (hallmark.relatedCompoundIds ?? [])) {
      if (!row.has(cid)) {
        row.set(cid, {
          evidence: 'B',
          impact: 5,
          rank: 99,
          interventionName: `${COMPOUND_SHORT[cid] ?? cid} — related pathway`,
        });
      }
    }
    matrix.set(hallmark.id, row);
  }
  return matrix;
}

const MATRIX = buildMatrix();

function cellStyle(data: CellData | undefined): {
  bg: string; text: string; border: string; opacity: number;
} {
  if (!data) return { bg: 'transparent', text: 'transparent', border: 'transparent', opacity: 0 };
  if (data.evidence === 'A' && data.rank <= 3)
    return { bg: 'rgba(16,185,129,0.18)', text: '#10b981', border: 'rgba(16,185,129,0.35)', opacity: 1 };
  if (data.evidence === 'A')
    return { bg: 'rgba(34,211,238,0.12)', text: '#22d3ee', border: 'rgba(34,211,238,0.25)', opacity: 1 };
  if (data.evidence === 'B')
    return { bg: 'rgba(167,139,250,0.10)', text: '#a78bfa', border: 'rgba(167,139,250,0.22)', opacity: 1 };
  return { bg: 'rgba(255,255,255,0.04)', text: 'rgba(255,255,255,0.35)', border: 'rgba(255,255,255,0.08)', opacity: 0.7 };
}

interface Selected {
  hallmarkId: string;
  compoundId: string;
  data: CellData;
}

export function HallmarkCoverageMatrix() {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Compute per-compound coverage counts
  const compoundCoverage = COLUMN_IDS.map((cid) => {
    let tierA = 0, tierB = 0;
    for (const [, row] of MATRIX) {
      const cell = row.get(cid);
      if (cell?.evidence === 'A') tierA++;
      else if (cell?.evidence === 'B') tierB++;
    }
    return { cid, tierA, tierB, total: tierA + tierB };
  });

  const topCompound = compoundCoverage.reduce((a, b) => (b.total > a.total ? b : a));

  return (
    <section className="py-12 md:py-16 bg-background pb-28">
      <div className="container-page">
        <Link
          href="/library/compounds"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-8 focus-ring rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Compound Library
        </Link>

        <div className="mb-10">
          <p className="text-[10px] font-mono tracking-widest text-accent-cyan mb-3 uppercase">
            Compound Intelligence · Coverage Matrix
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            12 Hallmarks × 14 Compounds
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Which evidence-graded compounds address which hallmarks of aging?
            Each cell shows the best available evidence tier for that pairing —
            Tier A (green) through Tier B (violet). Click any cell for the specific intervention and citation.
          </p>

          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3.5 h-3.5 rounded-sm" style={{ background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.35)' }} />
              Tier A · Top Pick (rank 1–3)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3.5 h-3.5 rounded-sm" style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.25)' }} />
              Tier A evidence
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3.5 h-3.5 rounded-sm" style={{ background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.22)' }} />
              Tier B evidence
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-mono font-black text-accent-cyan">14</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">Compounds</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-mono font-black text-accent-emerald">12</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">Hallmarks</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-mono font-black text-accent-violet">{topCompound.total}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              {COMPOUND_SHORT[topCompound.cid]} coverage
            </p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-mono font-black text-accent-amber">
              {compoundCoverage.reduce((s, c) => s + c.tierA, 0)}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">Tier A cells</p>
          </div>
        </div>

        {/* Matrix table */}
        <div className="overflow-x-auto rounded-2xl border border-border/60 mb-8">
          <table
            className="border-collapse text-center"
            style={{ minWidth: `${COLUMN_IDS.length * 58 + 200}px` }}
            role="grid"
            aria-label="Hallmark × Compound coverage matrix"
          >
            <thead>
              <tr>
                {/* Corner */}
                <th
                  className="sticky left-0 z-20 bg-background/95 w-44 min-w-[176px] border-b border-border/40 px-4 py-3 text-left"
                  scope="col"
                />
                {COLUMN_IDS.map((cid) => {
                  const lq = LQ_SCORES[cid];
                  const color = LQ_COLOR(lq);
                  const compound = compounds.find((c) => c.id === cid);
                  return (
                    <th
                      key={cid}
                      scope="col"
                      className="px-1 py-3 border-b border-border/40 bg-background/95 min-w-[54px] cursor-default"
                      style={{
                        opacity: hoveredCol && hoveredCol !== cid ? 0.45 : 1,
                        transition: 'opacity 0.15s',
                      }}
                      onMouseEnter={() => setHoveredCol(cid)}
                      onMouseLeave={() => setHoveredCol(null)}
                    >
                      <Link
                        href={`/library/compounds/${cid}`}
                        className="group flex flex-col items-center gap-1 focus-ring rounded-md"
                        title={compound?.name ?? cid}
                      >
                        <span
                          className="text-[9px] font-mono font-bold tracking-widest uppercase leading-tight"
                          style={{ color }}
                        >
                          {COMPOUND_SHORT[cid]}
                        </span>
                        <span className="text-[8px] font-mono" style={{ color: `${color}80` }}>
                          {lq}
                        </span>
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {hallmarkLibrary.map((hallmark) => {
                const row = MATRIX.get(hallmark.id);
                const meta = getHallmarkVisual(hallmark.visual);
                const hallmarkTotal = row ? [...row.values()].filter((v) => COLUMN_IDS.includes(
                  [...(row?.entries() ?? [])].find(([, d]) => d === v)?.[0] ?? ''
                )).length : 0;

                // Count actual coverage in our columns
                const coveredCount = COLUMN_IDS.filter((cid) => row?.has(cid)).length;

                return (
                  <tr
                    key={hallmark.id}
                    className="group/row"
                    onMouseEnter={() => setHoveredRow(hallmark.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Row header */}
                    <td
                      className="sticky left-0 z-10 bg-background/95 border-r border-border/30 px-4 py-2.5"
                      style={{ opacity: hoveredRow && hoveredRow !== hallmark.id ? 0.5 : 1, transition: 'opacity 0.15s' }}
                    >
                      <Link
                        href={`/library/${hallmark.slug}`}
                        className="flex items-center gap-2.5 group focus-ring rounded-md"
                      >
                        <span
                          className="text-[9px] font-mono font-bold shrink-0 w-5 text-right"
                          style={{ color: meta.colorVar }}
                        >
                          {hallmark.number}
                        </span>
                        <span className="text-[11px] font-semibold text-left leading-tight text-foreground group-hover:text-accent-cyan transition-colors line-clamp-1">
                          {hallmark.title.replace('Loss of ', '').replace('Deregulation of ', '')}
                        </span>
                        <span className="shrink-0 text-[9px] font-mono text-muted-foreground ml-auto">
                          {coveredCount}
                        </span>
                      </Link>
                    </td>

                    {/* Compound cells */}
                    {COLUMN_IDS.map((cid) => {
                      const cell = row?.get(cid);
                      const styles = cellStyle(cell);
                      const isSelected = selected?.hallmarkId === hallmark.id && selected?.compoundId === cid;
                      const isColHovered = hoveredCol === cid;
                      const isRowHovered = hoveredRow === hallmark.id;

                      if (!cell) {
                        return (
                          <td key={cid} className="py-2 px-1">
                            <div
                              className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center"
                              style={{ background: 'rgba(255,255,255,0.02)' }}
                            >
                              <span className="text-[10px] font-mono text-muted-foreground/20">—</span>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={cid} className="py-2 px-1">
                          <button
                            type="button"
                            onClick={() => setSelected(
                              isSelected ? null : { hallmarkId: hallmark.id, compoundId: cid, data: cell }
                            )}
                            className="w-9 h-9 mx-auto rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all focus-ring"
                            style={{
                              background: isSelected ? `${styles.text}20` : styles.bg,
                              border: `${isSelected ? '1.5px' : '1px'} solid ${isSelected ? styles.text : styles.border}`,
                              opacity: (hoveredCol && !isColHovered && !isRowHovered) ? 0.3 : 1,
                              transform: (isColHovered || isRowHovered) ? 'scale(1.08)' : 'scale(1)',
                              transition: 'all 0.15s',
                            }}
                            aria-label={`${hallmark.title} × ${COMPOUND_SHORT[cid]}: ${cell.interventionName}`}
                            aria-pressed={isSelected}
                          >
                            <span
                              className="text-[10px] font-mono font-black leading-none"
                              style={{ color: styles.text }}
                            >
                              {cell.evidence}
                            </span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected cell detail */}
        <AnimatePresence>
          {selected && (() => {
            const hallmark = hallmarkLibrary.find((h) => h.id === selected.hallmarkId);
            const compound = compounds.find((c) => c.id === selected.compoundId);
            if (!hallmark || !compound) return null;
            const meta = getHallmarkVisual(hallmark.visual);
            return (
              <motion.div
                key={`${selected.hallmarkId}-${selected.compoundId}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-8 rounded-2xl border border-border/60 bg-card/40 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border"
                      style={{
                        color: meta.colorVar,
                        borderColor: `${meta.colorVar}40`,
                        background: `${meta.colorVar}10`,
                      }}
                    >
                      Hallmark {hallmark.number}
                    </span>
                    <span className="font-semibold text-sm">{hallmark.title}</span>
                    <span className="text-muted-foreground text-sm">×</span>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: LQ_COLOR(LQ_SCORES[selected.compoundId] ?? 65) }}
                    >
                      {compound.name}
                    </span>
                  </div>
                  <span
                    className="shrink-0 font-mono text-sm font-black px-2.5 py-1 rounded-lg"
                    style={{
                      color: selected.data.evidence === 'A' ? '#10b981' : '#a78bfa',
                      background: selected.data.evidence === 'A' ? 'rgba(16,185,129,0.15)' : 'rgba(167,139,250,0.12)',
                    }}
                  >
                    Tier {selected.data.evidence}
                  </span>
                </div>

                <p className="text-sm font-semibold mb-1">{selected.data.interventionName}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{compound.mechanism}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  {selected.data.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${selected.data.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-cyan hover:text-accent-emerald transition-colors"
                    >
                      PMID {selected.data.pmid}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <Link
                    href={`/library/compounds/${selected.compoundId}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-violet hover:text-accent-cyan transition-colors"
                  >
                    Full compound profile
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/library/${hallmark.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-emerald hover:text-accent-cyan transition-colors"
                  >
                    {hallmark.title} deep dive
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Per-compound coverage bars */}
        <div className="mb-10">
          <p className="text-label text-accent-violet mb-5">Coverage by Compound</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {compoundCoverage
              .sort((a, b) => b.total - a.total)
              .map(({ cid, tierA, tierB, total }) => {
                const lq = LQ_SCORES[cid];
                const compound = compounds.find((c) => c.id === cid);
                return (
                  <Link
                    key={cid}
                    href={`/library/compounds/${cid}`}
                    className="glass glass-hover rounded-xl p-4 group focus-ring"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-semibold group-hover:text-accent-cyan transition-colors"
                        style={{ color: LQ_COLOR(lq) }}
                      >
                        {COMPOUND_SHORT[cid]}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{total} hallmarks</span>
                    </div>
                    {compound && (
                      <p className="text-[10px] text-muted-foreground mb-2 leading-tight truncate">{compound.pathway}</p>
                    )}
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(total / 12) * 100}%`, background: LQ_COLOR(lq) }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      {tierA > 0 && (
                        <span className="text-[9px] font-mono text-accent-emerald">{tierA}×A</span>
                      )}
                      {tierB > 0 && (
                        <span className="text-[9px] font-mono text-accent-violet">{tierB}×B</span>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 p-4 rounded-xl bg-muted/10 border border-border/40">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Coverage cells reflect the best available human-trial evidence for each compound–hallmark pairing,
            drawn from published RCTs, meta-analyses, and mechanistic studies in the TNiC library.
            Evidence tiers: A = strong RCT evidence; B = moderate / mechanistic evidence with human data.
            Absence of a cell does not indicate a compound has no effect on that hallmark — it indicates the
            specific pathway has not been characterized to library standards.
          </p>
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 pt-8 border-t border-border/60 flex flex-wrap gap-3">
          <Link
            href="/library/compounds"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan glass glass-hover px-4 py-2.5 rounded-xl transition"
          >
            Compound Library <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/library/synergy-matrix"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet glass glass-hover px-4 py-2.5 rounded-xl transition"
          >
            14×14 Synergy Matrix <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/elite-8"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-amber glass glass-hover px-4 py-2.5 rounded-xl transition"
          >
            Elite 8 Ranking <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
