import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { LibraryModulesHub } from '@/components/library/LibraryModulesHub';
import { ToolsPromoStrip } from '@/components/tools/ToolsPromoStrip';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Anti-Aging Library — Hallmarks, Compounds & Protocols',
  description:
    'Comprehensive longevity library: 12 Hallmarks of Aging, compound deep-dives, synergy guides, lifestyle pillars, and testing protocols with evidence tiers and personal tracking templates.',
  path: '/library',
  keywords: ['hallmarks of aging', 'GlyNAC deep dive', 'longevity library', 'anti-aging education'],
});

export default function LibraryPage() {
  return (
    <>
      <AntiAgingLibrary asPageTitle />
      <div className="container-page py-8">
        <ToolsPromoStrip headline="Simulate stacks, build protocols, and project healthspan from library modules" />
      </div>
      <LibraryModulesHub />
    </>
  );
}