import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports for performance
const AntiAgingLibrary = dynamic(() => import('@/components/library/AntiAgingLibrary').then(mod => ({ default: mod.AntiAgingLibrary })), { ssr: false });
const LibraryModulesHub = dynamic(() => import('@/components/library/LibraryModulesHub'), { ssr: false });
const LifestylePillarsHub = dynamic(() => import('@/components/library/LifestylePillarsHub'), { ssr: false });
const LibrarySearch = dynamic(() => import('@/components/library/LibrarySearch'), { ssr: false });
const ToolsPromoStrip = dynamic(() => import('@/components/tools/ToolsPromoStrip'), { ssr: false });

const CellularSenescenceVisual = dynamic(() => import('@/components/illustrations/CellularSenescenceVisual').then(mod => ({ default: mod.CellularSenescenceVisual })), { ssr: false });
const LossOfProteostasisVisual = dynamic(() => import('@/components/illustrations/LossOfProteostasisVisual').then(mod => ({ default: mod.LossOfProteostasisVisual })), { ssr: false });

const LibraryFacetFilters = dynamic(() => import('@/components/library/LibraryFacetFilters').then(mod => ({ default: mod.LibraryFacetFilters })), { ssr: false });

const RecommendedNextSteps = dynamic(() => import('@/components/ui/RecommendedNextSteps').then(mod => ({ default: mod.RecommendedNextSteps })), { ssr: false });

export default function LibraryPage() {
  return (
    <>
      <Suspense fallback={<div className="h-12 animate-pulse bg-white/5" />}>
        <LibrarySearch />
      </Suspense>

      <div className="container-page pb-6">
        <Suspense fallback={<div className="h-20 animate-pulse bg-white/5 rounded-xl" />}>
          <LibraryFacetFilters />
        </Suspense>
      </div>

      <AntiAgingLibrary asPageTitle />

      <div className="container-page pb-12">
        <RecommendedNextSteps context="library" />
      </div>

      <section className="container-page py-12 md:py-16 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="text-label text-[var(--accent-cyan)] mb-1.5">VISUAL MECHANISMS</div>
              <h2 className="heading-section">Featured Hallmark Visuals</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CellularSenescenceVisual accentColor="#f472b6" showLabels={true} interactive={false} />
            <LossOfProteostasisVisual accentColor="#67f6ff" showLabels={true} interactive={false} />
          </div>
        </div>
      </section>

      <LifestylePillarsHub />
      <div className="container-page py-8">
        <ToolsPromoStrip headline="Simulate stacks, build protocols, and project healthspan from library modules" />
      </div>
      <LibraryModulesHub />
    </>
  );
}
