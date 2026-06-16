'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sun, Moon, Share2, Copy, CheckCheck, Bookmark, Sparkles } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { compounds } from '@/lib/data';
import { stackPresets, type PresetKey } from '@/lib/presets';
import { useStack } from '@/context/PlatformContext';

export function StackArchitect() {
  const { selected, toggle, score, selectedCompounds, shareUrl, saveStack, saved, applyPreset } = useStack();
  const [copied, setCopied] = useState(false);

  const amDose = selectedCompounds.filter((c) => c.timing === 'AM' || c.timing === 'AM/PM');
  const pmDose = selectedCompounds.filter((c) => c.timing === 'PM' || c.timing === 'AM/PM');

  const scoreColor = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-cyan-400' : score >= 25 ? 'text-amber-400' : 'text-zinc-500';

  const exportStack = async () => {
    const lines = [
      'TNiC Defense Stack Protocol',
      `Synergy Score: ${score}/100`,
      `Share: ${shareUrl}`,
      '',
      'AM Stack:',
      ...amDose.map((c) => `  • ${c.name} — ${c.dose}`),
      '',
      'PM Stack:',
      ...pmDose.filter((c) => c.timing === 'PM').map((c) => `  • ${c.name} — ${c.dose}`),
      '',
      'Generated at tnic.help — Not medical advice.',
    ];
    await navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareStack = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'My TNiC Stack', url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const presetKeys = Object.keys(stackPresets) as PresetKey[];

  return (
    <SectionShell
      id="stacks"
      mod="MOD-ARC-04"
      theme="violet"
      badge="Stack Architect"
      title="Build Your Defense Stack"
      subtitle="Toggle compounds, score synergy, apply evidence-graded presets, save to your browser, and share a link."
      className="bg-[#0a0f1a]/60"
    >
      <div className="mb-8">
        <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Evidence-Graded Presets
        </p>
        <div className="flex flex-wrap gap-2">
          {presetKeys.map((key) => {
            const p = stackPresets[key];
            const isActive = p.ids.length === selected.length && p.ids.every((id) => selected.includes(id));
            return (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-violet-400 text-black'
                    : 'glass text-zinc-400 hover:text-white hover:border-violet-400/30'
                }`}
              >
                <span className="block">{p.label}</span>
                <span className={`block text-[10px] font-normal ${isActive ? 'text-black/70' : 'text-zinc-600'}`}>
                  {p.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {compounds.map((c) => {
              const isOn = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 ${
                    isOn
                      ? 'bg-violet-400/10 border border-violet-400/40'
                      : 'glass glass-hover opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center ${
                      isOn ? 'bg-violet-400 text-black' : 'border border-zinc-600'
                    }`}>
                      {isOn && <Check className="w-3 h-3" />}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Tier {c.evidence}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">{c.name}</h4>
                  <p className="text-xs text-zinc-500">{c.dose}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="gradient-border p-8 text-center">
            <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-2">Synergy Score</p>
            <motion.p
              key={score}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-6xl font-bold ${scoreColor}`}
            >
              {score}
            </motion.p>
            <div className="h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-6"
              >
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-4">Dosing Protocol</p>
                <div className="space-y-4">
                  {amDose.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-2">
                        <Sun className="w-3.5 h-3.5" /> AM Stack
                      </div>
                      {amDose.map((c) => (
                        <div key={c.id} className="flex justify-between text-sm py-1.5 border-b border-white/[0.04] last:border-0">
                          <span className="text-zinc-300">{c.name}</span>
                          <span className="font-mono text-xs text-zinc-500">{c.dose}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {pmDose.filter((c) => c.timing === 'PM').length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold mb-2">
                        <Moon className="w-3.5 h-3.5" /> PM Stack
                      </div>
                      {pmDose.filter((c) => c.timing === 'PM').map((c) => (
                        <div key={c.id} className="flex justify-between text-sm py-1.5 border-b border-white/[0.04] last:border-0">
                          <span className="text-zinc-300">{c.name}</span>
                          <span className="font-mono text-xs text-zinc-500">{c.dose}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <button
                    onClick={saveStack}
                    className="flex flex-col items-center gap-1 glass py-3 rounded-xl text-xs font-semibold hover:border-violet-400/30 transition-all"
                  >
                    <Bookmark className={`w-4 h-4 ${saved ? 'text-emerald-400' : ''}`} />
                    {saved ? 'Saved!' : 'Save'}
                  </button>
                  <button
                    onClick={exportStack}
                    className="flex flex-col items-center gap-1 glass py-3 rounded-xl text-xs font-semibold hover:border-violet-400/30 transition-all"
                  >
                    {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    Copy
                  </button>
                  <button
                    onClick={shareStack}
                    className="flex flex-col items-center gap-1 bg-violet-400 text-black py-3 rounded-xl text-xs font-semibold hover:bg-cyan-400 transition-all"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}