import type { EvidenceTier } from './types';

export type LibraryModuleCategory = 'compounds' | 'synergies' | 'lifestyle' | 'guides';

export interface LibraryModule {
  slug: string;
  category: LibraryModuleCategory;
  title: string;
  tagline: string;
  summary: string;
  evidenceTier: EvidenceTier;
  relatedHallmarkIds: string[];
  compoundId?: string;
  synergyCompoundIds?: string[];
  relatedSynergySlugs?: string[];
  requiresDisclaimer?: boolean;
  outline: string[];
  mdxSlug: string;
}

export const libraryCategoryMeta: Record<
  LibraryModuleCategory,
  { label: string; description: string; hubOrder: number }
> = {
  compounds: {
    label: 'Compound Deep-Dives',
    description:
      'Mechanism, evidence tiers, dosing protocols, monitoring checklists, and personal results templates for each intervention.',
    hubOrder: 1,
  },
  synergies: {
    label: 'Synergy Guides',
    description:
      'Multi-compound combinations with mechanistic rationale, trial data, timing choreography, and contraindication notes.',
    hubOrder: 2,
  },
  lifestyle: {
    label: 'Lifestyle Pillars',
    description:
      'Exercise, sleep, nutrition, and stress — mapped to hallmarks with actionable protocols and biomarker tie-ins.',
    hubOrder: 3,
  },
  guides: {
    label: 'Testing & Monitoring',
    description:
      'What to test, when to retest, how to interpret trends, and how lab data connects to your stack.',
    hubOrder: 4,
  },
};

export const libraryModules: LibraryModule[] = [
  // ── Compounds ──────────────────────────────────────────────────────────────
  {
    slug: 'glynac',
    category: 'compounds',
    title: 'GlyNAC (Glycine + NAC)',
    tagline: 'Flagship glutathione restoration — human RCT backbone',
    summary:
      'Dual-precursor strategy rebuilding the glutathione triad (GSH, cysteine, glycine). Tier A human data for oxidative stress, mitochondrial function, and inflammaging markers.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['mito', 'proteostasis', 'inflammation', 'genomic'],
    compoundId: 'glynac',
    relatedSynergySlugs: ['glynac-nrf2-triad'],
    outline: [
      'Overview & hallmark mapping',
      'Mechanism: GSH synthesis bottleneck',
      'Evidence summary (Kumar et al. RCTs)',
      'Dosing protocol (AM/PM, cycling)',
      'Monitoring: GSH, 8-OHdG, hs-CRP',
      'Safety & contraindications',
      'Personal results template',
    ],
    mdxSlug: 'glynac',
  },
  {
    slug: 'nmn',
    category: 'compounds',
    title: 'NMN (Nicotinamide Mononucleotide)',
    tagline: 'NAD+ precursor — sirtuin and PARP fuel',
    summary:
      'Direct NAD+ precursor bypassing NAMPT rate-limiting step. Restores NAD+ pools that decline ~50% between ages 40–60, activating SIRT1/3, DNA repair, and mitophagy.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['mito', 'genomic', 'epigenetic', 'senescence', 'nutrient'],
    compoundId: 'nmn',
    relatedSynergySlugs: ['nmn-resveratrol-sirt1', 'nad-mito-stack'],
    outline: [
      'Overview & NAD+ decline curve',
      'Mechanism: NMN → NAD+ → SIRT/PARP axis',
      'Evidence summary (human PK + biomarkers)',
      'Dosing protocol & resveratrol pairing',
      'Monitoring: NAD+ index, metabolic markers',
      'Safety & methyl donor considerations',
      'Personal results template',
    ],
    mdxSlug: 'nmn',
  },
  {
    slug: 'rapamycin',
    category: 'compounds',
    title: 'Rapamycin (Sirolimus)',
    tagline: 'mTORC1 inhibition — strongest preclinical lifespan drug',
    summary:
      'Educational deep-dive on the most replicated lifespan-extending pharmacological intervention. Prescription-only; immunosuppressive risks require physician oversight.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['autophagy', 'nutrient', 'senescence', 'mito'],
    requiresDisclaimer: true,
    relatedSynergySlugs: [],
    outline: [
      'Overview & mTOR/AMPK balance',
      'Mechanism: mTORC1 → autophagy induction',
      'Evidence: mouse, dog, PEARL trial',
      'Dosing paradigms (pulse vs continuous)',
      'Monitoring: CBC, lipids, infection vigilance',
      'Safety & Rx-only disclaimer',
      'Personal results template (physician-supervised)',
    ],
    mdxSlug: 'rapamycin',
  },
  {
    slug: 'tudca',
    category: 'compounds',
    title: 'TUDCA (Tauroursodeoxycholic Acid)',
    tagline: 'ER stress chaperone — proteostasis & mitochondrial support',
    summary:
      'Bile acid derivative stabilizing protein folding, reducing ER stress, and supporting mitochondrial membrane integrity. Strong preclinical data; emerging human hepatoprotection studies.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['proteostasis', 'mito', 'autophagy'],
    relatedSynergySlugs: [],
    outline: [
      'Overview & proteostasis link',
      'Mechanism: UPR modulation & chaperone activity',
      'Evidence summary (preclinical + pilot human)',
      'Dosing protocol',
      'Monitoring: liver panel, GGT',
      'Safety & GI considerations',
      'Personal results template',
    ],
    mdxSlug: 'tudca',
  },
  {
    slug: 'sulforaphane',
    category: 'compounds',
    title: 'Sulforaphane',
    tagline: 'NRF2 master regulator — 200+ cytoprotective genes',
    summary:
      'Isothiocyanate from broccoli sprouts that covalently modifies KEAP1, releasing NRF2 to drive phase-II detox, proteasome upregulation, and anti-inflammatory gene expression.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['genomic', 'inflammation', 'proteostasis'],
    compoundId: 'sulforaphane',
    relatedSynergySlugs: ['glynac-nrf2-triad'],
    outline: [
      'Overview & NRF2 pathway',
      'Mechanism: KEAP1 modification',
      'Evidence summary',
      'Dosing & myrosinase activation',
      'Monitoring',
      'Personal results template',
    ],
    mdxSlug: 'sulforaphane',
  },
  {
    slug: 'resveratrol',
    category: 'compounds',
    title: 'Trans-Resveratrol',
    tagline: 'SIRT1 activator — caloric restriction mimetic',
    summary:
      'Phytoalexin activating SIRT1 and AMPK. Synergistic with NAD+ precursors for epigenetic and mitochondrial remodeling. Tier B — strong mechanism, mixed human outcomes.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['mito', 'epigenetic', 'inflammation', 'senescence'],
    compoundId: 'resveratrol',
    relatedSynergySlugs: ['nmn-resveratrol-sirt1', 'nad-mito-stack'],
    outline: [
      'Overview & SIRT1 axis',
      'Mechanism & bioavailability',
      'Evidence summary',
      'Dosing & NMN pairing (PM timing)',
      'Monitoring',
      'Personal results template',
    ],
    mdxSlug: 'resveratrol',
  },

  // ── Synergies ──────────────────────────────────────────────────────────────
  {
    slug: 'glynac-nrf2-triad',
    category: 'synergies',
    title: 'NRF2 Defense Triad',
    tagline: 'GlyNAC + Sulforaphane + R-ALA',
    summary:
      'The foundational TNiC NRF2 stack: glutathione substrate (GlyNAC), gene transcription (sulforaphane), and redox recycling (R-ALA) — three layers of antioxidant defense.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['genomic', 'mito', 'proteostasis', 'inflammation'],
    synergyCompoundIds: ['glynac', 'sulforaphane', 'rala'],
    outline: [
      'Rationale: substrate + signal + recycle',
      'Mechanistic synergy map',
      'Evidence per compound + combination logic',
      'AM choreography & spacing',
      'Biomarker targets (GSH, oxLDL)',
      'Contraindications',
    ],
    mdxSlug: 'glynac-nrf2-triad',
  },
  {
    slug: 'nmn-resveratrol-sirt1',
    category: 'synergies',
    title: 'SIRT1 Activation Pair',
    tagline: 'NMN + Trans-Resveratrol',
    summary:
      'NAD+ provides the fuel; resveratrol activates the enzyme. Combined SIRT1 signaling drives mitochondrial biogenesis, epigenetic stability, and senescence resistance.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['mito', 'epigenetic', 'senescence', 'nutrient'],
    synergyCompoundIds: ['nmn', 'resveratrol'],
    outline: [
      'Rationale: cofactor + activator',
      'SIRT1 mechanism deep-dive',
      'Trial data & PK considerations',
      'AM NMN / PM resveratrol timing',
      'Monitoring: NAD+ index',
      'When to skip resveratrol',
    ],
    mdxSlug: 'nmn-resveratrol-sirt1',
  },
  {
    slug: 'nad-mito-stack',
    category: 'synergies',
    title: 'NAD+ Mitochondrial Stack',
    tagline: 'NMN + Ca-AKG + Resveratrol',
    summary:
      'Triple-axis mitochondrial support: NAD+ restoration (NMN), TCA cycle & epigenetic cofactor (Ca-AKG), and sirtuin-driven biogenesis (resveratrol). Highest hallmark coverage combo.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['mito', 'epigenetic', 'stem', 'genomic'],
    synergyCompoundIds: ['nmn', 'cakg', 'resveratrol'],
    outline: [
      'Rationale: energy + epigenetics + biogenesis',
      'Hallmark coverage matrix',
      'Evidence per leg',
      'Full-day dosing schedule',
      'Biomarker panel (NAD+, AKG)',
      'Cost & simplicity tiers',
    ],
    mdxSlug: 'nad-mito-stack',
  },

  // ── Lifestyle ──────────────────────────────────────────────────────────────
  {
    slug: 'exercise',
    category: 'lifestyle',
    title: 'Exercise',
    tagline: 'The intervention no compound can replace',
    summary:
      'Zone 2 aerobic base, resistance training, and VO2max work — mapped to mitochondrial biogenesis, senescence clearance, telomere maintenance, and nutrient sensing.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['mito', 'senescence', 'telomeres', 'nutrient', 'inflammation', 'stem'],
    outline: [
      'Hallmark mapping table',
      'Zone 2 vs HIIT vs resistance',
      'Weekly protocol template',
      'Biomarker proxies (HRV, RHR)',
      'Stack synergy (exercise + NMN)',
      'Personal tracking template',
    ],
    mdxSlug: 'exercise',
  },
  {
    slug: 'sleep',
    category: 'lifestyle',
    title: 'Sleep',
    tagline: 'When repair happens — glymphatic, DNA, hormonal',
    summary:
      '7–9 hours with adequate slow-wave and REM sleep drives DNA repair, glymphatic clearance, growth hormone release, and cortisol normalization. Non-negotiable longevity pillar.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['genomic', 'proteostasis', 'inflammation', 'telomeres', 'communication'],
    outline: [
      'Hallmark mapping table',
      'Sleep architecture & repair windows',
      'Protocol: timing, light, temperature',
      'Wearable metrics to track',
      'Interaction with PM compounds',
      'Personal tracking template',
    ],
    mdxSlug: 'sleep',
  },
  {
    slug: 'nutrition',
    category: 'lifestyle',
    title: 'Nutrition',
    tagline: 'Methyl donors, protein thresholds, and nutrient sensing',
    summary:
      'Protein adequacy for glycine/NAC synthesis, methyl donor support (B12, folate, choline), time-restricted eating, and low-glycemic patterns that modulate mTOR/AMPK.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['nutrient', 'epigenetic', 'dysbiosis', 'inflammation', 'autophagy'],
    outline: [
      'Hallmark mapping table',
      'Macro framework (protein, fiber, polyphenols)',
      'Methyl donor checklist',
      'TRE / fasting-mimicking overview',
      'Food-compound synergy (broccoli sprouts)',
      'Personal tracking template',
    ],
    mdxSlug: 'nutrition',
  },
  {
    slug: 'stress',
    category: 'lifestyle',
    title: 'Stress & Recovery',
    tagline: 'Cortisol, HPA axis, and inflammaging acceleration',
    summary:
      'Chronic stress accelerates telomere attrition, elevates hs-CRP, impairs sleep architecture, and diverts resources from repair to survival signaling.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['telomeres', 'inflammation', 'communication', 'genomic', 'senescence'],
    outline: [
      'Hallmark mapping table',
      'HPA axis & cortisol curve',
      'HRV training & breathwork protocols',
      'Stress-compound interactions',
      'Biomarker markers (hs-CRP, cortisol)',
      'Personal tracking template',
    ],
    mdxSlug: 'stress',
  },

  // ── Guides ──────────────────────────────────────────────────────────────
  {
    slug: 'testing-and-monitoring',
    category: 'guides',
    title: 'Testing & Monitoring Guide',
    tagline: 'What to test, when, and how to interpret',
    summary:
      'Comprehensive lab panel roadmap tied to TNiC biomarkers, hallmark risks, retest cadence, trend interpretation, and stack-adjustment triggers.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['genomic', 'mito', 'inflammation', 'epigenetic', 'proteostasis'],
    outline: [
      'Tier 1 baseline panel',
      'Tier 2 advanced panel',
      'Retest cadence matrix',
      'Interpretation playbook',
      'When to adjust your stack',
      'CSV upload & Labs hub integration',
    ],
    mdxSlug: 'testing-and-monitoring',
  },
];

export function getModuleBySlug(category: LibraryModuleCategory, slug: string): LibraryModule | undefined {
  return libraryModules.find((m) => m.category === category && m.slug === slug);
}

export function getModulesByCategory(category: LibraryModuleCategory): LibraryModule[] {
  return libraryModules.filter((m) => m.category === category);
}

export function getAllModuleParams(): { category: LibraryModuleCategory; slug: string }[] {
  return libraryModules.map((m) => ({ category: m.category, slug: m.slug }));
}

export function getModulePath(module: LibraryModule): string {
  return `/library/${module.category}/${module.slug}`;
}