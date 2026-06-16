import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';

export const metadata: Metadata = {
  title: 'Longevity Tools — Stack Simulator, Protocol Builder & More | TNiC',
  description:
    'Interactive longevity tools: advanced supplement stack simulator with synergy scoring, protocol customizer, biomarker impact calculator, and healthspan estimator. Evidence-graded, educational only.',
};

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] pt-24 text-center text-zinc-500">Loading tools…</div>}>
      <ToolsHub />
    </Suspense>
  );
}