import type { Metadata } from 'next';
import { StarterProtocolGuide } from '@/components/library/StarterProtocolGuide';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildMedicalWebPageSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = buildPageMetadata({
  title: 'Foundation Stack Starter Protocol — Your First 90 Days | TNiC',
  description:
    'A science-backed beginner longevity protocol: three Tier-A compounds, an AM/PM dosing schedule, expected outcomes at 30/60/90 days, and what labs to run. Built from published RCTs.',
  path: '/library/starter-protocol',
  keywords: [
    'longevity supplement starter guide',
    'NMN GlyNAC sulforaphane protocol',
    'foundation stack 90 days',
    'beginner longevity stack',
    'evidence-based supplement protocol',
    'how to start longevity supplements',
  ],
});

export default function StarterProtocolPage() {
  const schemas = [
    buildMedicalWebPageSchema({
      title: 'Foundation Stack: Your First 90-Day Longevity Protocol',
      description:
        'An evidence-graded starter protocol for longevity — three Tier-A compounds with AM/PM dosing schedule, 90-day outcome expectations, and suggested biomarker baselines.',
      path: '/library/starter-protocol',
      evidenceTier: 'A',
    }),
    buildBreadcrumbSchema([
      { name: 'Library', path: '/library' },
      { name: 'Compounds', path: '/library/compounds' },
      { name: 'Starter Protocol', path: '/library/starter-protocol' },
    ]),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <StarterProtocolGuide />
    </>
  );
}
