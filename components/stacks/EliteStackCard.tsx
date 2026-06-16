'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  DollarSign,
  FlaskConical,
  Activity,
  AlertTriangle,
  ExternalLink,
  Zap,
  Pill,
} from 'lucide-react';
import { compounds } from '@/lib/data';
import { useStack } from '@/context/PlatformContext';
import type { EliteStack } from '@/lib/stacks-library';
import { goalLabels, costLabels, simplicityLabels } from '@/lib/stacks-library';

interface EliteStackCardProps {
  stack: EliteStack;
  expanded?: boolean;
}

const tierColor = { A: 'text-emerald-400', B: 'text-cyan-400', C: 'text-amber-400' };
const costColor = { budget: 'text-emerald-400', moderate: 'text-cyan-400', premium: 'text-violet-400', clinical: 'text-rose-400' };

export function EliteStackCard({ stack, expanded: defaultExpanded = false }: EliteStackCardProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const { setSelected } = useStack();

  const loadStack = () => {
    setSelected([...stack.compoundIds]);
    document.getElementById('stack-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const compoundNames = stack.compoundIds.map((id) => compounds.find((c) => c.id === id)?.name ?? id);

  return (
    <motion.div layout className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 hover:bg-white/[0.02] transition"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-violet-400">{goalLabels[stack.goal]}</span>
              <span className={`text-[10px] font-mono ${tierColor[stack.evidenceTier]}`}>
                Tier {stack.evidenceTier}
              </span>
              {stack.rxCompounds && (
                <span className="text-[10px] font-mono text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full">
                  Rx Component
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg mb-1">{stack.name}</h3>
            <p className="text-sm text-zinc-500">{stack.tagline}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1 text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{stack.synergyRating}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {compoundNames.map((name) => (
            <span key={name} className="text-[10px] font-mono bg-violet-400/10 text-violet-300 px-2 py-0.5 rounded-full">
              {name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center">
            <p className={`text-xs font-bold ${costColor[stack.costTier]}`}>{costLabels[stack.costTier]}</p>
            <p className="text-[9px] font-mono text-zinc-600">${stack.costMonthlyUsd.low}–{stack.costMonthlyUsd.high}/mo</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-cyan-400">{simplicityLabels[stack.simplicity]}</p>
            <p className="text-[9px] font-mono text-zinc-600">{stack.compoundIds.length} OTC compounds</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-amber-400">{stack.hallmarkCoverage.length} hallmarks</p>
            <p className="text-[9px] font-mono text-zinc-600">{stack.durationWeeks}</p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-6 border-t border-white/[0.06] pt-5">
              <p className="text-sm text-zinc-400 leading-relaxed">{stack.rationale}</p>
              <p className="text-xs text-zinc-500 italic">{stack.evidenceSummary}</p>

              {/* Breakdown */}
              <div>
                <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5" /> Compound Breakdown
                </p>
                <div className="space-y-3">
                  {stack.breakdown.map((b) => {
                    const compound = compounds.find((c) => c.id === b.compoundId);
                    return (
                      <div key={b.compoundId} className="glass rounded-xl p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-sm">{compound?.name ?? b.compoundId}</h4>
                          <span className="text-[10px] font-mono text-zinc-500">{compound?.dose}</span>
                        </div>
                        <p className="text-xs text-violet-300 mb-1">{b.role}</p>
                        <p className="text-xs text-zinc-500">{b.mechanism}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rx compounds */}
              {stack.rxCompounds && (
                <div>
                  <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Pill className="w-3.5 h-3.5" /> Prescription Components (Educational)
                  </p>
                  {stack.rxCompounds.map((rx) => (
                    <div key={rx.id} className="glass rounded-xl p-4 border border-rose-400/20 mb-2">
                      <h4 className="font-semibold text-sm text-rose-300">{rx.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{rx.class} — {rx.typicalDose}</p>
                      <p className="text-xs text-zinc-400 mt-2">{rx.note}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Dosing schedule */}
              <div>
                <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-3">Dosing Schedule</p>
                {stack.dosingSchedule.map((block, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <p className="text-xs font-semibold text-zinc-300 mb-1">
                      {block.period} {block.time && `· ${block.time}`}
                    </p>
                    {block.items.map((item, j) => {
                      const isRx = !compounds.some((c) => c.id === item.compoundId);
                      const name = isRx
                        ? stack.rxCompounds?.find((r) => r.id === item.compoundId)?.name ?? item.compoundId
                        : compounds.find((c) => c.id === item.compoundId)?.name ?? item.compoundId;
                      return (
                        <div key={j} className="flex justify-between text-xs py-1 border-b border-white/[0.04] last:border-0">
                          <span className={isRx ? 'text-rose-300' : 'text-zinc-400'}>{name}</span>
                          <span className="font-mono text-zinc-600">{item.dose}</span>
                        </div>
                      );
                    })}
                    <p className="text-[10px] text-zinc-600 mt-1">{block.rationale}</p>
                  </div>
                ))}
              </div>

              {/* Monitoring */}
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Monitoring Recommendations
                </p>
                <ul className="space-y-1">
                  {stack.monitoring.map((m) => (
                    <li key={m} className="text-xs text-zinc-500 flex gap-2">
                      <span className="text-cyan-400 shrink-0">•</span> {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Studies */}
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Key Evidence</p>
                {stack.studies.map((s) => (
                  <a
                    key={s.pmid}
                    href={`https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs text-zinc-500 hover:text-cyan-400 transition py-1 group"
                  >
                    <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100" />
                    <span>{s.title} ({s.journal}, {s.year})</span>
                  </a>
                ))}
              </div>

              {/* Warnings */}
              {stack.warnings.length > 0 && (
                <div className="glass rounded-xl p-4 border border-amber-400/20">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Warnings
                  </p>
                  <ul className="space-y-1">
                    {stack.warnings.map((w) => (
                      <li key={w} className="text-xs text-zinc-500">• {w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={loadStack}
                className="w-full bg-violet-400 text-black py-3 rounded-xl text-sm font-semibold hover:bg-cyan-400 transition flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Load into Stack Builder
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}