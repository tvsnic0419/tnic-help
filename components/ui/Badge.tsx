import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-zinc-400 border-white/10',
  success: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
  warning: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
  danger: 'bg-rose-400/10 text-rose-400 border-rose-400/30',
  info: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}