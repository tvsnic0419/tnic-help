'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { Check, Sun, Moon, AlertTriangle, Sparkles, ShieldAlert } from 'lucide-react';
import { compounds } from '@/lib/data';
import { simulateStack } from '@/lib/tools/stack-simulator';
import { usePlatform } from '@/context/PlatformContext';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { ToolDisclaimer } from './ToolDisclaimer';

const scoreColor = (s: number) =>
  s >= 75 ? 'text-emerald-400' : s >= 50 ? 'text-cyan-400' : s >= 25 ? 'text-amber-400' : 'text-zinc-500';

const riskVariant = (l: string): 'success' | 'warning' | 'danger' | 'info' => {
  if (l === 'low') return 'success';
  if (l === 'moderate') return 'info';
  if (l === 'elevated') return 'warning';
  return 'danger';
};

export function StackSimulatorTool() {
  const { selected, toggle, profile, setProfile } = usePlatform();
  const age = profile.age;

  const result = useMemo(() => simulateStack(selected, age), [selected, age]);

  return (
    <div className="space-y-6">
      <ToolDisclaimer />

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Card elevated>
            <CardHeader>
              <CardTitle>Compound selector</CardTitle>
              <CardDescription>
                Toggle compounds to see live synergy scoring, interaction checks, and age-adjusted dosing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 max-w-sm">
                <Slider
                  label="Your age (dose adjustment)"
                  value={age}
                  onChange={(v) => setProfile({ age: v })}
                  min={25}
                  max={85}
                  unit=" yrs"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {compounds.map((c) => {
                  const isOn = selected.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggle(c.id)}
                      className={`focus-ring interactive text-left p-4 rounded-xl transition-all ${
                        isOn
                          ? 'bg-violet-400/10 border border-violet-400/40'
                          : 'glass glass-hover opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            isOn ? 'bg-violet-400 text-black' : 'border border-zinc-600'
                          }`}
                        >
                          {isOn && <Check className="w-3 h-3" />}
                        </span>
                        <EvidenceTag tier={c.evidence} size="sm" />
                      </div>
                      <h4 className="font-bold text-sm">{c.name}</h4>
                      <p className="text-xs text-zinc-500">{c.dose}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized dosing</CardTitle>
                    <CardDescription>Age-adjusted from published trial ranges — not prescriptions.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span className="text-label text-amber-400">AM protocol</span>
                      </div>
                      <ul className="space-y-2">
                        {result.dosingSchedule.am.map((d) => (
                          <li key={d.compoundId} className="glass rounded-lg p-3 text-sm">
                            <div className="flex justify-between gap-2">
                              <span className="font-semibold text-white">{d.name}</span>
                              <EvidenceTag tier={d.evidence} size="sm" />
                            </div>
                            <p className="text-cyan-400 font-mono text-xs mt-1">{d.adjustedDose}</p>
                            {d.adjustmentReason && (
                              <p className="text-caption text-zinc-600 mt-1">{d.adjustmentReason}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {result.dosingSchedule.pm.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Moon className="w-4 h-4 text-violet-400" />
                          <span className="text-label text-violet-400">PM protocol</span>
                        </div>
                        <ul className="space-y-2">
                          {result.dosingSchedule.pm.map((d) => (
                            <li key={d.compoundId} className="glass rounded-lg p-3 text-sm">
                              <span className="font-semibold text-white">{d.name}</span>
                              <p className="text-violet-400 font-mono text-xs mt-1">{d.adjustedDose}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <Card elevated className="text-center">
            <p className="text-label text-violet-400 mb-1">Synergy score</p>
            <motion.p
              key={result.analysis.score}
              className={`text-5xl font-bold ${scoreColor(result.analysis.score)}`}
            >
              {result.analysis.score}
            </motion.p>
            <div className="mt-3">
              <Progress value={result.analysis.score} color="violet" showValue={false} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="glass rounded-lg py-2">
                <p className="text-lg font-bold text-cyan-400">{result.analysis.hallmarkCount}</p>
                <p className="text-[9px] font-mono text-zinc-500">HALLMARKS</p>
              </div>
              <div className="glass rounded-lg py-2">
                <p className="text-lg font-bold text-emerald-400">Tier {result.analysis.evidenceTier}</p>
                <p className="text-[9px] font-mono text-zinc-500">EVIDENCE</p>
              </div>
              <div className="glass rounded-lg py-2">
                <p className="text-lg font-bold text-amber-400">
                  ${result.analysis.monthlyCost.low}–{result.analysis.monthlyCost.high}
                </p>
                <p className="text-[9px] font-mono text-zinc-500">/MO</p>
              </div>
            </div>
            <p className="text-body-sm mt-4 text-left">{result.summaryVerdict}</p>
          </Card>

          {selected.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hallmark coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={result.hallmarkRadar.filter((d) => d.coverage > 0)}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="hallmark" tick={{ fill: '#71717a', fontSize: 9 }} />
                    <Radar
                      dataKey="coverage"
                      stroke="#a78bfa"
                      fill="#a78bfa"
                      fillOpacity={0.35}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Side effect & interaction risks</CardTitle>
                <Badge variant={riskVariant(result.riskLevel)}>{result.riskLevel} risk</Badge>
              </div>
              <Progress value={result.riskScore} max={100} label="Risk index" color="amber" />
            </CardHeader>
            <CardContent>
              {result.sideEffectRisks.length === 0 ? (
                <p className="text-body-sm">Select compounds to surface risks.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto scroll-region">
                  {result.sideEffectRisks.slice(0, 12).map((r) => (
                    <li key={r.id} className="flex gap-2 text-xs p-2 rounded-lg bg-white/[0.02]">
                      {r.category === 'interaction' ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      ) : r.severity === 'high' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      ) : r.category === 'caution' ? (
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-zinc-300">{r.risk}</span>
                        <p className="text-zinc-600 mt-0.5">{r.compoundName}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {result.analysis.interactions.filter((i) => i.type === 'synergy').length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active synergies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.analysis.interactions
                    .filter((i) => i.type === 'synergy')
                    .map((i) => (
                      <li key={i.title} className="text-xs text-zinc-400 flex gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          <strong className="text-emerald-400">{i.title}</strong> — {i.detail}
                        </span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}