import Image from 'next/image';
import type { SVGProps } from 'react';

interface LogoProps {
  variant?: 'emblem' | 'lockup';
  size?: 'nav' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  priority?: boolean;
  alt?: string;
}

// Pixel dimensions for the lockup (real logo JPEG at 16:9)
const lockupDims: Record<NonNullable<LogoProps['size']>, { w: number; h: number }> = {
  nav:  { w: 160, h: 90  },
  sm:   { w: 140, h: 79  },
  md:   { w: 200, h: 113 },
  lg:   { w: 260, h: 146 },
  hero: { w: 400, h: 225 },
};

// SVG emblem for nav and small-size contexts — stays crisp at any pixel size
function EmblemSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <circle cx="40" cy="40" r="37" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx="40" cy="40" r="37" fill="rgba(34,211,238,0.06)" />
      <circle cx="40" cy="40" r="27" stroke="var(--accent-emerald)" strokeWidth="0.5" strokeOpacity="0.2" />
      {/* Left strand — cyan */}
      <path
        d="M 27 20 C 43 25, 43 34, 27 39 C 43 44, 43 53, 27 58"
        stroke="var(--accent-cyan)" strokeWidth="2.2" strokeOpacity="0.95"
        strokeLinecap="round" fill="none"
      />
      {/* Right strand — emerald */}
      <path
        d="M 53 20 C 37 25, 37 34, 53 39 C 37 44, 37 53, 53 58"
        stroke="var(--accent-emerald)" strokeWidth="2.2" strokeOpacity="0.85"
        strokeLinecap="round" fill="none"
      />
      <line x1="27" y1="29.5" x2="53" y2="29.5" stroke="var(--accent-cyan)"    strokeWidth="0.8" strokeOpacity="0.32" />
      <line x1="27" y1="39"   x2="53" y2="39"   stroke="var(--accent-cyan)"    strokeWidth="0.8" strokeOpacity="0.32" />
      <line x1="27" y1="48.5" x2="53" y2="48.5" stroke="var(--accent-emerald)" strokeWidth="0.8" strokeOpacity="0.28" />
    </svg>
  );
}

const emblemSizeClass: Record<NonNullable<LogoProps['size']>, string> = {
  nav:  'w-9 h-9',
  sm:   'w-7 h-7',
  md:   'w-11 h-11',
  lg:   'w-16 h-16 md:w-20 md:h-20',
  hero: 'w-20 h-20',
};

export function Logo({
  variant = 'emblem',
  size = 'md',
  className = '',
  priority = false,
  alt,
}: LogoProps) {
  const altText = alt || (
    variant === 'lockup'
      ? 'TNIC – Transformative Nutrition In Cell-Health'
      : 'TNiC emblem'
  );

  if (variant === 'lockup') {
    const { w, h } = lockupDims[size];
    return (
      <div className={`inline-flex items-center ${className}`} role="img" aria-label={altText}>
        <div className="relative" style={{ width: w, height: h }}>
          <Image
            src="/tnic-logo.jpg"
            alt={altText}
            fill
            className="object-contain"
            // screen blend melts the navy bg into the dark site canvas
            style={{ mixBlendMode: 'screen' }}
            priority={priority}
          />
        </div>
      </div>
    );
  }

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
