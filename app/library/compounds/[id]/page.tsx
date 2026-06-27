import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compounds } from '@/lib/data';
import { loadMdx } from '@/lib/mdx';
import { CompoundDetail } from '@/components/library/CompoundDetail';
import { StructuredData } from '@/components/seo/StructuredData';
import { buildPageMetadata, buildMedicalWebPageSchema, buildBreadcrumbSchema, buildDrugSchema } from '@/lib/seo';
import { COMPOUND_SEO_KEYWORDS } from '@/lib/seo-routes';

export function generateStaticParams() {
  return compounds
    .filter((c) => c.studies.length > 0)
    .map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const compound = compounds.find((c) => c.id === id);
  if (!compound) return { title: 'Not Found' };

  return buildPageMetadata({
    title: `${compound.name} — ${compound.pathway} Reference`,
    description: compound.desc,
    path: `/library/compounds/${compound.id}`,
    keywords: [
      compound.name,
      compound.pathway,
      ...(COMPOUND_SEO_KEYWORDS[compound.id] ?? []),
    ],
  });
}

export default async function CompoundPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const compound = compounds.find((c) => c.id === id);
  if (!compound) notFound();

  const mdx = loadMdx(compound.id, 'compounds');
  const path = `/library/compounds/${compound.id}`;

  const schemas = [
    buildMedicalWebPageSchema({
      title: `${compound.name} — ${compound.pathway}`,
      description: compound.desc,
      path,
      evidenceTier: compound.evidence,
    }),
    buildBreadcrumbSchema([
      { name: 'Library', path: '/library' },
      { name: 'Compounds', path: '/library/compounds' },
      { name: compound.name, path },
    ]),
    buildDrugSchema({
      name: compound.name,
      description: compound.desc,
      pathway: compound.pathway,
      dose: compound.dose,
      path,
      evidenceTier: compound.evidence,
    }),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <CompoundDetail compound={compound} mdxBody={mdx?.body ?? null} />
    </>
  );
}
