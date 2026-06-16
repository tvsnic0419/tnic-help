/** TNiC Design System — tokens & class maps for consistent UI */

export type ThemeAccent = 'cyan' | 'emerald' | 'amber' | 'violet' | 'rose';

export const themes: Record<
  ThemeAccent,
  { text: string; bg: string; bgSolid: string; border: string; glow: string; dot: string }
> = {
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    bgSolid: 'bg-cyan-400',
    border: 'border-cyan-400/30',
    glow: 'section-glow-cyan',
    dot: 'bg-cyan-400',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    bgSolid: 'bg-emerald-400',
    border: 'border-emerald-400/30',
    glow: 'section-glow-emerald',
    dot: 'bg-emerald-400',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    bgSolid: 'bg-amber-400',
    border: 'border-amber-400/30',
    glow: 'section-glow-amber',
    dot: 'bg-amber-400',
  },
  violet: {
    text: 'text-violet-400',
    bg: 'bg-violet-400/10',
    bgSolid: 'bg-violet-400',
    border: 'border-violet-400/30',
    glow: 'section-glow-violet',
    dot: 'bg-violet-400',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-400/10',
    bgSolid: 'bg-rose-400',
    border: 'border-rose-400/30',
    glow: 'section-glow-rose',
    dot: 'bg-rose-400',
  },
};

export const statusColors = {
  optimal: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25' },
  watch: { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/25' },
  critical: { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/25' },
  info: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/25' },
} as const;

/** Spacing scale (Tailwind-aligned) */
export const spacing = {
  pageY: 'py-16 md:py-24 lg:py-28',
  sectionY: 'py-16 md:py-24 lg:py-32',
  container: 'container-page',
  stackSm: 'space-y-3',
  stackMd: 'space-y-6',
  stackLg: 'space-y-10',
  gapGrid: 'gap-4 md:gap-6 lg:gap-8',
} as const;

/** Typography class strings */
export const type = {
  pageTitle: 'heading-page',
  sectionTitle: 'heading-section',
  cardTitle: 'heading-card',
  body: 'text-body',
  bodySm: 'text-body-sm',
  caption: 'text-caption',
  label: 'text-label',
  mono: 'font-mono',
} as const;