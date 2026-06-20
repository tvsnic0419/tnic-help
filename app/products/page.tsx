import { SubPageLayout } from '@/components/layouts/SubPageLayout';
import { ProductsHub } from '@/components/shop/ProductsHub';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.products();

export default function ProductsPage() {
  return (
    <SubPageLayout>
      <ProductsHub />
    </SubPageLayout>
  );
}