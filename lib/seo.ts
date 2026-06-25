import type { Metadata } from 'next';
import { consumerFAQ } from './data';
import { SITE, LONGEVITY_KEYWORDS, SOCIAL_PROFILES } from './site';
import type { SourceCitation } from './types';
import { citationRegistry } from './trust';

export function buildPageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    keywords: [...LONGEVITY_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.fullName,
      locale: SITE.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.fullName,
    alternateName: SITE.name,
    description:
      'Evidence-based longevity education with hallmarks library, evidence comparisons, supplement stack tools, biomarker tracking, and PubMed-cited protocols.',
    url: SITE.url,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/library?q={search_term_string}`,
        description:
          'Search hallmarks, compounds, synergy guides, evidence comparisons (e.g. NMN vs NR), and Protocol Brief headlines.',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: 'Independent educational longevity platform — not a medical provider or supplement retailer.',
    sameAs: [...SOCIAL_PROFILES],
  };
}

/** Root layout metadata — canonical URL, RSS discovery, optional Search Console verification */
export function buildRootMetadata(): Metadata {
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SITE.fullName,
      template: `%s | ${SITE.name}`,
    },
    description:
      'Free educational platform for healthspan optimization. Learn the 12 Hallmarks of Aging, build evidence-graded supplement stacks, track biomarkers locally, and access PubMed-cited longevity research.',
    keywords: [...LONGEVITY_KEYWORDS],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    openGraph: {
      title: SITE.fullName,
      description:
        'Authoritative longevity science made accessible. Interactive tools, safety guidance, and PubMed-cited protocols for health-optimized adults.',
      type: 'website',
      locale: SITE.locale,
      siteName: SITE.fullName,
      url: SITE.url,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      creator: SITE.twitter,
      title: SITE.fullName,
      description: 'Evidence-based longevity education, stacks, labs, and interactive tools.',
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: SITE.url,
      types: {
        'application/rss+xml': SITE.briefRssUrl,
      },
    },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: consumerFAQ.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Map compound module slugs to registry citations for JSON-LD */
export function getCompoundCitations(slug: string, compoundId?: string): SourceCitation[] {
  const key = compoundId ?? slug;
  const prefix = `c-${key.replace('cakg', 'akg').replace('sulforaphane', 'sf').replace('resveratrol', 'resv').replace('glynac', 'glynac').replace('rapamycin', 'rapa')}`;
  return citationRegistry.filter((c) => c.id.startsWith(prefix));
}

export function buildMedicalWebPageSchema({
  title,
  description,
  path,
  dateModified,
  evidenceTier,
  citations = [],
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
  evidenceTier?: string;
  citations?: SourceCitation[];
}) {
  const url = `${SITE.url}${path}`;
  const resolvedDate = dateModified ?? new Date().toISOString().split('T')[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    headline: title,
    description,
    url,
    datePublished: resolvedDate,
    dateModified: resolvedDate,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    about: {
      '@type': 'MedicalEntity',
      name: title,
      description: evidenceTier ? `Evidence tier ${evidenceTier} longevity intervention` : undefined,
    },
    isAccessibleForFree: true,
    educationalUse: 'Longevity education — not medical advice',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    citation: citations.map((c) => ({
      '@type': 'ScholarlyArticle',
      name: c.title,
      author: c.authors,
      datePublished: String(c.year),
      isPartOf: { '@type': 'Periodical', name: c.journal },
      identifier: c.pmid
        ? { '@type': 'PropertyValue', propertyID: 'PMID', value: c.pmid }
        : undefined,
      url: c.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/` : undefined,
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  dateModified,
  evidenceTier,
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
  evidenceTier?: string;
}) {
  const resolvedDate = dateModified ?? new Date().toISOString().split('T')[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE.url}${path}`,
    datePublished: resolvedDate,
    dateModified: resolvedDate,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    about: {
      '@type': 'Thing',
      name: 'Longevity Science',
      description: evidenceTier ? `Evidence tier ${evidenceTier}` : undefined,
    },
    isAccessibleForFree: true,
    educationalUse: 'Longevity education — not medical advice',
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TNiC Longevity OS',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Privacy-first longevity operating system: personal dashboard, stack architect, local lab hub, searchable anti-aging library, and six evidence-graded tools.',
    url: SITE.url,
    featureList: [
      'Stack synergy simulator',
      'Protocol recommendation engine',
      'Biomarker trend dashboard',
      'Intervention impact ranking',
      'Healthspan and defense scan',
      'Local-only data with export kit',
    ],
  };
}

export function buildCollectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  itemCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    numberOfItems: input.itemCount,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  };
}

export function buildItemListSchema() {
  const items = [
    { name: 'Anti-Aging Library', path: '/library' },
    { name: 'Stack Architect', path: '/stacks' },
    { name: 'Lab Hub', path: '/labs' },
    { name: 'Longevity Tools', path: '/tools' },
    { name: 'Evidence Comparisons', path: '/library/compare' },
    { name: 'Protocol Shop', path: '/shop' },
    { name: 'Protocol Brief', path: '/brief' },
    { name: '3-Min Starter Quiz', path: '/quiz' },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TNiC Longevity OS — Core Features',
    description: 'Interactive longevity tools, evidence-graded library, and biomarker tracking.',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${SITE.url}${item.path}`,
    })),
  };
}

export function serializeJsonLd(...schemas: object[]) {
  return schemas.map((schema, i) => (
    { key: i, schema }
  ));
}
