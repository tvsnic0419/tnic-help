import { SubPageLayout } from '@/components/layouts/SubPageLayout';
import { Elite8Hub } from '@/components/elite8/Elite8Hub';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.elite8();

export default function Elite8Page() {
  return (
    <SubPageLayout>
      <Elite8Hub />
    </SubPageLayout>
  );
}