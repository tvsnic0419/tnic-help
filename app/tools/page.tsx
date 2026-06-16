import { Suspense } from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Longevity Tools — Protocol Engine, Stack Network & Biomarker Dashboard',
  description:
    'Five interactive longevity tools: stack simulator, visual conflict network, rule-based protocol engine, biomarker trend dashboard with forecasts, and healthspan estimator. Evidence-graded, educational only.',
  path: '/tools',
  keywords: [
    'longevity calculator',
    'supplement interaction graph',
    'protocol recommendation engine',
    'biomarker trend forecast',
    'healthspan estimator',
  ],
});

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-12">
          <SectionSkeleton height="lg" />
        </div>
      }
    >
      <ToolsHub />
    </Suspense>
  );
}