import type { EvidenceTier } from './types';

export type CompareVerdict = 'a' | 'b' | 'tie' | 'context';

export interface CompareRow {
  dimension: string;
  a: string;
  b: string;
  verdict: CompareVerdict;
  pmid?: string;
  note?: string;
}

export interface EvidenceComparison {
  slug: string;
  title: string;
  subtitle: string;
  labelA: string;
  labelB: string;
  category: 'compound' | 'stack' | 'form';
  evidenceTier: EvidenceTier;
  summary: string;
  verdict: string;
  rows: CompareRow[];
  whenChooseA: string[];
  whenChooseB: string[];
  relatedHrefs: { label: string; href: string }[];
  keywords: string[];
}

export const evidenceComparisons: EvidenceComparison[] = [
  {
    slug: 'nmn-vs-nr',
    title: 'NMN vs NR',
    subtitle: 'Two NAD+ precursors — same destination, different trial footprints',
    labelA: 'NMN',
    labelB: 'NR (Nicotinamide Riboside)',
    category: 'compound',
    evidenceTier: 'A',
    summary:
      'Both raise NAD+ metabolites in humans. TNiC standardizes on NMN for stack integration and Igarashi/Liao trial dosing. NR is defensible — do not combine high doses without physician oversight.',
    verdict:
      'Tie on core NAD+ restoration. Choose NMN if you run TNiC stacks (SIRT1 pair, Mito Stack). Choose NR if your physician prefers NR-specific literature or you already respond well.',
    rows: [
      {
        dimension: 'Human NAD+ elevation',
        a: 'Multiple RCTs — 250 mg/day',
        b: 'Multiple RCTs — 300–1000 mg/day',
        verdict: 'tie',
        pmid: '36482258',
      },
      {
        dimension: 'NAMPT bypass',
        a: 'Direct precursor in salvage pathway',
        b: 'NR → NMN → NAD+ (extra step)',
        verdict: 'context',
        note: 'Mechanistic debate — both work in humans',
      },
      {
        dimension: 'TNiC stack integration',
        a: 'Native in all NAD+ presets',
        b: 'Manual substitution required',
        verdict: 'a',
      },
      {
        dimension: 'Typical consumer dose',
        a: '250–500 mg/day',
        b: '300–1000 mg/day',
        verdict: 'tie',
      },
      {
        dimension: 'Cost per trial-matched month',
        a: 'Moderate',
        b: 'Moderate–premium',
        verdict: 'tie',
      },
      {
        dimension: 'Combine both?',
        a: 'Not recommended high-dose combo',
        b: 'Not recommended high-dose combo',
        verdict: 'tie',
        note: 'Physician oversight if stacking precursors',
      },
    ],
    whenChooseA: [
      'Running TNiC SIRT1 or Mito stacks',
      'Matching Igarashi 250 mg protocol exactly',
      'Already have NMN COA and week-4 NAD+ baseline',
    ],
    whenChooseB: [
      'Physician already prescribed NR',
      'Prior positive NR response with NAD+ metabolite proof',
      'NR-specific brand with verified NR-Cl purity you trust',
    ],
    relatedHrefs: [
      { label: 'NMN deep dive', href: '/library/compounds/nmn' },
      { label: 'NMN buyer guide', href: '/library/compounds/nmn#buyer-guide' },
      { label: 'NAD+ Mito Stack', href: '/library/synergies/nad-mito-stack' },
    ],
    keywords: ['nmn', 'nr', 'nicotinamide riboside', 'nad+', 'precursor'],
  },
  {
    slug: 'glynac-vs-liposomal-glutathione',
    title: 'GlyNAC vs Liposomal Glutathione',
    subtitle: 'Rebuild vs replace — synthesis beats swallowing GSH',
    labelA: 'GlyNAC (precursors)',
    labelB: 'Liposomal GSH',
    category: 'form',
    evidenceTier: 'A',
    summary:
      'GlyNAC has Tier A human RCTs restoring erythrocyte GSH over 24 weeks. Liposomal glutathione raises plasma GSH acutely but lacks equivalent longevity-trial depth.',
    verdict:
      'GlyNAC wins for evidence-backed stack foundation. Liposomal GSH may help short-term rescue if tolerance or compliance blocks NAC.',
    rows: [
      {
        dimension: 'Human RCT longevity markers',
        a: '24-week GSH restoration (Kumar)',
        b: 'Acute plasma rise; limited long-term trials',
        verdict: 'a',
        pmid: '34129059',
      },
      {
        dimension: 'Mechanism',
        a: 'Endogenous synthesis — both limiting precursors',
        b: 'Exogenous GSH — digestion limits intact absorption',
        verdict: 'a',
      },
      {
        dimension: 'Cost efficiency',
        a: 'Moderate — dual precursor',
        b: 'Premium — liposomal premium pricing',
        verdict: 'a',
      },
      {
        dimension: 'GI tolerance',
        a: 'NAC sulfur odor; start low',
        b: 'Often better tolerated',
        verdict: 'b',
      },
      {
        dimension: 'NRF2 stack fit',
        a: 'Designed substrate for sulforaphane',
        b: 'Orthogonal — does not replace glycine need',
        verdict: 'a',
      },
      {
        dimension: 'Biomarker target',
        a: 'Erythrocyte GSH',
        b: 'Plasma GSH (transient)',
        verdict: 'a',
      },
    ],
    whenChooseA: [
      'Building NRF2 Defense or Full Hybrid stack',
      'GSH below 5.0 μmol/L on labs',
      'Age 50+ with oxidative stress lifestyle',
    ],
    whenChooseB: [
      'Cannot tolerate NAC after titration',
      'Short-term pre-surgery or acute oxidative stress (physician guided)',
      'Bridge week while transitioning to GlyNAC',
    ],
    relatedHrefs: [
      { label: 'GlyNAC deep dive', href: '/library/compounds/glynac' },
      { label: 'NRF2 Defense Triad', href: '/library/synergies/glynac-nrf2-triad' },
      { label: 'Testing guide', href: '/library/guides/testing-and-monitoring' },
    ],
    keywords: ['glynac', 'glutathione', 'liposomal', 'gsh', 'nac'],
  },
  {
    slug: 'sulforaphane-vs-curcumin',
    title: 'Sulforaphane vs Curcumin',
    subtitle: 'NRF2 covalent switch vs indirect inflammation modulation',
    labelA: 'Sulforaphane',
    labelB: 'Curcumin',
    category: 'compound',
    evidenceTier: 'A',
    summary:
      'Sulforaphane covalently modifies KEAP1, releasing NRF2 to drive 200+ cytoprotective genes. Curcumin modulates NF-κB and inflammation but has poor bioavailability and weaker NRF2 activation data.',
    verdict:
      'Sulforaphane wins for NRF2-primary stacks and hs-CRP reduction paired with GlyNAC. Curcumin is adjunct anti-inflammatory — not a substitute for KEAP1 pathway activation.',
    rows: [
      {
        dimension: 'NRF2 activation mechanism',
        a: 'KEAP1 covalent modification — direct',
        b: 'Indirect; weak KEAP1 data',
        verdict: 'a',
        pmid: '18454171',
      },
      {
        dimension: 'Bioavailability',
        a: 'Requires myrosinase conversion',
        b: 'Poor native; needs piperine/phytosome',
        verdict: 'context',
      },
      {
        dimension: 'hs-CRP evidence',
        a: 'Strong when paired with lifestyle + GlyNAC',
        b: 'Mixed meta-analyses',
        verdict: 'a',
      },
      {
        dimension: 'Gene programs induced',
        a: 'NQO1, GST, HO-1, proteasome subunits',
        b: 'NF-κB, COX-2 modulation',
        verdict: 'a',
      },
      {
        dimension: 'TNiC stack role',
        a: 'Core NRF2 Defense compound',
        b: 'Not in TNiC presets',
        verdict: 'a',
      },
      {
        dimension: 'Buyer verification',
        a: 'GR + myrosinase quantified',
        b: 'Curcuminoid % + absorption tech',
        verdict: 'tie',
      },
    ],
    whenChooseA: [
      'Genomic instability or inflammation hallmarks primary',
      'Running NRF2 Defense stack',
      'hs-CRP above 1.0 mg/L',
    ],
    whenChooseB: [
      'Joint pain / NF-κB inflammation focus with physician plan',
      'Cannot source quality sulforaphane with myrosinase',
      'Adjunct only — not NRF2 foundation',
    ],
    relatedHrefs: [
      { label: 'Sulforaphane deep dive', href: '/library/compounds/sulforaphane' },
      { label: 'Chronic inflammation hallmark', href: '/library/chronic-inflammation' },
    ],
    keywords: ['sulforaphane', 'curcumin', 'nrf2', 'crp', 'inflammation'],
  },
  {
    slug: 'resveratrol-vs-pterostilbene',
    title: 'Trans-Resveratrol vs Pterostilbene',
    subtitle: 'SIRT1 activators — methoxy groups change absorption, not certainty',
    labelA: 'Trans-Resveratrol',
    labelB: 'Pterostilbene',
    category: 'compound',
    evidenceTier: 'B',
    summary:
      'Resveratrol has longer human exposure history and SIRT1 literature. Pterostilbene is more lipophilic with longer half-life in preclinical models — human longevity outcomes for both remain Tier B.',
    verdict:
      'Resveratrol wins for TNiC SIRT1 stack parity with published NMN pairings. Pterostilbene is experimental swap — only with NAD+ monitoring and physician awareness.',
    rows: [
      {
        dimension: 'SIRT1 activation data',
        a: 'Extensive in-vitro + human pilot exposure',
        b: 'Strong preclinical; fewer human trials',
        verdict: 'a',
        pmid: '17909917',
      },
      {
        dimension: 'Oral bioavailability',
        a: 'Low — needs fat + micronization',
        b: 'Higher lipophilicity in models',
        verdict: 'b',
      },
      {
        dimension: 'TNiC stack integration',
        a: 'Native PM pair in SIRT1 preset',
        b: 'Manual substitution',
        verdict: 'a',
      },
      {
        dimension: 'Typical dose',
        a: '150–500 mg trans-resveratrol',
        b: '50–150 mg pterostilbene',
        verdict: 'context',
      },
      {
        dimension: 'Evidence tier (longevity)',
        a: 'Tier B',
        b: 'Tier B',
        verdict: 'tie',
      },
      {
        dimension: 'Drug interactions',
        a: 'CYP substrates — physician review',
        b: 'Similar CYP caution',
        verdict: 'tie',
      },
    ],
    whenChooseA: [
      'Running NMN + resveratrol SIRT1 stack',
      'Matching TNiC timing choreography (AM NMN, PM resveratrol)',
    ],
    whenChooseB: [
      'GI intolerance to resveratrol at 300+ mg',
      'Physician-supervised swap with biomarker tracking',
    ],
    relatedHrefs: [
      { label: 'Resveratrol deep dive', href: '/library/compounds/resveratrol' },
      { label: 'SIRT1 synergy guide', href: '/library/synergies/nmn-resveratrol-sirt1' },
    ],
    keywords: ['resveratrol', 'pterostilbene', 'sirt1', 'nad+'],
  },
  {
    slug: 'nrf2-triad-vs-mito-stack',
    title: 'NRF2 Triad vs NAD+ Mito Stack',
    subtitle: 'Antioxidant gene switch first, or mitochondrial fuel first?',
    labelA: 'NRF2 Defense Triad',
    labelB: 'NAD+ Mito Stack',
    category: 'stack',
    evidenceTier: 'A',
    summary:
      'NRF2 Triad (GlyNAC + sulforaphane + R-ALA) rebuilds redox defense and lowers inflammaging. NAD+ Mito Stack (NMN + Ca-AKG + resveratrol) restores mitochondrial fuel and SIRT signaling.',
    verdict:
      'Start NRF2 Triad if GSH or hs-CRP are off-target. Start Mito Stack if NAD+ is low and energy/mitochondrial hallmark leads. Full Hybrid combines both — higher cost, maximum coverage.',
    rows: [
      {
        dimension: 'Primary hallmarks',
        a: 'Inflammation, genomic, proteostasis',
        b: 'Mitochondrial, epigenetic, nutrient sensing',
        verdict: 'context',
      },
      {
        dimension: 'Lead biomarkers',
        a: 'GSH, hs-CRP',
        b: 'NAD+ index, resting HR',
        verdict: 'context',
      },
      {
        dimension: 'Compound count',
        a: '3 OTC',
        b: '3 OTC',
        verdict: 'tie',
      },
      {
        dimension: 'Monthly cost',
        a: 'Moderate',
        b: 'Moderate–premium',
        verdict: 'a',
      },
      {
        dimension: 'Evidence backbone',
        a: 'Kumar GlyNAC RCT + NRF2 literature',
        b: 'Igarashi NMN RCT + AKG mouse data',
        verdict: 'tie',
        pmid: '34129059',
      },
      {
        dimension: 'Quiz preset mapping',
        a: 'Inflammation / defense goals',
        b: 'Energy / mitochondrial goals',
        verdict: 'context',
      },
    ],
    whenChooseA: [
      'hs-CRP above 1.0 or GSH below 5.0',
      'Quiz result: inflammation or defense focus',
      'Age 55+ with oxidative lifestyle',
    ],
    whenChooseB: [
      'NAD+ below 80 or morning energy ≤5/10',
      'Quiz result: energy / mitochondrial focus',
      'Already optimized sleep + Zone 2',
    ],
    relatedHrefs: [
      { label: 'NRF2 Triad guide', href: '/library/synergies/glynac-nrf2-triad' },
      { label: 'NAD+ Mito Stack', href: '/library/synergies/nad-mito-stack' },
      { label: 'Stack Architect', href: '/stacks' },
    ],
    keywords: ['nrf2', 'mito', 'stack', 'glynac', 'nmn'],
  },
  {
    slug: 'starter-elite-vs-full-hybrid',
    title: 'Starter Elite vs Full Hybrid',
    subtitle: 'Entry stack vs maximum hallmark coverage',
    labelA: 'Starter Elite',
    labelB: 'Full Hybrid',
    category: 'stack',
    evidenceTier: 'A',
    summary:
      'Starter Elite is the lowest-friction entry: GlyNAC + NMN + sulforaphane. Full Hybrid adds resveratrol, Ca-AKG, and R-ALA for dual-pathway coverage — more pills, more monitoring.',
    verdict:
      'Starter Elite wins for first-time stackers and quiz onboarding. Full Hybrid wins when baseline labs justify dual-pathway spend and compliance is proven at 12 weeks.',
    rows: [
      {
        dimension: 'Compounds',
        a: '3',
        b: '6',
        verdict: 'a',
        note: 'Simplicity score higher on Starter',
      },
      {
        dimension: 'Monthly cost',
        a: 'Budget–moderate',
        b: 'Premium',
        verdict: 'a',
      },
      {
        dimension: 'Hallmark coverage',
        a: 'Core 6 hallmarks',
        b: '10+ hallmarks',
        verdict: 'b',
      },
      {
        dimension: 'Monitoring burden',
        a: 'GSH + NAD+ + CRP',
        b: 'Full Tier 1 + Tier 2 panel',
        verdict: 'a',
      },
      {
        dimension: 'Compliance risk',
        a: 'Low',
        b: 'Moderate–high',
        verdict: 'a',
      },
      {
        dimension: 'Upgrade path',
        a: '→ SIRT1 or Full Hybrid at week 12',
        b: 'Maintenance after lab confirmation',
        verdict: 'context',
      },
    ],
    whenChooseA: [
      'First longevity stack ever',
      '3-Min Quiz beginner path',
      'Want results before maximizing spend',
    ],
    whenChooseB: [
      '12+ weeks compliance on Starter Elite',
      'Multiple hallmarks off-target on labs',
      'Budget for premium monitoring cadence',
    ],
    relatedHrefs: [
      { label: 'Stack Architect', href: '/stacks' },
      { label: '3-Min Quiz', href: '/quiz' },
      { label: 'Testing guide', href: '/library/guides/testing-and-monitoring' },
    ],
    keywords: ['starter', 'hybrid', 'stack', 'beginner'],
  },
];

export function getComparison(slug: string): EvidenceComparison | undefined {
  return evidenceComparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return evidenceComparisons.map((c) => c.slug);
}