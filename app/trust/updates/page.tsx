import type { Metadata } from 'next';
import { History } from 'lucide-react';
import { TrustPageTemplate } from '@/components/trust/TrustPageTemplate';
import { UpdateHistoryList } from '@/components/trust/UpdateHistoryList';
import { updateHistory } from '@/lib/trust';

export const metadata: Metadata = {
  title: 'Update History — Platform Changelog | TNiC Trust',
  description: 'Public changelog of TNiC features, evidence updates, safety revisions, and content changes.',
};

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