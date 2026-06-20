import { Suspense } from 'react';
import { LabHub } from '@/components/labs/LabHub';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.labs();

export default function LabsPage() {
  return (
    <Suspense fallback={<SectionSkeleton height="lg" />}>
      <LabHub />
    </Suspense>
  );
}