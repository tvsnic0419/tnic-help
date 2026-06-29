import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports
const AntiAgingLibrary = dynamic(() => import('@/components/library/AntiAgingLibrary').then(mod => ({ default: mod.AntiAgingLibrary })), { ssr: false });
const LibraryModulesHub = dynamic(() => import('@/components/library/LibraryModulesHub'), { ssr: false });
const LifestylePillarsHub = dynamic(() => import('@/components/library/LifestylePillarsHub'), { ssr: false });
const LibrarySearch = dynamic(() => import('@/components/library/LibrarySearch'), { ssr: false });
const ToolsPromoStrip = dynamic(() => import('@/components/tools/ToolsPromoStrip'), { ssr: false });
const LibraryFacetFilters = dynamic(() => import('@/components/library/LibraryFacetFilters').then(mod => ({ default: mod.LibraryFacetFilters })), { ssr: false });
const RecommendedNextSteps = dynamic(() => import('@/components/ui/RecommendedNextSteps').then(mod => ({ default: mod.RecommendedNextSteps })), { ssr: false });

// All 12 visuals (lazy loaded)
const GenomicInstabilityVisual = dynamic(() => import('@/components/illustrations/GenomicInstabilityVisual').then(mod => ({ default: mod.GenomicInstabilityVisual })), { ssr: false });
const TelomereAttritionVisual = dynamic(() => import('@/components/illustrations/TelomereAttritionVisual').then(mod => ({ default: mod.TelomereAttritionVisual })), { ssr: false });
const EpigeneticAlterationsVisual = dynamic(() => import('@/components/illustrations/EpigeneticAlterationsVisual').then(mod => ({ default: mod.EpigeneticAlterationsVisual })), { ssr: false });
const LossOfProteostasisVisual = dynamic(() => import('@/components/illustrations/LossOfProteostasisVisual').then(mod => ({ default: mod.LossOfProteostasisVisual })), { ssr: false });
const DeregulatedNutrientSensingVisual = dynamic(() => import('@/components/illustrations/DeregulatedNutrientSensingVisual').then(mod => ({ default: mod.DeregulatedNutrientSensingVisual })), { ssr: false });
const MitochondrialDysfunctionVisual = dynamic(() => import('@/components/illustrations/MitochondrialDysfunctionVisual').then(mod => ({ default: mod.MitochondrialDysfunctionVisual })), { ssr: false });
const CellularSenescenceVisual = dynamic(() => import('@/components/illustrations/CellularSenescenceVisual').then(mod => ({ default: mod.CellularSenescenceVisual })), { ssr: false });
const StemCellExhaustionVisual = dynamic(() => import('@/components/illustrations/StemCellExhaustionVisual').then(mod => ({ default: mod.StemCellExhaustionVisual })), { ssr: false });
const AlteredIntercellularCommunicationVisual = dynamic(() => import('@/components/illustrations/AlteredIntercellularCommunicationVisual').then(mod => ({ default: mod.AlteredIntercellularCommunicationVisual })), { ssr: false });
const ChronicInflammationVisual = dynamic(() => import('@/components/illustrations/ChronicInflammationVisual').then(mod => ({ default: mod.ChronicInflammationVisual })), { ssr: false });
const DysbiosisVisual = dynamic(() => import('@/components/illustrations/DysbiosisVisual').then(mod => ({ default: mod.DysbiosisVisual })), { ssr: false });
const DisabledMacroautophagyVisual = dynamic(() => import('@/components/illustrations/DisabledMacroautophagyVisual').then(mod => ({ default: mod.DisabledMacroautophagyVisual })), { ssr: false });

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

      {/* Expanded Hallmark Visuals Grid - All 12 */}
      <section className="container-page py-12 md:py-16 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-label text-[var(--accent-cyan)] mb-1.5">COMPLETE VISUAL SYSTEM</div>
              <h2 className="heading-section">All 12 Hallmarks of Aging</h2>
              <p className="text-body text-[var(--color-text-secondary)] max-w-2xl mt-2">
                High-detail mechanistic visualizations for every hallmark. Click to explore related content and interventions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <GenomicInstabilityVisual showLabels={true} interactive={false} />
            <TelomereAttritionVisual showLabels={true} interactive={false} />
            <EpigeneticAlterationsVisual showLabels={true} interactive={false} />
            <LossOfProteostasisVisual showLabels={true} interactive={false} />
            <DeregulatedNutrientSensingVisual showLabels={true} interactive={false} />
            <MitochondrialDysfunctionVisual showLabels={true} interactive={false} />
            <CellularSenescenceVisual showLabels={true} interactive={false} />
            <StemCellExhaustionVisual showLabels={true} interactive={false} />
            <AlteredIntercellularCommunicationVisual showLabels={true} interactive={false} />
            <ChronicInflammationVisual showLabels={true} interactive={false} />
            <DysbiosisVisual showLabels={true} interactive={false} />
            <DisabledMacroautophagyVisual showLabels={true} interactive={false} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              All visuals are part of TNiC’s evidence-based illustration system.
            </p>
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
