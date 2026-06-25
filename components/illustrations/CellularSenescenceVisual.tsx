'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
  accentColor?: string;
}

export const CellularSenescenceVisual: React.FC<Props> = ({ className = '', size = 320, accentColor = '#f87171' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cellular Senescence Hallmark illustration" role="img">
    <rect width="320" height="240" fill="#111827" opacity="0.3" rx="8" />
    {/* Senescent cell with SASP */}
    <circle cx="120" cy="110" r="45" fill="#1f2937" stroke="#6b7280" strokeWidth="3" />
    <circle cx="105" cy="95" r="6" fill="#f87171" opacity="0.6" />
    <circle cx="140" cy="125" r="5" fill="#f87171" opacity="0.5" />
    <path d="M90 80 L70 60" stroke="#f87171" strokeWidth="2" opacity="0.6" />
    {/* Clearance right */}
    <circle cx="220" cy="110" r="38" fill="none" stroke={accentColor} strokeWidth="3" />
    <path d="M200 90 L240 90 M200 130 L240 130" stroke={accentColor} strokeWidth="2.5" />
    <text x="220" y="115" textAnchor="middle" fill={accentColor} fontSize="8">Fisetin / Senolytic</text>
    <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11">Senescent Cell Clearance</text>
  </svg>
);