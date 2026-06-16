'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, LineChart, Lightbulb, Dna, Shield, Download } from 'lucide-react';
import { analyzeLabs } from '@/lib/lab-analysis';
import { usePlatform } from '@/context/PlatformContext';
import { UserFlowGuide } from './UserFlowGuide';
import { BiomarkerInput } from './BiomarkerInput';
import { LabTrendDashboard } from './LabTrendDashboard';
import { HallmarkRiskPanel } from './HallmarkRiskPanel';
import { LabRecommendations } from './LabRecommendations';
import { PrivacyPanel } from './PrivacyPanel';

type Tab = 'input' | 'trends' | 'risk' | 'insights' | 'privacy';

const tabs: { id: Tab; label: string; icon: typeof FlaskConical; step: number }[] = [
  { id: 'input', label: 'Input', icon: FlaskConical, step: 1 },
  { id: 'trends', label: 'Trends', icon: LineChart, step: 2 },
  { id: 'risk', label: 'Hallmark Risk', icon: Dna, step: 3 },
  { id: 'insights', label: 'Insights', icon: Lightbulb, step: 4 },
  { id: 'privacy', label: 'Privacy', icon: Shield, step: 5 },
];

export function LabHub() {
  const { labs, selected, exportLabsCsv } = usePlatform();
  const [tab, setTab] = useState<Tab>('input');

  const analysis = useMemo(() => analyzeLabs(labs, selected), [labs, selected]);

  const downloadCsv = () => {
    const blob = new Blob([exportLabsCsv()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnic-labs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeTab = tabs.find((t) => t.id === tab)!;

  return (
    <div className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-zinc-300">
            <FlaskConical className="w-4 h-4 text-rose-400" />
            Lab Analysis & Tracking Hub
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Your Biomarkers. Your Data. Your Insights.
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Log lab results, visualize trends, map risks to the 12 Hallmarks of Aging,
            and get stack-aware recommendations — all processed locally in your browser.
          </p>
        </div>

        {/* Score strip */}
        {analysis.markersTracked > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8"
          >
            {[
              { label: 'Healthspan Score', value: analysis.healthspanScore, color: 'text-rose-400' },
              { label: 'Markers Tracked', value: analysis.markersTracked, color: 'text-cyan-400' },
              { label: 'Optimal', value: analysis.markersOptimal, color: 'text-emerald-400' },
              { label: 'Watch', value: analysis.markersWatch, color: 'text-amber-400' },
              { label: 'Panel Coverage', value: `${analysis.dataCompleteness}%`, color: 'text-violet-400' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[9px] font-mono text-zinc-600 uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        <UserFlowGuide currentStep={activeTab.step} />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-rose-400 text-black'
                    : 'glass text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
          {labs.length > 0 && (
            <button
              onClick={downloadCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass text-zinc-400 hover:text-emerald-400 transition"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          )}
        </div>

        {/* Alerts */}
        {analysis.topConcern && (
          <div className="glass rounded-xl px-4 py-3 mb-6 border border-amber-400/20 text-xs text-amber-300">
            Top concern: <span className="font-semibold">{analysis.topConcern}</span>
            {analysis.topWin && <span className="text-zinc-500"> · Win: {analysis.topWin}</span>}
          </div>
        )}

        {/* Tab content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'input' && (
            <div className="max-w-2xl mx-auto">
              <BiomarkerInput />
            </div>
          )}

          {tab === 'trends' && (
            analysis.snapshots.length > 0 ? (
              <LabTrendDashboard snapshots={analysis.snapshots} />
            ) : (
              <EmptyState message="Log your first lab result to unlock trend visualization." action="Go to Input" onAction={() => setTab('input')} />
            )
          )}

          {tab === 'risk' && (
            <div className="max-w-3xl mx-auto">
              <HallmarkRiskPanel risks={analysis.hallmarkRisks} healthspanScore={analysis.healthspanScore} />
            </div>
          )}

          {tab === 'insights' && (
            <div className="max-w-2xl mx-auto">
              <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-4">
                Personalized Recommendations — synced with your active stack
              </p>
              <LabRecommendations recommendations={analysis.recommendations} />
            </div>
          )}

          {tab === 'privacy' && (
            <div className="max-w-3xl mx-auto">
              <PrivacyPanel />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function EmptyState({
  message,
  action,
  onAction,
}: {
  message: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <p className="text-zinc-500 text-sm mb-4">{message}</p>
      <button
        onClick={onAction}
        className="text-sm font-semibold text-rose-400 hover:text-cyan-400 transition"
      >
        {action} →
      </button>
    </div>
  );
}