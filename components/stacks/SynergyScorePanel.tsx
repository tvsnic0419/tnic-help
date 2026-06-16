'use client';

import { motion } from 'framer-motion';
import type { StackAnalysis } from '@/lib/stack-analysis';
import { cn } from '@/lib/utils';

const scoreColor = (score: number) =>
  score >= 75
    ? 'text-accent-emerald'
    : score >= 50
      ? 'text-accent-cyan'
      : score >= 25
        ? 'text-accent-amber'
        : 'text-muted-foreground';

interface SynergyScorePanelProps {
  score: number;
  analysis: StackAnalysis;
  verdict?: string;
  className?: string;
}

export function SynergyScorePanel({ score, analysis, verdict, className = '' }: SynergyScorePanelProps) {
  return (
    <div className={cn('gradient-border p-6 text-center', className)}>
      <p className="text-label text-accent-violet mb-1">Live synergy score</p>
      <motion.p
        key={score}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn('text-5xl font-bold', scoreColor(score))}
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
          <p className="text-lg font-bold text-accent-amber">
            ${analysis.monthlyCost.low}–{analysis.monthlyCost.high}
          </p>
          <p className="text-[9px] font-mono text-muted-foreground">/MONTH</p>
        </div>
      </div>
      {verdict && <p className="text-body-sm mt-4 text-left">{verdict}</p>}
    </div>
  );
}