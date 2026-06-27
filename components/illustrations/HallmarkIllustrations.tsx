'use client';

/**
 * Publication-grade SVG illustrations for the 12 Hallmarks of Aging.
 *
 * Visual grammar: each illustration encodes (1) the age-related breakdown on the left,
 * (2) the key molecular intervention target in the center, and (3) the protected /
 * restored state on the right — using per-hallmark accent colors against #030712.
 */

import React from 'react';

type Props = { className?: string };

const W = 400;
const H = 300;

/* ── shared SVG scaffold ── */
function Base({
  id,
  accent,
  arrowFill = '#6b7280',
  className = '',
  children,
}: {
  id: string;
  accent: string;
  arrowFill?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={`w-full h-full${className ? ` ${className}` : ''}`}
    >
      <defs>
        <pattern id={`grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#0f172a" strokeWidth="0.5" />
        </pattern>
        <marker id={`arr-${id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,1 L0,6 L6,3.5 z" fill={arrowFill} />
        </marker>
        <marker id={`arr-acc-${id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,1 L0,6 L6,3.5 z" fill={accent} />
        </marker>
        {/* Enhanced dual-layer glow — soft halo + tight source bloom */}
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="halo" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="bloom" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="bloom" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Panel ambient depth gradients */}
        <radialGradient id={`left-bg-${id}`} cx="100" cy="150" r="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a2d40" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`right-bg-${id}`} cx="300" cy="150" r="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#030712" />
      <rect width={W} height={H} fill={`url(#grid-${id})`} opacity="0.38" />
      {/* Panel depth layers */}
      <rect x="0" y="0" width={W} height={H} fill={`url(#left-bg-${id})`} />
      <rect x="0" y="0" width={W} height={H} fill={`url(#right-bg-${id})`} />
      {/* Divider */}
      <line x1="200" y1="28" x2="200" y2="272" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" opacity="0.65" />
      {/* Panel labels */}
      <text x="100" y="20" textAnchor="middle" fill="#374151" fontSize="7.5" fontFamily="ui-monospace,monospace" letterSpacing="1.5">AGING STATE</text>
      <text x="300" y="20" textAnchor="middle" fill={accent} fontSize="7.5" fontFamily="ui-monospace,monospace" letterSpacing="1.5" opacity="0.85">INTERVENTION</text>
      {children}
    </svg>
  );
}

/* Label helpers */
const Lbl = ({ x, y, children, accent, dim }: { x: number; y: number; children: string; accent?: string; dim?: boolean }) => (
  <text x={x} y={y} textAnchor="middle" fill={accent ?? (dim ? '#4b5563' : '#9ca3af')} fontSize="9" fontFamily="ui-monospace,monospace">{children}</text>
);


/* ══════════════════════════════════════
   1. GENOMIC INSTABILITY
   Accent: cyan #22d3ee
══════════════════════════════════════ */
export function GenomicInstability({ className = '' }: Props) {
  const acc = '#22d3ee';
  const id = 'gi';
  // DNA helix parameters
  const helix = (x0: number, color: string, broken: boolean) => {
    const pts = Array.from({ length: 7 }, (_, i) => {
      const y = 60 + i * 28;
      const dx = 16 * Math.sin((i / 6) * Math.PI * 2);
      return { y, x1: x0 - dx, x2: x0 + dx };
    });
    return (
      <g>
        {pts.map((p, i) => (
          <React.Fragment key={i}>
            {/* left strand */}
            {i < pts.length - 1 && (
              <line x1={p.x1} y1={p.y} x2={pts[i + 1].x1} y2={pts[i + 1].y}
                stroke={broken && i === 2 ? '#ef4444' : color}
                strokeWidth={broken && i === 2 ? 1 : 2.5}
                strokeDasharray={broken && i === 2 ? '0' : undefined}
                opacity={broken && i >= 2 ? 0.45 : 0.85}
              />
            )}
            {/* right strand */}
            {i < pts.length - 1 && (
              <line x1={p.x2} y1={p.y} x2={pts[i + 1].x2} y2={pts[i + 1].y}
                stroke={broken && i === 2 ? '#ef4444' : color}
                strokeWidth={broken && i === 2 ? 1 : 2.5}
                strokeDasharray={broken && i === 2 ? '0' : undefined}
                opacity={broken && i >= 2 ? 0.45 : 0.85}
              />
            )}
            {/* base pairs */}
            <line x1={p.x1} y1={p.y} x2={p.x2} y2={p.y}
              stroke={color} strokeWidth="1" opacity="0.35" />
          </React.Fragment>
        ))}
      </g>
    );
  };

  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT — damaged helix */}
      {helix(95, '#4b5563', true)}
      {/* Break site marker */}
      <circle cx="87" cy="144" r="7" fill="#ef4444" opacity="0.55" />
      <Lbl x={87} y={147} accent="#ef4444">DSB</Lbl>
      {/* Oxidative damage dot */}
      <circle cx="105" cy="100" r="4" fill="#f97316" opacity="0.6" />
      <Lbl x={130} y={104} dim>8-OHdG</Lbl>

      {/* CENTER — PARP node consuming NAD+ */}
      <circle cx="200" cy="160" r="26" fill="#0f172a" stroke="#374151" strokeWidth="1.5" />
      <text x="200" y="156" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="ui-monospace,monospace">PARP1</text>
      <text x="200" y="170" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace,monospace" opacity="0.8">NAD+↓</text>
      {/* Arrow from break to PARP */}
      <line x1="135" y1="155" x2="170" y2="158" stroke="#6b7280" strokeWidth="1.5" markerEnd={`url(#arr-${id})`} />

      {/* RIGHT — repaired helix, NAD+ input */}
      {helix(305, acc, false)}
      {/* NAD+ input arrow */}
      <line x1="232" y1="158" x2="265" y2="155" stroke={acc} strokeWidth="1.5" markerEnd={`url(#arr-acc-${id})`} />
      <circle cx="250" cy="130" r="14" fill={acc} opacity="0.15" stroke={acc} strokeWidth="1" />
      <text x="250" y="126" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">NAD+</text>
      <text x="250" y="137" textAnchor="middle" fill={acc} fontSize="7" fontFamily="ui-monospace,monospace">NMN</text>
      {/* Repair seal glow */}
      <circle cx="305" cy="144" r="8" fill={acc} opacity="0.2" filter={`url(#glow-${id})`} />

      {/* Bottom labels */}
      <Lbl x={95} y={286} dim>DNA damage cascade</Lbl>
      <Lbl x={305} y={286} accent={acc}>NAD+ fuel → PARP repair</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   2. TELOMERE ATTRITION
   Accent: violet #a78bfa
══════════════════════════════════════ */
function TelomereArm({ x, capLen, capColor, label }: { x: number; capLen: number; capColor: string; label: string }) {
  return (
    <g>
      <rect x={x - 10} y={80} width={20} height={160} rx="10" fill="#1e293b" stroke="#374151" strokeWidth="1.5" />
      <rect x={x - 12} y={80 - capLen} width={24} height={capLen} rx="4" fill={capColor} opacity="0.8" />
      <rect x={x - 12} y={240} width={24} height={capLen} rx="4" fill={capColor} opacity="0.8" />
      <Lbl x={x} y={80 - capLen - 8} accent={capColor}>{label}</Lbl>
    </g>
  );
}

export function TelomereAttrition({ className = '' }: Props) {
  const acc = '#a78bfa';
  const id = 'ta';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: short telomeres (critical) */}
      <TelomereArm x={85} capLen={8} capColor="#ef4444" label="critical" />
      <Lbl x={85} y={268} dim>2–5 kb</Lbl>
      <text x="85" y="258" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace,monospace" opacity="0.8">p53/p21 ↑</text>

      {/* CENTER — division counter */}
      <circle cx="200" cy="150" r="32" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="142" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Replication</text>
      <text x="200" y="155" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="ui-monospace,monospace">÷50</text>
      <text x="200" y="167" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Hayflick limit</text>
      {/* Telomerase label */}
      <text x="200" y="205" textAnchor="middle" fill={acc} fontSize="9" fontFamily="ui-monospace,monospace">TERT (telomerase)</text>
      <line x1="175" y1="200" x2="140" y2="180" stroke={acc} strokeWidth="1" markerEnd={`url(#arr-acc-${id})`} opacity="0.5" />
      <line x1="225" y1="200" x2="260" y2="180" stroke={acc} strokeWidth="1" markerEnd={`url(#arr-acc-${id})`} opacity="0.7" />

      {/* RIGHT: longer telomeres */}
      <TelomereArm x={315} capLen={28} capColor={acc} label="protected" />
      {/* TERT glow */}
      <circle cx="315" cy="66" r="18" fill={acc} opacity="0.1" filter={`url(#glow-${id})`} />
      <Lbl x={315} y={268} accent={acc}>10–15 kb</Lbl>

      {/* Omega-3 / stress note */}
      <text x="315" y="258" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace" opacity="0.75">Omega-3 • HRV</text>

      <Lbl x={85} y={286} dim>Senescence threshold</Lbl>
      <Lbl x={315} y={286} accent={acc}>Telomerase + lifestyle</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   3. EPIGENETIC ALTERATIONS
   Accent: emerald #34d399
══════════════════════════════════════ */
function EpigeneticNucleosome({ cx, cy, ordered, accent }: { cx: number; cy: number; ordered: boolean; accent: string }) {
  const markPositions = ordered
    ? [[-18, -8], [-8, -16], [8, -16], [18, -8], [18, 8], [8, 16], [-8, 16], [-18, 8]]
    : [[-22, 0], [-14, -18], [5, -20], [18, -5], [20, 10], [4, 20], [-16, 14], [-20, -12]];
  return (
    <g>
      <circle cx={cx} cy={cy} r="22" fill="#0f172a" stroke={ordered ? accent : '#374151'} strokeWidth="2" opacity={ordered ? 0.9 : 0.6} />
      <circle cx={cx} cy={cy} r="14" fill={ordered ? accent : '#1f2937'} opacity={ordered ? 0.15 : 0.3} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill={ordered ? accent : '#6b7280'} fontSize="8" fontFamily="ui-monospace,monospace">H3K4</text>
      {markPositions.map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r="3.5"
          fill={ordered ? accent : (i % 3 === 0 ? '#ef4444' : '#6b7280')}
          opacity={ordered ? 0.75 : (i % 3 === 0 ? 0.7 : 0.4)}
        />
      ))}
    </g>
  );
}

export function EpigeneticAlterations({ className = '' }: Props) {
  const acc = '#34d399';
  const id = 'ea';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: disordered nucleosome */}
      <EpigeneticNucleosome cx={90} cy={155} ordered={false} accent={acc} />
      <Lbl x={90} y={200} dim>Drifting 5mC</Lbl>
      <circle cx="90" cy="102" r="5" fill="#ef4444" opacity="0.5" />
      <Lbl x={90} y={99} dim>DNMT3↓</Lbl>

      {/* CENTER — TET2 + Ca-AKG */}
      <rect x="162" y="120" width="76" height="60" rx="10" fill="#0a0f1a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="143" textAnchor="middle" fill={acc} fontSize="10" fontFamily="ui-monospace,monospace">TET2</text>
      <text x="200" y="157" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">Ca-AKG ✓</text>
      <text x="200" y="170" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">SIRT1/NAD+</text>
      <text x="200" y="103" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="ui-monospace,monospace">5mC → 5hmC</text>
      <line x1="200" y1="108" x2="200" y2="118" stroke={acc} strokeWidth="1" markerEnd={`url(#arr-acc-${id})`} />

      {/* RIGHT: ordered nucleosome */}
      <EpigeneticNucleosome cx={310} cy={155} ordered={true} accent={acc} />
      <Lbl x={310} y={200} accent={acc}>Youthful pattern</Lbl>
      <circle cx="310" cy="155" r="30" fill={acc} opacity="0.05" filter={`url(#glow-${id})`} />

      {/* Arrows from center to right */}
      <line x1="240" y1="150" x2="276" y2="152" stroke={acc} strokeWidth="1.5" markerEnd={`url(#arr-acc-${id})`} />

      <Lbl x={90} y={286} dim>Methylation drift → age↑</Lbl>
      <Lbl x={310} y={286} accent={acc}>TET2 + Ca-AKG reset</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   4. LOSS OF PROTEOSTASIS
   Accent: amber #fbbf24
══════════════════════════════════════ */
export function LossOfProteostasis({ className = '' }: Props) {
  const acc = '#fbbf24';
  const id = 'lp';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: misfolded protein aggregate */}
      <g opacity="0.7">
        {/* Tangled protein blobs */}
        <path d="M50 120 Q70 100 90 120 Q110 140 90 160 Q70 180 50 160 Q30 140 50 120 Z" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
        <path d="M65 110 Q85 90 105 110 Q120 130 100 148 Q80 165 62 148 Q44 130 65 110 Z" fill="#1f2937" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
        <path d="M75 140 Q95 122 115 140 Q130 158 110 172 Q90 186 72 172 Q55 158 75 140 Z" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
      </g>
      <Lbl x={82} y={198} dim>Aggregate</Lbl>
      <Lbl x={82} y={210} dim>Amyloid / Tau</Lbl>
      {/* Stress marker */}
      <circle cx="60" cy="105" r="5" fill="#ef4444" opacity="0.5" />
      <Lbl x={80} y={108} dim>ER stress</Lbl>

      {/* CENTER — Proteasome barrel + HSP70 */}
      <rect x="168" y="115" width="64" height="80" rx="14" fill="#0a0f1a" stroke="#374151" strokeWidth="2" />
      <rect x="176" y="122" width="48" height="12" rx="4" fill="#1e293b" />
      <rect x="176" y="138" width="48" height="12" rx="4" fill="#1e293b" />
      <rect x="176" y="154" width="48" height="12" rx="4" fill="#1e293b" />
      <rect x="176" y="170" width="48" height="10" rx="4" fill="#1e293b" />
      <text x="200" y="132" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontFamily="ui-monospace,monospace">26S</text>
      <text x="200" y="148" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="ui-monospace,monospace">Proteasome</text>
      <text x="200" y="163" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">HSP70 ↑</text>
      <text x="200" y="200" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">GlyNAC→GSH</text>

      {/* LEFT arrow to proteasome */}
      <line x1="135" y1="155" x2="164" y2="155" stroke="#6b7280" strokeWidth="1.5" markerEnd={`url(#arr-${id})`} />

      {/* RIGHT — properly folded protein + GSH shield */}
      <circle cx="310" cy="155" r="35" fill={acc} opacity="0.06" stroke={acc} strokeWidth="1" />
      <circle cx="310" cy="155" r="22" fill="#0a0f1a" stroke={acc} strokeWidth="2" />
      {/* Native fold representation */}
      <path d="M295 148 Q310 138 325 148 Q330 160 310 168 Q290 160 295 148" fill={acc} opacity="0.2" stroke={acc} strokeWidth="1.5" />
      <text x="310" y="159" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">Native</text>
      <text x="310" y="200" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">GSH shield</text>

      <line x1="236" y1="155" x2="272" y2="155" stroke={acc} strokeWidth="1.5" markerEnd={`url(#arr-acc-${id})`} />

      <Lbl x={82} y={286} dim>Protein aggregation → neurodegeneration</Lbl>
      <Lbl x={310} y={286} accent={acc}>GlyNAC → GSH → proteostasis</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   5. DISABLED AUTOPHAGY
   Accent: rose #f43f5e
══════════════════════════════════════ */
export function DisabledAutophagy({ className = '' }: Props) {
  const acc = '#f43f5e';
  const id = 'da';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: damaged organelles floating, no clearance */}
      {/* Damaged mitochondrion */}
      <ellipse cx="80" cy="120" rx="28" ry="14" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
      <path d="M62 117 Q72 110 82 117 Q92 124 82 131" stroke="#6b7280" strokeWidth="1.5" fill="none" />
      {/* Aggregate blob */}
      <circle cx="105" cy="165" r="16" fill="#1f2937" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
      <circle cx="65" cy="175" r="12" fill="#1f2937" stroke="#4b5563" strokeWidth="1" opacity="0.6" />
      {/* mTOR active (bad) */}
      <circle cx="90" cy="230" r="14" fill="#7f1d1d" opacity="0.5" stroke="#ef4444" strokeWidth="1.5" />
      <text x="90" y="233" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace,monospace">mTOR↑</text>

      {/* CENTER — AMPK/mTOR balance */}
      <rect x="168" y="115" width="64" height="75" rx="10" fill="#0a0f1a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="138" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="ui-monospace,monospace">AMPK ↑</text>
      <line x1="185" y1="148" x2="215" y2="148" stroke="#374151" strokeWidth="1" />
      <text x="200" y="162" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="ui-monospace,monospace">mTOR ↓</text>
      <text x="200" y="178" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Spermidine</text>
      <text x="200" y="210" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">LC3-II ↑</text>

      {/* RIGHT — autophagosome engulfing cargo */}
      {/* Autophagosome double membrane */}
      <path d="M265 110 Q265 80 310 80 Q355 80 355 110 Q355 180 310 200 Q265 200 265 170 Q265 150 265 130 Z"
        fill="#0a0f1a" stroke={acc} strokeWidth="2" opacity="0.9" />
      {/* Inner membrane */}
      <path d="M277 120 Q277 95 310 95 Q343 95 343 120 Q343 170 310 185 Q277 185 277 160 Q277 145 277 130 Z"
        fill="#030712" stroke={acc} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      {/* Cargo inside */}
      <ellipse cx="310" cy="138" rx="20" ry="10" fill="#1f2937" stroke="#374151" strokeWidth="1" />
      <circle cx="310" cy="138" r="5" fill={acc} opacity="0.3" />
      {/* LC3-II dots on membrane */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return <circle key={deg} cx={310 + 42 * Math.cos(rad)} cy={140 + 55 * Math.sin(rad)} r="3" fill={acc} opacity="0.65" />;
      })}
      <text x="310" y="212" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Lysosome fusion →</text>

      <Lbl x={90} y={286} dim>Debris accumulates → toxicity</Lbl>
      <Lbl x={310} y={286} accent={acc}>LC3-II autophagosome clearance</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   6. MITOCHONDRIAL DYSFUNCTION
   Accent: cyan #22d3ee
══════════════════════════════════════ */
export function MitochondrialDysfunction({ className = '' }: Props) {
  const acc = '#22d3ee';
  const id = 'md';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: fragmented mitochondria with ROS leak */}
      {/* Fragmented mito 1 */}
      <ellipse cx="75" cy="115" rx="30" ry="14" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
      <path d="M58 112 Q68 106 78 112 Q88 118 78 125" stroke="#4b5563" strokeWidth="1.5" fill="none" />
      {/* Fragmented mito 2 */}
      <ellipse cx="100" cy="160" rx="22" ry="11" fill="#1f2937" stroke="#374151" strokeWidth="1.5" opacity="0.7" />
      {/* Fragmented mito 3 */}
      <ellipse cx="68" cy="195" rx="25" ry="10" fill="#1f2937" stroke="#374151" strokeWidth="1.5" opacity="0.5" />
      {/* ROS particles */}
      {[[55, 95], [95, 85], [115, 140], [85, 175], [110, 200], [55, 215]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#ef4444" opacity={0.35 + i * 0.07} />
      ))}
      <text x="90" y="240" textAnchor="middle" fill="#ef4444" fontSize="8.5" fontFamily="ui-monospace,monospace" opacity="0.75">ROS ↑↑↑</text>

      {/* CENTER — NAD+/SIRT3 axis */}
      <circle cx="200" cy="155" r="30" fill="#0a0f1a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="147" textAnchor="middle" fill={acc} fontSize="10" fontFamily="ui-monospace,monospace">SIRT3</text>
      <text x="200" y="160" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">NAD+ ←</text>
      <text x="200" y="172" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">PGC-1α</text>
      {/* Mitophagy note */}
      <text x="200" y="205" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Mitophagy</text>
      <text x="200" y="216" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Urolithin A</text>

      {/* RIGHT: healthy elongated mitochondria */}
      {/* Main mito */}
      <ellipse cx="310" cy="140" rx="45" ry="22" fill="#0a1628" stroke={acc} strokeWidth="2" />
      {/* Cristae folds */}
      <path d="M278 138 Q290 128 302 138 Q314 148 326 138 Q338 128 350 138" stroke={acc} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M278 148 Q290 158 302 148 Q314 138 326 148 Q338 158 350 148" stroke={acc} strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* ETC arrow */}
      <line x1="270" y1="140" x2="355" y2="140" stroke={acc} strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <text x="310" y="170" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Complex I–IV ✓</text>
      {/* NMN/CoQ10 */}
      <circle cx="310" cy="200" r="16" fill={acc} opacity="0.1" stroke={acc} strokeWidth="1" />
      <text x="310" y="196" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">NMN</text>
      <text x="310" y="207" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">CoQ10</text>
      {/* Glow */}
      <ellipse cx="310" cy="140" rx="48" ry="25" fill={acc} opacity="0.05" filter={`url(#glow-${id})`} />

      <Lbl x={90} y={286} dim>Fragmented mito → ROS cascade</Lbl>
      <Lbl x={310} y={286} accent={acc}>NAD+ → SIRT3 → ETC restore</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   7. CELLULAR SENESCENCE
   Accent: amber #fbbf24
══════════════════════════════════════ */
export function CellularSenescence({ className = '' }: Props) {
  const acc = '#fbbf24';
  const id = 'cs';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: large flat senescent cell */}
      <ellipse cx="90" cy="160" rx="65" ry="48" fill="#1a1207" stroke="#92400e" strokeWidth="1.5" opacity="0.85" />
      {/* Irregular nucleus */}
      <ellipse cx="90" cy="155" rx="28" ry="22" fill="#0a0800" stroke="#d97706" strokeWidth="1.5" opacity="0.8" />
      {/* γ-H2AX foci in nucleus */}
      {[[82, 150], [98, 162], [88, 168], [96, 146]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#ef4444" opacity="0.7" />
      ))}
      {/* SASP secretion */}
      {[[50, 115], [130, 105], [45, 195], [135, 190], [80, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + i % 3} fill="#ef4444" opacity="0.4">
          <animate attributeName="r" values={`${4 + i % 3};${6 + i % 3};${4 + i % 3}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="90" y="220" textAnchor="middle" fill="#d97706" fontSize="8" fontFamily="ui-monospace,monospace">SASP → IL-6, MMP</text>

      {/* CENTER — p16/p21 arrest */}
      <circle cx="200" cy="150" r="28" fill="#0a0f1a" stroke="#374151" strokeWidth="1.5" />
      <text x="200" y="144" textAnchor="middle" fill="#d97706" fontSize="9" fontFamily="ui-monospace,monospace">p16INK4a</text>
      <text x="200" y="157" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">p21 / p53</text>
      <text x="200" y="169" textAnchor="middle" fill="#9ca3af" fontSize="7.5" fontFamily="ui-monospace,monospace">CDKN2A</text>
      <text x="200" y="200" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">Fisetin ✓</text>
      <text x="200" y="212" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Quercetin ✓</text>

      {/* RIGHT — apoptotic clearance */}
      {/* Fragmented cell (cleared) */}
      {[[280, 125], [340, 130], [270, 175], [350, 165], [300, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6 + i % 4} fill="#0a1200" stroke={acc} strokeWidth="1" opacity="0.6" />
      ))}
      {/* Immune cell (NK/macrophage clearing) */}
      <circle cx="315" cy="150" r="24" fill="#0a1200" stroke={acc} strokeWidth="2" opacity="0.8" />
      <text x="315" y="146" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">NK Cell</text>
      <text x="315" y="158" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">clearance</text>
      <circle cx="315" cy="150" r="28" fill={acc} opacity="0.04" filter={`url(#glow-${id})`} />

      <Lbl x={90} y={286} dim>SASP → tissue inflammation</Lbl>
      <Lbl x={310} y={286} accent={acc}>Senolytic → immune clearance</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   8. STEM CELL EXHAUSTION
   Accent: emerald #34d399
══════════════════════════════════════ */
export function StemCellExhaustion({ className = '' }: Props) {
  const acc = '#34d399';
  const id = 'sce';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: depleted niche (mostly empty wells) */}
      {/* Niche scaffold */}
      <rect x="30" y="100" width="140" height="150" rx="12" fill="#0a0f0a" stroke="#1f2937" strokeWidth="1.5" opacity="0.8" />
      {/* Empty wells */}
      {[[60, 135], [110, 135], [60, 190], [110, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 16 : 12}
          fill={i === 0 ? '#0f2010' : '#0a0f0a'}
          stroke={i === 0 ? '#374151' : '#1e293b'}
          strokeWidth="1"
          opacity={i === 0 ? 0.9 : 0.5}
        />
      ))}
      {/* One surviving HSC */}
      <circle cx="60" cy="135" r="10" fill="#1f3327" stroke="#4b5563" strokeWidth="1.5" opacity="0.85" />
      <text x="60" y="139" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="ui-monospace,monospace">HSC</text>
      <text x="100" y="265" textAnchor="middle" fill="#4b5563" fontSize="8" fontFamily="ui-monospace,monospace">CD34+ ↓↓</text>

      {/* CENTER — niche factors */}
      <rect x="165" y="115" width="70" height="90" rx="10" fill="#0a0f0a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="138" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">Wnt/Notch</text>
      <text x="200" y="152" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">niche signals</text>
      <text x="200" y="168" textAnchor="middle" fill={acc} fontSize="9" fontFamily="ui-monospace,monospace">Ca-AKG ✓</text>
      <text x="200" y="181" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">NMN/NAD+ ✓</text>
      <text x="200" y="218" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Resist. training</text>

      {/* RIGHT: active niche with dividing stem cell */}
      <rect x="233" y="100" width="140" height="150" rx="12" fill="#0a1200" stroke={acc} strokeWidth="1.5" opacity="0.75" />
      {/* Active HSC dividing */}
      <circle cx="295" cy="140" r="18" fill="#0f2218" stroke={acc} strokeWidth="2" />
      <text x="295" y="136" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">HSC</text>
      <text x="295" y="148" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">active</text>
      {/* Division arrow */}
      <line x1="315" y1="145" x2="346" y2="145" stroke={acc} strokeWidth="1.5" markerEnd={`url(#arr-acc-${id})`} />
      {/* Daughter cells */}
      <circle cx="355" cy="135" r="10" fill="#0f2218" stroke={acc} strokeWidth="1.5" opacity="0.8" />
      <circle cx="355" cy="158" r="10" fill="#0f2218" stroke={acc} strokeWidth="1.5" opacity="0.6" />
      {/* Glow */}
      <circle cx="295" cy="140" r="24" fill={acc} opacity="0.04" filter={`url(#glow-${id})`} />
      <text x="295" y="265" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Self-renewal ✓</text>

      <Lbl x={100} y={286} dim>Niche depletion → slow healing</Lbl>
      <Lbl x={295} y={286} accent={acc}>Ca-AKG → niche restoration</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   9. ALTERED INTERCELLULAR COMMUNICATION
   Accent: violet #a78bfa
══════════════════════════════════════ */
export function AlteredIntercellularCommunication({ className = '' }: Props) {
  const acc = '#a78bfa';
  const id = 'aic';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: chaotic signaling */}
      {/* Three cells */}
      {[[65, 100], [95, 175], [55, 225]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="20" fill="#0f0a1a" stroke="#374151" strokeWidth="1.5" opacity="0.8" />
      ))}
      {/* Crossed/chaotic signal lines */}
      <line x1="75" y1="115" x2="88" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <line x1="88" y1="162" x2="60" y2="208" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      <line x1="80" y1="102" x2="95" y2="170" stroke="#4b5563" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      {/* IL-6 / TNF dots */}
      {[[110, 130], [120, 155], [115, 180]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#ef4444" opacity="0.5" />
      ))}
      <text x="115" y="210" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="ui-monospace,monospace" opacity="0.75">IL-6↑ TNF-α↑</text>

      {/* CENTER — NF-κB hub */}
      <circle cx="200" cy="155" r="30" fill="#0a0014" stroke="#4c1d95" strokeWidth="1.5" />
      <text x="200" y="150" textAnchor="middle" fill="#d4b3ff" fontSize="10" fontFamily="ui-monospace,monospace">NF-κB</text>
      <text x="200" y="164" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="ui-monospace,monospace">master switch</text>
      <text x="200" y="200" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">NRF2 ↔ blocks</text>
      <text x="200" y="212" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Omega-3 SPMs</text>

      {/* RIGHT: ordered signaling */}
      {[[305, 100], [335, 175], [295, 225]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="20" fill="#0a0014" stroke={acc} strokeWidth="1.5" opacity={0.6 + i * 0.15} />
      ))}
      {/* Clean signal lines */}
      <line x1="315" y1="115" x2="330" y2="160" stroke={acc} strokeWidth="1.5" opacity="0.6" markerEnd={`url(#arr-acc-${id})`} />
      <line x1="330" y1="162" x2="308" y2="207" stroke={acc} strokeWidth="1.5" opacity="0.5" markerEnd={`url(#arr-acc-${id})`} />
      {/* Resolvin dots */}
      {[[355, 130], [365, 155], [358, 178]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={acc} opacity="0.45" />
      ))}
      <text x="320" y="210" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace" opacity="0.8">Resolvins ✓</text>

      <Lbl x={90} y={286} dim>SASP hijacks paracrine signals</Lbl>
      <Lbl x={310} y={286} accent={acc}>NF-κB block → clean comms</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   10. CHRONIC INFLAMMATION
    Accent: rose #f43f5e
══════════════════════════════════════ */
export function ChronicInflammation({ className = '' }: Props) {
  const acc = '#f43f5e';
  const id = 'ci';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: NLRP3 inflammasome */}
      {/* Inflammasome complex */}
      <circle cx="90" cy="145" r="35" fill="#200000" stroke="#b91c1c" strokeWidth="1.5" opacity="0.9" />
      <text x="90" y="140" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="ui-monospace,monospace">NLRP3</text>
      <text x="90" y="153" textAnchor="middle" fill="#f87171" fontSize="8.5" fontFamily="ui-monospace,monospace">ASC • Casp1</text>
      {/* IL-1β / IL-18 burst cloud */}
      {[[50, 100], [130, 95], [140, 150], [55, 190], [125, 185]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5 + i % 3} fill="#ef4444" opacity={0.3 + i * 0.05}>
          <animate attributeName="r" values={`${5 + i % 3};${8 + i % 3};${5 + i % 3}`} dur={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="90" y="210" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="ui-monospace,monospace">IL-1β · IL-18 · hs-CRP</text>

      {/* CENTER — NF-κB regulatory node */}
      <circle cx="200" cy="150" r="28" fill="#0a0f1a" stroke="#374151" strokeWidth="1.5" />
      <text x="200" y="144" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="ui-monospace,monospace">NF-κB</text>
      <text x="200" y="157" textAnchor="middle" fill="#6b7280" fontSize="8.5" fontFamily="ui-monospace,monospace">IκB kinase</text>
      <text x="200" y="196" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">NRF2 blocks ✓</text>
      <text x="200" y="208" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">GlyNAC • Sulforaphane</text>

      {/* RIGHT: NRF2 defense + SPM resolution */}
      {/* NRF2 shield */}
      <circle cx="310" cy="140" r="38" fill="#001a05" stroke={acc} strokeWidth="2" opacity="0.75" />
      <text x="310" y="132" textAnchor="middle" fill={acc} fontSize="12" fontFamily="ui-monospace,monospace">NRF2</text>
      <text x="310" y="147" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">ARE genes ↑</text>
      <text x="310" y="160" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">HO-1 · NQO1</text>
      {/* SPM resolution */}
      {[[270, 95], [350, 90], [360, 175], [262, 175]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={acc} opacity="0.35" />
      ))}
      <text x="310" y="197" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Omega-3 SPMs ✓</text>
      <circle cx="310" cy="140" r="44" fill={acc} opacity="0.04" filter={`url(#glow-${id})`} />

      <Lbl x={90} y={286} dim>NLRP3 → inflammaging cascade</Lbl>
      <Lbl x={310} y={286} accent={acc}>NRF2 + Omega-3 SPM resolution</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   11. DYSBIOSIS
   Accent: emerald #34d399
══════════════════════════════════════ */
function DysbiosisGutWall({ x, leaky, accent }: { x: number; leaky: boolean; accent: string }) {
  const color = leaky ? '#374151' : accent;
  return (
    <g>
      {/* Villi */}
      {[x, x + 22, x + 44, x + 66, x + 88].map((vx, i) => (
        <g key={i}>
          <rect x={vx + 2} y={90 - (i % 2 === 0 ? 20 : 10)} width="18" height={i % 2 === 0 ? 45 : 35}
            rx="8" fill={leaky ? '#1a1a1a' : '#061a10'} stroke={color} strokeWidth="1.2" opacity="0.85" />
          {leaky && i % 2 === 0 && (
            <line x1={vx + 11} y1={90} x2={vx + 11} y2={110} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
          )}
        </g>
      ))}
      {/* Epithelial layer */}
      <rect x={x} y={110} width={110} height={18} rx="3" fill={leaky ? '#0f0f0f' : '#061a10'} stroke={color} strokeWidth={leaky ? 1 : 2} />
      {/* Tight junctions (intact or broken) */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={x + 18 + i * 25} y1={110} x2={x + 18 + i * 25} y2={128}
          stroke={leaky && i % 2 === 0 ? '#ef4444' : color}
          strokeWidth={leaky && i % 2 === 0 ? 1 : 1.5}
          strokeDasharray={leaky && i % 2 === 0 ? '2 3' : undefined}
          opacity={leaky && i % 2 === 0 ? 0.5 : 0.8}
        />
      ))}
      {/* Mucus layer */}
      <rect x={x} y={128} width={110} height={14} rx="3" fill={leaky ? '#0a0a00' : '#061a10'} stroke={leaky ? '#4b5563' : accent} strokeWidth="1" opacity={leaky ? 0.4 : 0.7} />
    </g>
  );
}

export function Dysbiosis({ className = '' }: Props) {
  const acc = '#34d399';
  const id = 'dysbio';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: leaky gut */}
      <DysbiosisGutWall x={30} leaky={true} accent={acc} />
      {/* LPS translocation */}
      {[[60, 155], [85, 160], [100, 165], [50, 165]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#ef4444" opacity="0.5" />
      ))}
      <text x="85" y="180" textAnchor="middle" fill="#ef4444" fontSize="7.5" fontFamily="ui-monospace,monospace" opacity="0.75">LPS → bloodstream</text>
      {/* Pathogens */}
      {[[45, 200], [100, 205], [70, 220]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="10" ry="6" fill="#1f0a0a" stroke="#b91c1c" strokeWidth="1" opacity="0.6" />
      ))}
      <text x="75" y="245" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Low diversity</text>

      {/* CENTER — Tight junction complex */}
      <rect x="165" y="115" width="70" height="85" rx="10" fill="#0a0f0a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="136" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">Tight Junctions</text>
      <text x="200" y="150" textAnchor="middle" fill="#9ca3af" fontSize="8" fontFamily="ui-monospace,monospace">ZO-1 · Occludin</text>
      <text x="200" y="165" textAnchor="middle" fill={acc} fontSize="9" fontFamily="ui-monospace,monospace">Sulforaphane ✓</text>
      <text x="200" y="178" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">SCFA ↑</text>
      <text x="200" y="215" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Akkermansia ✓</text>

      {/* RIGHT: intact gut */}
      <DysbiosisGutWall x={232} leaky={false} accent={acc} />
      {/* SCFA production */}
      {[[255, 160], [280, 165], [305, 162], [328, 158]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={acc} opacity={0.3 + i * 0.1} />
      ))}
      <text x="285" y="183" textAnchor="middle" fill={acc} fontSize="7.5" fontFamily="ui-monospace,monospace">SCFA → butyrate</text>
      {/* Diverse microbiome */}
      {['#34d399', '#a78bfa', '#fbbf24', '#22d3ee', '#f43f5e'].map((col, i) => (
        <circle key={i} cx={245 + i * 24} cy={210} r="7" fill={col} opacity="0.25" stroke={col} strokeWidth="1" />
      ))}
      <text x="285" y="235" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">30+ species ✓</text>

      <Lbl x={85} y={286} dim>Leaky gut → LPS → inflammaging</Lbl>
      <Lbl x={300} y={286} accent={acc}>Fiber + SCFA → barrier integrity</Lbl>
    </Base>
  );
}

/* ══════════════════════════════════════
   12. DISABLED MACROAUTOPHAGY (Nutrient Sensing)
   Accent: amber #fbbf24
══════════════════════════════════════ */
export function DisabledMacroautophagy({ className = '' }: Props) {
  const acc = '#fbbf24';
  const id = 'dma';
  return (
    <Base id={id} accent={acc} arrowFill={acc} className={className}>
      {/* LEFT: mTOR dominant, AMPK suppressed */}
      {/* mTOR overactive (large glowing) */}
      <circle cx="90" cy="140" r="48" fill="#1a0a00" stroke="#d97706" strokeWidth="2" opacity="0.9" />
      <text x="90" y="133" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="ui-monospace,monospace">mTOR</text>
      <text x="90" y="150" textAnchor="middle" fill="#d97706" fontSize="8.5" fontFamily="ui-monospace,monospace">hyperactive</text>
      <text x="90" y="163" textAnchor="middle" fill="#d97706" fontSize="8.5" fontFamily="ui-monospace,monospace">S6K1↑ 4EBP1↑</text>
      {/* mTOR glow */}
      <circle cx="90" cy="140" r="55" fill="#d97706" opacity="0.06" filter={`url(#glow-${id})`} />
      {/* AMPK suppressed (small) */}
      <circle cx="90" cy="230" r="16" fill="#0a0f0a" stroke="#374151" strokeWidth="1.5" opacity="0.6" />
      <text x="90" y="233" textAnchor="middle" fill="#4b5563" fontSize="8" fontFamily="ui-monospace,monospace">AMPK↓</text>

      {/* CENTER — AMP:ATP ratio sensor */}
      <rect x="163" y="110" width="74" height="95" rx="12" fill="#0a0f1a" stroke="#1e293b" strokeWidth="1.5" />
      <text x="200" y="132" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">AMP:ATP</text>
      <text x="200" y="145" textAnchor="middle" fill="#9ca3af" fontSize="8.5" fontFamily="ui-monospace,monospace">ratio sensor</text>
      {/* Balance bar */}
      <line x1="178" y1="160" x2="222" y2="160" stroke="#374151" strokeWidth="2" />
      <circle cx="200" cy="160" r="4" fill="#374151" />
      <text x="200" y="177" textAnchor="middle" fill={acc} fontSize="9" fontFamily="ui-monospace,monospace">Berberine ✓</text>
      <text x="200" y="190" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">Rapamycin ✓</text>
      <text x="200" y="218" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">Fasting • Caloric</text>
      <text x="200" y="229" textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="ui-monospace,monospace">restriction</text>

      {/* RIGHT: AMPK active, mTOR appropriately inhibited */}
      {/* AMPK active (large) */}
      <circle cx="310" cy="175" r="38" fill="#0a1200" stroke={acc} strokeWidth="2" opacity="0.9" />
      <text x="310" y="168" textAnchor="middle" fill={acc} fontSize="12" fontFamily="ui-monospace,monospace">AMPK</text>
      <text x="310" y="182" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">active</text>
      <circle cx="310" cy="175" r="44" fill={acc} opacity="0.04" filter={`url(#glow-${id})`} />
      {/* mTOR suppressed (small) */}
      <circle cx="310" cy="105" r="20" fill="#0a0f1a" stroke={acc} strokeWidth="1.5" opacity="0.65" />
      <text x="310" y="101" textAnchor="middle" fill={acc} fontSize="8.5" fontFamily="ui-monospace,monospace">mTOR</text>
      <text x="310" y="113" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">inhibited</text>
      {/* Autophagy flux */}
      <text x="310" y="228" textAnchor="middle" fill={acc} fontSize="8" fontFamily="ui-monospace,monospace">Autophagic flux ↑</text>

      <Lbl x={90} y={286} dim>mTOR↑ → autophagy suppressed</Lbl>
      <Lbl x={310} y={286} accent={acc}>Berberine → AMPK → flux</Lbl>
    </Base>
  );
}

/* ── Index map for programmatic access ── */
export type HallmarkIllustrationId =
  | 'dna' | 'telomere' | 'epigenetic' | 'protein' | 'autophagy'
  | 'mito' | 'senescence' | 'stem' | 'signaling' | 'inflammation'
  | 'gut' | 'nutrient';

export const HALLMARK_ILLUSTRATIONS: Record<HallmarkIllustrationId, React.FC<Props>> = {
  dna: GenomicInstability,
  telomere: TelomereAttrition,
  epigenetic: EpigeneticAlterations,
  protein: LossOfProteostasis,
  autophagy: DisabledAutophagy,
  mito: MitochondrialDysfunction,
  senescence: CellularSenescence,
  stem: StemCellExhaustion,
  signaling: AlteredIntercellularCommunication,
  inflammation: ChronicInflammation,
  gut: Dysbiosis,
  nutrient: DisabledMacroautophagy,
};
