import type { Metadata } from 'next';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { LibraryModulesHub } from '@/components/library/LibraryModulesHub';
import { ToolsPromoStrip } from '@/components/tools/ToolsPromoStrip';

export const metadata: Metadata = {
  title: 'Anti-Aging Library — Hallmarks, Compounds & Protocols | TNiC',
  description:
    'Comprehensive longevity library: 12 Hallmarks of Aging, compound deep-dives, synergy guides, lifestyle pillars, and testing protocols with evidence tiers and personal tracking templates.',
};

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