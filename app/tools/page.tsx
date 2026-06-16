import { Suspense } from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Longevity Tools — Stack Simulator, Protocol Builder & More',
  description:
    'Interactive longevity tools: advanced supplement stack simulator with synergy scoring, protocol customizer, biomarker impact calculator, and healthspan estimator. Evidence-graded, educational only.',
  path: '/tools',
  keywords: ['longevity calculator', 'supplement interaction checker', 'healthspan estimator', 'biomarker impact'],
});

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-24 text-center text-muted-foreground">Loading tools…</div>}>
      <ToolsHub />
    </Suspense>
  );
}