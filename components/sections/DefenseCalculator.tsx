'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Scan } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { compounds } from '@/lib/data';
import { usePlatform } from '@/context/PlatformContext';
import type { PresetKey } from '@/lib/presets';

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm text-zinc-400">{label}</label>
        <span className="font-mono text-sm text-white">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full age-slider"
      />
    </div>
  );
}

const recLabel = {
  nrf2: 'NRF2 Activation Stack',
  mito: 'Mitochondrial Renewal Stack',
  hybrid: 'Hybrid Defense Stack',
};

const recColor = {
  nrf2: 'text-cyan-400',
  mito: 'text-violet-400',
  hybrid: 'text-emerald-400',
};

const recPreset: Record<string, PresetKey> = {
  nrf2: 'nrf2',
  mito: 'mito',
  hybrid: 'hybrid',
};

export function DefenseCalculator() {
  const { profile, setProfile, defenseProfile, applyPreset } = usePlatform();
  const { age, stress, sleep, exercise, scanned } = profile;

  const recommendedCompounds = compounds.filter((c) => {
    if (defenseProfile.recommendation === 'hybrid') return true;
    return c.badge === defenseProfile.recommendation;
  }).slice(0, 3);

  const runScan = () => setProfile({ scanned: true });

  return (
    <SectionShell
      id="calculator"
      mod="MOD-AGE-05"
      theme="rose"
      badge="Biological Age Engine"
      title="Biological Age Calculator"
      subtitle="DoNotAge sells biological age tests for $$$. InsideTracker requires blood draws. TNiC estimates your biological age from lifestyle inputs — then prescribes the stack to reverse it."
      className="bg-[#030712]"
    >
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="gradient-border p-8 space-y-6">
          <SliderControl label="Age" value={age} onChange={(v) => setProfile({ age: v })} min={25} max={80} />
          <SliderControl label="Stress Load" value={stress} onChange={(v) => setProfile({ stress: v })} min={0} max={100} unit="%" />
          <SliderControl label="Sleep Quality" value={sleep} onChange={(v) => setProfile({ sleep: v })} min={0} max={100} unit="%" />
          <SliderControl label="Exercise Frequency" value={exercise} onChange={(v) => setProfile({ exercise: v })} min={0} max={100} unit="%" />

          <button
            onClick={runScan}
            className="w-full flex items-center justify-center gap-3 bg-rose-400 text-black py-4 rounded-2xl font-bold hover:bg-cyan-400 transition-all duration-300"
          >
            <Scan className="w-5 h-5" />
            Execute Defense Scan
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-8">
            <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-4">Priority Matrix</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">NRF2 Pathway</span>
                  <span className="font-mono text-cyan-400">{defenseProfile.nrf2}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400 rounded-full"
                    animate={{ width: scanned ? `${defenseProfile.nrf2}%` : '0%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Mitochondrial Pathway</span>
                  <span className="font-mono text-violet-400">{defenseProfile.mito}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-400 rounded-full"
                    animate={{ width: scanned ? `${defenseProfile.mito}%` : '0%' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>
            </div>

            {scanned && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-white/[0.06]"
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase">Chronological</p>
                    <p className="text-2xl font-bold font-mono">{age}</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center border border-rose-400/20">
                    <p className="text-[10px] text-rose-400 uppercase">Biological</p>
                    <p className="text-2xl font-bold font-mono text-rose-400">{defenseProfile.biologicalAge}</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase">Reversal</p>
                    <p className={`text-2xl font-bold font-mono ${defenseProfile.ageDelta > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {defenseProfile.ageDelta > 0 ? `-${defenseProfile.ageDelta}` : `+${Math.abs(defenseProfile.ageDelta)}`} yr
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-zinc-500">Defense Index</p>
                    <p className="text-4xl font-bold stat-glow text-rose-400">{defenseProfile.defenseScore}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Recommended</p>
                    <p className={`font-bold ${recColor[defenseProfile.recommendation]}`}>
                      {recLabel[defenseProfile.recommendation]}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mb-4">
                  {defenseProfile.recommendation === 'nrf2'
                    ? 'High oxidative load detected. Prioritize NRF2 activation and glutathione restoration before mitochondrial optimization.'
                    : defenseProfile.recommendation === 'mito'
                      ? 'Energy crisis pattern identified. NAD+ restoration and mitochondrial biogenesis should lead your protocol.'
                      : 'Dual-pathway decline detected. A hybrid stack addressing both NRF2 and mitochondrial systems is optimal.'}
                </p>

                <div className="space-y-2">
                  {recommendedCompounds.map((c) => (
                    <div key={c.id} className="flex items-center justify-between glass rounded-lg px-4 py-3">
                      <span className="text-sm font-semibold">{c.name}</span>
                      <span className="text-xs font-mono text-zinc-500">{c.dose}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => applyPreset(recPreset[defenseProfile.recommendation])}
                    className="flex-1 flex items-center justify-center gap-2 bg-rose-400 text-black py-3 rounded-xl text-sm font-semibold hover:bg-cyan-400 transition-all"
                  >
                    Apply Recommended Stack
                  </button>
                  <a
                    href="#stacks"
                    className="flex-1 flex items-center justify-center gap-2 glass py-3 rounded-xl text-sm text-rose-400 hover:text-cyan-400 transition-colors"
                  >
                    Customize in Architect <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}