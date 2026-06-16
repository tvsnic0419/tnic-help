'use client';

import { Check } from 'lucide-react';
import { compounds } from '@/lib/data';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { cn } from '@/lib/utils';

interface CompoundSelectorGridProps {
  selected: string[];
  onToggle: (id: string) => void;
  showPathway?: boolean;
  className?: string;
}

export function CompoundSelectorGrid({
  selected,
  onToggle,
  showPathway = true,
  className = '',
}: CompoundSelectorGridProps) {
  return (
    <div className={cn('grid sm:grid-cols-2 gap-3', className)}>
      {compounds.map((c) => {
        const isOn = selected.includes(c.id);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onToggle(c.id)}
            className={cn(
              'focus-ring interactive text-left p-4 rounded-xl transition-all duration-300',
              isOn
                ? 'bg-accent-violet/10 border border-accent-violet/40'
                : 'glass glass-hover opacity-80 hover:opacity-100',
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  'w-5 h-5 rounded-md flex items-center justify-center',
                  isOn ? 'bg-accent-violet text-primary-foreground' : 'border border-border',
                )}
              >
                {isOn && <Check className="w-3 h-3" aria-hidden="true" />}
              </span>
              <EvidenceTag tier={c.evidence} size="sm" />
            </div>
            <h4 className="font-bold text-sm mb-0.5">{c.name}</h4>
            <p className="text-xs text-muted-foreground">{c.dose}</p>
            {showPathway && (
              <p className="text-[10px] text-caption mt-1 font-mono">{c.pathway}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}