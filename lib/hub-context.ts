import type { ThemeAccent } from './design-system';
import type { ToolId } from './registry';
import type { LibraryModule, LibraryModuleCategory } from './library-modules';
import type { HallmarkLibraryEntry } from './types';
import type { EvidenceComparison } from './comparisons';

export interface HubContext {
  what: string;
  why: string;
  next: string;
}

export interface HubContextEntry extends HubContext {
  theme: ThemeAccent;
}

export const hubContexts: Record<
  | 'dashboard'
  | 'stacks'
  | 'labs'
  | 'tools'
  | 'shop'
  | 'brief'
  | 'learn'
  | 'compare'
  | 'quiz'
  | 'library'
  | 'libraryModules',
  HubContextEntry
> = {
  dashboard: {
    theme: 'emerald',
    what: 'Your personal longevity command center — stack status, labs, hallmark coverage, milestones, and export kit in one view.',
    why: 'Fragmented tracking leads to bad decisions. The OS unifies what you are taking, what your labs show, and what to do next.',
    next: 'Complete the onboarding strip, then log baseline labs and load a stack preset from the quiz or Stack Architect.',
  },
  stacks: {
    theme: 'violet',
    what: 'Evidence-graded protocol catalog plus a live stack builder with synergy scoring, interactions, and shareable URLs.',
    why: 'Random supplement lists ignore interactions and evidence tiers. Build stacks with transparent synergy math before you spend.',
    next: 'Start from an elite preset in Catalog, customize in Builder, then verify picks at Protocol Shop.',
  },
  labs: {
    theme: 'rose',
    what: 'Local biomarker logging with trend charts, hallmark risk mapping, and stack-aware recommendations.',
    why: 'Supplements without labs is guessing. Track hs-CRP, GSH, NAD+ index, and related markers to see if your protocol is working.',
    next: 'Log a baseline panel on the Input tab, then check Trends after your second reading — lifestyle modules link here directly.',
  },
  tools: {
    theme: 'violet',
    what: 'Six rule-based calculators — simulator, network graph, protocol engine, biomarker forecasts, impact ranking, and defense scan.',
    why: 'Library knowledge stays abstract until you model it. These tools turn evidence into dose schedules and projected outcomes — locally, no AI black box.',
    next: 'Run the Stack Simulator on your current compounds, then Protocol Engine for a phased plan tied to your goals.',
  },
  shop: {
    theme: 'amber',
    what: 'Stack-filtered buyer verification — COA demands, dose anchors, form requirements, and red flags. TNiC earns $0 from products.',
    why: 'Most longevity sites are affiliate stores in disguise. This is an intelligence checklist, not a catalog — verify before you buy.',
    next: 'Share /shop?stack= with your preset URL, export the checklist, and cross-check against compound deep-dives in the library.',
  },
  brief: {
    theme: 'violet',
    what: 'PMID-curated research digest — weekly issues synced from Research Intel with links to hallmarks, compounds, and stacks.',
    why: 'Headlines without protocol context waste time. Every Brief issue maps studies to actionable TNiC modules.',
    next: 'Read the latest issue, follow protocol links, then subscribe for RSS/JSON feeds or email delivery.',
  },
  learn: {
    theme: 'cyan',
    what: 'Consumer education hub — getting started path, glossary, outcome timelines, red flags, and 15 curated FAQ answers.',
    why: 'Intelligent consumers ask hard questions first. Learn the science and safety rails before building a stack.',
    next: 'Complete the Start Here checklist, read Red Flags, then take the 3-min quiz for a personalized stack handoff.',
  },
  compare: {
    theme: 'cyan',
    what: 'Neutral head-to-head evidence tables — compounds, stacks, and delivery forms with PMID anchors and honest gap rows.',
    why: 'Marketing comparisons hide preclinical-only data. TNiC tables show what human trials actually say — and what they do not.',
    next: 'Pick the comparison matching your decision (e.g. NMN vs NR), then open linked compound modules and buyer guides.',
  },
  quiz: {
    theme: 'emerald',
    what: 'A 3-question intake that maps your goal, age window, and experience to an evidence-graded stack preset.',
    why: 'One-size-fits-all stacks fail. The quiz routes beginners to fundamentals and advanced users to compare-and-stack paths.',
    next: 'Answer all three questions, load your preset in Stack Architect, and open your OS dashboard to track progress.',
  },
  library: {
    theme: 'emerald',
    what: 'The 12 Hallmarks of Aging — each with visuals, ranked interventions, PubMed citations, and personal notes.',
    why: 'Longevity science is organized by biological problems, not brand names. Start from the hallmark that matches your symptoms.',
    next: 'Select your primary hallmark, review top interventions, then open linked compound or lifestyle modules.',
  },
  libraryModules: {
    theme: 'emerald',
    what: '26 evidence-graded MDX modules — compounds, synergies, lifestyle pillars, and testing guides with personal tracking templates.',
    why: 'Shallow blog posts cannot support protocol decisions. Every module includes dosing, monitoring, decision trees, and PMID citations.',
    next: 'Search by compound or hallmark, read the decision tree, then log relevant labs and add compounds to your stack.',
  },
};

const toolContexts: Record<ToolId, HubContext> = {
  simulator: {
    what: 'Live synergy scoring and pair-level interaction checks for your selected compounds.',
    why: 'Two safe compounds together can still conflict. See the math before you commit to a daily protocol.',
    next: 'Add compounds from Stack Architect, review the risk index, then export or share your stack URL.',
  },
  network: {
    what: 'Interactive graph of compound synergies, cautions, and contraindication edges.',
    why: 'Linear stack lists hide network effects. Visualize how NAD+, NRF2, and mTOR pathways interact.',
    next: 'Identify red edges first, remove conflicting pairs, then re-run the Simulator for an updated score.',
  },
  protocol: {
    what: 'Rule-based multi-phase protocol planner from goals, labs, and lifestyle inputs.',
    why: 'Phased ramp-in prevents overwhelm and catches interactions early. Full reasoning trace — not generative AI.',
    next: 'Enter your quiz goal and lab snapshot, review phase 1 compounds, then load into Stack Architect.',
  },
  biomarker: {
    what: 'Lab trend visualization with intervention impact forecasts and ranked scenarios.',
    why: 'Single lab values lie — trends tell the story. Models use published effect sizes with clear disclaimers.',
    next: 'Import labs from Lab Hub, pick a target marker, and compare forecast scenarios side by side.',
  },
  impact: {
    what: 'Ranks which interventions in your stack likely move each biomarker most.',
    why: 'When multiple compounds affect the same marker, prioritization matters for retest timing and spend.',
    next: 'Select your highest watch marker from Labs, then adjust stack order based on impact ranking.',
  },
  healthspan: {
    what: 'Lifestyle-based biological age estimate and antioxidant defense scan — sets your OS profile locally.',
    why: 'Subjective wellness needs a baseline. The scan anchors your dashboard bio-age and defense score.',
    next: 'Complete the scan, review your OS profile on the dashboard, then fix sleep and exercise pillars first.',
  },
};

const moduleCategoryDefaults: Record<LibraryModuleCategory, HubContext> = {
  compounds: {
    what: 'A deep-dive module covering mechanism, human evidence tier, dosing protocol, monitoring checklist, and personal results template.',
    why: 'Compound marketing hides preclinical-only claims. TNiC grades every statement and links PMIDs you can verify.',
    next: 'Read the decision tree, log baseline labs from the monitoring table, then verify buyer picks at Protocol Shop.',
  },
  synergies: {
    what: 'A multi-compound synergy guide with mechanistic rationale, timing choreography, and contraindication notes.',
    why: 'Stacks fail from timing and pathway conflicts, not just ingredient choice. Synergy guides choreograph the full day.',
    next: 'Load the stack preset in Architect, run Simulator for interaction checks, then track combined biomarkers in Labs.',
  },
  lifestyle: {
    what: 'An evidence-graded lifestyle protocol with hallmark mapping, decision tree, lab tie-ins, and wearable signals.',
    why: 'Lifestyle provides the signal; supplements provide substrate. Fix pillars before escalating compound spend.',
    next: 'Follow the week-one implementation block, log labs at baseline, then revisit stack decisions after 4–8 weeks.',
  },
  guides: {
    what: 'A testing and monitoring roadmap — what to order, retest cadence, trend interpretation, and stack-adjustment triggers.',
    why: 'Expensive panels without context waste money. Guides tie each marker to hallmarks and protocol decisions.',
    next: 'Order the baseline panel, log results in Lab Hub, and set retest reminders from the cadence table.',
  },
};

const moduleSlugOverrides: Partial<Record<string, Partial<HubContext>>> = {
  nmn: {
    next: 'Compare NMN vs NR table first if undecided, then verify Tru Niagen or NMN form at /shop?stack=mito.',
  },
  nr: {
    next: 'Read NMN vs NR compare, then open /shop?stack=nr for NR-Cl verification checklist.',
  },
  glynac: {
    next: 'Pair with NRF2 Triad synergy guide, log GSH and 8-OHdG in Labs, verify glycine/NAC forms at shop.',
  },
  'nad-mito-stack': {
    next: 'Ramp Ca-AKG per module schedule, simulate full stack in Tools, log NAD+ index at 12 weeks.',
  },
  rapamycin: {
    what: 'Educational deep-dive on mTORC1 inhibition — prescription-only, physician-supervised contexts only.',
    why: 'Rapamycin has the strongest preclinical lifespan data but serious immunosuppressive risks. This module is for informed physician discussions.',
    next: 'Complete physician checklist in module, do not self-source — read disclaimers before any discussion.',
  },
};

export function getHubContext(
  key: keyof typeof hubContexts,
): HubContextEntry {
  return hubContexts[key];
}

export function getToolContext(toolId: ToolId): HubContext {
  return toolContexts[toolId];
}

export function getModuleContext(module: LibraryModule): HubContext {
  const base = moduleCategoryDefaults[module.category];
  const override = moduleSlugOverrides[module.slug];
  return {
    what: override?.what ?? `${base.what} (${module.title})`,
    why: override?.why ?? `${module.summary.slice(0, 140)}…`,
    next: override?.next ?? base.next,
  };
}

export function getHallmarkContext(hallmark: HallmarkLibraryEntry): HubContext {
  const top = hallmark.interventions[0];
  return {
    what: `Hallmark #${hallmark.number} of 12 — ${hallmark.title}: ${hallmark.tagline}`,
    why: hallmark.whyItMatters,
    next: top
      ? `Top intervention: ${top.name} (Tier ${top.evidence}). Open linked module, add to stack, log ${hallmark.biomarkers.slice(0, 2).join(' or ') || 'relevant markers'} in Labs.`
      : 'Review ranked interventions below, then open linked library modules.',
  };
}

export function getCompareContext(comp: EvidenceComparison): HubContext {
  return {
    what: `Head-to-head evidence table: ${comp.labelA} vs ${comp.labelB} (${comp.category}).`,
    why: comp.summary,
    next:
      comp.category === 'compound'
        ? `Use the verdict row to pick a primary compound, then open both deep-dives and /shop verification checklists.`
        : `Load the winning stack preset in Architect and simulate interactions before purchasing.`,
  };
}