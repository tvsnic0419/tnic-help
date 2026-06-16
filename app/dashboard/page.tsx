import Dashboard from '@/components/dashboard/Dashboard';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.dashboard();

export default function DashboardPage() {
  return <Dashboard />;
}