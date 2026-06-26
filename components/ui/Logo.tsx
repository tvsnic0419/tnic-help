import Image from 'next/image';

interface LogoProps {
  /** 'emblem' = square icon mark (nav, small uses) | 'lockup' = full logo with text + tagline */
  variant?: 'emblem' | 'lockup';
  /** Predefined responsive sizes optimized for different placements */
  size?: 'nav' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  /** Prioritize image loading (use on above-the-fold hero) */
  priority?: boolean;
  alt?: string;
}

const sizeMap: Record<NonNullable<LogoProps['size']>, string> = {
  nav: 'w-10 h-10',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16 md:w-20 md:h-20',
  hero: 'w-[260px] h-auto md:w-[340px] lg:w-[380px]',
};

const srcMap = {
  emblem: '/tnic-emblem.png',
  lockup: '/tnic-logo.jpg',
} as const;

const altMap = {
  emblem: 'TNIC Emblem - DNA helix in precision gear with golden nutrition leaves',
  lockup: 'TNIC - Transformative Nutrition In Cell-Health | Anti-Aging Operating System',
};

export function Logo({
  variant = 'emblem',
  size = 'md',
  className = '',
  priority = false,
  alt,
}: LogoProps) {
  const src = srcMap[variant];
  const sizeClass = sizeMap[size];
  const resolvedAlt = alt || altMap[variant];

  // Lockup is wider aspect; emblem is square
  const isLockup = variant === 'lockup';

  return (
    <div className={`inline-flex items-center justify-center ${isLockup ? '' : 'rounded-xl overflow-hidden logo-glow'} ${className}`}>
      <Image
        src={src}
        alt={resolvedAlt}
        width={isLockup ? 800 : 512}
        height={isLockup ? 450 : 512}
        className={`${sizeClass} object-contain transition-all duration-200 ${isLockup ? 'rounded-lg shadow-xl' : 'rounded-xl'}`}
        priority={priority}
        unoptimized={false}
      />
    </div>
  );
}

// Optional: export types for consumers
export type { LogoProps };