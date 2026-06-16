import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HallmarkDetail } from '@/components/library/HallmarkDetail';
import { getHallmarkBySlug, hallmarkLibrary } from '@/lib/hallmarks-library';
import { loadMdx } from '@/lib/mdx';

export function generateStaticParams() {
  return hallmarkLibrary.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hallmark = getHallmarkBySlug(slug);
  if (!hallmark) return { title: 'Not Found' };
  return {
    title: `${hallmark.title} — Hallmark ${hallmark.number} | TNiC Library`,
    description: hallmark.summary,
  };
}

export default async function HallmarkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hallmark = getHallmarkBySlug(slug);
  if (!hallmark) notFound();

  const mdx = loadMdx(hallmark.mdxSlug);

  return <HallmarkDetail hallmark={hallmark} mdxBody={mdx?.body ?? null} />;
}