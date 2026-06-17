import type { NextUpItem } from './types';

/** Near-term functional improvements — distinct from long-horizon `roadmap` in data.ts */
export const nextUpImprovements: NextUpItem[] = [
  // Shipped (recent)
  {
    id: 'library-batch-2',
    title: 'Full library elevation (12/12 hallmarks)',
    desc: 'All hallmark MDX modules, lifestyle quartet, sulforaphane/resveratrol deep dives, and SIRT1 synergy guide at template standard.',
    status: 'shipped',
    sprint: 'Sprint 4–5',
    href: '/library',
    tags: ['content', 'library'],
  },
  {
    id: 'learn-faq-routes',
    title: 'Learn hub + FAQ routes',
    desc: '/learn (glossary, red flags, getting started) and /faq with full 12-question schema. Footer and nav wired.',
    status: 'shipped',
    sprint: 'Tier 1',
    href: '/learn',
    tags: ['ux', 'seo'],
  },
  {
    id: 'quiz-architect-handoff',
    title: '3-Min Quiz → Stack Architect handoff',
    desc: 'Dedicated /quiz route, labeled result actions, Builder tab auto-open, quiz preset banner, age sync to OS profile.',
    status: 'shipped',
    sprint: 'Sprint 5',
    href: '/quiz',
    tags: ['conversion', 'os'],
  },
  {
    id: 'trust-og-homepage',
    title: 'Homepage trust strip + OG images',
    desc: 'Honest citation counts (indexed PMIDs), six-badge trust row, social preview cards for home/learn/faq/library/quiz.',
    status: 'shipped',
    sprint: 'Tier 1',
    href: '/',
    tags: ['trust', 'seo'],
  },
  {
    id: 'compound-buyer-guides',
    title: 'Brand-agnostic compound buyer guides',
    desc: 'Per-compound COA demands, form requirements, RCT dose anchors, and red flags — embedded on every compound module. No shop bias.',
    status: 'shipped',
    sprint: 'Sprint 6',
    href: '/library/compounds/nmn#buyer-guide',
    tags: ['content', 'compounds'],
  },
  {
    id: 'library-compare',
    title: 'Evidence comparison tables',
    desc: 'Six /library/compare routes — NMN vs NR, GlyNAC vs liposomal GSH, NRF2 vs Mito stacks, and more — neutral tables with PMID anchors.',
    status: 'shipped',
    sprint: 'Sprint 6',
    href: '/library/compare',
    tags: ['library', 'tools'],
  },
  {
    id: 'content-batch-3',
    title: 'Elevate rapamycin, TUDCA, testing guide',
    desc: 'Batch 3 MDX at template standard: Rx decision trees, TUDCA proteostasis depth, testing guide with compare/decision blocks.',
    status: 'shipped',
    sprint: 'Sprint 6',
    href: '/library/guides/testing-and-monitoring',
    tags: ['content'],
  },
  {
    id: 'homepage-hallmark-tiles',
    title: 'Homepage hallmark problem tiles',
    desc: '“Target what slows with age” — 12 hallmark entry cards with coverage bars, top interventions, and MDX links.',
    status: 'shipped',
    sprint: 'Sprint 6',
    href: '/#hallmark-targets',
    tags: ['homepage', 'conversion'],
  },
  // In progress (Sprint 7)
  // Planned
  {
    id: 'protocol-shop',
    title: 'Protocol shop (affiliate, unbiased)',
    desc: 'Curated external product links filtered by your stack dose/form — intelligence layer without inventory conflict.',
    status: 'planned',
    sprint: 'Sprint 7',
    tags: ['commerce', 'trust'],
  },
  {
    id: 'lab-partner-api',
    title: 'Lab test partner integration',
    desc: 'Order-at-home panels with automatic import into Lab Hub — hs-CRP, GSH, NAD+ metabolites.',
    status: 'planned',
    sprint: 'Q3 2026',
    href: '/labs',
    tags: ['labs', 'api'],
  },
  {
    id: 'protocol-brief',
    title: 'Protocol Brief digest',
    desc: 'Weekly PMID-curated research drops tied to library updates — retention without coupon dependency.',
    status: 'planned',
    sprint: 'Sprint 7',
    href: '/trust/updates',
    tags: ['content', 'retention'],
  },
  {
    id: 'contact-protocol-questions',
    title: 'Protocol question channel',
    desc: 'Async human escape hatch — structured contact for stack/lab questions (not medical advice).',
    status: 'planned',
    sprint: 'Sprint 7',
    tags: ['support'],
  },
];

export const nextUpByStatus = {
  shipped: nextUpImprovements.filter((i) => i.status === 'shipped'),
  in_progress: nextUpImprovements.filter((i) => i.status === 'in_progress'),
  planned: nextUpImprovements.filter((i) => i.status === 'planned'),
} as const;

export function getNextUpHighlights(limit = 4): NextUpItem[] {
  const priority = [...nextUpByStatus.in_progress, ...nextUpByStatus.planned];
  return priority.slice(0, limit);
}