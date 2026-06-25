'use client';

import React from 'react';

interface HallmarkVisualProps {
  className?: string;
  size?: number;
  accentColor?: string;
}

interface HallmarkIllustrationProps {
  slug: string;
  illustrationV2?: string;
  className?: string;
  fallbackVisual?: React.ReactNode;
}

/**
 * v2.0 High-fidelity Hallmark Illustration component.
 * Prefers new premium illustrations (from Canva) when illustrationV2 is provided.
 * Falls back to existing lightweight SVGs or custom fallback.
 */
export const HallmarkIllustration: React.FC<HallmarkIllustrationProps> = ({
  slug,
  illustrationV2,
  className = '',
  fallbackVisual,
}) => {
  // If we have a v2 illustration filename, render the high-quality image
  if (illustrationV2) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1a] ${className}`}>
        <img
          src={`/assets/illustrations/hallmarks/${illustrationV2}.png`}
          alt={`${slug} hallmark illustration`}
          className="w-full h-auto object-contain"
          loading="lazy"
        />
        {/* Subtle premium overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
      </div>
    );
  }

  // Fallback to legacy SVG visuals or provided fallback
  if (fallbackVisual) {
    return <>{fallbackVisual}</>;
  }

  // Default placeholder if nothing is available
  return (
    <div className={`flex items-center justify-center rounded-xl border border-white/10 bg-[#111827] text-[#9ca3af] text-sm p-8 ${className}`}>
      Illustration coming soon
    </div>
  );
};

// Keep existing SVG components for backward compatibility and lightweight use
export const GenomicInstabilityVisual: React.FC<HallmarkVisualProps> = ({
  className = '',
  size = 320,
  accentColor = 'cyan'
}) => {
  const accent = accentColor === 'cyan' ? '#22d3ee' : accentColor === 'emerald' ? '#34d399' : '#a78bfa';
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Genomic Instability Hallmark: DNA helix with repair foci and NAD+ boost"
      role="img"
    >
      {/* Background subtle grid for scientific feel */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="240" fill="url(#grid)" opacity="0.3" />

      {/* Stylized DNA double helix - left side (damaged) */}
      <path
        d="M40 40 Q60 80 40 120 Q60 160 40 200"
        stroke="#4b5563"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M70 40 Q50 80 70 120 Q50 160 70 200"
        stroke="#4b5563"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Damage markers (red/rose cracks) */}
      <circle cx="55" cy="70" r="6" fill="#f87171" opacity="0.7" />
      <circle cx="52" cy="140" r="5" fill="#f87171" opacity="0.6" />
      <path d="M48 65 L62 75 M50 135 L60 145" stroke="#f87171" strokeWidth="2" />

      {/* Repaired / glowing section with NAD+ fuel (right side, brighter) */}
      <path
        d="M180 40 Q200 80 180 120 Q200 160 180 200"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M210 40 Q190 80 210 120 Q190 160 210 200"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* NAD+ boost particles / energy */}
      <circle cx="195" cy="80" r="4" fill={accent} />
      <circle cx="192" cy="130" r="3.5" fill={accent} />
      <circle cx="198" cy="175" r="3" fill={accent} />
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />

      {/* Central PARP / repair enzyme node */}
      <circle cx="135" cy="120" r="18" fill="#1f2937" stroke={accent} strokeWidth="2" />
      <text x="135" y="125" textAnchor="middle" fill="#e5e7eb" fontSize="10" fontFamily="monospace">PARP</text>

      {/* Arrows showing NAD+ fueling repair */}
      <path d="M165 110 L155 118" stroke={accent} strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={accent} />
        </marker>
      </defs>

      {/* Label */}
      <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="system-ui">DNA Repair + NAD+ Fuel</text>
    </svg>
  );
};

export const MitochondrialDysfunctionVisual: React.FC<HallmarkVisualProps> = ({
  className = '',
  size = 320,
  accentColor = 'emerald'
}) => {
  const accent = accentColor === 'emerald' ? '#34d399' : accentColor === 'cyan' ? '#22d3ee' : '#a78bfa';
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mitochondrial Dysfunction Hallmark: Mitochondria with cristae, NAD+ substrate, SIRT3 quality control"
      role="img"
    >
      <defs>
        <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
      </defs>

      {/* Outer mitochondrial membrane (stylized oval) */}
      <ellipse cx="160" cy="120" rx="95" ry="55" fill="url(#mitoGrad)" stroke="#4b5563" strokeWidth="3" />

      {/* Inner cristae folds (damaged / low function on left) */}
      <path d="M80 90 Q100 110 85 140 Q105 160 82 185" stroke="#6b7280" strokeWidth="2.5" fill="none" />
      <path d="M95 95 Q115 120 92 155" stroke="#6b7280" strokeWidth="2" fill="none" />
      {/* Leaking ROS indicators */}
      <circle cx="75" cy="105" r="4" fill="#f87171" opacity="0.5" />
      <circle cx="88" cy="165" r="3" fill="#f87171" opacity="0.4" />

      {/* Healthy / boosted section (right) with NAD+ and SIRT3 */}
      <ellipse cx="200" cy="120" rx="55" ry="35" fill="none" stroke={accent} strokeWidth="2.5" />
      {/* Cristae improved */}
      <path d="M175 95 Q195 115 178 145 Q198 165 175 185" stroke={accent} strokeWidth="2.5" fill="none" />

      {/* NAD+ substrate circles feeding in */}
      <circle cx="130" cy="95" r="7" fill={accent} opacity="0.9" />
      <text x="130" y="98" textAnchor="middle" fill="#111827" fontSize="7" fontWeight="bold">NAD</text>
      <circle cx="125" cy="145" r="6" fill={accent} opacity="0.85" />

      {/* SIRT3 quality control node */}
      <circle cx="225" cy="120" r="14" fill="#1f2937" stroke={accent} strokeWidth="2" />
      <text x="225" y="124" textAnchor="middle" fill="#e5e7eb" fontSize="8" fontFamily="monospace">SIRT3</text>

      {/* Mitophagy arrow / clearance */}
      <path d="M240 105 L265 95" stroke={accent} strokeWidth="2" />
      <path d="M240 135 L265 145" stroke={accent} strokeWidth="2" />

      <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="system-ui">NAD+ → SIRT3 Mitophagy Axis</text>
    </svg>
  );
};

export const ProteostasisVisual: React.FC<HallmarkVisualProps> = ({
  className = '',
  size = 320,
  accentColor = 'violet'
}) => {
  const accent = '#a78bfa';
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Loss of Proteostasis Hallmark illustration" role="img">
      <rect width="320" height="240" fill="#111827" opacity="0.4" rx="8" />
      {/* Folded protein / proteasome representation */}
      <ellipse cx="120" cy="110" rx="35" ry="22" fill="none" stroke="#6b7280" strokeWidth="3" />
      <path d="M95 100 Q120 85 145 100" stroke="#6b7280" strokeWidth="2" />
      {/* GlyNAC / glutathione protection shield */}
      <circle cx="200" cy="115" r="28" fill="none" stroke={accent} strokeWidth="2.5" />
      <text x="200" y="120" textAnchor="middle" fill={accent} fontSize="9">GSH</text>
      {/* Autophagy / clearance arrow */}
      <path d="M235 100 L275 90" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrowp)" />
      <defs>
        <marker id="arrowp" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill={accent} />
        </marker>
      </defs>
      <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11">Proteostasis + GlyNAC Shield</text>
    </svg>
  );
};

// Legacy map for backward compatibility
export const hallmarkVisualMap = {
  'genomic-instability': GenomicInstabilityVisual,
  'mitochondrial-dysfunction': MitochondrialDysfunctionVisual,
  'loss-of-proteostasis': ProteostasisVisual,
};
