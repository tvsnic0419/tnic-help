import type { Metadata } from 'next';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';

export const metadata: Metadata = {
  title: 'Anti-Aging Library — 12 Hallmarks of Aging | TNiC',
  description:
    'Comprehensive longevity library covering all 12 Hallmarks of Aging with evidence-ranked interventions, visuals, MDX deep dives, and personal notes integration.',
};

export default function LibraryPage() {
  return (
    <div className="pt-8">
      <AntiAgingLibrary />
    </div>
  );
}