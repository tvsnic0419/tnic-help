'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
  accentColor?: string;
}

export const ChronicInflammationVisual: React.FC<Props> = ({ className = '', size = 320, accentColor = '#fbbf24' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Chronic Inflammation Hallmark illustration" role="img">
    <rect width="320" height="240" fill="#111827" opacity="0.3" rx="8" />
    {/* Inflamed area */}
    <ellipse cx="100" cy="110" rx="50" ry="35" fill="#1f2937" stroke="#6b7280" strokeWidth="3" />
    <circle cx="85" cy="95" r="5" fill="#f87171" />
    <circle cx="115" cy="125" r="4" fill="#f87171" />
    {/* NRF2 resolution */}
    <ellipse cx="220" cy="110" rx="45" ry="32" fill="none" stroke={accentColor} strokeWidth="3" />
    <path d="M195 90 Q220 75 245 90" stroke={accentColor} strokeWidth="2.5" />
    <text x="220" y="115" textAnchor="middle" fill={accentColor} fontSize="8">NRF2 / Sulforaphane</text>
    <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11">Inflammation Resolution via NRF2</text>
  </svg>
);