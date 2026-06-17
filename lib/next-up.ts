import type { NextUpItem } from './types';

/** Near-term functional improvements — distinct from long-horizon `roadmap` in data.ts */
export const nextUpImprovements: NextUpItem[] = [
  // Shipped (recent) — condensed highlights
  {
    id: 'library-batch-2',
    title: 'Full library elevation (12/12 hallmarks)',
    desc: 'All hallmark MDX modules at template standard.',
    status: 'shipped',
    sprint: 'Sprint 4–5',
    href: '/library',
    tags: ['content', 'library'],
  },
  {
    id: 'quiz-architect-handoff',
    title: '3-Min Quiz → Stack Architect handoff',
    desc: 'Dedicated /quiz, preset handoff, Builder tab auto-open.',
    status: 'shipped',
    sprint: 'Sprint 5',
    href: '/quiz',
    tags: ['conversion', 'os'],
  },
  {
    id: 'library-compare',
    title: 'Evidence comparison tables',
    desc: 'Six /library/compare routes with PMID anchors.',
    status: 'shipped',
    sprint: 'Sprint 6',
    href: '/library/compare',
    tags: ['library', 'tools'],
  },
  {
    id: 'protocol-shop',
    title: 'Protocol shop (affiliate, unbiased)',
    desc: 'Stack-filtered verification at /shop — zero inventory conflict.',
    status: 'shipped',
    sprint: 'Sprint 7',
    href: '/shop',
    tags: ['commerce', 'trust'],
  },
  {
    id: 'compare-og-sitemap',
    title: 'Compare OG images + search index',
    desc: 'OG cards for compare/brief/shop; library search indexes comparisons.',
    status: 'shipped',
    sprint: 'Sprint 8',
    href: '/library/compare',
    tags: ['seo'],
  },
  {
    id: 'lab-partner-api',
    title: 'Lab partner import (beta)',
    desc: 'Partner v1 CSV/JSON import, POST /api/labs/partner-import, Partner Beta tab on Labs hub.',
    status: 'shipped',
    sprint: 'Sprint 9',
    href: '/labs#partner-import',
    tags: ['labs', 'api'],
  },
  {
    id: 'lab-partner-api-live',
    title: 'Lab partner CSV auto-import API',
    desc: 'Stateless JSON normalizer live; OAuth order-at-home + webhook auto-pull Q3–Q4 2026.',
    status: 'shipped',
    sprint: 'Sprint 9',
    href: '/api/labs/partner-import',
    tags: ['labs', 'api'],
  },
  {
    id: 'brief-email-backend',
    title: 'Protocol Brief automated delivery',
    desc: 'RSS + JSON feeds at /brief/feed.xml; POST /api/brief/subscribe with optional webhook env.',
    status: 'shipped',
    sprint: 'Sprint 9',
    href: '/brief#brief-subscribe',
    tags: ['retention', 'api'],
  },
  {
    id: 'lab-partner-oauth',
    title: 'Lab partner OAuth order flow',
    desc: 'Demo OAuth connect, at-home panel orders, auto-import via /api/labs/partner/order + webhook.',
    status: 'shipped',
    sprint: 'Sprint 10',
    href: '/labs#lab-partner-oauth',
    tags: ['labs', 'api'],
  },
  {
    id: 'brief-resend-delivery',
    title: 'Native weekly email send (Resend)',
    desc: 'Resend audience subscribe + GET /api/cron/brief weekly digest — env-gated on deploy.',
    status: 'shipped',
    sprint: 'Sprint 10',
    href: '/brief#brief-subscribe',
    tags: ['retention', 'api'],
  },
  // Planned
  {
    id: 'lab-partner-live',
    title: 'Longevity Direct live OAuth',
    desc: 'Production partner credentials, real order-at-home fulfillment, and push webhook on panel complete.',
    status: 'planned',
    sprint: 'Sprint 11',
    href: '/labs#lab-partners',
    tags: ['labs', 'api'],
  },
  {
    id: 'brief-digest-rotation',
    title: 'Brief issue rotation + unsubscribe',
    desc: 'Rotate digest issue index weekly in cron; one-click unsubscribe link in Resend emails.',
    status: 'planned',
    sprint: 'Sprint 11',
    href: '/brief',
    tags: ['retention', 'api'],
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