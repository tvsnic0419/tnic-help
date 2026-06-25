/** Canonical production URL — apex domain, no trailing slash */
export const CANONICAL_SITE_URL = 'https://tnic.help';

/** Resolve site URL per environment (preview uses deployment URL) */
export function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_ENV === 'production') {
    return CANONICAL_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : CANONICAL_SITE_URL;
}

/** Public profiles — used in Organization JSON-LD sameAs and social metadata */
export const SOCIAL_PROFILES = [
  'https://github.com/tvsnic0419/tnic-help',
  'https://x.com/tnic_help',
] as const;

/** Canonical site configuration — single source for URLs and branding */
export const SITE = {
  name: 'TNiC',
  fullName: 'TNiC — Evidence-Based Longevity Education',
  tagline: 'Longevity Intelligence Platform',
  url: resolveSiteUrl(),
  locale: 'en_US',
  twitter: '@tnic_help',
  contactEmail: 'protocol@tnic.help',
  sameAs: SOCIAL_PROFILES,
  briefRssUrl: `${resolveSiteUrl()}/brief/feed.xml`,
} as const;

export const LONGEVITY_KEYWORDS = [
  // Core identity
  'longevity',
  'healthspan',
  'anti-aging',
  'hallmarks of aging',
  'biological age',
  'biohacking',
  // Compounds
  'NAD+',
  'NMN',
  'GlyNAC',
  'glutathione',
  'NRF2',
  'sulforaphane',
  'resveratrol',
  'Ca-AKG',
  'alpha ketoglutarate',
  'TUDCA',
  'berberine',
  'spermidine',
  'rapamycin longevity',
  // Mechanisms
  'epigenetic clock',
  'mitochondrial health',
  'cellular senescence',
  'mTOR inhibitor',
  'AMPK activation',
  'autophagy',
  'senolytics',
  // Tools / platform
  'supplement stack',
  'longevity protocol',
  'longevity stack builder',
  'supplement interaction checker',
  'biological age calculator',
  'biomarker tracking',
  'privacy health tracker',
  'evidence-graded supplements',
  'longevity tools free',
] as const;
] as const;
