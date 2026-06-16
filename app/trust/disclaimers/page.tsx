import type { Metadata } from 'next';
import { Eye } from 'lucide-react';
import { TrustPageTemplate } from '@/components/trust/TrustPageTemplate';
import { DisclaimerBanner } from '@/components/trust/DisclaimerBanner';
import { disclaimers } from '@/lib/trust';

export const metadata: Metadata = {
  title: 'Disclaimers — Legal & Educational Notices | TNiC Trust',
  description: 'Medical advice disclaimer, modeled projections notice, N=1 labeling, Rx educational only, and data privacy policies.',
};

export default function DisclaimersPage() {
  return (
    <TrustPageTemplate
      icon={Eye}
      eyebrow="Trust · Disclaimers"
      title="Disclaimers & Notices"
      description="Every limitation of the TNiC platform, clearly stated. Read before building stacks, logging labs, or acting on recommendations."
      disclaimer="These disclaimers apply site-wide. When in doubt, consult a qualified physician."
    >
      <div className="space-y-4">
        {disclaimers.map((d) => (
          <DisclaimerBanner key={d.id} disclaimer={d} showAppliesTo />
        ))}
      </div>
    </TrustPageTemplate>
  );
}