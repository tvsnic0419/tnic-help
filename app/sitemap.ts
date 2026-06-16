import type { MetadataRoute } from 'next';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { getAllModuleParams } from '@/lib/library-modules';
import { toolsRegistry } from '@/lib/registry';
import { SITE } from '@/lib/site';

const BUILD_DATE = new Date('2026-06-16');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/library`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/learn`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.88 },
    { url: `${base}/faq`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/stacks`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/labs`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tools`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/dashboard`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.92 },
    { url: `${base}/quiz`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.94 },
    { url: `${base}/trust`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/trust/methodology`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trust/disclaimers`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trust/journey`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/trust/updates`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.65 },
  ];

  const hallmarkRoutes = hallmarkLibrary.map((h) => ({
    url: `${base}/library/${h.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const moduleRoutes = getAllModuleParams().map(({ category, slug }) => ({
    url: `${base}/library/${category}/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.88,
  }));

  const toolTabRoutes = toolsRegistry.map((t) => ({
    url: `${base}${t.href}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.82,
  }));

  return [...coreRoutes, ...toolTabRoutes, ...hallmarkRoutes, ...moduleRoutes];
}