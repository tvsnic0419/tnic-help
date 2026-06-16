import { StacksLibrary } from '@/components/stacks/StacksLibrary';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.stacks();

export default function StacksPage() {
  return <StacksLibrary />;
}