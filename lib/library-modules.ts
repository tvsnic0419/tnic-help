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
    slug: 'nr',
    category: 'compounds',
    title: 'NR (Nicotinamide Riboside)',
    tagline: 'NAD+ precursor alternative — human RCT data, manual stack substitution',
    summary:
      'Legitimate NAD+ precursor with human trial footprint. TNiC defaults to NMN for stack integration; this module covers when NR is the right choice, dosing, buyer verification, and compare-table evidence.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['mito', 'genomic', 'epigenetic', 'senescence', 'nutrient'],
    relatedSynergySlugs: ['nad-mito-stack', 'nmn-resveratrol-sirt1'],
    outline: [
      'Overview & NR → NMN → NAD+ pathway',
      'When to choose NR vs NMN',
      'Evidence summary (Martens, Trammell)',
      'Dosing & NR-Cl form requirements',
      'TNiC stack substitution guide',
      'Buyer guide & red flags',
      'Personal results template',
    ],
    mdxSlug: 'nr',
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
      'Decision tree & physician checklist',
      'Dosing paradigms (pulse vs continuous)',
      'Monitoring: CBC, lipids, infection vigilance',
      'Buyer/sourcing guide (Rx only)',
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
      'Decision tree & stack placement',
      'Dosing protocol & compliance checklist',
      'Monitoring: liver panel, GGT',
      'Buyer guide & red flags',
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
    slug: 'rala',
    category: 'compounds',
    title: 'R-Alpha Lipoic Acid (R-ALA)',
    tagline: 'Mitochondrial redox recycler — NRF2 stack completion',
    summary:
      'Recycles oxidized glutathione, vitamins C and E. Cofactor for pyruvate dehydrogenase in mitochondria. Completes the NRF2 Defense Triad (substrate → signal → recycle). Tier B in healthy adults; strong mechanistic and metabolic syndrome data.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['mito', 'proteostasis', 'inflammation'],
    compoundId: 'rala',
    relatedSynergySlugs: ['glynac-nrf2-triad', 'nad-mito-stack'],
    outline: [
      'Overview & NRF2 triad placement',
      'Mechanism: redox recycling hub',
      'Evidence summary (neuropathy, metabolic data)',
      'Dosing protocol & enantiomer note',
      'NRF2 Defense Triad choreography',
      'Monitoring: GSH, 8-OHdG, glucose',
      'Safety & interactions',
      'Personal results template',
    ],
    mdxSlug: 'rala',
  },
  {
    slug: 'cakg',
    category: 'compounds',
    title: 'Ca-AKG (Calcium Alpha-Ketoglutarate)',
    tagline: 'Epigenetic cofactor & TCA fuel — highest hallmark breadth per gram',
    summary:
      'TCA cycle intermediate and obligate cofactor for TET, JMJ, and PHD enzymes that reverse age-related DNA and histone methylation drift. Mouse lifespan +12%; emerging human metabolic and clock data from 2024.',
    evidenceTier: 'A',
    relatedHallmarkIds: ['epigenetic', 'mito', 'stem'],
    compoundId: 'cakg',
    relatedSynergySlugs: ['nad-mito-stack'],
    outline: [
      'Overview & AKG decline curve',
      'Mechanism: TCA anaplerosis + TET/JMJ cofactor',
      'Evidence summary (mouse lifespan + human 2024)',
      'Dosing protocol & titration',
      'NAD+ Mito Stack ramp-in schedule',
      'Monitoring: glucose, hs-CRP, epigenetic clock',
      'Safety & contraindications',
      'Personal results template',
    ],
    mdxSlug: 'cakg',
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
  {
    slug: 'taurine',
    category: 'compounds',
    title: 'Taurine',
    tagline: 'Age-depleted osmolyte — Science 2023 lifespan signals',
    summary:
      'Sulfonic amino acid buffering mitochondrial stress and declining ~80% with age. Tier B: strong Singh 2023 Science mechanism and animal lifespan data; limited human longevity RCT.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['mito', 'inflammation', 'genomic'],
    compoundId: 'taurine',
    outline: [
      'Overview & taurine decline with age',
      'Mechanism: membrane + mitochondrial buffering',
      'Evidence: Singh 2023 Science',
      'Dosing protocol',
      'Monitoring',
      'Personal results template',
    ],
    mdxSlug: 'taurine',
  },
  {
    slug: 'spermidine',
    category: 'compounds',
    title: 'Spermidine',
    tagline: 'Autophagy polyamine — Madeo 2021 memory RCT',
    summary:
      'Dietary and supplemental polyamine inducing autophagy via EP300 inhibition. Tier B: human pilot memory outcomes; strong mechanistic autophagy data.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['autophagy', 'epigenetic', 'senescence'],
    compoundId: 'spermidine',
    outline: [
      'Overview & autophagy induction',
      'Mechanism: EP300 / eIF5A',
      'Evidence: Madeo 2021 Cell RCT',
      'Dosing & dietary sources',
      'Monitoring',
      'Personal results template',
    ],
    mdxSlug: 'spermidine',
  },
  {
    slug: 'pterostilbene',
    category: 'compounds',
    title: 'Pterostilbene',
    tagline: 'Methylated resveratrol — 4× bioavailability',
    summary:
      'Stilbenoid SIRT1 activator with superior human PK vs trans-resveratrol. Tier B: Kapetanovic 2011 safety/PK; compare with resveratrol for stack pairing.',
    evidenceTier: 'B',
    relatedHallmarkIds: ['mito', 'epigenetic', 'inflammation'],
    compoundId: 'pterostilbene',
    relatedSynergySlugs: ['nmn-resveratrol-sirt1'],
    outline: [
      'Overview vs resveratrol',
      'Mechanism & bioavailability advantage',
      'Evidence summary',
      'Dosing & NMN pairing',
      'Compare table link',
      'Personal results template',
    ],
    mdxSlug: 'pterostilbene',
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
      'Hallmark impact matrix (primary/secondary)',
      'Decision tree — sedentary vs trained vs deload',
      'Zone 2 vs HIIT vs resistance pyramid',
      'Weekly protocol template',
      'Lab tie-ins (hs-CRP, NAD+ index)',
      'Wearable signals (Zone 2, RHR, HRV)',
      'Stack prerequisite gate',
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
      'Hallmark impact matrix (primary/secondary)',
      'Decision tree — debt vs OSA vs stack timing',
      'Sleep architecture & repair windows',
      'Protocol: timing, light, temperature',
      'Lab tie-ins (hs-CRP, 8-OHdG)',
      'Wearable metrics (deep sleep, wake SD)',
      'Stack prerequisite gate',
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
      'Hallmark impact matrix (primary/secondary)',
      'Decision tree — TRE readiness vs methyl donors',
      'Macro framework (protein, fiber, polyphenols)',
      'Methyl donor checklist',
      'Lab tie-ins (hs-CRP, AKG)',
      'Wearable proxies (fiber, eating window)',
      'Stack prerequisite gate',
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
      'Hallmark impact matrix (primary/secondary)',
      'Decision tree — acute stress vs HRV collapse',
      'HPA axis & cortisol curve',
      'HRV training & breathwork protocols',
      'Lab tie-ins (hs-CRP, GSH)',
      'Wearable signals (HRV, stress score)',
      'Stack prerequisite gate',
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
      'Retest cadence & decision tree',
      'Interpretation playbook & compare block',
      'Stack-adjustment triggers + compare links',
      'Lab day checklist & CSV upload',
      'Hallmark → biomarker reference',
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

export function getAllModuleParams(): { slug: LibraryModuleCategory; moduleSlug: string }[] {
  return libraryModules.map((m) => ({ slug: m.category, moduleSlug: m.slug }));
}

export function getModulePath(module: LibraryModule): string {
  return `/library/${module.category}/${module.slug}`;
}