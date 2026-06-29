'use client';

import React from 'react';

interface LossOfProteostasisVisualProps {
  className?: string;
  accentColor?: string;
  showLabels?: boolean;
  interactive?: boolean;
}

/**
 * High-detail SVG for Loss of Proteostasis hallmark.
 * Depicts proteasome/autophagy dysfunction, protein aggregates (misfolded proteins),
 * and intervention points (TUDCA, butyrate, heat shock proteins, NRF2-mediated clearance).
 * Premium detail level: multiple layers, gradients, precise mechanistic labels.
 */
export const LossOfProteostasisVisual: React.FC<LossOfProteostasisVisualProps> = ({
  className = '',
  accentColor = '#67f6ff', // cyan for proteostasis / NRF2 link
  showLabels = true,
  interactive = true,
}) => {
  return (
    <div className={`relative tnic-glass rounded-2xl p-5 overflow-hidden ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-label text-[var(--accent-cyan)] mb-0.5">HALLMARK 03</div>
          <h4 className="heading-card text-lg">Loss of Proteostasis</h4>
        </div>
        {showLabels && <div className="text-right text-[10px] text-[var(--color-text-muted)]">Proteasome · Autophagy · Aggregates</div>}
      </div>

      <svg viewBox="0 0 420 210" className="w-full h-auto" aria-label="Loss of Proteostasis: protein aggregates, impaired proteasome and autophagy, with clearance interventions" role="img">
        <defs>
          <linearGradient id="proteoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67f6ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#67f6ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Cell background */}
        <rect x="30" y="25" width="360" height="160" rx="18" fill="#0a0f1a" stroke="#334155" strokeWidth="1.5" />

        {/* Misfolded protein aggregates (clumped, irregular) */}
        <g fill="#475569" stroke="#94a3b8" strokeWidth="1.2" opacity="0.85">
          <ellipse cx="120" cy="85" rx="22" ry="16" />
          <ellipse cx="145" cy="105" rx="18" ry="13" />
          <ellipse cx="95" cy="105" rx="15" ry="11" />
          {/* Additional small aggregates */}
          <circle cx="160" cy="70" r="7" />
          <circle cx="105" cy="120" r="6" />
        </g>

        {/* Impaired Proteasome (barrel shape, partial blockage) */}
        <g>
          <rect x="220" y="55" width="55" height="95" rx="8" fill="#020811" stroke="#67f6ff" strokeWidth="2.5" />
          {/* Proteasome subunits / rings */}
          <rect x="225" y="62" width="45" height="12" rx="3" fill="#1e2937" stroke="#67f6ff" strokeWidth="1" />
          <rect x="225" y="82" width="45" height="12" rx="3" fill="#1e2937" stroke="#67f6ff" strokeWidth="1" />
          <rect x="225" y="102" width="45" height="12" rx="3" fill="#1e2937" stroke="#67f6ff" strokeWidth="1" />
          {/* Blockage indicator */}
          <rect x="235" y="75" width="25" height="8" fill="#f59e0b" opacity="0.6" />
        </g>

        {/* Autophagosome / lysosome (impaired, right side) */}
        <g>
          <ellipse cx="340" cy="110" rx="32" ry="24" fill="#020811" stroke="#67f6ff" strokeWidth="2" />
          <ellipse cx="340" cy="110" rx="20" ry="15" fill="#111827" />
          {/* Debris inside */}
          <circle cx="332" cy="105" r="4" fill="#475569" />
          <circle cx="348" cy="118" r="3.5" fill="#475569" />
        </g>

        {/* Intervention arrows & molecules (TUDCA / butyrate / HSP) */}
        <g stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.9">
          {/* From left - NRF2 / HSP boost */}
          <path d="M55 95 L85 95" />
          <polygon points="85,95 78,90 78,100" fill="#10b981" />
          {/* To proteasome */}
          <path d="M280 100 L310 100" />
          <polygon points="310,100 303,95 303,105" fill="#10b981" />
        </g>

        {/* Labels */}
        {showLabels && (
          <>
            <text x="120" y="55" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Misfolded aggregates</text>
            <text x="248" y="48" textAnchor="middle" fill="#67f6ff" fontSize="8.5">Impaired Proteasome</text>
            <text x="340" y="145" textAnchor="middle" fill="#67f6ff" fontSize="8">Autophagosome</text>
            <text x="55" y="140" textAnchor="start" fill="#10b981" fontSize="8">NRF2 / HSP / TUDCA boost</text>
          </>
        )}

        {/* Subtle pulsing on intervention path for interactivity */}
        {interactive && (
          <circle cx="85" cy="95" r="4" fill="#10b981" opacity="0.5">
            <animate attributeName="r" values="3;5.5;3" dur="2.2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {showLabels && (
        <div className="mt-3 text-[10px] text-[var(--color-text-muted)] leading-snug">
          Accumulation of misfolded proteins and aggregates due to declining proteasome and autophagy function. Interventions that upregulate NRF2, heat shock proteins, or support autophagy (TUDCA, butyrate) help restore proteostasis.
        </div>
      )}
    </div>
  );
};
