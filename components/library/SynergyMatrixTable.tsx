'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { compounds } from '@/lib/data';
import { synergyPairMatrix, stackInteractions, type InteractionType } from '@/lib/stack-analysis';

const MATRIX_IDS = [
  'nmn', 'cakg', 'taurine',
  'glynac', 'sulforaphane', 'rala',
  'resveratrol', 'pterostilbene',
  'spermidine', 'urolithina', 'fisetin',
  'berberine', 'omega3', 'coq10',
];

const COMPOUND_COLORS: Record<string, string> = {
  nmn: '#38bdf8',
  cakg: '#a78bfa',
  taurine: '#34d399',
  glynac: '#22d3ee',
  sulforaphane: '#10b981',
  rala: '#fbbf24',
  resveratrol: '#c084fc',
  pterostilbene: '#d946ef',
  spermidine: '#818cf8',
  urolithina: '#e879f9',
  fisetin: '#fb923c',
  berberine: '#f59e0b',
  omega3: '#06b6d4',
  coq10: '#84cc16',
};

const GROUPS = [
  { label: 'NAD+ / Energy', ids: ['nmn', 'cakg', 'taurine'] },
  { label: 'Antioxidant / NRF2', ids: ['glynac', 'sulforaphane', 'rala'] },
  { label: 'Sirtuin / SIRT1', ids: ['resveratrol', 'pterostilbene'] },
  { label: 'Autophagy / Senolytic', ids: ['spermidine', 'urolithina', 'fisetin'] },
  { label: 'Metabolic / Cardio', ids: ['berberine', 'omega3', 'coq10'] },
];

function getScore(aId: string, bId: string): number | null {
  if (aId === bId) return null;
  return synergyPairMatrix[aId]?.[bId] ?? synergyPairMatrix[bId]?.[aId] ?? null;
}

function getInteraction(aId: string, bId: string) {
  return stackInteractions.find(
    (i) =>
      (i.compoundIds[0] === aId && i.compoundIds[1] === bId) ||
      (i.compoundIds[0] === bId && i.compoundIds[1] === aId),
  );
}

function compoundName(id: string): string {
  return compounds.find((c) => c.id === id)?.name ?? id;
}

function scoreStyle(score: number | null, interactionType?: InteractionType) {
  if (score === null) return { bg: 'transparent', text: 'transparent', border: 'transparent' };
  if (interactionType === 'caution' || interactionType === 'contraindication') {
    return { bg: 'rgba(251,191,36,0.08)', text: '#fbbf24', border: 'rgba(251,191,36,0.3)' };
  }
  if (score >= 9) return { bg: 'rgba(34,211,238,0.12)', text: '#22d3ee', border: 'rgba(34,211,238,0.25)' };
  if (score >= 8) return { bg: 'rgba(16,185,129,0.10)', text: '#10b981', border: 'rgba(16,185,129,0.22)' };
  if (score >= 6) return { bg: 'rgba(129,140,248,0.08)', text: '#818cf8', border: 'rgba(129,140,248,0.18)' };
  return { bg: 'rgba(255,255,255,0.03)', text: 'rgba(255,255,255,0.2)', border: 'transparent' };
}

interface SelectedPair {
  aId: string;
  bId: string;
  score: number | null;
}

export function SynergyMatrixTable() {
  const [selected, setSelected] = useState<SelectedPair | null>(null);

  const selectedInteraction = selected
    ? getInteraction(selected.aId, selected.bId)
    : null;

  return (
    <div>
      {/* Scrollable matrix */}
      <div className="overflow-x-auto rounded-2xl border border-border/60">
        <table className="min-w-max text-center border-collapse" role="grid" aria-label="Compound synergy matrix">
          <thead>
            <tr>
              {/* Top-left empty corner */}
              <th className="w-28 bg-background/80 sticky left-0 z-20 border-b border-border/40" />
              {MATRIX_IDS.map((colId) => (
                <th
                  key={colId}
                  className="px-2 py-3 text-[9px] font-mono font-bold tracking-widest uppercase border-b border-border/40 bg-background/80 min-w-[52px]"
                  style={{ color: COMPOUND_COLORS[colId] ?? 'var(--muted-foreground)' }}
                >
                  {compoundName(colId).split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX_IDS.map((rowId) => (
              <tr key={rowId} className="group/row">
                {/* Row header */}
                <td
                  className="sticky left-0 z-10 bg-background/90 text-[10px] font-mono font-semibold pr-3 pl-4 py-2 text-right border-r border-border/30 whitespace-nowrap"
                  style={{ color: COMPOUND_COLORS[rowId] ?? 'var(--muted-foreground)' }}
                >
                  {compoundName(rowId).split(' ')[0]}
                </td>
                {MATRIX_IDS.map((colId) => {
                  const isDiag = rowId === colId;
                  const score = getScore(rowId, colId);
                  const interaction = getInteraction(rowId, colId);
                  const isCaution = interaction?.type === 'caution' || interaction?.type === 'contraindication';
                  const styles = scoreStyle(score, interaction?.type);
                  const isSelected = selected?.aId === rowId && selected?.bId === colId ||
                                     selected?.aId === colId && selected?.bId === rowId;

                  if (isDiag) {
                    return (
                      <td
                        key={colId}
                        className="py-2 px-1"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                        aria-hidden="true"
                      >
                        <span className="block w-10 h-10 mx-auto flex items-center justify-center text-muted-foreground/20 text-sm font-mono">
                          —
                        </span>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={colId}
                      className="py-2 px-1"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setSelected(
                            isSelected ? null : { aId: rowId, bId: colId, score },
                          )
                        }
                        className="w-10 h-10 mx-auto rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all focus-ring"
                        style={{
                          background: isSelected ? `${styles.text}20` : styles.bg,
                          border: isSelected
                            ? `1.5px solid ${styles.text}`
                            : `1px solid ${styles.border}`,
                        }}
                        aria-label={`${compoundName(rowId)} + ${compoundName(colId)}: ${score !== null ? `${score}/10` : 'no direct data'}`}
                        aria-pressed={isSelected}
                      >
                        {score !== null ? (
                          <>
                            <span
                              className="text-[11px] font-mono font-black leading-none"
                              style={{ color: styles.text }}
                            >
                              {score}
                            </span>
                            {isCaution && (
                              <AlertTriangle
                                className="w-2 h-2"
                                style={{ color: '#fbbf24' }}
                                aria-hidden="true"
                              />
                            )}
                          </>
                        ) : (
                          <span className="text-[9px] font-mono text-muted-foreground/25">—</span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Score legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[10px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(34,211,238,0.25)' }} />
          9–10 Strong synergy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(16,185,129,0.20)' }} />
          8 Synergy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(129,140,248,0.18)' }} />
          6–7 Additive
        </span>
        <span className="flex items-center gap-1.5">
          <AlertTriangle className="w-2.5 h-2.5 text-accent-amber" />
          Pair caution
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-muted/20" />
          — No direct data
        </span>
      </div>

      {/* Selected pair detail */}
      {selected && (
        <div className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold" style={{ color: COMPOUND_COLORS[selected.aId] }}>
                {compoundName(selected.aId)}
              </span>
              <Zap className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm font-semibold" style={{ color: COMPOUND_COLORS[selected.bId] }}>
                {compoundName(selected.bId)}
              </span>
            </div>
            {selected.score !== null && (
              <span
                className="font-mono text-2xl font-black shrink-0"
                style={{
                  color: selectedInteraction?.type === 'caution'
                    ? '#fbbf24'
                    : selected.score >= 8
                    ? '#10b981'
                    : '#818cf8',
                }}
              >
                {selected.score}/10
              </span>
            )}
          </div>

          {selectedInteraction ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {selectedInteraction.type === 'synergy' ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/25 uppercase tracking-wider">
                    Synergy
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-accent-amber/15 text-accent-amber border border-accent-amber/25 uppercase tracking-wider">
                    Caution · {selectedInteraction.severity}
                  </span>
                )}
                <p className="text-sm font-semibold">{selectedInteraction.title}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedInteraction.detail}</p>
            </div>
          ) : selected.score !== null ? (
            <p className="text-sm text-muted-foreground">
              Additive pair — no named mechanism but both compounds target complementary pathways.
              Score derived from compound synergy data.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No direct synergy data for this pair. That doesn&apos;t mean they conflict — it means
              no mechanism has been characterized yet.
            </p>
          )}

          <Link
            href={`/stacks?add=${selected.aId}&add=${selected.bId}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
          >
            Build a stack with this pair in Stack Architect
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Group reference */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {GROUPS.map((g) => (
          <div key={g.label} className="glass rounded-xl p-3">
            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">{g.label}</p>
            <div className="space-y-1">
              {g.ids.map((id) => (
                <Link
                  key={id}
                  href={`/library/compounds/${id}`}
                  className="flex items-center gap-1.5 text-[11px] font-medium hover:text-foreground transition-colors"
                  style={{ color: COMPOUND_COLORS[id] ?? 'var(--muted-foreground)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COMPOUND_COLORS[id] }} />
                  {compoundName(id)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
