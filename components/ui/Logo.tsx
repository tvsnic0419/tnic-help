import type { SVGProps } from 'react';

interface LogoProps {
  variant?: 'emblem' | 'lockup';
  size?: 'nav' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  priority?: boolean;
  alt?: string;
}

function EmblemSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id="tnic-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d2137" />
          <stop offset="100%" stopColor="#050c18" />
        </radialGradient>
        <linearGradient id="tnic-c" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38e8ff" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="tnic-e" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="tnic-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background disc */}
      <circle cx="40" cy="40" r="38" fill="url(#tnic-bg)" />
      {/* Outer glow ring */}
      <circle cx="40" cy="40" r="37" stroke="#22d3ee" strokeWidth="1.4" strokeOpacity="0.75" />

      {/* Strand 1 — cyan, S-curve left side */}
      <path
        d="M 25 14 C 57 20, 57 33, 25 40 C 57 47, 57 60, 25 66"
        stroke="url(#tnic-c)" strokeWidth="3.6" strokeLinecap="round" fill="none"
        filter="url(#tnic-glow)"
      />
      {/* Strand 2 — emerald, S-curve right side (mirror) */}
      <path
        d="M 55 14 C 23 20, 23 33, 55 40 C 23 47, 23 60, 55 66"
        stroke="url(#tnic-e)" strokeWidth="3.6" strokeLinecap="round" fill="none"
        filter="url(#tnic-glow)"
      />

      {/* Base-pair rungs */}
      <line x1="25" y1="27" x2="55" y2="27" stroke="#22d3ee" strokeWidth="1.6" strokeOpacity="0.55" strokeLinecap="round" />
      <line x1="25" y1="40" x2="55" y2="40" stroke="#34d399" strokeWidth="1.6" strokeOpacity="0.5"  strokeLinecap="round" />
      <line x1="25" y1="53" x2="55" y2="53" stroke="#22d3ee" strokeWidth="1.6" strokeOpacity="0.45" strokeLinecap="round" />

      {/* Center crossover highlight */}
      <circle cx="40" cy="40" r="3.5" fill="#22d3ee" fillOpacity="0.7" filter="url(#tnic-glow)" />
    </svg>
  );
}

const emblemSizeClass: Record<NonNullable<LogoProps['size']>, string> = {
  nav:  'w-10 h-10',
  sm:   'w-8 h-8',
  md:   'w-12 h-12',
  lg:   'w-16 h-16 md:w-20 md:h-20',
  hero: 'w-20 h-20',
};

export function Logo({
  variant = 'emblem',
  size = 'md',
  className = '',
  alt,
}: LogoProps) {
  const altText = alt || 'TNiC emblem';

  return (
    <div
      className={`inline-flex items-center justify-center logo-glow rounded-xl ${className}`}
      role="img"
      aria-label={altText}
    >
      <EmblemSvg className={emblemSizeClass[size]} />
    </div>
  );
}

export type { LogoProps };
