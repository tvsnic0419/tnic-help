'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { MarkerChart } from '@/components/charts/MarkerChart';
import { biomarkers } from '@/lib/data';
import { getLabStatus } from '@/lib/labs';
import type { MarkerSnapshot } from '@/lib/lab-analysis';
import type { LabEntry } from '@/lib/labs';
import { usePlatform } from '@/context/PlatformContext';

const statusColor = {
  optimal: 'text-emerald-400 bg-emerald-400/10',
  watch: 'text-amber-400 bg-amber-400/10',
  critical: 'text-rose-400 bg-rose-400/10',
};

const trendIcon = {
  improving: { icon: TrendingUp, color: 'text-emerald-400' },
  declining: { icon: TrendingDown, color: 'text-rose-400' },
  stable: { icon: Minus, color: 'text-zinc-500' },
  unknown: { icon: Minus, color: 'text-zinc-600' },
};

interface LabTrendDashboardProps {
  snapshots: MarkerSnapshot[];
}

export function LabTrendDashboard({ snapshots }: LabTrendDashboardProps) {
  const { labs } = usePlatform();
  const [selected, setSelected] = useState(snapshots[0]?.markerId ?? biomarkers[0].id);

  const activeSnapshot = snapshots.find((s) => s.markerId === selected);
  const activeBiomarker = biomarkers.find((b) => b.id === selected);
  const chartEntries = labs.filter((e) => e.markerId === selected);

  const markersWithTrends = snapshots.filter((s) => s.readingCount >= 2);

  return (
    <div className="space-y-6">
      {/* Overview sparkline grid */}
      <div>
        <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5" /> Marker Overview
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {snapshots.map((snap) => {
            const TrendIco = trendIcon[snap.trend].icon;
            const isActive = selected === snap.markerId;
            return (
              <motion.button
                key={snap.markerId}
                layout
                onClick={() => setSelected(snap.markerId)}
                className={`glass rounded-xl p-4 text-left transition-all ${
                  isActive ? 'ring-1 ring-rose-400/40 bg-rose-400/5' : 'hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xs font-semibold truncate pr-2">{snap.name}</h4>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${statusColor[snap.status]}`}>
                    {snap.status}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold font-mono">{snap.value}</p>
                    <p className="text-[9px] text-zinc-600">{snap.date}</p>
                  </div>
                  <TrendIco className={`w-4 h-4 ${trendIcon[snap.trend].color}`} />
                </div>
                {snap.readingCount >= 2 && (
                  <div className="mt-2 h-10">
                    <MarkerChart markerId={snap.markerId} entries={labs} height={40} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detailed chart */}
      {activeSnapshot && activeBiomarker && (
        <div className="gradient-border p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold">{activeBiomarker.name}</h3>
              <p className="text-xs text-zinc-500">
                Optimal: {activeBiomarker.optimal} {activeBiomarker.unit} · Critical: {activeBiomarker.critical}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold font-mono">{activeSnapshot.value}</p>
              <p className="text-[10px] text-zinc-600">{activeSnapshot.readingCount} readings</p>
            </div>
          </div>

          {chartEntries.length >= 2 ? (
            <>
              <MarkerChart markerId={selected} entries={labs} height={160} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {chartEntries
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((e: LabEntry) => (
                    <div key={e.id} className="glass rounded-lg py-2 px-1">
                      <p className="text-[9px] text-zinc-600">{e.date}</p>
                      <p className="text-sm font-mono font-bold">{e.value}</p>
                      <p className={`text-[9px] ${statusColor[getLabStatus(e.markerId, e.value)].split(' ')[0]}`}>
                        {getLabStatus(e.markerId, e.value)}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-sm text-zinc-500">
              Log 2+ readings for {activeBiomarker.name} to visualize trends
            </div>
          )}
        </div>
      )}

      {markersWithTrends.length === 0 && snapshots.length > 0 && (
        <p className="text-xs text-zinc-600 text-center">
          Add repeat tests over time to unlock trend analysis and trajectory insights.
        </p>
      )}
    </div>
  );
}