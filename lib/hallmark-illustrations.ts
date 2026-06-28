/**
 * Server-side helper: maps hallmark slugs to Canva-exported PNG filenames.
 *
 * Two hallmarks (disabled-autophagy, dysbiosis) have no Canva design and
 * fall back to the inline SVG illustration automatically.
 *
 * The "Deregulated Nutrient Sensing" Canva design maps to the
 * "disabled-macroautophagy" slug used in the codebase.
 */

import { existsSync } from 'fs';
import { join } from 'path';

const HALLMARKS_DIR = join(process.cwd(), 'public', 'assets', 'illustrations', 'hallmarks');
const PUBLIC_BASE = '/assets/illustrations/hallmarks';

/** Explicit slug → Canva filename map (only the 10 that have Canva designs) */
const CANVA_FILENAMES: Record<string, string> = {
  'genomic-instability': 'genomic-instability-v2.png',
  'telomere-attrition': 'telomere-attrition-v2.png',
  'epigenetic-alterations': 'epigenetic-alterations-v2.png',
  'loss-of-proteostasis': 'loss-of-proteostasis-v2.png',
  'mitochondrial-dysfunction': 'mitochondrial-dysfunction-v2.png',
  'cellular-senescence': 'cellular-senescence-v2.png',
  'stem-cell-exhaustion': 'stem-cell-exhaustion-v2.png',
  'altered-intercellular-communication': 'altered-intercellular-communication-v2.png',
  'chronic-inflammation': 'chronic-inflammation-v2.png',
  'disabled-macroautophagy': 'deregulated-nutrient-sensing-v2.png',
  // 'disabled-autophagy'  → no Canva design; SVG fallback
  // 'dysbiosis'           → no Canva design; SVG fallback
};

/**
 * Returns the public URL path to the Canva illustration if the file exists on disk,
 * or `undefined` to signal the component to use the SVG fallback.
 */
export function getHallmarkIllustrationSrc(slug: string): string | undefined {
  const filename = CANVA_FILENAMES[slug];
  if (!filename) return undefined;
  const fsPath = join(HALLMARKS_DIR, filename);
  if (!existsSync(fsPath)) return undefined;
  return `${PUBLIC_BASE}/${filename}`;
}
