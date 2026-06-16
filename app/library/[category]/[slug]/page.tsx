import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LibraryModuleDetail } from '@/components/library/LibraryModuleDetail';
import {
  getAllModuleParams,
  getModuleBySlug,
  libraryCategoryMeta,
  type LibraryModuleCategory,
} from '@/lib/library-modules';
import { loadMdx } from '@/lib/mdx';

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
  return {
    title: `${mod.title} — ${libraryCategoryMeta[mod.category].label} | TNiC Library`,
    description: mod.summary,
  };
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

  return <LibraryModuleDetail module={mod} mdxBody={mdx?.body ?? null} />;
}