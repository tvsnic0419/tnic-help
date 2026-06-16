import { Suspense } from 'react';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { LibraryModulesHub } from '@/components/library/LibraryModulesHub';
import { LibrarySearch } from '@/components/library/LibrarySearch';
import { ToolsPromoStrip } from '@/components/tools/ToolsPromoStrip';
import { StructuredData } from '@/components/seo/StructuredData';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { libraryModules } from '@/lib/library-modules';
import { buildCollectionPageSchema } from '@/lib/seo';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.library();

export default function LibraryPage() {
  const schemas = [
    buildCollectionPageSchema({
      name: 'TNiC Anti-Aging Library',
      description:
        'Searchable longevity library: 12 hallmarks, compounds, synergies, lifestyle guides, and testing protocols.',
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
      <AntiAgingLibrary asPageTitle />
      <div className="container-page py-8">
        <ToolsPromoStrip headline="Simulate stacks, build protocols, and project healthspan from library modules" />
      </div>
      <LibraryModulesHub />
    </>
  );
}