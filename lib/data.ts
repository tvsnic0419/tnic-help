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
  { href: '/stacks', label: 'Stacks', mod: 'MOD-ARC-04' },
  { href: '/labs', label: 'Labs', mod: 'MOD-LAB-11' },
  { href: '/tools', label: 'Tools', mod: 'MOD-TOL-14' },
  { href: '/trust', label: 'Trust', mod: 'MOD-TRU-08' },
];

export const communityPulse = [
  { metric: '6', label: 'Evidence-Graded Compounds' },
  { metric: '12', label: 'Hallmarks Explained' },
  { metric: '12', label: 'FAQ Answers' },
  { metric: '10', label: 'Glossary Terms' },
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
    desc: 'Mouse studies show 12–14% median lifespan extension. Supports collagen synthesis and calcium signaling.',
    badge: 'mito',
    bioavailability: 88,
    evidence: 'A',
    dose: '1–2g Ca-AKG',
    timing: 'AM',
    synergies: ['nmn', 'resveratrol'],
    hallmarks: ['epigenetic', 'mito', 'stem'],
    studies: [
      { title: 'Alpha-ketoglutarate extends lifespan in mice', journal: 'Cell Metab', year: 2020, pmid: '33027664' },
      { title: 'AKG supplementation in middle-aged adults', journal: 'Aging Cell', year: 2024, pmid: '38247127' },
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
    desc: 'Micronized trans-resveratrol achieves 3–5× higher plasma levels. Pairs synergistically with NAD+ precursors.',
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
    desc: 'TCA cycle intermediate. Correlates with epigenetic age.',
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
    desc: 'Track glutathione, NAD+, hs-CRP, and biological age markers over time.',
    specs: ['Lab integration API', 'Trend analysis', 'Protocol auto-adjustment', 'PDF clinician reports'],
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
    expectations: ['GlyNAC trials showed significant glutathione restoration at 24 weeks — early lab shifts possible at 12', 'Energy and exercise recovery often noticeably improved', 'Inflammation markers (hs-CRP) may trend downward'],
    realistic: true,
  },
  {
    week: 'Week 24+',
    title: 'Clinical Benchmark',
    expectations: ['GlyNAC human trials: restored glutathione, improved mitochondrial function, reduced oxidative stress', 'NAD+ restoration effects compound with consistent NMN dosing', 'Biological age estimates may show 1–3 year improvement with full protocol adherence'],
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
    question: 'Is it safe to combine these compounds together?',
    answer: 'These compounds have good individual safety profiles in published literature. Individual responses vary and interactions with medications are possible. Always consult a qualified healthcare provider before starting any supplementation protocol, especially if you take prescription medications or have existing health conditions. Use the Stack Builder\'s interaction checker for compound-specific flags.',
  },
  {
    id: 'faq14',
    category: 'science' as const,
    question: 'What is NRF2 and why does it matter for aging?',
    answer: 'NRF2 is a transcription factor that activates your cells\' built-in antioxidant and detoxification systems. When triggered, it upregulates 200+ defense genes — including those producing glutathione, catalase, and superoxide dismutase. Declining NRF2 activity with age directly correlates with increased oxidative stress and inflammaging, two core drivers of the 12 hallmarks of aging.',
  },
  {
    id: 'faq15',
    category: 'science' as const,
    question: 'What is the difference between liposomal, phytosome, and NLC delivery?',
    answer: 'Liposomes: good absorption, widely available, variable quality. Phytosomes: strong molecular bond with plant compounds, clinically studied (Meriva, Siliphos), best for polyphenols. NLCs (Nanostructured Lipid Carriers): highest stability, controlled release, best for lipophilic compounds like sulforaphane and fisetin. For most longevity compounds, phytosomes and NLCs offer the best bioavailability-to-cost ratio. See the Delivery Systems guide in the Library.',
  },
];