'use client';

/**
 * Smart Hallmark illustration component.
 *
 * Render priority:
 *   1. High-fidelity image — only when an `illustrationSrc` prop is passed (server-side check)
 *   2. Inline SVG from HALLMARK_ILLUSTRATIONS (publication-grade, all 12 defined)
 *   3. Coverage-ring (HallmarkVisual) — fallback when visual type unknown
 *
 * The SVG is always pre-rendered; the image overlays it when available.
 * Pass `illustrationSrc` from the page/server component after checking fs.existsSync.
 */

import Image from 'next/image';
import { useState } from 'react';
import type { HallmarkLibraryEntry } from '@/lib/types';
import { HALLMARK_ILLUSTRATIONS, type HallmarkIllustrationId } from './HallmarkIllustrations';
import { HallmarkVisual } from '@/components/library/HallmarkVisual';
import { getHallmarkVisual } from '@/lib/hallmark-visuals';

export type IllustrationVariant = 'mini' | 'card' | 'full';

interface Props {
  visual: HallmarkLibraryEntry['visual'];
  slug: string;
  coverage: number;
  number: number;
  variant?: IllustrationVariant;
  /** Pass a verified image path from the server — skip to SVG if undefined */
  illustrationSrc?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<IllustrationVariant, string> = {
  mini: 'w-20 h-16 rounded-lg overflow-hidden',
  card: 'w-full aspect-[4/3] rounded-xl overflow-hidden',
  full: 'w-full aspect-[4/3] rounded-2xl overflow-hidden',
};

export function HallmarkIllustration({
  visual,
  coverage,
  number,
  variant = 'card',
  illustrationSrc,
  className = '',
}: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const InlineSVG = HALLMARK_ILLUSTRATIONS[visual as HallmarkIllustrationId];
  const meta = getHallmarkVisual(visual);
  const showImage = !!illustrationSrc && !imgFailed;

  return (
    <div className={`${VARIANT_CLASSES[variant]} ${className} relative bg-[#030712]`}>
      {/* Tier 2 (default): inline SVG — always present under the image */}
      {InlineSVG ? (
        <InlineSVG className="absolute inset-0 w-full h-full" />
      ) : (
        /* Tier 3: coverage-ring if visual type unknown */
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <HallmarkVisual visual={visual} coverage={coverage} number={number} />
        </div>
      )}

      {/* Tier 1: high-fidelity image overlay (Canva exports, etc.) */}
      {showImage && (
        <Image
          src={illustrationSrc}
          alt={`${meta.label} — Hallmark ${number}`}
          fill
          className="object-cover"
          sizes={variant === 'mini' ? '80px' : '(max-width: 768px) 100vw, 50vw'}
          onError={() => setImgFailed(true)}
          priority={variant === 'full'}
        />
      )}
    </div>
  );
}

/** Zero-flash SVG thumbnail — use in list/grid selectors */
export function HallmarkIllustrationThumb({
  visual,
  className = '',
}: {
  visual: HallmarkLibraryEntry['visual'];
  className?: string;
}) {
  const InlineSVG = HALLMARK_ILLUSTRATIONS[visual as HallmarkIllustrationId];
  if (!InlineSVG) return null;
  return (
    <div className={`bg-[#030712] overflow-hidden ${className}`}>
      <InlineSVG />
    </div>
  );
}
