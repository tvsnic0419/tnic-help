'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
  accentColor?: string;
}

export const EpigeneticAlterationsVisual: React.FC<Props> = ({ className = '', size = 320, accentColor = '#a78bfa' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Epigenetic Alterations Hallmark illustration" role="img">
    <rect width="320" height="240" fill="#111827" opacity="0.3" rx="8" />
    {/* Methylation marks left */}
    <circle cx="110" cy="110" r="40" fill="#1f2937" stroke="#6b7280" strokeWidth="3" />
    <path d="M85 85 L95 95 M125 125 L135 135" stroke="#6b7280" strokeWidth="2" />
    {/* Reprogramming right */}
    <circle cx="220" cy="110" r="38" fill="none" stroke={accentColor} strokeWidth="3" />
    <circle cx="205" cy="95" r="5" fill={accentColor} />
    <circle cx="235" cy="125" r="4" fill={accentColor} />
    <text x="220" y="115" textAnchor="middle" fill={accentColor} fontSize="7">Ca-AKG / NAD</text>
    <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11">Epigenetic Reprogramming</text>
  </svg>
);