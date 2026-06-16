import type { Metadata } from 'next';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { LibraryModulesHub } from '@/components/library/LibraryModulesHub';

export const metadata: Metadata = {
  title: 'Anti-Aging Library — Hallmarks, Compounds & Protocols | TNiC',
  description:
    'Comprehensive longevity library: 12 Hallmarks of Aging, compound deep-dives, synergy guides, lifestyle pillars, and testing protocols with evidence tiers and personal tracking templates.',
};

export default function LibraryPage() {
  return (
    <>
      <AntiAgingLibrary asPageTitle />
      <LibraryModulesHub />
    </>
  );
}