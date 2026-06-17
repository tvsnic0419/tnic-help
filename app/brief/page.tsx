import { ProtocolBriefHub } from '@/components/brief/ProtocolBriefHub';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Protocol Brief — PMID-Curated Research Digest',
  description:
    'Weekly longevity research drops tied to TNiC library updates. Evidence-first retention — not coupon marketing.',
  path: '/brief',
  keywords: ['longevity research digest', 'NMN study', 'GlyNAC trial', 'protocol brief'],
});

export default function BriefPage() {
  return (
    <div className="container-page py-8 md:py-12 max-w-3xl">
      <ProtocolBriefHub />
    </div>
  );
}