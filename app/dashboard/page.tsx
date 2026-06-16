import type { Metadata } from 'next';
import Dashboard from '@/components/dashboard/Dashboard';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'My Longevity OS — Personal Dashboard',
  description:
    'Your anti-aging command center: active stack, lab status, quick stack builder, and journey highlights. Local-first — data stays in your browser.',
  alternates: { canonical: `${SITE.url}/dashboard` },
};

export default function DashboardPage() {
  return <Dashboard />;
}