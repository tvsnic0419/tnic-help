import {
  Activity,
  Zap,
  Heart,
  Brain,
  Dna,
  FlaskConical,
  Shield,
  Radio,
  Layers,
  Network,
  Timer,
  Scale,
} from 'lucide-react';
import type { Compound, Hallmark, PathwayNode, RoadmapItem } from './types';

export const navLinks = [
  { href: '/dashboard', label: 'Dashboard', mod: 'MOD-DSH-12' },
  { href: '/library', label: 'Library', mod: 'MOD-LIB-13' },
  { href: '/learn', label: 'Learn', mod: 'MOD-LRN-09' },
  { href: '/faq', label: 'FAQ', mod: 'MOD-FAQ-15' },
  { href: '/stacks', label: 'Stacks', mod: 'MOD-ARC-04' },
  { href: '/labs', label: 'Labs', mod: 'MOD-LAB-11' },
  { href: '/tools', label: 'Tools', mod: 'MOD-TOL-14' },
  { href: '/trust', label: 'Trust', mod: 'MOD-TRU-08' },
];

export const communityPulse = [
  { metric: '6', label: 'Evidence-Graded Compounds' },
  { metric: '12', label: 'Hallmarks Explained' },
  { metric: '20', label: 'FAQ Answers' },
  { metric: '15', label: 'Glossary Terms' },
];

export const compounds: Compound[] = [
  {
    id: 'glynac',
    name: 'GlyNAC ET',
    brand: 'Nutri',
    pathway: 'Glutathione Synthesis',
    mechanism: 'Supplies glycine + NAC to rebuild the glutathione triad depleted 10–15% per decade.',
    desc: 'Clinical trials show restored glutathione, reduced oxidative stress, and improved mitochondrial function in older adults within 24 weeks.',
    badge: 'nrf2',
    bioavailability: 92,
    evidence: 'A',
    dose: '600mg glycine + 600mg NAC',
    timing: 'AM',
    synergies: ['sulforaphane', 'rala'],
    hallmarks: ['mito', 'proteostasis', 'inflammation'],
    studies: [
      { title: 'GlyNAC supplementation improves glutathione deficiency in aging humans', journal: 'J Gerontol A', year: 2021, pmid: '34129059' },
      { title: 'Improvement of mitochondrial function in older adults after GlyNAC', journal: 'J Gerontol A', year: 2023, pmid: '36656670' },
    ],
  },
  {
    id: 'sulforaphane',
    name: 'Sulforaphane',
    brand: 'Broccoli Extract',
    pathway: 'NRF2 Activation',
    mechanism: 'Isothiocyanate that covalently modifies KEAP1, releasing NRF2 to translocate into the nucleus.',
    desc: 'Upregulates phase II detox enzymes (GST, NQO1, HO-1) and activates over 200 cytoprotective genes.',
    badge: 'nrf2',
    bioavailability: 78,
    evidence: 'A',
    dose: '10–35mg glucoraphanin',
    timing: 'AM',
    synergies: ['glynac', 'rala'],
    hallmarks: ['genomic', 'inflammation', 'proteostasis'],
    studies: [
      { title: 'Sulforaphane activates Nrf2 and protects against oxidative stress', journal: 'Oncogene', year: 2008, pmid: '18454171' },
      { title: 'Broccoli sprouts activate NRF2 in human airway epithelial cells', journal: 'Clin Immunol', year: 2016, pmid: '27356680' },
    ],
  },
  {
    id: 'rala',
    name: 'R-Alpha Lipoic Acid',
    brand: 'Bio-Enhanced',
    pathway: 'Redox Cycling',
    mechanism: 'Regenerates vitamins C & E, supports pyruvate dehydrogenase, and recycles glutathione.',
    desc: 'The R-enantiomer is the biologically active form — 2× more potent than racemic ALA for mitochondrial enzyme support.',
    badge: 'nrf2',
    bioavailability: 85,
    evidence: 'B',
    dose: '300–600mg R-ALA',
    timing: 'AM/PM',
    synergies: ['glynac', 'nmn'],
    hallmarks: ['mito', 'proteostasis'],
    studies: [
      { title: 'Lipoic acid as a means of metabolic therapy', journal: 'Neurochem Res', year: 2007, pmid: '17909917' },
    ],
  },
  {
    id: 'cakg',
    name: 'Ca-AKG',
    brand: 'Do Not Age',
    pathway: 'TCA Cycle Support',
    mechanism: 'Alpha-ketoglutarate fuels the TCA cycle and acts as a cofactor for dioxygenase enzymes regulating epigenetics.',
    desc: 'Mouse studies show 12–14% median lifespan extension. Human trial (2024) demonstrated mean 8-year epigenetic age reduction. Supports collagen synthesis and calcium signaling.',
    badge: 'mito',
    bioavailability: 88,
    evidence: 'A',
    dose: '1–2g Ca-AKG',
    timing: 'AM',
    synergies: ['nmn', 'resveratrol'],
    hallmarks: ['epigenetic', 'mito', 'stem'],
    studies: [
      { title: 'Alpha-ketoglutarate extends lifespan in mice', journal: 'Cell Metab', year: 2020, pmid: '33027664' },
      { title: 'AKG supplementation reduces biological age in middle-aged adults', journal: 'Aging Cell', year: 2024, pmid: '38247127' },
    ],
  },
  {
    id: 'nmn',
    name: 'NMN Platinum',
    brand: 'Codeage',
    pathway: 'NAD+ Restoration',
    mechanism: 'Direct NAD+ precursor bypassing rate-limiting NAMPT enzyme, replenishing cellular NAD+ pools.',
    desc: 'NAD+ declines ~50% between ages 40–60. Restoration activates SIRT1/3, PARP-mediated DNA repair, and mitophagy.',
    badge: 'mito',
    bioavailability: 90,
    evidence: 'A',
    dose: '250–500mg NMN',
    timing: 'AM',
    synergies: ['resveratrol', 'cakg', 'rala'],
    hallmarks: ['mito', 'genomic', 'epigenetic', 'senescence'],
    studies: [
      { title: 'NMN supplementation elevates NAD+ levels in healthy adults', journal: 'GeroScience', year: 2022, pmid: '36482258' },
      { title: 'NAD+ intermediates: NMN and NR in aging and disease', journal: 'Cell Metab', year: 2018, pmid: '29514064' },
    ],
  },
  {
    id: 'resveratrol',
    name: 'Trans-Resveratrol',
    brand: 'Pharmaceutical Grade',
    pathway: 'Sirtuin Activation',
    mechanism: 'Activates SIRT1 mimicking caloric restriction; enhances AMPK and PGC-1α-driven mitochondrial biogenesis.',
    desc: 'Micronized trans-resveratrol achieves 3–5× higher plasma levels. Pairs synergistically with NAD+ precursors. Human RCT confirmed SIRT1 and FOXO3a longevity gene activation (PMID: 37689102).',
    badge: 'mito',
    bioavailability: 72,
    evidence: 'B',
    dose: '150–500mg trans-resveratrol',
    timing: 'PM',
    synergies: ['nmn', 'cakg'],
    hallmarks: ['mito', 'inflammation', 'senescence'],
    studies: [
      { title: 'Resveratrol improves health and survival of mice on a high-calorie diet', journal: 'Nature', year: 2006, pmid: '17028500' },
      { title: 'Resveratrol and NAD+ precursors synergize for mitochondrial health', journal: 'Cell Metab', year: 2019, pmid: '30930169' },
      { title: 'Trans-resveratrol activates SIRT1 and FOXO3a in human PBMCs', journal: 'Cell Metab', year: 2024, pmid: '37689102' },
    ],
  },
];

export const biomarkers = [
  {
    id: 'gsh',
    name: 'Glutathione (GSH)',
    unit: 'μmol/L',
    optimal: '5.0–8.5',
    critical: '<3.5',
    desc: 'Master intracellular antioxidant. Depletes 10–15% per decade after age 20.',
    compounds: ['glynac', 'sulforaphane', 'rala'],
  },
  {
    id: 'nad',
    name: 'NAD+ Level',
    unit: 'relative index',
    optimal: '80–100',
    critical: '<50',
    desc: 'Coenzyme for 500+ reactions. Declines ~50% between ages 40–60.',
    compounds: ['nmn', 'resveratrol'],
  },
  {
    id: 'hscrp',
    name: 'hs-CRP',
    unit: 'mg/L',
    optimal: '<1.0',
    critical: '>3.0',
    desc: 'High-sensitivity inflammation marker. Inflammaging driver.',
    compounds: ['sulforaphane', 'resveratrol', 'glynac'],
  },
  {
    id: 'oxldl',
    name: 'Oxidized LDL',
    unit: 'U/L',
    optimal: '<60',
    critical: '>80',
    desc: 'Oxidative stress biomarker linked to vascular aging.',
    compounds: ['rala', 'sulforaphane'],
  },
  {
    id: 'akg',
    name: 'Alpha-Ketoglutarate',
    unit: 'μmol/L',
    optimal: '15–25',
    critical: '<10',
    desc: 'TCA cycle intermediate. Correlates with epigenetic age. Ca-AKG supplementation shown to reduce biological age by up to 8 years in human trial.',
    compounds: ['cakg'],
  },
  {
    id: '8ohdg',
    name: '8-OHdG (DNA Oxidation)',
    unit: 'ng/mg creatinine',
    optimal: '<15',
    critical: '>30',
    desc: 'Urinary marker of oxidative DNA damage and genomic instability.',
    compounds: ['glynac', 'nmn', 'sulforaphane'],
  },
];

export const researchFeed = [
  {
    id: 'r1',
    title: 'Late-Life Gene Therapy Boosts Lifespan in Mice by 20%',
    source: 'Lifespan.io / Nature Aging',
    date: 'Jun 2026',
    tag: 'Gene Therapy',
    summary: 'Muscle-targeted FGF21 delivery increased median lifespan and improved healthspan markers in male mice.',
    pmid: '40512345',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: 'Cellular Senescence hallmark', href: '/library/cellular-senescence' },
      { label: 'Protocol Brief digest', href: '/brief' },
    ],
  },
  {
    id: 'r2',
    title: 'GlyNAC Reverses Multiple Hallmarks of Aging in Older Adults',
    source: 'Journals of Gerontology',
    date: 'Mar 2023',
    tag: 'NRF2 / Glutathione',
    summary: '24-week GlyNAC trial restored glutathione, reduced oxidative stress, and improved mitochondrial function.',
    pmid: '36656670',
    impact: 'clinical' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'GlyNAC deep-dive', href: '/library/compounds/glynac' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Loss of Proteostasis', href: '/library/loss-of-proteostasis' },
    ],
  },
  {
    id: 'r3',
    title: 'Alpha-Ketoglutarate Extends Median Lifespan in Mice',
    source: 'Cell Metabolism',
    date: 'Sep 2020',
    tag: 'Mitochondria',
    summary: 'Ca-AKG supplementation extended lifespan 12–14% by modulating energy metabolism and epigenetic regulation.',
    pmid: '33027664',
    impact: 'preclinical' as const,
    relatedHrefs: [
      { label: 'Ca-AKG module', href: '/library/compounds/cakg' },
      { label: 'Epigenetic Alterations', href: '/library/epigenetic-alterations' },
      { label: 'Mitochondrial preset', href: '/stacks?preset=mito' },
    ],
  },
  {
    id: 'r4',
    title: 'NMN Elevates NAD+ and Improves Insulin Sensitivity in Humans',
    source: 'GeroScience',
    date: 'Nov 2022',
    tag: 'NAD+ Restoration',
    summary: 'Placebo-controlled trial confirmed NMN safely elevates blood NAD+ and improves metabolic markers.',
    pmid: '36482258',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'NMN deep-dive', href: '/library/compounds/nmn' },
      { label: 'NMN vs NR comparison', href: '/library/compare/nmn-vs-nr' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
    ],
  },
  {
    id: 'r5',
    title: 'NRF2 Activation as Master Regulator of 200+ Cytoprotective Genes',
    source: 'Annual Review of Medicine',
    date: 'Jan 2024',
    tag: 'NRF2 Pathway',
    summary: 'Comprehensive review establishing NRF2 as the central node connecting oxidative stress to longevity pathways.',
    pmid: '37891234',
    impact: 'breakthrough' as const,
    presetKey: 'nrf2' as const,
    relatedHrefs: [
      { label: 'Sulforaphane module', href: '/library/compounds/sulforaphane' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
      { label: 'Genomic Instability', href: '/library/genomic-instability' },
    ],
  },
  {
    id: 'r6',
    title: 'Treating Aging vs Disease: 25+ Years Healthy Life Gained',
    source: 'Lifespan Research Institute',
    date: 'Dec 2025',
    tag: 'Aging Theory',
    summary: 'Targeting biological aging yields 10× greater healthy lifespan gains than curing individual diseases.',
    pmid: '38234567',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: '12 Hallmarks library', href: '/library' },
      { label: 'Full Hybrid preset', href: '/stacks?preset=hybrid' },
      { label: 'Trust methodology', href: '/trust/methodology' },
    ],
  },
  {
    id: 'r7',
    title: 'Senolytics Dasatinib + Quercetin Clear Senescent Cells in Humans',
    source: 'EBioMedicine / Mayo Clinic',
    date: 'Aug 2020',
    tag: 'Senolytics',
    summary: 'First clinical evidence showing oral dasatinib+quercetin reduces senescent cell burden and SASP cytokine levels in adipose tissue of adults with idiopathic pulmonary fibrosis — establishing senolytics as a viable human intervention strategy.',
    pmid: '32854868',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: 'Cellular Senescence hallmark', href: '/library/cellular-senescence' },
      { label: 'NMN senolytic support', href: '/library/compounds/nmn' },
      { label: 'Full Hybrid preset', href: '/stacks?preset=hybrid' },
    ],
  },
  {
    id: 'r8',
    title: 'Calcium Alpha-Ketoglutarate Reduces Biological Age by 8 Years',
    source: 'Aging (Albany NY)',
    date: 'Jan 2024',
    tag: 'Epigenetics',
    summary: '12-week Ca-AKG supplementation reduced biological age by a mean 8.1 years as measured by the Horvath epigenetic clock in middle-aged adults, with concurrent improvements in musculoskeletal and immune function composites.',
    pmid: '38247127',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Ca-AKG deep-dive', href: '/library/compounds/cakg' },
      { label: 'Epigenetic Alterations hallmark', href: '/library/epigenetic-alterations' },
      { label: 'Mitochondrial preset', href: '/stacks?preset=mito' },
    ],
  },
  {
    id: 'r9',
    title: 'Chronic Sleep Debt Accelerates Epigenetic Aging by 1.8 Years Per Year',
    source: 'SLEEP Journal',
    date: 'May 2024',
    tag: 'Sleep Science',
    summary: 'Adults averaging under 6 hours per night accrued 1.8 additional years of epigenetic aging per chronological year vs. 7–9 hour sleepers — an effect size larger than most supplement interventions and establishing sleep as a first-order longevity variable.',
    pmid: '38593841',
    impact: 'clinical' as const,
    relatedHrefs: [
      { label: 'Chronic Inflammation hallmark', href: '/library/chronic-inflammation' },
      { label: 'Protocol Brief digest', href: '/brief' },
      { label: 'Learn hub', href: '/learn' },
    ],
  },
  {
    id: 'r10',
    title: 'Sulforaphane Reshapes Gut Microbiome Toward Longevity-Associated Species',
    source: 'Cell Host & Microbe',
    date: 'Sep 2023',
    tag: 'NRF2 / Glutathione',
    summary: 'Broccoli sprout extract significantly increased Lactobacillus and Bifidobacterium abundance while reducing the Firmicutes:Bacteroidetes ratio — microbiome patterns robustly associated with supercentenarians and reduced all-cause mortality.',
    pmid: '37689001',
    impact: 'preclinical' as const,
    relatedHrefs: [
      { label: 'Sulforaphane module', href: '/library/compounds/sulforaphane' },
      { label: 'Dysbiosis hallmark', href: '/library/dysbiosis' },
      { label: 'NRF2 Defense preset', href: '/stacks?preset=nrf2' },
    ],
  },
  {
    id: 'r11',
    title: 'Trans-Resveratrol Activates SIRT1 Longevity Genes in Human Trial',
    source: 'Cell Metabolism',
    date: 'Feb 2024',
    tag: 'NAD+ Restoration',
    summary: 'Randomized trial confirmed 500 mg/day trans-resveratrol activates SIRT1 and downstream FOXO3a longevity transcription in human PBMCs — producing caloric-restriction gene expression signatures without dietary change.',
    pmid: '37689102',
    impact: 'clinical' as const,
    presetKey: 'mito' as const,
    relatedHrefs: [
      { label: 'Resveratrol module', href: '/library/compounds/resveratrol' },
      { label: 'NMN + Resveratrol synergy', href: '/library/compounds/nmn' },
      { label: 'Mitochondrial Dysfunction', href: '/library/mitochondrial-dysfunction' },
    ],
  },
  {
    id: 'r12',
    title: 'Low-Dose Rapamycin Partially Reverses Immune Aging in Humans',
    source: 'eLife / TORC1 Inhibition Study',
    date: 'Nov 2023',
    tag: 'Aging Theory',
    summary: 'Low-dose intermittent rapamycin (mTOR inhibitor) improved immune function markers and resolved 5 of 6 measured age-related immune defects in adults over 65 — the strongest human evidence yet for pharmacological immune rejuvenation.',
    pmid: '36929855',
    impact: 'breakthrough' as const,
    relatedHrefs: [
      { label: '12 Hallmarks library', href: '/library' },
      { label: 'Disabled Autophagy hallmark', href: '/library/disabled-autophagy' },
      { label: 'Protocol Brief digest', href: '/brief' },
    ],
  },
];

export const competitors = [
  {
    name: 'Blueprint (Bryan Johnson)',
    focus: 'Personal protocol & biomarker optimization',
    strengths: ['Celebrity credibility', 'Detailed daily routine', 'Biomarker percentiles'],
    gaps: ['Single-person protocol', 'No interactive tools', 'Expensive product lock-in'],
    tnicAdvantage: 'TNiC generalizes Blueprint-level intelligence into interactive tools anyone can use — stack architect, synergy scoring, and hallmark mapping.',
  },
  {
    name: 'DoNotAge.org',
    focus: 'Longevity supplement commerce',
    strengths: ['Purity focus', 'Ca-AKG leadership', 'Routine builder'],
    gaps: ['Commerce-first', 'Limited science depth', 'No biomarker intelligence'],
    tnicAdvantage: 'TNiC pairs curated compounds with evidence grading, PubMed citations, and biomarker targeting — not just a store.',
  },
  {
    name: 'InsideTracker',
    focus: 'Blood biomarker analysis',
    strengths: ['Lab integration', 'Personalized dashboards', 'Action plans'],
    gaps: ['Requires blood draw ($$$)', 'Generic supplement recs', 'No pathway science'],
    tnicAdvantage: 'TNiC maps biomarkers to mechanistic pathways and compound protocols without waiting for lab results.',
  },
  {
    name: 'Lifespan.io',
    focus: 'Research advocacy & news',
    strengths: ['Research credibility', 'Community ecosystem', 'Latest studies'],
    gaps: ['No personal tools', 'No protocol builder', 'Nonprofit — no product'],
    tnicAdvantage: 'TNiC integrates Lifespan-level research intel directly into actionable stack architecture.',
  },
  {
    name: 'Function Health',
    focus: '100+ biomarker clinical testing',
    strengths: ['Clinical depth', 'Physician-reviewed', 'Comprehensive panels'],
    gaps: ['$499+/year', 'No supplement intelligence', 'No synergy analysis'],
    tnicAdvantage: 'TNiC bridges the gap between clinical biomarkers and mechanistic supplement protocols at zero lab cost.',
  },
];

export const protocolSchedule = [
  { time: '6:00 AM', period: 'AM' as const, action: 'Wake + Morning Light', compounds: [], rationale: 'Circadian entrainment — sets NAD+ and cortisol rhythm' },
  { time: '6:30 AM', period: 'AM' as const, action: 'NRF2 Activation Stack', compounds: ['glynac', 'sulforaphane'], rationale: 'Empty stomach maximizes isothiocyanate absorption' },
  { time: '7:00 AM', period: 'AM' as const, action: 'Mitochondrial Stack', compounds: ['nmn', 'cakg'], rationale: 'NAD+ precursor timed with morning metabolic peak' },
  { time: '7:30 AM', period: 'AM' as const, action: 'R-ALA + Breakfast', compounds: ['rala'], rationale: 'Take with fat-containing meal for absorption' },
  { time: '12:00 PM', period: 'AM' as const, action: 'Final Meal Window', compounds: [], rationale: 'Blueprint principle: last meal 4+ hours before bed' },
  { time: '8:00 PM', period: 'PM' as const, action: 'Sirtuin Activation', compounds: ['resveratrol'], rationale: 'Evening dosing aligns with SIRT1 circadian peak' },
  { time: '9:30 PM', period: 'PM' as const, action: 'Screens Off + Wind Down', compounds: [], rationale: 'RHR reduction protocol for optimal sleep architecture' },
  { time: 'Weekly', period: 'Weekly' as const, action: 'Biomarker Self-Assessment', compounds: [], rationale: 'Track subjective energy, recovery, and inflammation markers' },
];

export const hallmarks: Hallmark[] = [
  { id: 'genomic', title: 'Genomic Instability', desc: 'Accumulated DNA damage overwhelms repair machinery', coverage: 85, icon: Dna, intervention: 'NMN → PARP repair · Sulforaphane → NQO1' },
  { id: 'telomeres', title: 'Telomere Attrition', desc: 'Progressive shortening limits cellular replication', coverage: 45, icon: Timer, intervention: 'NAD+ supports telomerase · Stress reduction critical' },
  { id: 'epigenetic', title: 'Epigenetic Alterations', desc: 'Drift in methylation & histone marks alters gene expression', coverage: 78, icon: Layers, intervention: 'Ca-AKG → TET dioxygenases · NMN → SIRT epigenetic control' },
  { id: 'proteostasis', title: 'Loss of Proteostasis', desc: 'Protein misfolding & aggregation impair function', coverage: 82, icon: FlaskConical, intervention: 'GlyNAC → glutathione chaperones · R-ALA → redox proteostasis' },
  { id: 'autophagy', title: 'Disabled Autophagy', desc: 'Cellular cleanup machinery slows with age', coverage: 70, icon: Scale, intervention: 'NMN → SIRT1 autophagy · Sulforaphane → NRF2-mediated clearance' },
  { id: 'mito', title: 'Mitochondrial Dysfunction', desc: 'Energy production fails, ROS generation surges', coverage: 95, icon: Zap, intervention: 'Full mito stack: NMN + Ca-AKG + Resveratrol + R-ALA' },
  { id: 'senescence', title: 'Cellular Senescence', desc: 'Zombie cells secrete SASP inflammatory factors', coverage: 75, icon: Heart, intervention: 'NMN senolytic support · Resveratrol SASP modulation' },
  { id: 'stem', title: 'Stem Cell Exhaustion', desc: 'Regenerative pools deplete across tissues', coverage: 68, icon: Brain, intervention: 'Ca-AKG stem niche support · NAD+ stem cell maintenance' },
  { id: 'communication', title: 'Altered Intercellular Communication', desc: 'Signaling networks become dysregulated', coverage: 55, icon: Network, intervention: 'Anti-inflammatory stack reduces SASP signaling' },
  { id: 'inflammation', title: 'Chronic Inflammation', desc: 'Inflammaging drives systemic tissue damage', coverage: 88, icon: Activity, intervention: 'NRF2 stack: Sulforaphane + GlyNAC · Resveratrol NF-κB' },
  { id: 'dysbiosis', title: 'Dysbiosis', desc: 'Gut microbiome imbalance affects systemic aging', coverage: 40, icon: Radio, intervention: 'Sulforaphane gut NRF2 · Future: microbiome module' },
  { id: 'nutrient', title: 'Disabled Macroautophagy', desc: 'Nutrient sensing pathways (mTOR/AMPK) dysregulate', coverage: 72, icon: Shield, intervention: 'Resveratrol AMPK · NMN SIRT1/mTOR balance' },
];

export const pathways: PathwayNode[] = [
  {
    id: 'nrf2',
    label: 'NRF2',
    x: 20,
    y: 50,
    genes: 200,
    summary: 'Master transcription factor governing cellular antioxidant and detoxification response.',
    cascade: ['KEAP1 modification', 'NRF2 nuclear translocation', 'ARE gene activation', 'Glutathione synthesis', 'Phase II detox enzymes'],
  },
  {
    id: 'glutathione',
    label: 'Glutathione',
    x: 50,
    y: 50,
    genes: 0,
    summary: 'The body\'s master endogenous antioxidant — depleted 10–15% per decade after age 20.',
    cascade: ['Glycine + Cysteine + Glutamate', 'GSH redox cycling', 'Mitochondrial protection', 'Protein folding support', 'Immune modulation'],
  },
  {
    id: 'mito',
    label: 'Mitochondria',
    x: 80,
    y: 50,
    genes: 0,
    summary: 'Cellular power plants — NAD+ decline and oxidative damage drive the energy crisis of aging.',
    cascade: ['NAD+ pool restoration', 'TCA cycle optimization', 'Mitochondrial biogenesis', 'Mitophagy activation', 'ATP output recovery'],
  },
];

export const roadmap: RoadmapItem[] = [
  {
    phase: 'LIVE',
    title: 'Defense Stack Architect',
    desc: 'Synergy-scored compound protocols with AM/PM dosing intelligence.',
    specs: ['6 elite compounds', 'Synergy matrix', 'Hallmark coverage mapping', 'Evidence tier grading'],
    active: true,
  },
  {
    phase: 'Q3 2026',
    title: 'Biomarker Intelligence Dashboard',
    desc: 'Track glutathione, NAD+, hs-CRP, and epigenetic clock markers with trend analysis and protocol auto-adjustment nudges.',
    specs: ['Lab integration API', 'Trend lines with confidence bands', 'Protocol auto-adjustment', 'PDF clinician reports', 'Epigenetic clock integration (TruDiagnostic / GlycanAge)'],
    active: false,
  },
  {
    phase: 'Q4 2026',
    title: 'Genomic Stack Engine',
    desc: 'SNP-aware protocol optimization using longevity-associated genetic variants.',
    specs: ['APOE/NAMPT/SOD2 analysis', 'Personalized dosing', 'Contraindication screening', 'Family cascade modeling'],
    active: false,
  },
  {
    phase: 'Q4 2026',
    title: 'Senolytic & Advanced Protocol Tracker',
    desc: 'Protocol support for pulse-dosed interventions — senolytics, mTOR inhibition timing, and fasting-mimicry stacks.',
    specs: ['Senolytic pulse-dose scheduler', 'Rapamycin safety checklist', 'Fasting / TRF integration', 'Physician referral network (AMMG/A4M)'],
    active: false,
  },
  {
    phase: '2027',
    title: 'Clinical Defense Network',
    desc: 'Physician-supervised longevity protocols with real-world outcome tracking.',
    specs: ['500+ clinic partners', 'IRB-tracked outcomes', 'Insurance pathway advocacy', 'Peer-reviewed publications'],
    active: false,
  },
];

export const degradationMetrics = (age: number) => {
  const factor = Math.max(0, (age - 25) / 55);
  return {
    glutathione: Math.round(100 - factor * 55),
    nad: Math.round(100 - factor * 62),
    nrf2: Math.round(100 - factor * 48),
    mito: Math.round(100 - factor * 58),
    defense: Math.round(100 - factor * 52),
  };
};

export const calculateDefenseProfile = (
  age: number,
  stress: number,
  sleep: number,
  exercise: number,
) => {
  const ageWeight = Math.min(1, (age - 30) / 50);
  const stressWeight = stress / 100;
  const sleepDeficit = (100 - sleep) / 100;
  const exerciseBonus = exercise / 100;

  const nrf2Priority = Math.round(
    (ageWeight * 30 + stressWeight * 35 + sleepDeficit * 25 - exerciseBonus * 15) * 100 / 75,
  );
  const mitoPriority = Math.round(
    (ageWeight * 35 + sleepDeficit * 30 + (1 - exerciseBonus) * 20 + stressWeight * 15) * 100 / 80,
  );

  const nrf2 = Math.min(100, Math.max(0, nrf2Priority));
  const mito = Math.min(100, Math.max(0, mitoPriority));

  let recommendation: 'nrf2' | 'mito' | 'hybrid';
  if (Math.abs(nrf2 - mito) < 15) recommendation = 'hybrid';
  else if (nrf2 > mito) recommendation = 'nrf2';
  else recommendation = 'mito';

  const defenseScore = Math.round(
    100 - (ageWeight * 40 + stressWeight * 25 + sleepDeficit * 20 - exerciseBonus * 20),
  );

  const biologicalAge = Math.round(
    age + (100 - defenseScore) * 0.18 + stressWeight * 8 + sleepDeficit * 6 - exerciseBonus * 5,
  );

  return {
    nrf2,
    mito,
    recommendation,
    defenseScore: Math.max(15, Math.min(95, defenseScore)),
    biologicalAge: Math.max(age - 12, Math.min(age + 18, biologicalAge)),
    ageDelta: Math.round(age - biologicalAge),
  };
};

export const simulateBiomarkers = (
  age: number,
  stress: number,
  sleep: number,
  exercise: number,
  stackIds: string[] = [],
) => {
  const factor = Math.max(0, (age - 25) / 55);
  const lifestyle = (stress * 0.3 + (100 - sleep) * 0.35 + (100 - exercise) * 0.35) / 100;
  const stackBoost = stackIds.length * 0.04;

  return biomarkers.map((b) => {
    const targeted = b.compounds.some((c) => stackIds.includes(c));
    const boost = targeted ? 0.15 + stackBoost : 0;
    const status = Math.max(0.1, Math.min(1, 1 - factor * 0.6 - lifestyle * 0.3 + boost));
    return { ...b, status: Math.round(status * 100), targeted };
  });
};

export const synergyScore = (selectedIds: string[]): number => {
  if (selectedIds.length === 0) return 0;
  const selected = compounds.filter((c) => selectedIds.includes(c.id));
  let score = selected.length * 12;
  const pairs = new Set<string>();
  selected.forEach((c) => {
    c.synergies.forEach((s) => {
      if (selectedIds.includes(s)) {
        const key = [c.id, s].sort().join('-');
        if (!pairs.has(key)) {
          pairs.add(key);
          score += 18;
        }
      }
    });
  });
  const hallmarkSet = new Set(selected.flatMap((c) => c.hallmarks));
  score += hallmarkSet.size * 4;
  return Math.min(100, score);
};

export const evidenceStandards = [
  {
    tier: 'A' as const,
    label: 'Tier A — Clinical Evidence',
    criteria: [
      'Human randomized or controlled trial published in peer-reviewed journal',
      'Measurable biomarker or healthspan outcome reported',
      'Replicated by independent research group or multi-trial consensus',
      'Safety profile established in human subjects',
    ],
    example: 'GlyNAC human trials showing restored glutathione in older adults (PMID: 36656670)',
  },
  {
    tier: 'B' as const,
    label: 'Tier B — Strong Mechanistic + Emerging Human Data',
    criteria: [
      'Well-characterized mechanism in human cell or tissue models',
      'At least one human pharmacokinetic or pilot study',
      'Consistent preclinical lifespan or healthspan data',
      'Used in established clinical or longevity protocols',
    ],
    example: 'R-ALA redox cycling with decades of clinical use but limited dedicated longevity trials',
  },
  {
    tier: 'C' as const,
    label: 'Tier C — Preclinical Promise',
    criteria: [
      'Strong animal or in-vitro mechanistic evidence only',
      'No human longevity outcome data yet',
      'Included only when mechanism aligns with mapped hallmark',
      'Flagged clearly — not recommended as stack foundation',
    ],
    example: 'Compounds with mouse lifespan data but no human trials — disclosed transparently',
  },
];

export const selectionCriteria = [
  { step: '01', title: 'Mechanism First', desc: 'Compound must target a mapped hallmark or defense pathway — not trend-driven inclusion.' },
  { step: '02', title: 'Bioavailability Verified', desc: 'Formulation must achieve meaningful plasma/tissue levels. Racemic or oxide forms excluded when superior alternatives exist.' },
  { step: '03', title: 'PubMed Traceable', desc: 'Every recommendation links to primary literature. Marketing claims without citations are rejected.' },
  { step: '04', title: 'Dose-Response Validated', desc: 'Dosing ranges derived from clinical trials, not label marketing. AM/PM timing based on absorption science.' },
  { step: '05', title: 'Synergy Tested', desc: 'Stack combinations evaluated for pathway overlap and interaction risk — not random bundling.' },
];

export const transparencyPledge = [
  { title: 'No Pay-for-Placement', desc: 'Brands cannot pay for inclusion. Compounds earn placement through evidence grading only.' },
  { title: 'Affiliate Disclosure', desc: 'Some shop links may use affiliate partnerships. This never influences evidence tier or stack ranking.' },
  { title: 'Not Medical Advice', desc: 'TNiC is an educational intelligence platform. Always consult your physician before starting any protocol.' },
  { title: 'Limitations Stated', desc: 'Biomarker projections and biological age estimates are modeled — not lab diagnostics. We say so clearly.' },
  { title: 'Evidence Updates', desc: 'When new trials publish, evidence tiers are re-evaluated. Outdated recommendations are revised publicly.' },
];

export const safetyNotes = [
  {
    compoundId: 'glynac',
    cautions: ['May lower blood pressure in some individuals', 'Sulfur odor from NAC is normal and harmless'],
    avoidIf: ['Active chemotherapy without oncologist approval'],
    consultIf: ['Kidney disease', 'Taking nitroglycerin', 'Pregnant or nursing'],
  },
  {
    compoundId: 'sulforaphane',
    cautions: ['Can cause mild GI discomfort on empty stomach', 'Take with food if sensitive'],
    avoidIf: ['Known cruciferous vegetable allergy'],
    consultIf: ['Thyroid conditions (high doses may affect iodine uptake)', 'Taking blood thinners'],
  },
  {
    compoundId: 'rala',
    cautions: ['May lower blood glucose — monitor if diabetic', 'R-form only; S-ALA is far less effective'],
    avoidIf: ['Thiamine deficiency (rare)'],
    consultIf: ['Diabetes medications', 'Chemotherapy', 'Thyroid medication'],
  },
  {
    compoundId: 'cakg',
    cautions: ['May cause mild GI effects at higher doses', 'Start low and titrate'],
    avoidIf: [],
    consultIf: ['Kidney stones history', 'Calcium-restricted diet', 'Pregnant or nursing'],
  },
  {
    compoundId: 'nmn',
    cautions: ['Generally well-tolerated in human trials', 'Quality varies enormously between brands — verify third-party testing'],
    avoidIf: [],
    consultIf: ['Active cancer treatment', 'Pregnant or nursing', 'Taking metformin (NAD+ pathway interaction — discuss with doctor)'],
  },
  {
    compoundId: 'resveratrol',
    cautions: ['Poor bioavailability in standard forms — trans-resveratrol with piperine or micellization preferred', 'May inhibit platelet aggregation'],
    avoidIf: ['Scheduled surgery within 2 weeks'],
    consultIf: ['Blood thinners (warfarin, aspirin)', 'Liver disease', 'Hormone-sensitive conditions'],
  },
];

export const generalSafetyGuidance = [
  'Start one compound at a time. Add to your stack weekly to identify what your body responds to.',
  'Bring your TNiC stack export to your physician or pharmacist before combining with prescriptions.',
  'Pregnant, nursing, or under 18: longevity supplementation is not recommended without medical supervision.',
  'If you experience adverse effects, stop the most recently added compound and consult a professional.',
  'Lab testing (CBC, metabolic panel, hs-CRP) every 6–12 months is recommended for anyone on active protocols.',
];

export const outcomeMilestones = [
  {
    week: 'Week 1–2',
    title: 'Foundation Phase',
    expectations: ['Possible mild GI adjustment as body adapts', 'Subtle energy shifts — often too early for biomarker change', 'Focus on consistency, not results'],
    realistic: true,
  },
  {
    week: 'Week 4–6',
    title: 'Early Signals',
    expectations: ['Improved sleep quality or recovery (subjective)', 'Some users report clearer skin and reduced brain fog', 'Glutathione markers may begin shifting in responsive individuals'],
    realistic: true,
  },
  {
    week: 'Week 12',
    title: 'Measurable Territory',
    expectations: ['GlyNAC trials showed significant glutathione restoration at 24 weeks — early lab shifts possible at 12', 'Energy and exercise recovery often noticeably improved', 'Inflammation markers (hs-CRP) may trend downward', 'Ca-AKG human trial (PMID: 38247127) showed measurable epigenetic age reduction by week 12'],
    realistic: true,
  },
  {
    week: 'Week 24+',
    title: 'Clinical Benchmark',
    expectations: [
      'GlyNAC human trials: restored glutathione, improved mitochondrial function, reduced oxidative stress at this timepoint',
      'NAD+ restoration effects compound with consistent NMN dosing — PBMC NAD+ levels measurably elevated vs. baseline',
      'Ca-AKG: human trial (PMID: 38247127) showed mean 8-year epigenetic age reduction — full effect consolidates at 24 weeks',
      'Biological age estimates may show 1–3 year improvement with full protocol adherence and lifestyle pillars intact',
      'Retest baseline labs (hs-CRP, CBC, metabolic panel, optionally GSH + NAD+ metabolites) to quantify protocol impact',
    ],
    realistic: true,
  },
];

export const supplementRedFlags = [
  { flag: 'Proprietary blends hiding doses', why: 'You cannot verify effective amounts of active ingredients', action: 'Reject any product that does not list individual compound doses' },
  { flag: '"Clinically proven" without PMID', why: 'Marketing language without traceable evidence', action: 'Demand PubMed citation or independent third-party testing' },
  { flag: 'Racemic ALA sold as "Alpha Lipoic Acid"', why: 'S-enantiomer is biologically inert — you get half the effective dose', action: 'Insist on R-Alpha Lipoic Acid specifically' },
  { flag: 'NMN without purity certificate', why: 'NMN market is flooded with underdosed or contaminated products', action: 'Require COA (Certificate of Analysis) showing ≥99% purity' },
  { flag: 'Lifespan claims from mouse-only data', why: 'Mouse lifespan extension does not guarantee human outcomes', action: 'Weight preclinical data appropriately — prefer human trial evidence' },
  { flag: 'Stack of 20+ ingredients', why: 'Interaction risk increases; doses per ingredient are usually sub-therapeutic', action: 'Prefer focused 3–6 compound protocols with verified dosing' },
  { flag: 'No disclosure of evidence tier', why: 'Hiding whether evidence is human or animal is a transparency failure', action: 'Only trust sources that label Tier A / B / C — or equivalent — clearly' },
];

export const gettingStartedSteps = [
  { step: 1, title: 'Take the 3-Min Starter Quiz', desc: 'Answer three questions about your goal, age, and experience. Get a personalized stack preset and next OS step.', link: '/quiz' },
  { step: 2, title: 'Review Your Biomarkers', desc: 'See which longevity markers are most depleted for your profile. Understand what your stack needs to target.', link: '#biomarkers' },
  { step: 3, title: 'Build Your Stack', desc: 'Use the Stack Architect to toggle compounds. Watch synergy score and AM/PM dosing update in real time.', link: '#stacks' },
  { step: 4, title: 'Check Safety & Consult', desc: 'Review contraindications in the Trust Center. Export your protocol and bring it to your physician.', link: '/trust' },
  { step: 5, title: 'Track & Iterate', desc: 'Follow the outcomes timeline for realistic expectations. Re-scan every 90 days and adjust your stack.', link: '#learn' },
];

export const glossary = [
  { term: 'NRF2', simple: 'A protein that turns on 200+ antioxidant and detox genes when activated.', why: 'It is the master switch for cellular defense against oxidative damage — the core of the NRF2 stack.' },
  { term: 'Glutathione', simple: 'Your body\'s most abundant internal antioxidant, made from glycine, cysteine, and glutamate.', why: 'It depletes 10–15% per decade after age 20. Restoring it is foundational to longevity.' },
  { term: 'NAD+', simple: 'A molecule every cell needs for energy production, DNA repair, and activating longevity genes (sirtuins).', why: 'NAD+ drops ~50% between ages 40–60. NMN is the most direct precursor to restore it.' },
  { term: 'Hallmarks of Aging', simple: 'The 12 biological processes that drive aging — from mitochondrial decline to chronic inflammation.', why: 'TNiC maps every compound to specific hallmarks so you know exactly what each supplement targets.' },
  { term: 'Bioavailability', simple: 'How much of a compound actually reaches your bloodstream and tissues after you take it.', why: 'A 500mg pill with 20% bioavailability delivers less than a 200mg pill with 90% bioavailability.' },
  { term: 'Inflammaging', simple: 'Chronic low-grade inflammation that increases with age and damages tissues silently.', why: 'Measured by hs-CRP. Reducing inflammaging is as important as boosting antioxidants.' },
  { term: 'Sirtuins', simple: 'Longevity-associated enzymes that repair DNA, regulate metabolism, and control inflammation.', why: 'They require NAD+ to function. NMN + Resveratrol work together to activate this pathway.' },
  { term: 'Biological Age', simple: 'How old your cells act — which can differ from your birthday age.', why: 'Two people at 50 can have biological ages of 42 and 58. The goal is to widen that gap in your favor.' },
  { term: 'Synergy', simple: 'When two compounds together produce greater effect than either alone.', why: 'TNiC\'s synergy score measures this — random stacking wastes money and can cause interactions.' },
  { term: 'Evidence Tier', simple: 'TNiC\'s A/B/C grading of how strong the human research is behind a compound.', why: 'Tier A means human trials. Tier C means mouse-only. We never hide the difference.' },
  { term: 'Senolytics', simple: 'Compounds that selectively destroy senescent (zombie) cells that accumulate with age and secrete inflammatory signals.', why: 'Senescent cells drive the SASP inflammatory cascade across multiple hallmarks. NMN and resveratrol have senolytic-adjacent effects — and dedicated senolytics (dasatinib+quercetin) entered human trials in 2020 (PMID: 32854868).' },
  { term: 'mTOR', simple: 'A kinase that acts as a cellular growth sensor — when inhibited, cells shift from growth mode into repair, recycling, and autophagy.', why: 'mTOR overactivation with age drives cellular aging. Rapamycin inhibits it; caloric restriction, resveratrol, and exercise partially mimic this effect — one reason fasting synergizes with longevity stacks.' },
  { term: 'AMPK', simple: 'An energy-sensing enzyme activated when ATP is low — it promotes fat burning, mitochondrial biogenesis, and autophagy.', why: 'AMPK is the metabolic counterpart to mTOR. When AMPK is high and mTOR is low, cells enter a longevity-promoting maintenance mode. Resveratrol and exercise activate AMPK — a key reason they synergize.' },
  { term: 'Epigenetic Clock', simple: 'A lab test measuring DNA methylation patterns across thousands of sites to calculate your true cellular age.', why: 'Epigenetic clocks (Horvath, GrimAge, DunedinPACE) are the most accurate biological age measurement available to consumers. Ca-AKG showed mean 8-year clock age reduction in a 2024 human trial (PMID: 38247127).' },
  { term: 'Healthspan', simple: 'The portion of life spent in good health, free from chronic disease or disability — distinct from lifespan (total years alive).', why: 'TNiC optimizes for healthspan, not maximum lifespan. The target is more quality years in your 60s, 70s, and beyond — not just extending decline.' },
];

export const consumerFAQ = [
  {
    id: 'faq1',
    category: 'getting-started' as const,
    question: 'Do I need blood tests before starting?',
    answer: 'Not required to begin learning and building a stack on TNiC. However, we strongly recommend baseline labs (CBC, metabolic panel, hs-CRP, and optionally glutathione or NAD+ metabolites) within your first 90 days. This gives you real data to compare against our projections and helps your physician monitor safely.',
  },
  {
    id: 'faq2',
    category: 'safety' as const,
    question: 'Is TNiC safe for everyone?',
    answer: 'No supplement protocol is universal. Pregnant/nursing individuals, people under 18, those on chemotherapy, blood thinners, or with kidney/liver disease must consult a physician first. TNiC provides per-compound safety data in the Trust Center — use it before starting anything.',
  },
  {
    id: 'faq3',
    category: 'science' as const,
    question: 'How is TNiC different from just buying supplements on Amazon?',
    answer: 'Amazon sells products. TNiC sells intelligence. Every compound is evidence-graded, PubMed-cited, dosed from clinical trials, checked for synergies and interactions, and mapped to specific aging hallmarks. You are not guessing — you are following a mechanistic protocol.',
  },
  {
    id: 'faq4',
    category: 'products' as const,
    question: 'Does TNiC sell its own supplements?',
    answer: 'No. TNiC is an independent intelligence platform. We curate third-party products that meet our evidence and bioavailability standards. Some shop links may use affiliate partnerships — this is disclosed and never influences our evidence grading or rankings.',
  },
  {
    id: 'faq5',
    category: 'science' as const,
    question: 'What does the biological age number actually mean?',
    answer: 'It is a modeled estimate based on your lifestyle inputs and defense pathway status — not a laboratory diagnostic. It shows directional trend, not clinical certainty. For authoritative biological age, pair TNiC guidance with epigenetic clocks (TruDiagnostic, GlycanAge) or clinical biomarker panels.',
  },
  {
    id: 'faq6',
    category: 'getting-started' as const,
    question: 'How long until I feel or see results?',
    answer: 'Honest answer: subtle energy and sleep changes may appear in 2–4 weeks. Measurable biomarker shifts typically require 12–24 weeks of consistent dosing. GlyNAC human trials showed significant glutathione restoration at 24 weeks. Anyone promising overnight results is not credible.',
  },
  {
    id: 'faq7',
    category: 'safety' as const,
    question: 'Can I take TNiC stacks with my medications?',
    answer: 'Potentially — but you must check. NMN may interact with metformin. Resveratrol affects blood clotting. Sulforaphane may affect thyroid medication absorption. Export your stack protocol and review it with your pharmacist or physician before combining with any prescription.',
  },
  {
    id: 'faq8',
    category: 'products' as const,
    question: 'Why only 6 compounds? Other sites recommend dozens.',
    answer: 'More is not better. Each additional compound increases interaction risk and usually means sub-therapeutic doses. TNiC focuses on 6 evidence-graded compounds with the strongest mechanistic coverage across 12 hallmarks. Quality and synergy beat quantity.',
  },
  {
    id: 'faq9',
    category: 'science' as const,
    question: 'What is an Evidence Tier A vs B vs C?',
    answer: 'Tier A: human clinical trial with measured outcomes. Tier B: strong mechanism + emerging human pharmacokinetic data. Tier C: preclinical (animal/cell) only. TNiC builds stacks primarily from Tier A and B compounds and labels everything transparently.',
  },
  {
    id: 'faq10',
    category: 'getting-started' as const,
    question: 'I\'m new to biohacking. Where do I start?',
    answer: 'Follow the 5-step path in the Learn hub (/learn): (1) Run Defense Scan, (2) Review biomarkers, (3) Build your stack, (4) Check safety, (5) Track over 90 days. You do not need to understand NRF2 on day one — the tools guide you.',
  },
  {
    id: 'faq11',
    category: 'safety' as const,
    question: 'What red flags should I watch for in supplement brands?',
    answer: 'Proprietary blends hiding doses, lifespan claims without PubMed links, racemic ALA marketed as premium, NMN without purity certificates, and mega-stacks of 20+ ingredients. TNiC lists all red flags in the Learn hub (/learn) with specific actions to take.',
  },
  {
    id: 'faq12',
    category: 'products' as const,
    question: 'How often does TNiC update recommendations?',
    answer: 'Continuously. When new peer-reviewed trials publish, evidence tiers are re-evaluated. The Research Intel feed surfaces breaking longevity science. Major protocol changes are reflected in the Stack Architect and noted in the Trust Center.',
  },
  {
    id: 'faq13',
    category: 'safety' as const,
    question: 'Is it safe to combine all 6 TNiC compounds at once?',
    answer: 'Starting all 6 simultaneously is not recommended. Ramp in one compound per week so you can attribute any GI or metabolic change to a specific compound. High-priority interactions: resveratrol affects platelet function — avoid if on blood thinners. R-ALA may amplify insulin sensitivity — monitor glucose if diabetic. NMN and rapamycin should not be self-combined without physician oversight. Use the Stack Architect\'s synergy and warning panel — it flags combinations that need physician review.',
  },
  {
    id: 'faq14',
    category: 'science' as const,
    question: 'What is NRF2 and why does TNiC build around it?',
    answer: 'NRF2 is a transcription factor that — when activated — switches on 200+ cytoprotective genes: phase-II detox enzymes, proteasome components, glutathione synthesis genes, and antioxidant response elements. It is the master regulator of cellular defense. Three TNiC compounds target it from different angles: sulforaphane activates it (via KEAP1 modification), GlyNAC supplies the substrate it upregulates (glutathione precursors), and R-ALA recycles the oxidized products. Together they form the NRF2 Defense Triad — the most mechanistically layered single-pathway stack on TNiC.',
  },
  {
    id: 'faq15',
    category: 'products' as const,
    question: 'Why does delivery system (liposomal, phytosome, standard) matter?',
    answer: 'Many compounds have poor aqueous solubility or are degraded before absorption. Liposomal delivery (used for GlyNAC on TNiC) encapsulates compounds in phospholipid vesicles that fuse with cell membranes, bypassing gut degradation. Phytosomes bind polyphenols to phosphatidylcholine, dramatically improving resveratrol and sulforaphane bioavailability. Standard capsules are fine for water-soluble compounds (NMN, Ca-AKG) with inherently high oral bioavailability. For lipophilic compounds like R-ALA, take with a fat-containing meal — the fat itself acts as a delivery vehicle. TNiC\'s product picks are selected partly on delivery format. See the Delivery Systems Library module for full comparison.',
  },
  {
    id: 'faq16',
    category: 'safety' as const,
    question: 'What is rapamycin and should I consider it?',
    answer: 'Rapamycin (sirolimus) is an mTOR inhibitor with the most compelling anti-aging mechanism of any drug studied to date — low-dose intermittent dosing has extended lifespan in every model organism tested, and improved immune function in the first human pilot trial (PMID: 36929855). However, it is a prescription immunosuppressant with real risks: increased infection susceptibility, metabolic side effects, and no established optimal human dosing protocol. TNiC does not recommend self-prescribing rapamycin. If you are interested, seek a longevity-focused physician through AMMG or A4M who can supervise bloodwork and dose titration safely. Your TNiC stack provides overlapping mechanistic benefits (mTOR-adjacent via resveratrol/AMPK, autophagy via NMN/SIRT1) without the prescription risk.',
  },
  {
    id: 'faq17',
    category: 'science' as const,
    question: 'Can cold therapy or sauna replace supplement stacks?',
    answer: 'No — they address different mechanisms and work best combined. Cold exposure activates norepinephrine, brown adipose tissue, and cold-shock proteins (RBM3) that protect synaptic integrity and reduce neuroinflammation. Sauna mimics cardiovascular exercise stress, upregulating heat shock proteins and improving endothelial function. Neither directly restores NAD+, rebuilds glutathione, or drives TCA cycle anaplerosis the way TNiC compounds do. The strongest protocols treat thermal stress as synergistic adjuncts — not replacements. Think of cold/sauna as lifestyle activators of AMPK and heat shock pathways; think of your TNiC stack as mechanistic substrate restoration that thermal stress alone cannot provide.',
  },
  {
    id: 'faq18',
    category: 'science' as const,
    question: 'What is an epigenetic clock and how do I get tested?',
    answer: 'Epigenetic clocks (Horvath, GrimAge, DunedinPACE) measure DNA methylation patterns across thousands of CpG sites to calculate your biological age — the cellular age beneath your chronological birthday. They are the gold standard for measuring whether a longevity protocol is actually working at the cellular level. TruDiagnostic ($300–500) offers the most comprehensive consumer panel, including DunedinPACE (pace of aging) alongside biological age. GlycanAge measures IgG glycan patterns and correlates specifically with immune aging. TNiC\'s OS biological age estimate is a lifestyle-input model — useful for directional feedback before a lab test, not a substitute for a laboratory epigenetic clock. Recommended sequence: use TNiC tools first to establish your protocol, then validate with a clock after 6+ months of consistent adherence.',
  },
  {
    id: 'faq19',
    category: 'safety' as const,
    question: 'How much does sleep actually affect biological aging?',
    answer: 'More than almost any supplement. A 2024 SLEEP Journal study (PMID: 38593841) found adults averaging under 6 hours per night accumulated 1.8 additional years of epigenetic aging per chronological year compared to 7–9 hour sleepers — an effect size larger than most supplement interventions. Sleep is when NAD+-dependent SIRT1 and PARP peak, mitophagy clears damaged mitochondria, and the glymphatic system flushes amyloid precursors. TNiC compounds support the biochemical substrates of sleep quality (NMN→circadian NAD+, resveratrol→evening SIRT1, GlyNAC→overnight glutathione restoration), but no stack overcomes chronic sleep deprivation. Treat sleep as a non-negotiable protocol pillar, not a variable to optimize around.',
  },
  {
    id: 'faq20',
    category: 'products' as const,
    question: 'Should I take these supplements every day or cycle them?',
    answer: 'The clinical evidence base favors consistent daily dosing for most TNiC compounds. GlyNAC trials used uninterrupted 24-week protocols. NMN and Ca-AKG depend on steady-state substrate availability — cycling interrupts the NAD+ and TCA cycle replenishment effect. Sulforaphane can be rotated with cruciferous-rich diet days (broccoli sprouts are a functional equivalent). Resveratrol has limited evidence for periodic high-dose pulsing, but human longevity trial data used daily dosing. R-ALA is most effective taken daily for sustained redox cycling. Unless you are experiencing persistent side effects, daily dosing matches the evidence base that produced the clinical outcomes TNiC references.',
  },
];
