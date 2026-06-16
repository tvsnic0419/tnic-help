import { FileText } from 'lucide-react';
import { TrustPageTemplate } from '@/components/trust/TrustPageTemplate';
import { MethodologySection } from '@/components/trust/MethodologySection';
import { EvidenceTagLegend } from '@/components/trust/EvidenceTag';
import { methodologySections } from '@/lib/trust';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.trustMethodology();

export default function MethodologyPage() {
  return (
    <TrustPageTemplate
      icon={FileText}
      eyebrow="Trust · Methodology"
      title="TNiC Methodology"
      description="How compounds are selected, evidence is graded, biomarkers are modeled, and conflicts of interest are managed. Published for full transparency."
    >
      <EvidenceTagLegend className="mb-10" />
      {methodologySections.map((section) => (
        <MethodologySection key={section.id} {...section} />
      ))}
    </TrustPageTemplate>
  );
}