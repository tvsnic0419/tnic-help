import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://tnic.help';
  const sections = [
    'about', 'learn', 'science', 'trust', 'labs', 'stacks',
    'protocol', 'calculator', 'research', 'journey',
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/library`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/stacks`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/labs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/trust`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/trust/methodology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trust/disclaimers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trust/journey`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/trust/updates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...sections.map((s) => ({
      url: `${base}/#${s}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}