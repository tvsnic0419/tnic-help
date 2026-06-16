import { TrustHub } from '@/components/trust/TrustHub';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.trust();

export default function TrustPage() {
  return <TrustHub />;
}