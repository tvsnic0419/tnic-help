'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingDown, TrendingUp, Target } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { biomarkers, compounds, simulateBiomarkers } from '@/lib/data';
import { usePlatform } from '@/context/PlatformContext';

export function BiomarkerCommand() {
  const { selected, toggle, profile, setProfile } = usePlatform();
  const [selectedMarker, setSelectedMarker] = useState(biomarkers[0].id);

  const simulated = simulateBiomarkers(
    profile.age,
    profile.stress,
    profile.sleep,
    profile.exercise,
    selected,
  );
  const active = simulated.find((b) => b.id === selectedMarker)!;

  return (
    <SectionShell
      id="biomarkers"
      mod="MOD-BIO-01"
      theme="cyan"
      badge="Biomarker Command Center"
      title="Track What Matters"
      subtitle="InsideTracker charges $589 for blood panels. TNiC maps 6 critical longevity biomarkers to your stack in real time — the same intelligence, zero lab wait."
      className="bg-[#030712]"
    >
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="gradient-border p-6">
            <label className="text-sm text-zinc-400 block mb-2">Your Age</label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="range"
                min={30}
                max={75}
                value={profile.age}
                onChange={(e) => setProfile({ age: Number(e.target.value) })}
                className="flex-1 age-slider"
              />
              <span className="text-2xl font-bold font-mono w-12">{profile.age}</span>
            </div>

            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
              Active Stack <span className="text-cyan-400">(synced)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {compounds.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`text-[10px] px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    selected.includes(c.id)
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                      : 'glass text-zinc-500'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {simulated.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedMarker(b.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedMarker === b.id ? 'bg-cyan-400/10 border border-cyan-400/30' : 'glass glass-hover'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{b.name}</span>
                  <span className={`text-xs font-mono ${
                    b.status >= 70 ? 'text-emerald-400' : b.status >= 45 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {b.status}%
                  </span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      b.status >= 70 ? 'bg-emerald-400' : b.status >= 45 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${b.status}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedMarker}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 gradient-border p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">{active.name}</h3>
              <p className="text-sm text-zinc-400">{active.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold stat-glow text-cyan-400">{active.status}%</p>
              <p className="text-[10px] text-zinc-500 uppercase">Projected Status</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <Target className="w-4 h-4 text-emerald-400 mb-2" />
              <p className="text-[10px] text-zinc-500 uppercase">Optimal Range</p>
              <p className="font-mono text-sm">{active.optimal} {active.unit}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <TrendingDown className="w-4 h-4 text-rose-400 mb-2" />
              <p className="text-[10px] text-zinc-500 uppercase">Critical Threshold</p>
              <p className="font-mono text-sm">{active.critical} {active.unit}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <Activity className="w-4 h-4 text-cyan-400 mb-2" />
              <p className="text-[10px] text-zinc-500 uppercase">Stack Targeting</p>
              <p className={`text-sm font-semibold ${active.targeted ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {active.targeted ? 'Active' : 'Not Covered'}
              </p>
            </div>
          </div>

          <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-3">Targeting Compounds</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {active.compounds.map((cid) => {
              const c = compounds.find((x) => x.id === cid)!;
              const isActive = selected.includes(cid);
              return (
                <div
                  key={cid}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    isActive ? 'bg-emerald-400/10 border border-emerald-400/20' : 'glass'
                  }`}
                >
                  {isActive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-zinc-600 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.pathway}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}