'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Pill, Activity, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { LabRecommendation } from '@/lib/lab-analysis';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { usePlatform } from '@/context/PlatformContext';

const hallmarkSlug = (id: string) => hallmarkLibrary.find((h) => h.id === id)?.slug ?? id;

const categoryIcon = {
  compound: Pill,
  lifestyle: Activity,
  monitoring: Lightbulb,
  clinical: Stethoscope,
};

const priorityStyle = {
  high: 'border-rose-400/30 bg-rose-400/5',
  medium: 'border-amber-400/20 bg-amber-400/5',
  low: 'border-white/[0.06]',
};

interface LabRecommendationsProps {
  recommendations: LabRecommendation[];
}

export function LabRecommendations({ recommendations }: LabRecommendationsProps) {
  const { toggle, selected } = usePlatform();

  if (recommendations.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-zinc-500 text-sm">Log lab data to unlock personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => {
        const Icon = categoryIcon[rec.category];
        const inStack = rec.compoundId && selected.includes(rec.compoundId);

        return (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass rounded-xl p-5 border ${priorityStyle[rec.priority]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                rec.priority === 'high' ? 'bg-rose-400/10' : rec.priority === 'medium' ? 'bg-amber-400/10' : 'bg-white/5'
              }`}>
                <Icon className={`w-4 h-4 ${
                  rec.priority === 'high' ? 'text-rose-400' : rec.priority === 'medium' ? 'text-amber-400' : 'text-zinc-400'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">{rec.priority}</span>
                  {inStack && (
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                      in stack
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mb-2">{rec.rationale}</p>
                <p className="text-xs text-zinc-400">{rec.action}</p>
                {rec.compoundId && !inStack && (
                  <button
                    onClick={() => toggle(rec.compoundId!)}
                    className="mt-3 text-xs font-semibold text-rose-400 hover:text-cyan-400 transition flex items-center gap-1"
                  >
                    Add to active stack <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {rec.hallmarkIds.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rec.hallmarkIds.map((h) => (
                      <Link
                        key={h}
                        href={`/library/${hallmarkSlug(h)}`}
                        className="text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400"
                      >
                        #{h}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}