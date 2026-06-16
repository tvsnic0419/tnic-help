'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Scale, Eye, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import {
  evidenceStandards,
  selectionCriteria,
  transparencyPledge,
  safetyNotes,
  generalSafetyGuidance,
  compounds,
} from '@/lib/data';

const tabs = [
  { id: 'standards', label: 'Evidence Standards', icon: Scale },
  { id: 'safety', label: 'Safety Center', icon: Shield },
  { id: 'transparency', label: 'Transparency', icon: Eye },
] as const;

type TabId = (typeof tabs)[number]['id'];

const tierColors = {
  A: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  B: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  C: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
};

export function TrustCenter() {
  const [tab, setTab] = useState<TabId>('standards');
  const [selectedSafety, setSelectedSafety] = useState(safetyNotes[0].compoundId);

  const safety = safetyNotes.find((s) => s.compoundId === selectedSafety)!;
  const compound = compounds.find((c) => c.id === selectedSafety)!;

  return (
    <SectionShell
      id="trust"
      mod="MOD-TRU-08"
      theme="emerald"
      badge="Trust & Credibility"
      title="How TNiC Earns Your Trust"
      subtitle="Consumers deserve to know how recommendations are made, what the evidence actually says, and what safety limits apply. No black boxes."
      className="bg-[#0a0f1a]/60"
    >
      <div className="flex flex-wrap gap-2 mb-10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-emerald-400 text-black' : 'glass text-zinc-400 hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'standards' && (
          <motion.div
            key="standards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {evidenceStandards.map((std) => (
                <div key={std.tier} className={`gradient-border p-6 border ${tierColors[std.tier]}`}>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${tierColors[std.tier]}`}>
                    Tier {std.tier}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-4">{std.label.split('—')[1]?.trim()}</h3>
                  <ul className="space-y-2 mb-4">
                    {std.criteria.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-zinc-500 border-t border-white/[0.06] pt-3">
                    <span className="text-emerald-400 font-mono">Example: </span>{std.example}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-4">
              5-Step Compound Selection Process
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {selectionCriteria.map((c) => (
                <div key={c.step} className="glass rounded-xl p-5">
                  <span className="font-mono text-emerald-400 text-xs">{c.step}</span>
                  <h4 className="font-bold text-sm mt-2 mb-2">{c.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'safety' && (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="gradient-border p-6 mb-8 border border-amber-400/20 bg-amber-400/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-2">General Safety Protocol</h3>
                  <ul className="space-y-2">
                    {generalSafetyGuidance.map((g) => (
                      <li key={g} className="text-sm text-zinc-400 flex items-start gap-2">
                        <span className="text-amber-400 shrink-0">•</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {compounds.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedSafety(c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedSafety === c.id
                      ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                      : 'glass text-zinc-400'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="gradient-border p-8">
              <h3 className="text-xl font-bold mb-1">{compound.name}</h3>
              <p className="text-xs text-zinc-500 mb-6">{compound.dose} · Evidence Tier {compound.evidence}</p>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] font-mono text-amber-400 uppercase mb-3">Cautions</p>
                  {safety.cautions.map((c) => (
                    <p key={c} className="text-sm text-zinc-400 mb-2 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> {c}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-rose-400 uppercase mb-3">Avoid If</p>
                  {safety.avoidIf.length > 0 ? safety.avoidIf.map((a) => (
                    <p key={a} className="text-sm text-zinc-400 mb-2">{a}</p>
                  )) : (
                    <p className="text-sm text-zinc-600">No absolute contraindications listed</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-cyan-400 uppercase mb-3">Consult Physician If</p>
                  {safety.consultIf.map((c) => (
                    <p key={c} className="text-sm text-zinc-400 mb-2 flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /> {c}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'transparency' && (
          <motion.div
            key="transparency"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {transparencyPledge.map((item, i) => (
              <div key={item.title} className="glass rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
                <span className="font-mono text-[10px] text-zinc-600 shrink-0">0{i + 1}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}