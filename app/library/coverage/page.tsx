import type { Metadata } from 'next';
import { HallmarkCoverageMatrix } from '@/components/library/HallmarkCoverageMatrix';
import { buildPageMetadata } from '@/lib/seo';
import { buildCollectionPageSchema, buildBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = buildPageMetadata({
  title: 'Hallmark × Compound Coverage Matrix — TNiC Library',
  description:
    'Which longevity compounds address which hallmarks of aging? An interactive 12×14 evidence matrix showing tier-A, tier-B compound coverage across all 12 aging hallmarks.',
  path: '/library/coverage',
  keywords: [
    'longevity compound hallmarks',
    'NMN hallmarks addressed',
    'aging hallmarks supplement coverage',
    'compound evidence matrix',
    'longevity protocol hallmarks',
  ],
});

export default function CoveragePage() {
  const schemas = [
    buildCollectionPageSchema({
      name: 'Hallmark × Compound Coverage Matrix',
      description:
        'Interactive coverage matrix showing which evidence-graded longevity compounds address each of the 12 hallmarks of aging.',
      path: '/library/coverage',
      itemCount: 12 * 14,
    }),
    buildBreadcrumbSchema([
      { name: 'Library', path: '/library' },
      { name: 'Compound Coverage', path: '/library/coverage' },
    ]),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <HallmarkCoverageMatrix />
    </>
  );
}
