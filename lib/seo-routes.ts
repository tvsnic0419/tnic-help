/**
 * Centralized route metadata for tnic.help (Sprint 4 SEO strategy).
 *
 * Strategy:
 * 1. Every public route exports metadata via buildPageMetadata() from this file.
 * 2. Canonical URLs always use SITE.url + path (no hash URLs in metadata).
 * 3. Library search is implemented at /library?q= — matches WebSite SearchAction JSON-LD.
 * 4. Article pages (hallmarks, modules) add Article + Breadcrumb JSON-LD in page components.
 * 5. Root layout keeps global defaults; route files override title/description/canonical.
 */

import { buildPageMetadata } from './seo';

export const seoRoutes = {
  home: () =>
    buildPageMetadata({
      title: 'TNiC — Your Anti-Aging Operating System',
      description:
        'Free longevity OS: evidence-graded stacks, 12 hallmarks library, local biomarker tracking, and six interactive tools. Initialize your personal command center — data stays in your browser.',
      path: '/',
      keywords: ['longevity OS', 'anti-aging operating system', 'healthspan dashboard', 'hallmarks of aging'],
    }),

  dashboard: () =>
    buildPageMetadata({
      title: 'My Longevity OS — Personal Dashboard',
      description:
        'Your anti-aging command center: active stack, lab status, hallmark coverage, milestones, and export kit. Local-first — data stays in your browser.',
      path: '/dashboard',
      keywords: ['longevity dashboard', 'personal health OS', 'stack tracker'],
    }),

  quiz: () =>
    buildPageMetadata({
      title: '3-Min Starter Quiz — Personalized Longevity Entry Point',
      description:
        'Three quick questions: your goal, age range, and experience. Get an evidence-graded stack preset and your next step in the TNiC Longevity OS.',
      path: '/quiz',
      keywords: ['longevity quiz', 'starter protocol', 'NMN stack quiz', 'personalized supplement stack'],
    }),

  learn: () =>
    buildPageMetadata({
      title: 'Learn Hub — Getting Started, Glossary & Red Flags',
      description:
        'Start here before you stack: 5-step onboarding checklist, longevity glossary, supplement red flags, outcome timelines, and consumer FAQ.',
      path: '/learn',
      keywords: ['longevity FAQ', 'getting started biohacking', 'supplement red flags', 'longevity glossary'],
    }),

  faq: () =>
    buildPageMetadata({
      title: 'FAQ — Longevity Protocol Questions Answered',
      description:
        'Twelve honest answers about TNiC evidence tiers, safety, blood tests, biological age, medications, and how we differ from supplement stores.',
      path: '/faq',
      keywords: ['longevity FAQ', 'NMN safety', 'evidence tier A B C', 'supplement protocol questions'],
    }),

  library: () =>
    buildPageMetadata({
      title: 'Anti-Aging Library — Hallmarks, Compounds & Protocols',
      description:
        'Search and explore the longevity library: 12 Hallmarks of Aging, compound deep-dives, synergy guides, lifestyle pillars, and testing protocols with evidence tiers.',
      path: '/library',
      keywords: ['hallmarks of aging', 'GlyNAC deep dive', 'longevity library', 'anti-aging education'],
    }),

  shop: () =>
    buildPageMetadata({
      title: 'Protocol Shop — Verify Before You Buy',
      description:
        'Stack-filtered supplement verification checklists. COA demands, RCT doses, red flags — TNiC earns $0 from products.',
      path: '/shop',
      keywords: ['supplement buyer guide', 'protocol shop', 'NMN COA'],
    }),

  brief: () =>
    buildPageMetadata({
      title: 'Protocol Brief — Research Digest',
      description: 'PMID-curated longevity research drops tied to TNiC library updates.',
      path: '/brief',
    }),

  contact: () =>
    buildPageMetadata({
      title: 'Contact — Protocol Questions',
      description: 'Structured channel for stack, lab, and library questions. Educational only.',
      path: '/contact',
    }),

  libraryCompare: () =>
    buildPageMetadata({
      title: 'Evidence Comparisons — NMN vs NR & Stack vs Stack',
      description:
        'Neutral head-to-head longevity comparison tables with PMID anchors. Compare compounds, forms, and evidence-graded stacks.',
      path: '/library/compare',
      keywords: ['NMN vs NR', 'longevity comparison', 'stack comparison', 'evidence table'],
    }),

  stacks: () =>
    buildPageMetadata({
      title: 'Stack Architect — Build Evidence-Graded Protocols',
      description:
        'Interactive stack builder with real-time synergy scoring, contraindication checks, and preset protocols: NRF2 Defense, Mitochondrial, and Full Hybrid.',
      path: '/stacks',
      keywords: ['longevity stack', 'GlyNAC protocol', 'NRF2 stack', 'supplement synergy'],
    }),

  labs: () =>
    buildPageMetadata({
      title: 'Lab Hub — Local Biomarker Tracking',
      description:
        'Privacy-first lab tracking. Log biomarkers, visualize trends, get hallmark-linked insights and stack-aware recommendations. All data stays in your browser.',
      path: '/labs',
      keywords: ['biomarker tracking', 'hs-CRP', 'glutathione', 'NAD+', 'longevity labs'],
    }),

  tools: () =>
    buildPageMetadata({
      title: 'Longevity Tools — Simulator, Protocol Engine & Biomarker Dashboard',
      description:
        'Six interactive longevity tools: stack simulator, conflict network, protocol engine, biomarker trends, intervention impact ranking, and healthspan estimator.',
      path: '/tools',
      keywords: ['longevity calculator', 'supplement interaction graph', 'healthspan estimator'],
    }),

  trust: () =>
    buildPageMetadata({
      title: 'Trust & Transparency Hub — Evidence Standards',
      description:
        'TNiC evidence tagging (Tier A/B/C), methodology, disclaimers, founder N=1 journey, and public update history.',
      path: '/trust',
      keywords: ['evidence grading', 'longevity transparency', 'PubMed citations'],
    }),

  trustMethodology: () =>
    buildPageMetadata({
      title: 'Methodology — How TNiC Grades Evidence',
      description: 'Compound selection, evidence grading, biomarker modeling, and conflict of interest policies.',
      path: '/trust/methodology',
    }),

  trustDisclaimers: () =>
    buildPageMetadata({
      title: 'Disclaimers — Legal & Educational Notices',
      description:
        'Medical advice disclaimer, modeled projections notice, N=1 labeling, and data privacy policies.',
      path: '/trust/disclaimers',
    }),

  trustJourney: () =>
    buildPageMetadata({
      title: 'Personal Journey Timeline — N=1 Transparency',
      description:
        'TNiC founder journey with N=1 labeling plus your personal longevity milestones tracked in the dashboard.',
      path: '/trust/journey',
    }),

  trustUpdates: () =>
    buildPageMetadata({
      title: 'Update History — Platform Changelog',
      description: 'Public changelog of TNiC features, evidence updates, safety revisions, and content changes.',
      path: '/trust/updates',
    }),

  hallmark: (input: { title: string; summary: string; slug: string; number: number }) =>
    buildPageMetadata({
      title: `${input.title} — Hallmark ${input.number}`,
      description: input.summary,
      path: `/library/${input.slug}`,
      keywords: [input.title, `hallmark ${input.number}`, 'hallmarks of aging', input.slug],
    }),

  module: (input: { title: string; summary: string; path: string; categoryLabel: string }) =>
    buildPageMetadata({
      title: `${input.title} — ${input.categoryLabel}`,
      description: input.summary,
      path: input.path,
      keywords: [input.title, input.categoryLabel],
    }),
} as const;