import { Suspense } from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';
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
    <Suspense fallback={<div className="min-h-screen bg-background pt-24 text-center text-muted-foreground">Loading tools…</div>}>
      <ToolsHub />
    </Suspense>
  );
}