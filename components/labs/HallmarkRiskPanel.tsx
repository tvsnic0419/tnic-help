'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, Shield, ArrowRight } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import type { HallmarkRisk, RiskLevel } from '@/lib/lab-analysis';

const riskStyle: Record<RiskLevel, { bar: string; text: string; bg: string }> = {
  low: { bar: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  moderate: { bar: 'bg-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  elevated: { bar: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-400/10' },
  high: { bar: 'bg-rose-400', text: 'text-rose-400', bg: 'bg-rose-400/10' },
};

interface HallmarkRiskPanelProps {
  risks: HallmarkRisk[];
  healthspanScore: number;
}

export function HallmarkRiskPanel({ risks, healthspanScore }: HallmarkRiskPanelProps) {
  const slugFor = (id: string) => hallmarkLibrary.find((h) => h.id === id)?.slug ?? id;

  if (risks.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <Shield className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-500 text-sm">Log biomarkers to generate hallmark-linked risk insights.</p>
        <p className="text-xs text-zinc-600 mt-2">Each marker maps to 1–4 hallmarks of aging for prognosis analysis.</p>
      </div>
    );
  }

  const elevated = risks.filter((r) => r.riskLevel === 'high' || r.riskLevel === 'elevated');

  return (
    <div className="space-y-6">
      {/* Healthspan score */}
      <div className="gradient-border p-6 text-center">
        <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-1">Lab-Derived Healthspan Score</p>
        <motion.p
          key={healthspanScore}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`text-5xl font-bold ${
            healthspanScore >= 75 ? 'text-emerald-400' : healthspanScore >= 50 ? 'text-amber-400' : 'text-rose-400'
          }`}
        >
          {healthspanScore}
        </motion.p>
        <p className="text-xs text-zinc-500 mt-2">Based on {risks.reduce((s, r) => s + r.drivingMarkers.length, 0)} marker–hallmark links</p>
        {elevated.length > 0 && (
          <p className="text-xs text-amber-400 mt-3 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {elevated.length} hallmark{elevated.length > 1 ? 's' : ''} need attention
          </p>
        )}
      </div>

      {/* Risk cards */}
      <div className="space-y-3">
        {risks.map((risk, i) => {
          const style = riskStyle[risk.riskLevel];
          return (
            <motion.div
              key={risk.hallmarkId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`glass rounded-xl p-5 border border-white/[0.04]`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[10px] font-mono text-zinc-600">HALLMARK {risk.hallmarkNumber}</p>
                  <h4 className="font-semibold text-sm">{risk.hallmarkTitle}</h4>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                  {risk.riskLevel}
                </span>
              </div>

              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${style.bar}`}
                  style={{ width: `${risk.riskScore}%` }}
                />
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-3">{risk.prognosis}</p>

              {risk.drivingMarkers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {risk.drivingMarkers.map((m) => (
                    <span
                      key={m.markerId}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        m.status === 'critical'
                          ? 'bg-rose-400/10 text-rose-400'
                          : m.status === 'watch'
                            ? 'bg-amber-400/10 text-amber-400'
                            : 'bg-emerald-400/10 text-emerald-400'
                      }`}
                    >
                      {m.name}: {m.value}
                    </span>
                  ))}
                </div>
              )}

              {risk.priorityInterventions.length > 0 && (
                <p className="text-[10px] text-zinc-600 mb-2">
                  Interventions: {risk.priorityInterventions.join(' · ')}
                </p>
              )}

              <Link
                href={`/library/${slugFor(risk.hallmarkId)}`}
                className="text-xs font-semibold text-cyan-400 hover:text-emerald-400 transition inline-flex items-center gap-1"
              >
                Hallmark deep dive <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}