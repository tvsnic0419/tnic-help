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
        'Free longevity OS: evidence-graded stacks (Tier A/B/C from human trials), 12 Hallmarks of Aging library, local biomarker tracking, and six interactive tools. Your data stays in your browser.',
      path: '/',
      keywords: ['longevity OS', 'anti-aging operating system', 'healthspan dashboard', 'hallmarks of aging', 'evidence-graded supplements'],
    }),

  dashboard: () =>
    buildPageMetadata({
      title: 'My Longevity OS — Personal Dashboard',
      description:
        'Your anti-aging command center: active stack with synergy scores, lab status, hallmark coverage map, outcome milestones, and export kit. Local-first — data never leaves your browser.',
      path: '/dashboard',
      keywords: ['longevity dashboard', 'personal health OS', 'stack tracker', 'hallmark coverage'],
    }),

  quiz: () =>
    buildPageMetadata({
      title: '3-Min Starter Quiz — Personalized Longevity Entry Point',
      description:
        'Three questions: your goal, age range, and experience level. Get a mechanism-matched stack preset, a PMID-cited insight for your age group, and your next step in the TNiC Longevity OS.',
      path: '/quiz',
      keywords: ['longevity quiz', 'starter protocol', 'NMN stack quiz', 'personalized supplement stack', 'NRF2 quiz'],
    }),

  learn: () =>
    buildPageMetadata({
      title: 'Learn Hub — Getting Started, Glossary & Red Flags',
      description:
        'Start here before you stack: 5-step onboarding checklist, 15-term longevity glossary, seven supplement red flags to avoid, outcome timelines, and evidence tier explainer.',
      path: '/learn',
      keywords: ['longevity FAQ', 'getting started biohacking', 'supplement red flags', 'longevity glossary', 'evidence tier A B C'],
    }),

  faq: () =>
    buildPageMetadata({
      title: 'FAQ — Twenty Longevity Protocol Questions Answered',
      description:
        'Twenty honest answers about TNiC evidence tiers, rapamycin safety, epigenetic clocks, sleep and biological aging, daily vs cycling dosing, medications, and how we differ from supplement stores.',
      path: '/faq',
      keywords: ['longevity FAQ', 'NMN safety', 'evidence tier A B C', 'rapamycin longevity', 'epigenetic clock', 'supplement protocol questions'],
    }),

  library: () =>
    buildPageMetadata({
      title: 'Anti-Aging Library — Hallmarks, Compounds & Protocols',
      description:
        'Search and explore the longevity library: 12 Hallmarks of Aging with mechanism maps, compound deep-dives with PMID citations, synergy guides, and testing protocols — all evidence-graded Tier A/B/C.',
      path: '/library',
      keywords: ['hallmarks of aging', 'GlyNAC deep dive', 'longevity library', 'anti-aging education', 'NMN evidence', 'Ca-AKG epigenetic clock'],
    }),

  shop: () =>
    buildPageMetadata({
      title: 'Protocol Shop — Verify Before You Buy',
      description:
        'Stack-filtered supplement verification checklists: COA requirements, clinical trial dose ranges, red flags to reject, and form-specific bioavailability data. TNiC earns $0 from product placement.',
      path: '/shop',
      keywords: ['supplement buyer guide', 'protocol shop', 'NMN COA', 'supplement verification'],
    }),

  brief: () =>
    buildPageMetadata({
      title: 'Protocol Brief — Longevity Research Digest',
      description: 'PMID-curated longevity research drops — breaking trials, updated evidence tiers, and Library additions tied to newly published human data.',
      path: '/brief',
      keywords: ['longevity research', 'PMID digest', 'anti-aging trials', 'protocol brief'],
    }),

  contact: () =>
    buildPageMetadata({
      title: 'Contact — Protocol Questions',
      description: 'Structured channel for stack, lab, and library questions. Educational only — not a medical consultation.',
      path: '/contact',
    }),

  libraryCompare: () =>
    buildPageMetadata({
      title: 'Evidence Comparisons — NMN vs NR & Stack vs Stack',
      description:
        'Neutral head-to-head longevity comparison tables with PMID anchors. Compare NMN vs NR, R-ALA vs racemic ALA, NRF2 stack vs mitochondrial stack — graded by human trial evidence.',
      path: '/library/compare',
      keywords: ['NMN vs NR', 'longevity comparison', 'stack comparison', 'evidence table', 'R-ALA vs ALA'],
    }),

  stacks: () =>
    buildPageMetadata({
      title: 'Stack Architect — Build Evidence-Graded Longevity Protocols',
      description:
        'Interactive stack builder: real-time synergy scoring, hallmark coverage map, contraindication checks, and three preset protocols — NRF2 Defense, Mitochondrial Restoration, and Full Hybrid.',
      path: '/stacks',
      keywords: ['longevity stack', 'GlyNAC protocol', 'NRF2 stack', 'supplement synergy', 'mitochondrial stack', 'NMN stack'],
    }),

  labs: () =>
    buildPageMetadata({
      title: 'Lab Hub — Local Biomarker Tracking',
      description:
        'Privacy-first lab tracking: log glutathione, NAD+ metabolites, hs-CRP, and metabolic markers. Visualize trends, get hallmark-linked retest nudges, and compare against modeled projections. Data stays in your browser.',
      path: '/labs',
      keywords: ['biomarker tracking', 'hs-CRP longevity', 'glutathione test', 'NAD+ levels', 'biological age labs'],
    }),

  tools: () =>
    buildPageMetadata({
      title: 'Longevity Tools — Six Interactive Calculators',
      description:
        'Six free longevity tools: stack simulator, compound interaction network, protocol engine, biomarker trend visualizer, intervention impact ranking, and healthspan estimator. All local — no paywall, no account.',
      path: '/tools',
      keywords: ['longevity calculator', 'supplement interaction graph', 'healthspan estimator', 'biological age calculator'],
    }),

  trust: () =>
    buildPageMetadata({
      title: 'Trust & Transparency Hub — Evidence Standards & Methodology',
      description:
        'TNiC evidence grading (Tier A/B/C), compound selection criteria, biomarker modeling methodology, no-pay-for-placement policy, disclaimers, and public update history.',
      path: '/trust',
      keywords: ['evidence grading', 'longevity transparency', 'PubMed citations', 'supplement methodology'],
    }),

  trustMethodology: () =>
    buildPageMetadata({
      title: 'Methodology — How TNiC Grades Evidence',
      description: 'Five-step compound selection process: mechanism verification, bioavailability confirmation, PubMed traceability, dose-response validation, and synergy assessment. Conflicts of interest policy.',
      path: '/trust/methodology',
    }),

  trustDisclaimers: () =>
    buildPageMetadata({
      title: 'Disclaimers — Legal & Educational Notices',
      description:
        'Medical advice disclaimer, modeled projections labeling, N=1 data policy, affiliate disclosure, and data privacy statement. TNiC is an educational platform — not a medical provider.',
      path: '/trust/disclaimers',
    }),

  trustJourney: () =>
    buildPageMetadata({
      title: 'Personal Journey Timeline — N=1 Transparency',
      description:
        'TNiC founder protocol timeline with N=1 labeling — what was tested, what changed, and what the data showed. Paired with your personal longevity milestone tracker in the dashboard.',
      path: '/trust/journey',
    }),

  trustUpdates: () =>
    buildPageMetadata({
      title: 'Update History — Platform Changelog',
      description: 'Public changelog of TNiC features, evidence tier revisions, safety updates, content additions, and research feed expansions — with dates and reasoning.',
      path: '/trust/updates',
    }),

  hallmark: (input: { title: string; summary: string; slug: string; number: number }) =>
    buildPageMetadata({
      title: `${input.title} — Hallmark ${input.number} of Aging`,
      description: input.summary,
      path: `/library/${input.slug}`,
      keywords: [input.title, `hallmark ${input.number}`, 'hallmarks of aging', input.slug, 'longevity mechanism'],
    }),

  module: (input: { title: string; summary: string; path: string; categoryLabel: string }) =>
    buildPageMetadata({
      title: `${input.title} — ${input.categoryLabel}`,
      description: input.summary,
      path: input.path,
      keywords: [input.title, input.categoryLabel, 'longevity evidence'],
    }),
} as const;
