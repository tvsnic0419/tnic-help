import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ThemeAccent } from '@/lib/design-system';
import { themes } from '@/lib/design-system';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  theme?: ThemeAccent;
  icon?: LucideIcon;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white text-black hover:bg-cyan-400',
  secondary: 'glass text-zinc-300 hover:text-white hover:border-cyan-400/30',
  ghost: 'text-zinc-400 hover:text-cyan-400 bg-transparent',
  danger: 'text-zinc-500 hover:text-rose-400 bg-transparent',
};

export function Button({
  variant = 'primary',
  theme = 'cyan',
  icon: Icon,
  children,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  const t = themes[theme];
  const solidOverride = variant === 'primary' && theme !== 'cyan' ? `${t.bgSolid} text-black hover:opacity-90` : '';

  return (
    <button
      className={`focus-ring interactive inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[var(--space-touch)] rounded-xl text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none ${variantStyles[variant]} ${solidOverride} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      {children}
    </button>
  );
}