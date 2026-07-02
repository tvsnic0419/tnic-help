'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Layers, Sparkles, AlertTriangle, TrendingDown } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';

const ACCENT_TEXT: Record<string, string> = {
  cyan: 'text-accent-cyan',
  emerald: 'text-accent-emerald',
  violet: 'text-accent-violet',
  amber: 'text-accent-amber',
  rose: 'text-accent-rose',
};
const ACCENT_BAR: Record<string, string> = {
  cyan: 'bg-accent-cyan',
  emerald: 'bg-accent-emerald',
  violet: 'bg-accent-violet',
  amber: 'bg-accent-amber',
  rose: 'bg-accent-rose',
};

function Bar({ value, accent }: { value: number; accent: string }) {
  const reduce = useReducedMotion();
  const pct = Math.round(value * 100);
  return (
    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${ACCENT_BAR[accent] ?? 'bg-accent-cyan'}`}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function StackMechanismPanel() {
  const { stackScore, defenseProfile, profile } = usePlatform();
  const s = stackScore;

  if (s.overall === 0) return null;

  const yearsShown = profile.scanned ? defenseProfile.stackYearsSaved : s.bioAgeDelta;

  // Weakest 4 hallmarks — where to add next.
  const gaps = [...s.hallmarkDepth].sort((a, b) => a.depth01 - b.depth01).slice(0, 4);

  return (
    <div className="glass rounded-2xl p-5 md:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-label text-muted-foreground mb-1">Stack Mechanics</p>
          <p className="text-body-sm text-muted-foreground max-w-md">
            Evidence-weighted, bioavailability-adjusted, and saturation-aware — not a pill count.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="stat-value">{s.overall}</p>
          <p className="text-caption">quality score</p>
        </div>
      </div>

      {/* Evidence mix + bio-age impact */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
            <p className="text-label">Evidence mix</p>
          </div>
          <div className="flex gap-2">
            {(['A', 'B', 'C'] as const).map((tier) => (
              <div
                key={tier}
                className={`flex-1 text-center rounded-lg py-2 border ${
                  tier === 'A'
                    ? 'border-accent-emerald/30 bg-accent-emerald/5'
                    : tier === 'B'
                      ? 'border-accent-cyan/30 bg-accent-cyan/5'
                      : 'border-accent-amber/30 bg-accent-amber/5'
                }`}
              >
                <p className="text-lg font-bold font-mono">{s.evidenceMix[tier]}</p>
                <p className="text-caption">Tier {tier}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
            <p className="text-label">Modeled bio-age impact</p>
          </div>
          <p className="text-3xl font-bold font-mono text-accent-emerald">
            {yearsShown > 0 ? `−${yearsShown}` : '0'}<span className="text-base text-muted-foreground ml-1">yrs</span>
          </p>
          <p className="text-caption mt-1">
            {profile.scanned
              ? 'applied to your defense scan'
              : 'run a defense scan to apply this to your profile'}
          </p>
        </div>
      </div>

      {/* Pathway saturation */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-accent-violet" aria-hidden="true" />
          <p className="text-label">Pathway load · {s.breadth} of 7 axes</p>
        </div>
        <div className="space-y-3">
          {s.pathwayLoad.map((axis) => (
            <div key={axis.id}>
              <div className="flex items-center justify-between mb-1.5">
                <p className={`text-xs font-medium ${ACCENT_TEXT[axis.accent] ?? 'text-foreground'}`}>
                  {axis.name}
                </p>
                <p className="text-caption font-mono">
                  {axis.compoundIds.length} compound{axis.compoundIds.length > 1 ? 's' : ''}
                </p>
              </div>
              <Bar value={axis.saturation01} accent={axis.accent} />
            </div>
          ))}
        </div>
        <p className="text-caption mt-3">
          Diminishing returns applied within each axis — stacking three NAD⁺ boosters isn&rsquo;t triple the effect.
        </p>
      </div>

      {/* Coverage gaps */}
      <div>
        <p className="text-label mb-3">Thinnest hallmark coverage</p>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
          {gaps.map((h) => (
            <div key={h.hallmarkId}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">{h.label}</p>
                <p className="text-caption font-mono">{Math.round(h.depth01 * 100)}%</p>
              </div>
              <Bar value={h.depth01} accent={h.depth01 < 0.25 ? 'rose' : 'amber'} />
            </div>
          ))}
        </div>
      </div>

      {/* Synergies */}
      {s.bonuses.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
            <p className="text-label">Emergent synergies active</p>
          </div>
          <div className="space-y-2">
            {s.bonuses.map((b) => (
              <div key={b.id} className="flex gap-2.5 rounded-lg border border-accent-emerald/20 bg-accent-emerald/5 p-3">
                <Sparkles className="w-3.5 h-3.5 text-accent-emerald shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-accent-emerald">{b.title}</p>
                  <p className="text-caption mt-0.5">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Penalties */}
      {s.penalties.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-accent-amber" aria-hidden="true" />
            <p className="text-label">Redundancy &amp; antagonism</p>
          </div>
          <div className="space-y-2">
            {s.penalties.map((p) => (
              <div key={p.id} className="flex gap-2.5 rounded-lg border border-accent-amber/20 bg-accent-amber/5 p-3">
                <AlertTriangle className="w-3.5 h-3.5 text-accent-amber shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-accent-amber">{p.title}</p>
                  <p className="text-caption mt-0.5">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-caption border-t border-border pt-4">
        Modeled heuristic from the TNiC evidence database — not a clinical diagnostic. Every term
        (evidence tier, bioavailability, pathway saturation) is transparent and PubMed-anchored.
      </p>
    </div>
  );
}
