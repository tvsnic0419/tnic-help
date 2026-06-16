import { History } from 'lucide-react';
import { TrustPageTemplate } from '@/components/trust/TrustPageTemplate';
import { UpdateHistoryList } from '@/components/trust/UpdateHistoryList';
import { updateHistory } from '@/lib/trust';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.trustUpdates();

export default function UpdatesPage() {
  return (
    <TrustPageTemplate
      icon={History}
      eyebrow="Trust · Changelog"
      title="Update History"
      description="Every significant platform change is logged here. Evidence tier revisions and safety updates are never silent."
    >
      <UpdateHistoryList entries={updateHistory} />
    </TrustPageTemplate>
  );
}