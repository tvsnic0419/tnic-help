'use client';

import React from 'react';

interface Props {
  className?: string;
  size?: number;
  accentColor?: string;
}

export const TelomereAttritionVisual: React.FC<Props> = ({ className = '', size = 320, accentColor = '#22d3ee' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Telomere Attrition Hallmark illustration" role="img">
    <rect width="320" height="240" fill="#111827" opacity="0.3" rx="8" />
    {/* Short telomeres left */}
    <rect x="70" y="85" width="60" height="12" rx="2" fill="#1f2937" stroke="#6b7280" strokeWidth="2" />
    <rect x="70" y="105" width="45" height="12" rx="2" fill="#1f2937" stroke="#6b7280" strokeWidth="2" />
    {/* Lengthened right */}
    <rect x="190" y="85" width="80" height="12" rx="2" fill="none" stroke={accentColor} strokeWidth="2.5" />
    <rect x="190" y="105" width="70" height="12" rx="2" fill="none" stroke={accentColor} strokeWidth="2.5" />
    <text x="230" y="115" textAnchor="middle" fill={accentColor} fontSize="7">HRV / Stress Reduction</text>
    <text x="160" y="225" textAnchor="middle" fill="#9ca3af" fontSize="11">Telomere Protection</text>
  </svg>
);