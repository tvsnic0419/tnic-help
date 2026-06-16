import type { Metadata } from 'next';
import { LabHub } from '@/components/labs/LabHub';

export const metadata: Metadata = {
  title: 'Lab Analysis & Tracking Hub — Biomarker Intelligence | TNiC',
  description:
    'Privacy-first lab tracking hub. Log biomarkers, visualize trends, get hallmark-linked risk insights and personalized longevity recommendations. All data stays in your browser.',
  keywords: [
    'biomarker tracking',
    'lab analysis',
    'longevity biomarkers',
    'hs-CRP',
    'glutathione',
    'NAD+',
    'healthspan',
    'hallmarks of aging',
  ],
  openGraph: {
    title: 'Lab Analysis & Tracking Hub | TNiC',
    description: 'Track biomarkers locally. Trend charts, hallmark risk mapping, and stack-aware recommendations.',
    type: 'website',
  },
};

export default function LabsPage() {
  return <LabHub />;
}