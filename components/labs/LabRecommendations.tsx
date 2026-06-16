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
  high: 'border-accent-rose/30 bg-accent-rose/5',
  medium: 'border-accent-amber/20 bg-accent-amber/5',
  low: 'border-border',
};

interface LabRecommendationsProps {
  recommendations: LabRecommendation[];
}

export function LabRecommendations({ recommendations }: LabRecommendationsProps) {
  const { toggle, selected } = usePlatform();

  if (recommendations.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-muted-foreground text-sm">Log lab data to unlock personalized recommendations.</p>
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
                rec.priority === 'high' ? 'bg-accent-rose/10' : rec.priority === 'medium' ? 'bg-accent-amber/10' : 'bg-muted/50'
              }`}>
                <Icon className={`w-4 h-4 ${
                  rec.priority === 'high' ? 'text-accent-rose' : rec.priority === 'medium' ? 'text-accent-amber' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <span className="text-[9px] font-mono text-caption uppercase">{rec.priority}</span>
                  {inStack && (
                    <span className="text-[9px] font-mono text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.5 rounded">
                      in stack
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{rec.rationale}</p>
                <p className="text-xs text-muted-foreground">{rec.action}</p>
                {rec.compoundId && !inStack && (
                  <button
                    onClick={() => toggle(rec.compoundId!)}
                    className="mt-3 text-xs font-semibold text-accent-rose hover:text-accent-cyan transition flex items-center gap-1"
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
                        className="text-[9px] font-mono text-accent-cyan/70 hover:text-accent-cyan"
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