import { Suspense } from 'react';
import { SubPageLayout } from '@/components/layouts/SubPageLayout';
import { LearnPageClient } from '@/components/learn/LearnPageClient';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.learn();

export default function LearnPage() {
  return (
    <SubPageLayout>
      <Suspense fallback={<div className="container-page py-20 text-muted-foreground">Loading…</div>}>
        <LearnPageClient />
      </Suspense>
    </SubPageLayout>
  );
}