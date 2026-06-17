import type {
  DisclaimerBlock,
  EvidenceLevel,
  EvidenceTier,
  SourceCitation,
  UpdateHistoryEntry,
} from './types';

/** Evidence tier definitions for tagging system */
export const evidenceTagDefinitions: Record<
  EvidenceTier,
  { label: string; short: string; description: string; criteria: string[]; color: string }
> = {
  A: {
    label: 'Tier A — Clinical Evidence',
    short: 'Clinical',
    description: 'Human randomized or controlled trial with measured biomarker or healthspan outcomes.',
    criteria: [
      'Peer-reviewed human RCT or controlled trial',
      'Measurable outcome reported',
      'Independent replication or multi-trial consensus',
      'Safety profile in human subjects',
    ],
    color: 'emerald',
  },
  B: {
    label: 'Tier B — Mechanistic + Emerging Human',
    short: 'Emerging',
    description: 'Strong mechanistic data with at least one human pharmacokinetic or pilot study.',
    criteria: [
      'Characterized mechanism in human cells/tissue',
      'Human PK or pilot data exists',
      'Consistent preclinical healthspan data',
      'Used in established protocols',
    ],
    color: 'cyan',
  },
  C: {
    label: 'Tier C — Preclinical Only',
    short: 'Preclinical',
    description: 'Animal or in-vitro evidence only. Flagged — not recommended as stack foundation.',
    criteria: [
      'Animal or in-vitro mechanistic evidence',
      'No human longevity outcomes',
      'Included only when mechanism aligns with hallmark',
      'Clearly labeled as preclinical',
    ],
    color: 'amber',
  },
};

/** Content-facing evidence labels — maps to tiers where applicable */
export const evidenceBadgeDefinitions: Record<
  EvidenceLevel,
  { label: string; description: string; tier?: EvidenceTier }
> = {
  Strong: {
    label: 'Strong Evidence',
    description: 'Human RCTs, meta-analyses, or replicated biomarker outcomes.',
    tier: 'A',
  },
  Moderate: {
    label: 'Moderate Evidence',
    description: 'Pilot trials, observational cohorts, or consistent emerging human data.',
    tier: 'B',
  },
  Mechanistic: {
    label: 'Mechanistic Evidence',
    description: 'Well-characterized pathway biology; preclinical or in-vitro primary data.',
    tier: 'C',
  },
  Personal: {
    label: 'Personal Evidence',
    description: 'Founder N=1 log or self-experiment — transparent, not generalizable.',
  },
  Emerging: {
    label: 'Emerging Evidence',
    description: 'Early human signals, single trials, or active research — hypothesis-generating.',
    tier: 'B',
  },
};

export function evidenceLevelFromTier(tier: EvidenceTier): EvidenceLevel {
  const map: Record<EvidenceTier, EvidenceLevel> = {
    A: 'Strong',
    B: 'Moderate',
    C: 'Mechanistic',
  };
  return map[tier];
}

export function evidenceTierFromLevel(level: EvidenceLevel): EvidenceTier | undefined {
  return evidenceBadgeDefinitions[level].tier;
}

export const citationTypeLabels = {
  clinical: 'Clinical Trial',
  review: 'Review',
  preclinical: 'Preclinical',
  guideline: 'Guideline',
  'meta-analysis': 'Meta-Analysis',
} as const;

/** How TNiC handles source citations */
export const citationFramework = {
  principles: [
    {
      title: 'Primary Literature First',
      desc: 'Every compound recommendation traces to PubMed-indexed primary sources — not marketing pages or secondary blogs.',
    },
    {
      title: 'PMID Required for Tier A',
      desc: 'Tier A claims must link to at least one PMID. Tier B requires mechanism citations. Tier C must disclose preclinical-only status.',
    },
    {
      title: 'Dose From Trials, Not Labels',
      desc: 'Dosing ranges derive from published trial protocols, not supplement label marketing doses.',
    },
    {
      title: 'Contradiction Disclosure',
      desc: 'When trials conflict, we note it. Evidence tiers may be downgraded when replication fails.',
    },
    {
      title: 'No Citation Laundering',
      desc: 'Mouse lifespan studies are never presented as human evidence. In-vitro NRF2 data is not called "clinically proven."',
    },
  ],
  formats: [
    { format: 'Inline PMID link', example: 'Kumar et al. 2023 (PMID: 36656670)', use: 'Intervention cards, stack studies' },
    { format: 'Structured citation block', example: 'Author · Journal · Year · DOI/PMID', use: 'Methodology page, compound deep dives' },
    { format: 'Evidence tag + citation pair', example: 'Tier A badge + PubMed link', use: 'All TNiC compound surfaces' },
  ],
};

/** Canonical citation registry */
export const citationRegistry: SourceCitation[] = [
  {
    id: 'c-glynac-2023',
    title: 'Improvement of mitochondrial function in older adults after GlyNAC',
    authors: 'Kumar P et al.',
    journal: 'J Gerontol A Biol Sci Med Sci',
    year: 2023,
    pmid: '36656670',
    type: 'clinical',
    summary: '24-week GlyNAC trial: restored glutathione, reduced oxidative stress, improved mitochondrial function.',
  },
  {
    id: 'c-glynac-2021',
    title: 'GlyNAC supplementation improves glutathione deficiency in aging humans',
    authors: 'Kumar P et al.',
    journal: 'J Gerontol A Biol Sci Med Sci',
    year: 2021,
    pmid: '34129059',
    type: 'clinical',
    summary: 'First human GlyNAC trial establishing glutathione restoration in older adults.',
  },
  {
    id: 'c-nmn-2022',
    title: 'NMN supplementation elevates NAD+ levels in healthy adults',
    authors: 'Fukamizu Y et al.',
    journal: 'GeroScience',
    year: 2022,
    pmid: '36482258',
    type: 'clinical',
    summary: 'Placebo-controlled NMN trial confirming safe NAD+ elevation in humans.',
  },
  {
    id: 'c-akg-2020',
    title: 'Alpha-ketoglutarate extends lifespan in mice',
    authors: 'Asadi Shahmirzadi A et al.',
    journal: 'Cell Metabolism',
    year: 2020,
    pmid: '33027664',
    type: 'preclinical',
    summary: '12–14% median lifespan extension in mice. Preclinical — not human longevity data.',
  },
  {
    id: 'c-sf-2008',
    title: 'Sulforaphane activates Nrf2 and protects against oxidative stress',
    authors: 'Baird L, Dinkova-Kostova AT',
    journal: 'Oncogene',
    year: 2008,
    pmid: '18454171',
    type: 'review',
    summary: 'Foundational NRF2 activation mechanism via KEAP1 modification.',
  },
  {
    id: 'c-resv-2006',
    title: 'Resveratrol improves health and survival of mice on a high-calorie diet',
    authors: 'Baur JA et al.',
    journal: 'Nature',
    year: 2006,
    pmid: '17028500',
    type: 'preclinical',
    summary: 'Landmark sirtuin mouse study. Preclinical — human translation debated.',
  },
  {
    id: 'c-hallmarks-2013',
    title: 'The Hallmarks of Aging',
    authors: 'López-Otín C et al.',
    journal: 'Cell',
    year: 2013,
    pmid: '23746838',
    type: 'review',
    summary: 'Foundational framework for TNiC hallmark mapping (updated 2023).',
  },
  {
    id: 'c-rapa-2011',
    title: 'Rapamycin extends median and maximal lifespan in genetically heterogeneous mice',
    authors: 'Miller RA et al.',
    journal: 'Aging Cell',
    year: 2011,
    pmid: '21276122',
    type: 'preclinical',
    summary: 'Strongest single-compound mouse lifespan data. Off-label human use requires physician supervision.',
  },
];

export const methodologySections = [
  {
    id: 'compound-selection',
    title: 'Compound Selection Methodology',
    steps: [
      { step: '01', title: 'Mechanism First', desc: 'Must target a mapped hallmark or defense pathway. Trend-driven inclusion rejected.' },
      { step: '02', title: 'Bioavailability Verified', desc: 'Formulation must achieve meaningful plasma levels. Inferior forms (racemic ALA, oxide minerals) excluded.' },
      { step: '03', title: 'PubMed Traceable', desc: 'Primary literature required. Marketing claims without citations are rejected.' },
      { step: '04', title: 'Dose-Response Validated', desc: 'Dosing from clinical trials. AM/PM timing from absorption pharmacokinetics.' },
      { step: '05', title: 'Synergy Tested', desc: 'Stack pairs evaluated for pathway overlap and interaction risk before recommendation.' },
    ],
  },
  {
    id: 'evidence-grading',
    title: 'Evidence Grading Process',
    steps: [
      { step: 'A', title: 'Assign Initial Tier', desc: 'Literature review assigns A/B/C based on human vs. preclinical data.' },
      { step: 'B', title: 'Independent Check', desc: 'Second review confirms PMID validity and outcome relevance.' },
      { step: 'C', title: 'Public Labeling', desc: 'Tier displayed on every compound surface. No hidden downgrades.' },
      { step: 'D', title: 'Quarterly Re-Review', desc: 'New trials trigger tier updates. Changes logged in Update History.' },
    ],
  },
  {
    id: 'biomarker-modeling',
    title: 'Biomarker & Bio Age Modeling',
    steps: [
      { step: '01', title: 'Lifestyle Inputs', desc: 'Age, stress, sleep, exercise feed defense pathway priority calculator.' },
      { step: '02', title: 'Stack Boost', desc: 'Selected compounds apply modeled biomarker improvements — clearly labeled as projections.' },
      { step: '03', title: 'Lab Override', desc: 'When users log real lab data in /labs, actual values supersede projections for recommendations.' },
      { step: '04', title: 'Never Diagnostic', desc: 'Modeled biological age is directional only. Not a laboratory diagnostic.' },
    ],
  },
  {
    id: 'conflict-of-interest',
    title: 'Conflict of Interest Policy',
    steps: [
      { step: '01', title: 'No Pay-for-Placement', desc: 'Brands cannot purchase inclusion or tier upgrades.' },
      { step: '02', title: 'Affiliate Disclosure', desc: 'Some links may be affiliate. This never influences evidence tier or ranking.' },
      { step: '03', title: 'No Proprietary Products', desc: 'TNiC does not manufacture supplements. Independent curation only.' },
    ],
  },
];

export const disclaimers: DisclaimerBlock[] = [
  {
    id: 'not-medical-advice',
    title: 'Not Medical Advice',
    severity: 'legal',
    body: 'TNiC is an educational intelligence platform. Nothing on this site constitutes medical advice, diagnosis, or treatment. Always consult a qualified physician before starting, stopping, or modifying any supplement or health protocol.',
    appliesTo: ['All pages', 'Stack exports', 'Lab recommendations'],
  },
  {
    id: 'modeled-projections',
    title: 'Modeled Projections vs. Lab Data',
    severity: 'warning',
    body: 'Biological age estimates, biomarker projections, and synergy scores are algorithmic models — not laboratory diagnostics. Log real lab data in the Lab Hub for data-driven insights. Modeled and measured data are always labeled differently.',
    appliesTo: ['Defense Calculator', 'Biomarker Command', 'Personal Dashboard'],
  },
  {
    id: 'n-equals-1',
    title: 'Personal Journey (N=1)',
    severity: 'info',
    body: 'The TNiC Journey timeline includes founder personal experiments (N=1). Individual results vary enormously. Personal anecdotes are labeled separately from population science and never used to upgrade evidence tiers.',
    appliesTo: ['Journey timeline', 'Blog-style updates'],
  },
  {
    id: 'rx-educational',
    title: 'Prescription Protocols — Educational Only',
    severity: 'warning',
    body: 'Rapamycin, metformin, and other Rx entries in the Stacks Library are educational references for physician discussions. TNiC does not prescribe, source, or recommend self-medication with prescription drugs.',
    appliesTo: ['Rapamycin Combo stack', 'Clinical-tier protocols'],
  },
  {
    id: 'supplement-quality',
    title: 'Third-Party Product Quality',
    severity: 'info',
    body: 'TNiC curates compounds by evidence and mechanism — not by brand endorsement. Product purity, contamination, and label accuracy are the user\'s responsibility. Require COA (Certificate of Analysis) for NMN and other high-risk categories.',
    appliesTo: ['Stack Architect', 'Compound Lab'],
  },
  {
    id: 'data-privacy',
    title: 'Local Data Storage',
    severity: 'info',
    body: 'Stack selections, lab entries, and personal notes are stored in your browser\'s localStorage. TNiC does not transmit this data to servers. Clearing browser data deletes your entries. Export regularly for backup.',
    appliesTo: ['Lab Hub', 'Personal Dashboard', 'Hallmark Notes'],
  },
];

export const updateHistory: UpdateHistoryEntry[] = [
  {
    date: '2026-06-16',
    version: '1.14.0',
    title: 'Sprint 14 — Compare Share Cards & Dashboard Export',
    category: 'feature',
    changes: [
      'Compare share cards — copy link, social snippet, and markdown on all six /library/compare routes',
      'OG-friendly share snippets with opengraph-image URLs in markdown export',
      'Dashboard status export — copy/download markdown + canvas PNG snapshot at #dashboard-status',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.13.0',
    title: 'Sprint 13 — Partner Export & Shop Deep Links',
    category: 'feature',
    changes: [
      'Labs hub Partner JSON export — latest panel as TNiC Partner v1 JSON (round-trip with Partner Beta import)',
      'Shop stack deep links — /shop?stack=starter or compound ids; copy share URL + deep-link confirmation',
      'parseStackParam shared utility — preset keys work site-wide in ?stack= URL hydration',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.12.0',
    title: 'Sprint 12 — Lab Push Notifications & Welcome Email',
    category: 'feature',
    changes: [
      'Lab order push — webhook events log, GET /api/labs/partner/events, auto-poll watcher + browser Notification',
      'Pending orders auto-import on panel.complete without manual status polling',
      'Protocol Brief welcome email on Resend subscribe — issue preview, RSS/JSON links, unsubscribe',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.11.0',
    title: 'Sprint 11 — Live Partner OAuth & Brief Rotation',
    category: 'feature',
    changes: [
      'Longevity Direct live OAuth — env-gated authorize/token/order/status proxy; OAuth callback route',
      'Pending order tracking in Labs hub with status polling; webhook returns order_id on panel.complete',
      'Protocol Brief ISO-week issue rotation in weekly cron send',
      'Signed one-click unsubscribe — GET /api/brief/unsubscribe with HMAC token in Resend digest emails',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.10.0',
    title: 'Sprint 10 — Lab OAuth & Resend Brief',
    category: 'feature',
    changes: [
      'Lab partner OAuth preview — connect demo partner, order panels, auto-import via /api/labs/partner/oauth/* and /order',
      'Partner results webhook at POST /api/labs/partner/webhook with optional LAB_WEBHOOK_SECRET',
      'Native Resend delivery — audience subscribe on POST /api/brief/subscribe; weekly send via GET /api/cron/brief',
      'Vercel Cron (Mondays 09:00 UTC) and .env.example for RESEND_*, CRON_SECRET, LAB_OAUTH_CLIENT_ID',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.9.0',
    title: 'Sprint 9 — Lab Partner Import & Brief Delivery',
    category: 'feature',
    changes: [
      'Lab Partner v1 beta — CSV/JSON import, Partner Beta tab, POST /api/labs/partner-import (stateless normalizer)',
      'Protocol Brief RSS + JSON feeds at /brief/feed.xml and /brief/feed.json',
      'POST /api/brief/subscribe with optional BRIEF_SUBSCRIBE_WEBHOOK_URL for email list forwarding',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.8.0',
    title: 'Sprint 8 — OG Images, Search Index & Brief Subscribe',
    category: 'feature',
    changes: [
      'Social OG images for /library/compare (hub + 6 slugs), /brief, and /shop',
      'Library search indexes comparisons and Protocol Brief headlines; palette lists each compare route',
      'Protocol Brief email subscribe — local preference + mailto at /brief#brief-subscribe',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.7.0',
    title: 'Sprint 7 — Shop, Brief, Contact & Lab Waitlist',
    category: 'feature',
    changes: [
      'Protocol Shop at /shop — stack-filtered buyer verification, preset loader, checklist export',
      'Protocol Brief digest at /brief — six PMID-curated issues linked to library modules',
      'Contact channel at /contact — categorized protocol questions via structured mailto handoff',
      'Lab partner waitlist on /labs#lab-partners — Tier 1 panel preview, Q3 2026 API target',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.6.0',
    title: 'Sprint 6 — Compare, Buyer Guides & Hallmark Tiles',
    category: 'feature',
    changes: [
      'Evidence comparison hub at /library/compare — six head-to-head tables with PMID anchors and verdict rows',
      'Brand-agnostic compound buyer guides on all compound modules (COA, form, RCT doses, red flags)',
      'Homepage hallmark problem tiles — 12-card “target what slows with age” grid with coverage and top interventions',
      'Elevated rapamycin, TUDCA, and testing-and-monitoring MDX to full template standard (decision trees, compare blocks)',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.5.0',
    title: 'Conversion Sprint & Next Up Roadmap',
    category: 'feature',
    changes: [
      'Dedicated /quiz with labeled result actions and Stack Architect handoff (preset, Builder tab, age sync)',
      'Learn hub (/learn) and FAQ (/faq) with full schema; honest indexed PMID counts on trust strip',
      'Next up panel — shipped, in-progress, and planned functional improvements on home, dashboard, and /trust/updates',
      'OG preview cards for home, learn, faq, library, and quiz routes',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.4.0',
    title: 'Trust & Transparency System',
    category: 'feature',
    changes: [
      'Launched /trust hub with evidence tagging, citations framework, methodology, disclaimers, and update history',
      'Reusable EvidenceTag and SourceCitation components across library, stacks, and compounds',
      'Personal journey timeline with N=1 vs. population science labeling',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.3.0',
    title: 'Design System Overhaul',
    category: 'design',
    changes: [
      'Unified typography, spacing, and accessibility tokens (WCAG AA)',
      'PageHeader, TabBar, StatStrip, DataTable primitives',
      'Mobile-optimized hub pages for /labs, /stacks, /library',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.2.0',
    title: 'Lab Analysis & Tracking Hub',
    category: 'feature',
    changes: [
      'Privacy-first lab hub at /labs with CSV import, trend charts, hallmark risk mapping',
      'Stack-aware personalized recommendations from lab data',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.1.0',
    title: 'Stacks & Protocols Library',
    category: 'feature',
    changes: [
      '9 elite pre-built stacks including GlyNAC, SIRT1, Rapamycin combo (educational)',
      'Dynamic stack builder with real-time synergy and contraindication analysis',
      'Comparison table with goal/cost/simplicity filters',
    ],
  },
  {
    date: '2026-06-16',
    version: '1.0.0',
    title: 'Anti-Aging Library Launch',
    category: 'content',
    changes: [
      '12 Hallmarks of Aging with evidence-ranked interventions and MDX deep dives',
      'Intervention explorer with Tier A/B/C filtering',
      'Personal notes integration per hallmark',
    ],
  },
  {
    date: '2026-06-01',
    version: '0.9.0',
    title: 'Platform Core',
    category: 'feature',
    changes: [
      'Stack Architect with synergy scoring and evidence-graded presets',
      'Defense Calculator and biomarker command center',
      'Local-first data persistence (stack, labs, profile)',
    ],
  },
  {
    date: '2025-12-01',
    version: '0.5.0',
    title: 'Evidence Framework Established',
    category: 'evidence',
    changes: [
      'Tier A/B/C grading system defined',
      '6 compounds curated with PubMed traceability',
      'Transparency pledge published',
    ],
  },
];

export function getCitationById(id: string): SourceCitation | undefined {
  return citationRegistry.find((c) => c.id === id);
}

export function getCitationByPmid(pmid: string): SourceCitation | undefined {
  return citationRegistry.find((c) => c.pmid === pmid);
}

export function pubmedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

export function formatCitationShort(c: SourceCitation): string {
  const author = c.authors?.split(' et al')[0] ?? c.journal;
  return `${author} (${c.year})`;
}