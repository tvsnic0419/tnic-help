'use client';

import { Sparkles } from 'lucide-react';
import { stackPresets, type PresetKey } from '@/lib/presets';
import { cn } from '@/lib/utils';

interface StackPresetsBarProps {
  selected: string[];
  onApply: (key: PresetKey) => void;
  className?: string;
}

export function StackPresetsBar({ selected, onApply, className = '' }: StackPresetsBarProps) {
  const presetKeys = Object.keys(stackPresets) as PresetKey[];

  return (
    <div className={className}>
      <p className="text-label text-accent-violet mb-3 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        Evidence-graded presets
      </p>
      <div className="flex flex-wrap gap-2">
        {presetKeys.map((key) => {
          const p = stackPresets[key];
          const isActive =
            p.ids.length === selected.length && p.ids.every((id) => selected.includes(id));
          return (
            <button
              key={key}
              type="button"
              onClick={() => onApply(key)}
              className={cn(
                'focus-ring interactive px-4 py-2.5 rounded-xl text-xs font-semibold transition-all text-left',
                isActive
                  ? 'bg-accent-violet text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-accent-violet/30',
              )}
            >
              <span className="block">{p.label}</span>
              <span
                className={cn(
                  'block text-[10px] font-normal',
                  isActive ? 'text-primary-foreground/70' : 'text-caption',
                )}
              >
                {p.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}