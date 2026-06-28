import type { Metadata } from 'next';
import { CompoundIndex } from '@/components/library/CompoundIndex';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Compound Library — Evidence Reference Guides',
  description:
    'Scientific reference profiles for 14 evidence-graded longevity compounds: mechanism, human trial evidence (PMID-cited), hallmark coverage, synergies, and monitoring biomarkers. Tier A/B/C ranked.',
  path: '/library/compounds',
  keywords: [
    'longevity compounds reference',
    'NMN mechanism evidence',
    'GlyNAC glutathione protocol',
    'sulforaphane NRF2 pathway',
    'evidence-graded supplements',
    'compound deep dive',
  ],
});

export default function CompoundsPage() {
  return <CompoundIndex />;
}
