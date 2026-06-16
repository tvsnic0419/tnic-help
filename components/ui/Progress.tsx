'use client';

import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose';
  showValue?: boolean;
}

const colorMap = {
  cyan: 'from-cyan-400 to-emerald-400',
  emerald: 'from-emerald-400 to-cyan-400',
  violet: 'from-violet-400 to-cyan-400',
  amber: 'from-amber-400 to-orange-400',
  rose: 'from-rose-400 to-amber-400',
};

export function Progress({ value, max = 100, label, color = 'cyan', showValue = true }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs text-zinc-500">{label}</span>}
          {showValue && <span className="text-xs font-mono text-zinc-400">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}