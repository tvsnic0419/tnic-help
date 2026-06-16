import { LabHub } from '@/components/labs/LabHub';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.labs();

export default function LabsPage() {
  return <LabHub />;
}