import { MetadataRoute } from 'next';

const BASE = 'https://tnic.help';
const NOW = new Date().toISOString();

/**
 * Sprint 26 — Sitemap cleanup:
 * - Removed ?tab= query-param URLs (Google treats them as duplicate signals for /tools)
 * - All URLs are canonical tnic.help paths
 * - Submitted to GSC: https://search.google.com/search-console
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core pages ──────────────────────────────────────────────
    { url: `${BASE}`,                changeFrequency: 'weekly',  priority: 1,    lastModified: NOW },
    { url: `${BASE}/quiz`,           changeFrequency: 'weekly',  priority: 0.95, lastModified: NOW },
    { url: `${BASE}/dashboard`,      changeFrequency: 'weekly',  priority: 0.92, lastModified: NOW },
    { url: `${BASE}/stacks`,         changeFrequency: 'weekly',  priority: 0.90, lastModified: NOW },
    { url: `${BASE}/labs`,           changeFrequency: 'weekly',  priority: 0.90, lastModified: NOW },
    { url: `${BASE}/tools`,          changeFrequency: 'weekly',  priority: 0.90, lastModified: NOW },
    { url: `${BASE}/library`,        changeFrequency: 'weekly',  priority: 0.95, lastModified: NOW },
    { url: `${BASE}/library/compare`,changeFrequency: 'weekly',  priority: 0.90, lastModified: NOW },
    { url: `${BASE}/learn`,          changeFrequency: 'weekly',  priority: 0.88, lastModified: NOW },
    { url: `${BASE}/faq`,            changeFrequency: 'monthly', priority: 0.85, lastModified: NOW },
    { url: `${BASE}/brief`,          changeFrequency: 'weekly',  priority: 0.82, lastModified: NOW },
    { url: `${BASE}/shop`,           changeFrequency: 'monthly', priority: 0.80, lastModified: NOW },
    { url: `${BASE}/contact`,        changeFrequency: 'monthly', priority: 0.60, lastModified: NOW },

    // ── Trust ────────────────────────────────────────────────────
    { url: `${BASE}/trust`,                changeFrequency: 'monthly', priority: 0.85, lastModified: NOW },
    { url: `${BASE}/trust/methodology`,    changeFrequency: 'monthly', priority: 0.75, lastModified: NOW },
    { url: `${BASE}/trust/disclaimers`,    changeFrequency: 'monthly', priority: 0.70, lastModified: NOW },
    { url: `${BASE}/trust/journey`,        changeFrequency: 'monthly', priority: 0.65, lastModified: NOW },
    { url: `${BASE}/trust/updates`,        changeFrequency: 'weekly',  priority: 0.70, lastModified: NOW },

    // ── Quiz share pages (indexable landing pages) ──────────────
    { url: `${BASE}/quiz/share/starter`, changeFrequency: 'monthly', priority: 0.80, lastModified: NOW },
    { url: `${BASE}/quiz/share/nrf2`,    changeFrequency: 'monthly', priority: 0.80, lastModified: NOW },
    { url: `${BASE}/quiz/share/mito`,    changeFrequency: 'monthly', priority: 0.80, lastModified: NOW },
    { url: `${BASE}/quiz/share/hybrid`,  changeFrequency: 'monthly', priority: 0.80, lastModified: NOW },

    // ── 12 Hallmarks of Aging ───────────────────────────────────
    { url: `${BASE}/library/genomic-instability`,              changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/telomere-attrition`,               changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/epigenetic-alterations`,           changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/loss-of-proteostasis`,             changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/disabled-autophagy`,               changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/mitochondrial-dysfunction`,        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/cellular-senescence`,              changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/stem-cell-exhaustion`,             changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/altered-intercellular-communication`, changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/chronic-inflammation`,             changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/dysbiosis`,                        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/disabled-macroautophagy`,          changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/delivery-systems`,                 changeFrequency: 'monthly', priority: 0.84, lastModified: NOW },

    // ── Compound deep-dives (highest-value SEO pages) ───────────
    { url: `${BASE}/library/compounds/glynac`,       changeFrequency: 'monthly', priority: 0.92, lastModified: NOW },
    { url: `${BASE}/library/compounds/nmn`,          changeFrequency: 'monthly', priority: 0.92, lastModified: NOW },
    { url: `${BASE}/library/compounds/nr`,           changeFrequency: 'monthly', priority: 0.90, lastModified: NOW },
    { url: `${BASE}/library/compounds/rapamycin`,    changeFrequency: 'monthly', priority: 0.90, lastModified: NOW },
    { url: `${BASE}/library/compounds/tudca`,        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compounds/sulforaphane`, changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compounds/rala`,         changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compounds/cakg`,         changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compounds/resveratrol`,  changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },

    // ── Head-to-head comparisons ─────────────────────────────────
    { url: `${BASE}/library/compare/nmn-vs-nr`,                       changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compare/glynac-vs-liposomal-glutathione`, changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compare/sulforaphane-vs-curcumin`,        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compare/resveratrol-vs-pterostilbene`,    changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compare/nrf2-triad-vs-mito-stack`,        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/compare/starter-elite-vs-full-hybrid`,    changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },

    // ── Synergy guides ───────────────────────────────────────────
    { url: `${BASE}/library/synergies/glynac-nrf2-triad`,    changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/synergies/nmn-resveratrol-sirt1`,changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/synergies/nad-mito-stack`,        changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },

    // ── Lifestyle ────────────────────────────────────────────────
    { url: `${BASE}/library/lifestyle/exercise`,   changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/lifestyle/sleep`,      changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/lifestyle/nutrition`,  changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },
    { url: `${BASE}/library/lifestyle/stress`,     changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },

    // ── Guides ───────────────────────────────────────────────────
    { url: `${BASE}/library/guides/testing-and-monitoring`, changeFrequency: 'monthly', priority: 0.88, lastModified: NOW },

    // ── Feeds (for feed aggregators, not search) ─────────────────
    { url: `${BASE}/brief/feed.xml`,  changeFrequency: 'weekly', priority: 0.55, lastModified: NOW },
    { url: `${BASE}/brief/feed.json`, changeFrequency: 'weekly', priority: 0.55, lastModified: NOW },
  ];
}
