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
      {
        dimension: 'Buyer verification',
        a: 'β-NMN identity + ≥98% HPLC',
        b: 'NR-Cl identity + ≥98% HPLC',
        verdict: 'context',
        note: 'Different COA targets — see compound buyer guides',
      },
      {
        dimension: 'NR-specific human RCT',
        a: 'Igarashi/Liao 250 mg NMN',
        b: 'Martens 1000 mg NR',
        verdict: 'b',
        pmid: '29514064',
        note: 'Both elevate NAD+ — dose units differ',
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
      { label: 'NR deep dive', href: '/library/compounds/nr' },
      { label: 'NMN buyer guide', href: '/library/compounds/nmn#buyer-guide' },
      { label: 'NR buyer guide', href: '/library/compounds/nr#buyer-guide' },
      { label: 'NAD+ Mito Stack', href: '/library/synergies/nad-mito-stack' },
      { label: 'NR shop verification', href: '/shop?stack=nr' },
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
  {
    slug: 'berberine-vs-metformin',
    title: 'Berberine vs Metformin',
    subtitle: 'Two AMPK activators — plant alkaloid vs biguanide drug',
    labelA: 'Berberine',
    labelB: 'Metformin',
    category: 'compound',
    evidenceTier: 'A',
    summary:
      'Both activate AMPK and lower fasting glucose. Berberine is OTC with comparable glucose-lowering RCT data and unique microbiome effects. Metformin is prescription-only with stronger longevity epidemiology and the TAME trial. Not a replacement decision — mechanisms differ beyond AMPK.',
    verdict:
      'Neither is universally superior. Berberine for accessible AMPK support without a prescription; metformin for physician-supervised longevity protocols with deeper epidemiological backing. Do not combine high doses without physician oversight.',
    rows: [
      {
        dimension: 'AMPK activation mechanism',
        a: 'Complex I inhibition + AMPK phosphorylation',
        b: 'Complex I inhibition → AMPK via energy sensing',
        verdict: 'tie',
        note: 'Overlapping but not identical downstream targets',
      },
      {
        dimension: 'Fasting glucose reduction (RCT)',
        a: '~20% reduction — Yin et al. meta-analysis',
        b: '~25–30% reduction — established first-line T2D drug',
        verdict: 'b',
        pmid: '19800084',
      },
      {
        dimension: 'Longevity epidemiology',
        a: 'Emerging — limited prospective longevity data',
        b: 'Strong — diabetic cohorts show reduced all-cause mortality vs other drugs',
        verdict: 'b',
        pmid: '26579537',
      },
      {
        dimension: 'Microbiome modulation',
        a: 'Yes — increases Akkermansia, reduces pathobionts',
        b: 'Modest — some microbiome effects, less studied',
        verdict: 'a',
        pmid: '27818082',
      },
      {
        dimension: 'Availability',
        a: 'OTC supplement — no prescription required',
        b: 'Rx-only in US/UK — requires physician',
        verdict: 'a',
      },
      {
        dimension: 'GI side effects',
        a: 'Common at high doses (nausea, diarrhea) — dose-titrate up',
        b: 'Common at high doses (GI upset, B12 depletion risk)',
        verdict: 'tie',
        note: 'Both warrant starting low and titrating up',
      },
      {
        dimension: 'TAME trial / longevity RCT',
        a: 'Not enrolled in longevity-endpoint trial',
        b: 'TAME trial (Targeting Aging with Metformin) ongoing',
        verdict: 'b',
      },
      {
        dimension: 'Drug interaction risk',
        a: 'Moderate — CYP2D6, anticoagulants, caution with immunosuppressants',
        b: 'Moderate — contrast dye, NSAIDs, alcohol',
        verdict: 'context',
        note: 'Review all medications with physician before either',
      },
    ],
    whenChooseA: [
      'No access to prescription metformin',
      'Want AMPK + microbiome dual mechanism',
      'Testing glucose and insulin sensitivity OTC first',
      'Non-diabetic and physician not familiar with off-label metformin',
    ],
    whenChooseB: [
      'Physician supervises off-label longevity protocol',
      'T2D or pre-diabetic with established prescription',
      'Want TAME trial-aligned protocol',
      'Tracking B12 levels and long-term tolerability data matters',
    ],
    relatedHrefs: [
      { label: 'Testing & Monitoring guide', href: '/library/guides/testing-and-monitoring' },
      { label: 'Stack Architect', href: '/stacks' },
      { label: 'Disabled Autophagy hallmark', href: '/library/disabled-autophagy' },
    ],
    keywords: ['berberine vs metformin', 'berberine longevity', 'metformin anti-aging', 'AMPK activator', 'berberine supplement', 'natural metformin'],
  },
  {
    slug: 'rala-vs-racemic-ala',
    title: 'R-ALA vs Racemic Alpha Lipoic Acid',
    subtitle: 'Enantiomers matter — bioavailability and mitochondrial efficacy',
    labelA: 'R-ALA (R-alpha lipoic acid)',
    labelB: 'Racemic ALA (dl-ALA)',
    category: 'form',
    evidenceTier: 'B',
    summary:
      'R-ALA is the naturally occurring enantiomer with ~2–4× greater bioavailability and direct mitochondrial activity. Racemic (dl-ALA) is a synthetic 50/50 mix of R and S forms — the S-enantiomer is not found in nature and may compete with R-form absorption. For longevity stacks, R-ALA is the preferred form.',
    verdict:
      'R-ALA wins on bioavailability and mechanistic purity. Pay the premium if you are using it as a GSH recycler and NRF2 stack completion agent. Racemic ALA is acceptable in clinical doses for neuropathy (where higher mg doses compensate) but suboptimal for precision longevity protocols.',
    rows: [
      {
        dimension: 'Natural occurrence',
        a: 'Yes — found in mitochondria, food sources',
        b: 'S-form is synthetic — not found in biology',
        verdict: 'a',
      },
      {
        dimension: 'Oral bioavailability',
        a: '~2–4× higher than racemic on equivalent dose',
        b: 'S-form may reduce R-form absorption via transporter competition',
        verdict: 'a',
        note: 'Take either in fasted state — fat inhibits absorption',
      },
      {
        dimension: 'Mitochondrial activity',
        a: 'Direct cofactor for PDH and α-KGDH complexes',
        b: 'Diluted by S-form; R-form fraction still active',
        verdict: 'a',
      },
      {
        dimension: 'Glutathione recycling (GSH)',
        a: 'Primary mechanism — reduces GSSG back to GSH',
        b: 'Same mechanism, lower effective R-form per gram',
        verdict: 'a',
      },
      {
        dimension: 'NRF2 activation',
        a: 'Nrf2-dependent antioxidant gene induction',
        b: 'Same mechanism, dose-adjusted',
        verdict: 'tie',
        note: 'Higher racemic dose can match R-ALA NRF2 signal',
      },
      {
        dimension: 'Clinical neuropathy evidence',
        a: 'Less studied at standard supplement doses',
        b: 'Strong RCT data at 600 mg/day (diabetic neuropathy)',
        verdict: 'b',
        pmid: '11795853',
      },
      {
        dimension: 'Cost per effective dose',
        a: 'Higher cost per gram but lower effective dose needed (100–300 mg R-ALA)',
        b: 'Lower cost but 600+ mg needed to match R-ALA activity',
        verdict: 'context',
        note: 'Cost-per-effective-dose often similar',
      },
      {
        dimension: 'TNiC NRF2 Triad fit',
        a: 'Preferred — listed in all TNiC NRF2 stack presets',
        b: 'Can substitute at 2× dose — specify fasted morning timing',
        verdict: 'a',
      },
    ],
    whenChooseA: [
      'Using as NRF2 Defense Triad component (GlyNAC + Sulforaphane + R-ALA)',
      'Optimizing glutathione recycling as primary goal',
      'Budget allows premium form for precision stack',
      'Sensitive to GI effects at high doses',
    ],
    whenChooseB: [
      'Diabetic neuropathy protocol (600 mg/day — physician-supervised)',
      'Budget constraint — dose-compensate at 600+ mg',
      'Physician familiar with racemic dosing from clinical literature',
    ],
    relatedHrefs: [
      { label: 'R-ALA deep dive', href: '/library/compounds/rala' },
      { label: 'NRF2 Defense Triad', href: '/library/synergies/glynac-nrf2-triad' },
      { label: 'GlyNAC deep dive', href: '/library/compounds/glynac' },
    ],
    keywords: ['R-ALA vs ALA', 'R-alpha lipoic acid', 'racemic ALA', 'alpha lipoic acid enantiomer', 'best alpha lipoic acid form', 'R-ALA bioavailability'],
  },
];

export function getComparison(slug: string): EvidenceComparison | undefined {
  return evidenceComparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return evidenceComparisons.map((c) => c.slug);
}
