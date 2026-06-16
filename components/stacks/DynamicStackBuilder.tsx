'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sun, Moon, AlertTriangle, Sparkles, ShieldAlert, Link2 } from 'lucide-react';
import { compounds } from '@/lib/data';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { useStack } from '@/context/PlatformContext';
import { analyzeStack } from '@/lib/stack-analysis';
import { StackExport } from './StackExport';

const scoreColor = (score: number) =>
  score >= 75 ? 'text-accent-emerald' : score >= 50 ? 'text-accent-cyan' : score >= 25 ? 'text-accent-amber' : 'text-muted-foreground';

const interactionIcon = (type: string) => {
  if (type === 'synergy') return <Sparkles className="w-3.5 h-3.5 text-accent-emerald" />;
  if (type === 'contraindication') return <ShieldAlert className="w-3.5 h-3.5 text-accent-rose" />;
  return <AlertTriangle className="w-3.5 h-3.5 text-accent-amber" />;
};

export function DynamicStackBuilder() {
  const { selected, toggle, score, selectedCompounds } = useStack();
  const analysis = analyzeStack(selected);

  const amDose = selectedCompounds.filter((c) => c.timing === 'AM' || c.timing === 'AM/PM');
  const pmDose = selectedCompounds.filter((c) => c.timing === 'PM');

  const synergyInteractions = analysis.interactions.filter((i) => i.type === 'synergy');
  const cautionInteractions = analysis.interactions.filter((i) => i.type !== 'synergy');

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <div>
          <p className="text-[10px] font-mono text-accent-violet uppercase tracking-wider mb-3">
            Add / Remove Compounds
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {compounds.map((c) => {
              const isOn = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 ${
                    isOn
                      ? 'bg-accent-violet/10 border border-accent-violet/40'
                      : 'glass glass-hover opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        isOn ? 'bg-accent-violet text-black' : 'border border-zinc-600'
                      }`}
                    >
                      {isOn && <Check className="w-3 h-3" />}
                    </span>
                    <EvidenceTag tier={c.evidence} size="sm" />
                  </div>
                  <h4 className="font-bold text-sm mb-0.5">{c.name}</h4>
                  <p className="text-xs text-muted-foreground">{c.dose}</p>
                  <p className="text-[10px] text-caption mt-1 font-mono">{c.pathway}</p>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <StackExport />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-5 space-y-5">
        <div className="gradient-border p-6 text-center">
          <p className="text-[10px] font-mono text-accent-violet uppercase tracking-wider mb-1">Live Synergy Score</p>
          <motion.p
            key={score}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-5xl font-bold ${scoreColor(score)}`}
          >
            {score}
          </motion.p>
          <div className="h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan rounded-full"
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="glass rounded-lg py-2">
              <p className="text-lg font-bold text-accent-cyan">{analysis.hallmarkCount}</p>
              <p className="text-[9px] font-mono text-muted-foreground">HALLMARKS</p>
            </div>
            <div className="glass rounded-lg py-2">
              <p className="text-lg font-bold text-accent-emerald">Tier {analysis.evidenceTier}</p>
              <p className="text-[9px] font-mono text-muted-foreground">EVIDENCE</p>
            </div>
            <div className="glass rounded-lg py-2">
              <p className="text-lg font-bold text-accent-amber">${analysis.monthlyCost.low}–{analysis.monthlyCost.high}</p>
              <p className="text-[9px] font-mono text-muted-foreground">/MONTH</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selected.length > 0 && (
            <motion.div
              key={selected.join(',')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Synergies */}
              {(synergyInteractions.length > 0 || analysis.synergies.length > 0) && (
                <div className="glass rounded-2xl p-5">
                  <p className="text-[10px] font-mono text-accent-emerald uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> Active Synergies
                  </p>
                  <div className="space-y-2">
                    {synergyInteractions.map((i) => (
                      <div key={`${i.compoundIds[0]}-${i.compoundIds[1]}`} className="text-xs">
                        <p className="font-semibold text-emerald-300">{i.title}</p>
                        <p className="text-muted-foreground mt-0.5">{i.detail}</p>
                      </div>
                    ))}
                    {analysis.synergies
                      .filter((s) => !synergyInteractions.some(
                        (i) =>
                          (i.compoundIds[0] === s.from && i.compoundIds[1] === s.to) ||
                          (i.compoundIds[0] === s.to && i.compoundIds[1] === s.from),
                      ))
                      .map((s) => (
                        <div key={`${s.from}-${s.to}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Link2 className="w-3 h-3 text-accent-emerald shrink-0" />
                          {s.label}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Cautions */}
              {(cautionInteractions.length > 0 || analysis.consultIf.length > 0) && (
                <div className="glass rounded-2xl p-5 border border-accent-amber/20">
                  <p className="text-[10px] font-mono text-accent-amber uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Cautions & Contraindications
                  </p>
                  <div className="space-y-2">
                    {cautionInteractions.map((i) => (
                      <div key={`${i.compoundIds[0]}-${i.compoundIds[1]}`} className="flex gap-2 text-xs">
                        {interactionIcon(i.type)}
                        <div>
                          <p className="font-semibold text-amber-300">{i.title}</p>
                          <p className="text-muted-foreground mt-0.5">{i.detail}</p>
                        </div>
                      </div>
                    ))}
                    {analysis.consultIf.slice(0, 4).map((c) => (
                      <p key={c} className="text-xs text-muted-foreground pl-5">• {c}</p>
                    ))}
                    {analysis.consultIf.length > 4 && (
                      <p className="text-[10px] font-mono text-caption pl-5">
                        +{analysis.consultIf.length - 4} more — export for full list
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Dosing */}
              <div className="glass rounded-2xl p-5">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">Dosing Protocol</p>
                <div className="space-y-3">
                  {amDose.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-accent-amber text-xs font-semibold mb-1.5">
                        <Sun className="w-3.5 h-3.5" /> AM
                      </div>
                      {amDose.map((c) => (
                        <div key={c.id} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                          <span className="text-foreground/80">{c.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{c.dose}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {pmDose.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-accent-violet text-xs font-semibold mb-1.5">
                        <Moon className="w-3.5 h-3.5" /> PM
                      </div>
                      {pmDose.map((c) => (
                        <div key={c.id} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                          <span className="text-foreground/80">{c.name}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{c.dose}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selected.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm">Toggle compounds to see real-time synergy and safety analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
}