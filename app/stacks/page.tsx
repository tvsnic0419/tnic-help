import type { Metadata } from 'next';
import { StacksLibrary } from '@/components/stacks/StacksLibrary';

export const metadata: Metadata = {
  title: 'Stacks & Protocols Library — Elite Longevity Protocols | TNiC',
  description:
    'Interactive stack builder with real-time synergy and contraindication analysis. Pre-built elite protocols: GlyNAC, SIRT1, Rapamycin combos, NRF2 Defense, and more — with dosing, evidence, cost, and monitoring.',
  keywords: [
    'longevity stack',
    'GlyNAC protocol',
    'SIRT1 stack',
    'rapamycin longevity',
    'NMN resveratrol',
    'NRF2 stack',
    'supplement synergy',
    'anti-aging protocol',
  ],
  openGraph: {
    title: 'Elite Stacks & Protocols Library | TNiC',
    description:
      'Build, compare, and export evidence-graded longevity stacks with real-time synergy analysis.',
    type: 'website',
  },
};

export default function StacksPage() {
  return <StacksLibrary />;
}