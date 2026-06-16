import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LibraryModuleDetail } from '@/components/library/LibraryModuleDetail';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  getAllModuleParams,
  getModuleBySlug,
  getModulePath,
  libraryCategoryMeta,
  type LibraryModuleCategory,
} from '@/lib/library-modules';
import { loadMdx } from '@/lib/mdx';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo';
import { seoRoutes } from '@/lib/seo-routes';

const VALID_CATEGORIES = Object.keys(libraryCategoryMeta) as LibraryModuleCategory[];

export function generateStaticParams() {
  return getAllModuleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.includes(category as LibraryModuleCategory)) return { title: 'Not Found' };
  const mod = getModuleBySlug(category as LibraryModuleCategory, slug);
  if (!mod) return { title: 'Not Found' };
  const path = getModulePath(mod);
  return seoRoutes.module({
    title: mod.title,
    summary: mod.summary,
    path,
    categoryLabel: libraryCategoryMeta[mod.category].label,
  });
}

export default async function LibraryModulePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!VALID_CATEGORIES.includes(category as LibraryModuleCategory)) notFound();

  const mod = getModuleBySlug(category as LibraryModuleCategory, slug);
  if (!mod) notFound();

  const mdx = loadMdx(mod.mdxSlug, mod.category);
  const path = getModulePath(mod);

  const schemas = [
    buildArticleSchema({
      title: mod.title,
      description: mod.summary,
      path,
      dateModified: mdx?.frontmatter.last_updated,
      evidenceTier: mod.evidenceTier,
    }),
    buildBreadcrumbSchema([
      { name: 'Library', path: '/library' },
      { name: libraryCategoryMeta[mod.category].label, path: `/library#content-modules` },
      { name: mod.title, path },
    ]),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <LibraryModuleDetail module={mod} mdxBody={mdx?.body ?? null} />
    </>
  );
}