import { ProtocolShopPanel } from '@/components/shop/ProtocolShopPanel';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Protocol Shop — Stack-Filtered Buyer Verification',
  description:
    'Brand-agnostic verification checklists filtered by your active stack. COA demands, RCT dose anchors, red flags — TNiC earns $0 from products.',
  path: '/shop',
  keywords: ['supplement buyer guide', 'NMN COA', 'protocol shop', 'stack verification'],
});

export default function ShopPage() {
  return (
    <div className="container-page py-8 md:py-12 max-w-4xl">
      <ProtocolShopPanel />
    </div>
  );
}