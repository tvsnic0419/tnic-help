import { Suspense } from 'react';
import { StacksLibrary } from '@/components/stacks/StacksLibrary';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.stacks();

export default function StacksPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-muted-foreground">Loading stacks…</div>}>
      <StacksLibrary />
    </Suspense>
  );
}