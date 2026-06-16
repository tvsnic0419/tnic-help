'use client';

import type { HallmarkLibraryEntry } from '@/lib/types';

const visualMeta: Record<
  HallmarkLibraryEntry['visual'],
  { color: string; label: string }
> = {
  dna: { color: '#22d3ee', label: 'DNA helix damage' },
  telomere: { color: '#a78bfa', label: 'Telomere caps' },
  epigenetic: { color: '#34d399', label: 'Methylation marks' },
  protein: { color: '#fbbf24', label: 'Protein aggregates' },
  autophagy: { color: '#fb7185', label: 'Autophagosome' },
  mito: { color: '#22d3ee', label: 'Mitochondria' },
  senescence: { color: '#f97316', label: 'Senescent cell' },
  stem: { color: '#34d399', label: 'Stem cell niche' },
  signaling: { color: '#a78bfa', label: 'Cell signaling' },
  inflammation: { color: '#fb7185', label: 'Inflammation' },
  gut: { color: '#34d399', label: 'Microbiome' },
  nutrient: { color: '#fbbf24', label: 'mTOR / AMPK' },
};

export function HallmarkVisual({
  visual,
  coverage,
  number,
}: {
  visual: HallmarkLibraryEntry['visual'];
  coverage: number;
  number: number;
}) {
  const meta = visualMeta[visual];
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (coverage / 100) * circumference;

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full" aria-label={`${meta.label} visual`}>
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={meta.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          opacity="0.9"
        />
        <text x="100" y="92" textAnchor="middle" fill={meta.color} fontSize="28" fontWeight="bold">
          {coverage}%
        </text>
        <text x="100" y="112" textAnchor="middle" fill="#71717a" fontSize="9">
          TNiC COVERAGE
        </text>
        <text x="100" y="168" textAnchor="middle" fill="#52525b" fontSize="10">
          Hallmark {number}
        </text>
        <VisualGlyph type={visual} cx={100} cy={100} color={meta.color} />
      </svg>
      <p className="text-center text-[10px] font-mono text-zinc-600 mt-2">{meta.label}</p>
    </div>
  );
}

function VisualGlyph({
  type,
  cx,
  cy,
  color,
}: {
  type: HallmarkLibraryEntry['visual'];
  cx: number;
  cy: number;
  color: string;
}) {
  switch (type) {
    case 'dna':
      return (
        <g stroke={color} strokeWidth="1.5" fill="none" opacity="0.5">
          <path d={`M${cx - 20} ${cy - 30} Q${cx} ${cy - 15} ${cx + 20} ${cy - 30}`} />
          <path d={`M${cx - 20} ${cy - 10} Q${cx} ${cy + 5} ${cx + 20} ${cy - 10}`} />
          <path d={`M${cx - 20} ${cy + 10} Q${cx} ${cy + 25} ${cx + 20} ${cy + 10}`} />
          <line x1={cx - 12} y1={cy - 22} x2={cx + 12} y2={cy - 18} strokeWidth="1" />
          <line x1={cx - 12} y1={cy - 2} x2={cx + 12} y2={cy + 2} strokeWidth="1" />
        </g>
      );
    case 'mito':
      return (
        <ellipse cx={cx} cy={cy + 40} rx="28" ry="10" fill={color} opacity="0.15" />
      );
    case 'inflammation':
      return (
        <circle cx={cx} cy={cy + 38} r="6" fill={color} opacity="0.4">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
        </circle>
      );
    default:
      return <circle cx={cx} cy={cy + 38} r="4" fill={color} opacity="0.35" />;
  }
}