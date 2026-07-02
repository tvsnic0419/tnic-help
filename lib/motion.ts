import type { Variants, Transition } from 'framer-motion';

/**
 * v7 elite motion language — import these instead of declaring inline variants.
 * One easing curve, one spring, consistent distances. Respect `useReducedMotion()`
 * in components that animate position.
 */

/** Signature easing — fast start, soft landing (matches CSS cubic-bezier(0.4,0,0.2,1)) */
export const easeOut: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

/** Snappy spring for interactive elements (nav pill, toggles, chips) */
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 };

/** Gentle spring for cards and larger surfaces */
export const springGentle: Transition = { type: 'spring', stiffness: 220, damping: 28 };

/** Section/card entrance — rise 16px and fade */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

/** Subtle entrance for dense UI (list rows, chips) */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Opacity-only — safe under prefers-reduced-motion */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/** Parent wrapper that staggers its children (pair with fadeUp/fadeUpSm on children) */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** Standard whileInView props — one-shot, triggers slightly before entering viewport */
export const inViewProps = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-60px' } as const,
};
