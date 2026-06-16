'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Download,
  Upload,
  FlaskConical,
  Layers,
  Activity,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { usePlatform } from '@/context/PlatformContext';
import { biomarkers, gettingStartedSteps } from '@/lib/data';
import { getLabStatus } from '@/lib/labs';

export function PersonalDashboard() {
  const {
    selected,
    score,
    selectedCompounds,
    profile,
    defenseProfile,
    labs,
    checklist,
    toggleChecklist,
    exportAll,
    importAll,
  } = usePlatform();

  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const labOptimal = labs.length > 0
    ? [...new Set(labs.map((e) => e.markerId))].filter((id) => {
        const latest = labs
          .filter((e) => e.markerId === id)
          .sort((a, b) => b.date.localeCompare(a.date))[0];
        return latest && getLabStatus(id, latest.value) === 'optimal';
      }).length
    : 0;

  const checklistTotal = gettingStartedSteps.length;
  const checklistDone = gettingStartedSteps.filter((s) =>
    checklist.includes(String(s.step)),
  ).length;

  const downloadAll = () => {
    const blob = new Blob([exportAll()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnic-platform-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (text: string) => {
    const ok = importAll(text);
    setImportMsg(ok ? 'Platform data restored.' : 'Invalid file — use a TNiC export.');
    setTimeout(() => setImportMsg(null), 3000);
  };

  const stats = [
    {
      label: 'Synergy Score',
      value: `${score}`,
      sub: `${selected.length} compounds active`,
      icon: Layers,
      color: 'text-violet-400',
      href: '#stacks',
    },
    {
      label: 'Biological Age',
      value: profile.scanned ? `${defenseProfile.biologicalAge}` : '—',
      sub: profile.scanned
        ? `${defenseProfile.ageDelta > 0 ? '-' : '+'}${Math.abs(defenseProfile.ageDelta)} yr vs ${profile.age}`
        : 'Run defense scan',
      icon: Activity,
      color: 'text-rose-400',
      href: '#calculator',
    },
    {
      label: 'Lab Markers',
      value: `${new Set(labs.map((e) => e.markerId)).size}`,
      sub: labs.length > 0 ? `${labOptimal} optimal · ${labs.length} readings` : 'No entries yet',
      icon: FlaskConical,
      color: 'text-cyan-400',
      href: '/labs',
    },
    {
      label: 'Journey Progress',
      value: `${checklistDone}/${checklistTotal}`,
      sub: 'Getting started checklist',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      href: '#learn',
    },
  ];

  return (
    <SectionShell
      id="dashboard"
      mod="MOD-DSH-12"
      theme="emerald"
      badge="Personal Command Center"
      title="Your Longevity Operating System"
      subtitle="Stack, labs, bio age, and journey — unified in one dashboard. Everything stays in your browser unless you export it."
      className="bg-gradient-to-b from-emerald-400/5 to-transparent border-y border-white/[0.06]"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="glass glass-hover rounded-2xl p-5 group transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition" />
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase">{s.label}</p>
            <p className={`text-3xl font-bold font-mono mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.sub}</p>
          </a>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 gradient-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <p className="text-[10px] font-mono text-emerald-400 uppercase">Active Stack</p>
          </div>
          {selectedCompounds.length === 0 ? (
            <p className="text-sm text-zinc-500">No compounds selected. <a href="#stacks" className="text-emerald-400 hover:underline">Build your stack</a></p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedCompounds.map((c) => (
                <div key={c.id} className="glass rounded-xl px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-[10px] text-zinc-500">{c.timing} · Tier {c.evidence}</p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">{c.badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-3">Getting Started</p>
            <div className="space-y-2">
              {gettingStartedSteps.map((step) => {
                const done = checklist.includes(String(step.step));
                return (
                  <label key={step.step} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleChecklist(String(step.step))}
                      className="mt-1 accent-emerald-400"
                    />
                    <span className={`text-xs ${done ? 'text-zinc-500 line-through' : 'text-zinc-300 group-hover:text-white'}`}>
                      {step.title}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-3">Data Portability</p>
            <div className="flex gap-2">
              <button
                onClick={downloadAll}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-400 text-black py-2.5 rounded-xl text-xs font-semibold hover:bg-cyan-400 transition"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 glass py-2.5 rounded-xl text-xs font-semibold hover:border-emerald-400/30 transition"
              >
                <Upload className="w-3.5 h-3.5" /> Import
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => handleImport(reader.result as string);
                reader.readAsText(file);
                e.target.value = '';
              }}
            />
            {importMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-emerald-400 mt-3"
              >
                {importMsg}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {labs.length > 0 && (
        <div className="mt-6 glass rounded-2xl p-5">
          <p className="text-[10px] font-mono text-zinc-500 uppercase mb-3">Latest Lab Snapshot</p>
          <div className="flex flex-wrap gap-3">
            {biomarkers.map((b) => {
              const latest = labs
                .filter((e) => e.markerId === b.id)
                .sort((a, c) => c.date.localeCompare(a.date))[0];
              if (!latest) return null;
              const status = getLabStatus(b.id, latest.value);
              const color = status === 'optimal' ? 'text-emerald-400' : status === 'watch' ? 'text-amber-400' : 'text-rose-400';
              return (
                <div key={b.id} className="glass rounded-lg px-3 py-2 text-xs">
                  <span className="text-zinc-500">{b.name}: </span>
                  <span className={`font-mono font-semibold ${color}`}>{latest.value}</span>
                  <span className="text-zinc-600 ml-1">{b.unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionShell>
  );
}