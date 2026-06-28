'use client';

import type { EvidenceTier } from '@/lib/types';
import { evidenceTagDefinitions } from '@/lib/trust';
import { cn } from '@/lib/utils';

const tierStyles: Record<EvidenceTier, string> = {
  A: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/30',
  B: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30',
  C: 'text-accent-amber bg-accent-amber/10 border-accent-amber/30',
};

const tooltipBorder: Record<EvidenceTier, string> = {
  A: 'border-accent-emerald/25',
  B: 'border-accent-cyan/25',
  C: 'border-accent-amber/25',
};

interface EvidenceTagProps {
  tier: EvidenceTier;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
  lg: 'text-sm px-2.5 py-1',
};

export function EvidenceTag({ tier, size = 'md', showTooltip = true, className = '' }: EvidenceTagProps) {
  const def = evidenceTagDefinitions[tier];

  if (!showTooltip) {
    return (
      <span
        className={cn(
          'inline-flex items-center font-mono font-bold rounded border',
          tierStyles[tier],
          sizeStyles[size],
          className,
        )}
        aria-label={`Evidence tier ${tier}: ${def.label}`}
      >
        Tier {tier}
        {size !== 'sm' && (
          <span className="hidden sm:inline font-normal opacity-70 ml-1">· {def.short}</span>
        )}
      </span>
    );
  }

  return (
    <span className="relative inline-flex group">
      <span
        className={cn(
          'inline-flex items-center font-mono font-bold rounded border cursor-help',
          tierStyles[tier],
          sizeStyles[size],
          className,
        )}
        aria-label={`Evidence tier ${tier}: ${def.label}`}
        tabIndex={0}
      >
        Tier {tier}
        {size !== 'sm' && (
          <span className="hidden sm:inline font-normal opacity-70 ml-1">· {def.short}</span>
        )}
      </span>

      {/* Tooltip panel */}
      <div
        role="tooltip"
        className={cn(
          'absolute bottom-full left-0 mb-2 z-50 w-56 pointer-events-none',
          'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0',
          'group-focus-within:opacity-100 group-focus-within:translate-y-0',
          'transition-all duration-150',
        )}
      >
        <div className={cn(
          'bg-[var(--color-bg-elevated)] border rounded-xl p-3 shadow-xl',
          tooltipBorder[tier],
        )}>
          <p className={cn('text-[10px] font-mono font-bold uppercase tracking-wider mb-2', tierStyles[tier].split(' ')[0])}>
            {def.label}
          </p>
          <p className="text-[10px] text-muted-foreground mb-2 leading-relaxed">{def.description}</p>
          <ul className="space-y-1">
            {def.criteria.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-[9px] text-foreground/70">
                <span className={cn('mt-0.5 shrink-0', tierStyles[tier].split(' ')[0])}>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        {/* Arrow */}
        <div className={cn('absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent', `border-t-[var(--color-bg-elevated)]`)} />
      </div>
    </span>
  );
}

export function EvidenceTagLegend({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)} role="list" aria-label="Evidence tier legend">
      {(['A', 'B', 'C'] as EvidenceTier[]).map((tier) => (
        <div key={tier} role="listitem" className="flex items-center gap-2">
          <EvidenceTag tier={tier} size="sm" showTooltip={false} />
          <span className="text-caption hidden md:inline">{evidenceTagDefinitions[tier].description}</span>
        </div>
      ))}
    </div>
  );
}
