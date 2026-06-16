import { Suspense } from 'react';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.tools();

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