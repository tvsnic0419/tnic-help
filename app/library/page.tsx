import { Suspense } from 'react';
import Link from 'next/link';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { LibraryModulesHub } from '@/components/library/LibraryModulesHub';
import { LifestylePillarsHub } from '@/components/library/LifestylePillarsHub';
import { LibrarySearch } from '@/components/library/LibrarySearch';
import { ToolsPromoStrip } from '@/components/tools/ToolsPromoStrip';
import { StructuredData } from '@/components/seo/StructuredData';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { libraryModules } from '@/lib/library-modules';
import { buildCollectionPageSchema } from '@/lib/seo';
import { seoRoutes } from '@/lib/seo-routes';

// High-detail hallmark visuals
import { CellularSenescenceVisual } from '@/components/illustrations/CellularSenescenceVisual';
import { LossOfProteostasisVisual } from '@/components/illustrations/LossOfProteostasisVisual';

// New faceted filters
import { LibraryFacetFilters } from '@/components/library/LibraryFacetFilters';

// New next steps guidance
import { RecommendedNextSteps } from '@/components/ui/RecommendedNextSteps';

export const metadata = seoRoutes.library();

export default function LibraryPage() {
  const schemas = [
    buildCollectionPageSchema({
      name: 'TNiC Anti-Aging Library',
      description:
        'Searchable longevity library: 12 hallmarks, compounds, synergies, lifestyle guides, and testing protocols. Explore visual mechanisms for each hallmark.',
      path: '/library',
      itemCount: hallmarkLibrary.length + libraryModules.length,
    }),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />

      <Suspense fallback={<SectionSkeleton height="sm" />}>
        <LibrarySearch />
      </Suspense>

      {/* NEW: Visible Faceted Filters */}
      <div className="container-page pb-6">
        <LibraryFacetFilters />
      </div>

      <AntiAgingLibrary asPageTitle />

      {/* NEW: Recommended Next Steps after library exploration */}
      <div className="container-page pb-12">
        <RecommendedNextSteps context="library" />
      </div>

      {/* Featured Hallmark Visuals Section */}
      <section className="container-page py-12 md:py-16 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="text-label text-[var(--accent-cyan)] mb-1.5">VISUAL MECHANISMS</div>
              <h2 className="heading-section">Featured Hallmark Visuals</h2>
              <p className="text-body text-[var(--color-text-secondary)] max-w-prose mt-2">
                Mechanistic clarity for priority hallmarks. Use the filters above to narrow results, then explore detailed visuals and interventions.
              </p>
            </div>
            <Link 
              href="/library" 
              className="inline-flex items-center gap-2 text-sm text-[var(--accent-cyan)] hover:underline group mt-2 md:mt-0"
            >
              Explore all 12 hallmarks 
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CellularSenescenceVisual 
              accentColor="#f472b6" 
              showLabels={true} 
              interactive={true} 
            />
            <LossOfProteostasisVisual 
              accentColor="#67f6ff" 
              showLabels={true} 
              interactive={true} 
            />
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
