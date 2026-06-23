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
    subtitle: 'Head-to-head RCT showed comparable glucose outcomes — one is a prescription drug, one is not',
    labelA: 'Berberine HCl',
    labelB: 'Metformin',
    category: 'compound',
    evidenceTier: 'A',
    summary:
      'A 2008 Metabolism RCT (PMID 18396172) randomized 116 T2D patients to berberine 500 mg TID vs metformin 500 mg TID for 13 weeks. Berberine reduced fasting glucose 20% and HbA1c by 2.0% — outcomes statistically equivalent to metformin at the same dose. Both activate AMPK, the cellular energy sensor that also inhibits mTOR and supports longevity pathways. The key difference: metformin is a prescription biguanide with known B12 depletion risk and contraindications in renal impairment; berberine is a consumer-accessible alkaloid with a favorable safety profile and additional lipid benefits not seen with metformin.',
    verdict:
      'Tie on acute glucose control (head-to-head RCT). Choose berberine for consumer accessibility, lipid co-benefits, and absence of B12 depletion. Choose metformin if your physician recommends it for T2D management or you are in the TAME trial longevity cohort — do not self-combine both at full dose (additive hypoglycemia risk).',
    rows: [
      {
        dimension: 'Fasting glucose reduction',
        a: '−20% (13-week RCT, n=116)',
        b: '−23% (same trial, same dose)',
        verdict: 'tie',
        pmid: '18396172',
        note: 'Difference not statistically significant — berberine non-inferior',
      },
      {
        dimension: 'HbA1c reduction',
        a: '−2.0 percentage points',
        b: '−1.8 percentage points',
        verdict: 'a',
        pmid: '18396172',
      },
      {
        dimension: 'LDL cholesterol',
        a: '−13.5% (meta-analysis, 27 RCTs)',
        b: 'Neutral to modest reduction',
        verdict: 'a',
        pmid: '26507383',
        note: "Berberine's lipid benefit is a meaningful advantage for CV risk reduction",
      },
      {
        dimension: 'Triglycerides',
        a: '−35% in dyslipidemia trials',
        b: 'Minimal effect',
        verdict: 'a',
        pmid: '26507383',
      },
      {
        dimension: 'AMPK activation (longevity pathway)',
        a: 'Direct AMPK activator — inhibits mTORC1',
        b: 'Direct AMPK activator via Complex I inhibition',
        verdict: 'tie',
        note: 'Both mimic caloric restriction signaling at the AMPK node',
      },
      {
        dimension: 'Vitamin B12 depletion',
        a: 'Not observed in trials',
        b: 'Documented — requires monitoring',
        verdict: 'a',
        note: 'Metformin blocks B12 absorption in terminal ileum; cumulative risk at 5+ years',
      },
      {
        dimension: 'Renal contraindication',
        a: 'No renal cutoff established',
        b: 'Contraindicated eGFR <30; caution <45',
        verdict: 'a',
      },
      {
        dimension: 'Prescription required',
        a: 'No — consumer accessible',
        b: 'Yes — physician prescription',
        verdict: 'context',
        note: 'Metformin may be the right choice when diabetes management requires physician oversight',
      },
      {
        dimension: 'Muscle hypertrophy interference',
        a: 'Not reported',
        b: 'Blocks exercise-induced mTORC1/MAPK — attenuates muscle gains',
        verdict: 'a',
        pmid: '32910831',
        note: 'Significant tradeoff for physically active users targeting body composition',
      },
      {
        dimension: 'Gut microbiome',
        a: 'Reshapes toward Lactobacillus, reduces Firmicutes:Bacteroidetes',
        b: 'Also reshapes microbiome — mechanisms overlap',
        verdict: 'tie',
      },
      {
        dimension: 'Longevity trial evidence',
        a: 'No dedicated longevity RCT yet',
        b: 'TAME trial underway (n=3,000) — targeting aging directly',
        verdict: 'b',
        pmid: '32910831',
        note: 'TAME is the first FDA-approved trial targeting aging as an indication — metformin leads here',
      },
      {
        dimension: 'Bioavailability standard form',
        a: 'Berberine HCl ~36%; dihydroberberine 5× higher',
        b: 'Standard oral — well-established PK',
        verdict: 'context',
        note: 'Upgrade to dihydroberberine (BPEL) formulation to close the bioavailability gap',
      },
    ],
    whenChooseA: [
      'No T2D diagnosis — seeking metabolic and longevity benefits without a prescription',
      'Physically active — want AMPK benefits without metformin\'s mTORC1/muscle interference',
      'Elevated LDL or triglycerides — berberine adds meaningful lipid benefits metformin does not',
      'Long-term use — avoiding B12 depletion risk without supplemental monitoring',
      'Stacking with TNiC longevity protocol (R-ALA, resveratrol, omega-3 — synergistic with berberine AMPK axis)',
    ],
    whenChooseB: [
      'Physician-managed T2D requiring proven first-line pharmacological intervention',
      'Enrolled or eligible for the TAME longevity trial (metformin-specific)',
      'Prefer FDA-regulated pharmaceutical with decades of post-market safety data',
      'Cost is the primary constraint — generic metformin is extremely low cost',
    ],
    relatedHrefs: [
      { label: 'Berberine in Library', href: '/library/berberine' },
      { label: 'Stack Architect', href: '/stacks' },
      { label: 'Nutrient Sensing Hallmark', href: '/library/hallmarks/nutrient' },
    ],
    keywords: ['berberine', 'metformin', 'ampk', 'glucose', 'metabolic', 'diabetes', 'longevity'],
  },
  {
    slug: 'urolithina-vs-coq10',
    title: 'Urolithin A vs CoQ10',
    subtitle: 'Both target mitochondrial aging — but at completely different points in the process',
    labelA: 'Urolithin A (Mitopure)',
    labelB: 'CoQ10 (Ubiquinol)',
    category: 'compound',
    evidenceTier: 'B',
    summary:
      'Urolithin A and CoQ10 are frequently compared as "mitochondrial supplements" — but they operate at entirely different levels of mitochondrial biology. CoQ10 is an electron transport chain cofactor: it fuels existing mitochondria by shuttling electrons between Complex I/II and Complex III. Urolithin A activates mitophagy: it removes the damaged mitochondria that can no longer function well enough for CoQ10 to help. These are not competing interventions — they are complementary. The question is which problem you are solving first.',
    verdict:
      'Choose urolithin A if your primary goal is clearing dysfunctional mitochondria via mitophagy — especially post-45 with fatigue or declining muscle function. Choose CoQ10 if you are on a statin (obligatory repletion), have cardiovascular history, or want ETC support with strong safety data. Stack both for comprehensive mitochondrial coverage.',
    rows: [
      {
        dimension: 'Mechanism',
        a: 'PINK1/Parkin mitophagy activation — removes damaged mitochondria',
        b: 'ETC electron shuttle at Complex I/II → III — fuels existing mitochondria',
        verdict: 'context',
        note: 'Upstream (cleanup) vs downstream (fuel) — orthogonal, not competing',
      },
      {
        dimension: 'Human trial evidence',
        a: 'Phase 2 RCT (Ryu 2022, PMID 35391504) — muscle strength and mitophagy gene expression confirmed in biopsy',
        b: 'Meta-analysis 17 RCTs (Liang 2016, PMID 26267690) — hs-CRP and IL-6 reduction; Q-SYMBIO RCT for heart failure',
        verdict: 'tie',
        note: 'Both have Tier A-level evidence in their respective primary endpoints',
      },
      {
        dimension: 'Statin users',
        a: 'Not indicated for statin depletion',
        b: 'Obligatory — statins block HMG-CoA reductase which synthesizes CoQ10 endogenously',
        verdict: 'b',
        note: 'If on any statin, CoQ10 is the priority. Non-negotiable repletion.',
      },
      {
        dimension: 'Muscle function (≥65)',
        a: 'Phase 2 RCT primary endpoint: significant improvement in handgrip and leg press',
        b: 'Indirect — ETC support contributes to muscle energy but not primary endpoint',
        verdict: 'a',
        pmid: '35391504',
      },
      {
        dimension: 'Cardiovascular benefit',
        a: 'Not primary indication',
        b: 'Q-SYMBIO: 43% MACE reduction in heart failure; REDUCE-IT context (CoQ10 membrane + omega-3)',
        verdict: 'b',
        pmid: '29541041',
      },
      {
        dimension: 'Dietary accessibility',
        a: 'Only ~40% of people have gut microbiome to produce UA from food — supplement dependency high',
        b: 'Endogenous synthesis possible; ubiquinone in many foods; but declines with age',
        verdict: 'context',
        note: 'UA requires standardized Mitopure to bypass gut conversion limitation',
      },
      {
        dimension: 'Fat co-ingestion requirement',
        a: 'Yes — take with fat-containing meal',
        b: 'Yes — lipid-soluble, requires dietary fat',
        verdict: 'tie',
        note: 'Both are fat-soluble; breakfast is the ideal timing for both',
      },
      {
        dimension: 'Senescent cell coverage',
        a: 'Indirect — mitophagy reduces mitochondria-driven ROS that promotes senescence',
        b: 'Indirect — ROS reduction via ETC efficiency reduces senescence trigger signals',
        verdict: 'a',
        note: "Urolithin A's mitophagy mechanism has a more direct senescence pathway link",
      },
      {
        dimension: 'Safety profile',
        a: 'Phase 1 + 2: no serious adverse events at 250–2000 mg across 5 months',
        b: 'Decades of clinical use; excellent profile; warfarin interaction at high dose',
        verdict: 'tie',
      },
      {
        dimension: 'Cost-effectiveness',
        a: 'Mitopure is premium — standardization is essential but carries premium pricing',
        b: 'Generic ubiquinol well-characterized; CoQ10 cost has fallen significantly',
        verdict: 'b',
        note: 'For budget-constrained stacks, CoQ10 delivers strong ETC support at lower cost',
      },
    ],
    whenChooseA: [
      'Age ≥45 with declining muscle recovery, endurance, or unexplained fatigue',
      'Building a senescence/healthspan protocol — mitophagy clearance as the core mechanism',
      'Not on statins — the statin-depletion rationale for CoQ10 does not apply',
      'Adding to an NMN stack — urolithin A clears damaged mitochondria that NMN alone cannot rehabilitate',
      'Low dietary urolithin A conversion suspected (most Western adults fall in this category)',
    ],
    whenChooseB: [
      'On any statin medication — CoQ10 repletion is obligatory, not optional',
      'Cardiovascular disease history — Q-SYMBIO data supports MACE reduction in HF',
      'Muscle fatigue or myalgia on statins — the most actionable CoQ10 use case',
      'Budget-constrained — CoQ10 delivers Tier B mitochondrial support at substantially lower cost than Mitopure',
    ],
    relatedHrefs: [
      { label: 'Urolithin A in Library', href: '/library/compounds/urolithina' },
      { label: 'CoQ10 in Library', href: '/library/compounds/coq10' },
      { label: 'Mitochondrial Dysfunction hallmark', href: '/library/mitochondrial-dysfunction' },
    ],
    keywords: ['urolithin a', 'coq10', 'mitochondria', 'mitophagy', 'statin', 'energy', 'aging'],
  },
];

export function getComparison(slug: string): EvidenceComparison | undefined {
  return evidenceComparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return evidenceComparisons.map((c) => c.slug);
}