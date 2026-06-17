export interface BuyerGuideChecklist {
  id: string;
  label: string;
  detail: string;
}

export interface BuyerGuideDoseAnchor {
  label: string;
  dose: string;
  pmid?: string;
  note?: string;
}

export interface CompoundBuyerGuide {
  compoundId: string;
  title: string;
  tagline: string;
  /** What the label must say — form chemistry matters */
  formRequirements: string[];
  coaDemands: BuyerGuideChecklist[];
  doseAnchors: BuyerGuideDoseAnchor[];
  redFlags: string[];
  /** Neutral sourcing note — no brand endorsements */
  sourcingNote: string;
  relatedCompareSlug?: string;
}

export const compoundBuyerGuides: CompoundBuyerGuide[] = [
  {
    compoundId: 'nmn',
    title: 'NMN buyer guide',
    tagline: 'NAD+ precursor — verify stabilized form and trial-matched dose',
    formRequirements: [
      'β-Nicotinamide mononucleotide (NMN), not nicotinamide riboside (NR) unless you chose NR intentionally',
      'Stabilized capsule or cold-chain if label requires refrigeration',
      'No niacin (nicotinic acid) masquerading as NAD+ support — flushing means wrong molecule',
    ],
    coaDemands: [
      { id: 'purity', label: '≥98% purity', detail: 'Third-party HPLC on batch; identity confirmed as β-NMN' },
      { id: 'heavy-metals', label: 'Heavy metals panel', detail: 'Lead, arsenic, cadmium, mercury within USP limits' },
      { id: 'micro', label: 'Microbial limits', detail: 'TPC, yeast/mold, E. coli absent' },
      { id: 'nad-metabolite', label: 'Optional NAD metabolite assay', detail: 'Some labs verify NMN → NAD+ conversion in vitro' },
    ],
    doseAnchors: [
      { label: 'Igarashi RCT', dose: '250 mg/day', pmid: '36482258', note: '12 weeks, raised blood NAD+' },
      { label: 'Liao RCT', dose: '250 mg/day', pmid: '33443990', note: '12 weeks, metabolite elevation' },
      { label: 'Common titration', dose: '250 → 500 mg/day', note: 'Week 12 if flat NAD+ index' },
    ],
    redFlags: [
      'Proprietary blend hiding actual NMN mg per capsule',
      'NR sold as "NMN alternative" without disclosing different molecule',
      'Dose below 200 mg with "clinical strength" marketing',
      'No batch COA or expired certificate (>12 months old)',
      'Combined high-dose NR + NMN without physician oversight',
    ],
    sourcingNote:
      'TNiC does not sell or affiliate. Demand batch-specific COA from any supplier. Match published trial doses before judging efficacy.',
    relatedCompareSlug: 'nmn-vs-nr',
  },
  {
    compoundId: 'glynac',
    title: 'GlyNAC buyer guide',
    tagline: 'Dual-precursor glutathione — ratio and elemental weights matter',
    formRequirements: [
      'Combined glycine + N-acetylcysteine (NAC) in one product OR separate verified doses',
      'Elemental glycine and NAC weights — not "proprietary blend"',
      'NAC as free acid or stable salt; avoid racemic mystery powders',
    ],
    coaDemands: [
      { id: 'ratio', label: '1:1 glycine:NAC ratio', detail: 'Matches Kumar trial design (600 mg + 600 mg)' },
      { id: 'identity', label: 'Identity confirmation', detail: 'FTIR or HPLC for both actives' },
      { id: 'sulfur', label: 'Sulfur odor acceptable', detail: 'Fresh NAC smells — extreme rancidity suggests degradation' },
      { id: 'fillers', label: 'Excipient disclosure', detail: 'No hidden niacin or alpha-lipoic acid "boosters" changing stack math' },
    ],
    doseAnchors: [
      { label: 'Kumar RCT', dose: '600 mg glycine + 600 mg NAC', pmid: '34129059', note: '24 weeks, restored GSH' },
      { label: 'Follow-up trial', dose: 'Same ratio', pmid: '36656670', note: 'Mitochondrial function improved' },
      { label: 'Entry titration', dose: '300+300 → 600+600', note: 'GI tolerance week 1–2' },
    ],
    redFlags: [
      'Liposomal glutathione marketed as equivalent — different molecule, weaker human longevity data',
      'NAC-only product labeled "glutathione support" without glycine',
      'Underdosed glycine (<400 mg) with inflated NAC',
      'No GSH retest plan — buying blind without week-12 draw',
    ],
    sourcingNote:
      'The evidence unit is GlyNAC together. If buying separately, weigh both on a scale and log combined dose.',
    relatedCompareSlug: 'glynac-vs-liposomal-glutathione',
  },
  {
    compoundId: 'sulforaphane',
    title: 'Sulforaphane buyer guide',
    tagline: 'NRF2 switch — glucoraphanin + myrosinase activation is non-negotiable',
    formRequirements: [
      'Glucoraphanin (GR) content in mg OR verified sulforaphane yield',
      'Myrosinase enzyme co-packaged OR explicit sprout/extract with active myrosinase',
      'Broccoli seed extract alone without conversion pathway is insufficient',
    ],
    coaDemands: [
      { id: 'gr-content', label: 'Glucoraphanin per serving', detail: '10–35 mg GR aligns with human NRF2 activation studies' },
      { id: 'myrosinase', label: 'Myrosinase activity', detail: 'Must convert GR → sulforaphane in gut or capsule' },
      { id: 'stability', label: 'Stability data', detail: 'Isothiocyanates degrade — check manufacture date' },
      { id: 'nitrile', label: 'Low nitrile byproducts', detail: 'Quality extracts minimize inactive nitriles' },
    ],
    doseAnchors: [
      { label: 'Airway NRF2 study', dose: '~40 μmol SFN dose equivalent', pmid: '27356680', note: 'Broccoli sprout extract' },
      { label: 'Practical GR range', dose: '10–35 mg glucoraphanin', note: 'With active myrosinase' },
      { label: 'Stack pairing', dose: 'AM with GlyNAC', note: 'Substrate before gene switch' },
    ],
    redFlags: [
      'Broccoli powder with no GR/mysrosinase quantification',
      'Curcumin-only NRF2 claim — different pathway, weaker KEAP1 covalent modification',
      'Proprietary "SFN complex" with undisclosed mg',
      'Expecting CRP drop in <4 weeks without lifestyle compliance',
    ],
    sourcingNote:
      'Heat destroys myrosinase in cooked broccoli. Supplements must solve the conversion problem explicitly.',
    relatedCompareSlug: 'sulforaphane-vs-curcumin',
  },
  {
    compoundId: 'resveratrol',
    title: 'Trans-resveratrol buyer guide',
    tagline: 'SIRT1 activator — trans isomer, fat pairing, PM timing',
    formRequirements: [
      'Trans-resveratrol ≥98% — not cis-resveratrol dominant',
      'Micronized or lipid-resolved for absorption',
      'Not red wine extract with unknown resveratrol fraction',
    ],
    coaDemands: [
      { id: 'trans', label: 'Trans-resveratrol %', detail: 'HPLC trans vs cis ratio on batch' },
      { id: 'purity', label: '≥98% purity', detail: 'Emodin and heavy metals within spec' },
      { id: 'dose', label: 'Per-capsule dose stated', detail: '150–500 mg trans-resveratrol per PM dose' },
      { id: 'stability', label: 'Light protection', detail: 'Opaque packaging — photodegradation to cis form' },
    ],
    doseAnchors: [
      { label: 'SIRT1 pairing', dose: '150–500 mg PM', note: 'With fat-containing meal' },
      { label: 'With NMN', dose: 'NMN AM + resveratrol PM', note: 'Fuel before activator' },
      { label: 'Trial-informed ceiling', dose: '≤500 mg/day', note: 'Higher doses rarely improve outcomes in humans' },
    ],
    redFlags: [
      'Polygonum cuspidatum extract with no trans% disclosure',
      'Combined with high-dose quercetin without interaction awareness',
      'Taken fasted AM — poor absorption, GI distress',
      'Pterostilbene sold as identical — see compare guide',
    ],
    sourcingNote:
      'Resveratrol activates SIRT1; NMN fuels it. Buy both to trial standard only if running the SIRT1 pair stack.',
    relatedCompareSlug: 'resveratrol-vs-pterostilbene',
  },
  {
    compoundId: 'cakg',
    title: 'Ca-AKG buyer guide',
    tagline: 'Alpha-ketoglutarate — calcium salt stability and TCA/epigenetic dose',
    formRequirements: [
      'Calcium alpha-ketoglutarate (Ca-AKG) — not plain AKG powder confused with sports beta-alanine products',
      'Elemental AKG dose per serving in grams',
      'Stable salt form with low moisture exposure',
    ],
    coaDemands: [
      { id: 'akg-content', label: 'AKG content per serving', detail: '1–2 g AKG equivalent per day in mouse/human discussions' },
      { id: 'ca-ratio', label: 'Calcium balance', detail: 'Factor total daily calcium if on other Ca supplements' },
      { id: 'purity', label: '≥98% purity', detail: 'Identity as calcium 2-oxopentanedioate' },
      { id: 'batch', label: 'Batch COA', detail: 'Mouse lifespan paper used specific purity — demand same rigor' },
    ],
    doseAnchors: [
      { label: 'Mouse lifespan', dose: '~1–2 g AKG equivalent', pmid: '33027664', note: 'Median lifespan extension' },
      { label: 'Human pilot', dose: '1–2 g/day Ca-AKG', pmid: '38247127', note: 'Middle-aged adults' },
      { label: 'Stack timing', dose: 'AM with breakfast', note: 'Pairs with NMN in NAD+ Mito Stack' },
    ],
    redFlags: [
      'AKG bundled in underdosed "longevity blends"',
      'Confusion with glutamine or glutamate products',
      'No epigenetic clock or AKG metabolite retest at 6 months',
      'Stacking with warfarin or calcium channel blockers without physician review',
    ],
    sourcingNote:
      'Ca-AKG is accessed via the NAD+ Mito Stack synergy guide — not a standalone TNiC toggle. Verify dose against stack math.',
    relatedCompareSlug: 'nrf2-triad-vs-mito-stack',
  },
  {
    compoundId: 'tudca',
    title: 'TUDCA buyer guide',
    tagline: 'ER stress chaperone — verify TUDCA identity and hepatoprotection panel',
    formRequirements: [
      'Tauroursodeoxycholic acid (TUDCA) — not UDCA alone unless intentional',
      'Vegan capsule if bile acid sourcing matters to you',
      'Powder or capsule with mg per serving — not "liver support blend"',
    ],
    coaDemands: [
      { id: 'identity', label: 'TUDCA identity', detail: 'HPLC confirms taurine-conjugated UDCA' },
      { id: 'purity', label: '≥98% purity', detail: 'Bile acid contaminants below spec' },
      { id: 'heavy', label: 'Heavy metals', detail: 'Especially important for bile-derived sources' },
      { id: 'micro', label: 'Microbial limits', detail: 'Standard USP panel' },
    ],
    doseAnchors: [
      { label: 'Entry dose', dose: '250–500 mg/day', note: 'Titrate GI tolerance' },
      { label: 'Common range', dose: '500–1000 mg/day', note: '8–12 week proteostasis trial' },
      { label: 'Ceiling', dose: '≤1500 mg/day', note: 'Loose stool = reduce dose' },
    ],
    redFlags: [
      'Generic "liver detox" blend with undisclosed TUDCA mg',
      'UDCA substituted without label clarity',
      'No baseline ALT/AST before 8-week trial',
      'Gallstone history without physician clearance',
    ],
    sourcingNote:
      'TUDCA is library-only on TNiC. Run liver panel at baseline and week 8 — see elevated TUDCA module.',
  },
  {
    compoundId: 'rapamycin',
    title: 'Rapamycin sourcing guide (Rx only)',
    tagline: 'Prescription sirolimus — physician-managed, never research-chemical DIY',
    formRequirements: [
      'Pharmaceutical sirolimus (Rapamune or equivalent) via licensed prescriber',
      'Never "research grade" rapamycin for human consumption',
      'Verified tablet strength (mg) from pharmacy — not compounded mystery doses',
    ],
    coaDemands: [
      { id: 'rx', label: 'Valid prescription', detail: 'Off-label longevity use still requires licensed prescriber' },
      { id: 'lot', label: 'Pharmacy lot traceability', detail: 'Standard drug supply chain — not supplement COA' },
      { id: 'dose', label: 'Documented pulse schedule', detail: 'Weekly pulse common in longevity discussions — physician sets' },
      { id: 'monitor', label: 'Monitoring plan signed', detail: 'CBC, lipids, glucose, infection vigilance' },
    ],
    doseAnchors: [
      { label: 'Mouse lifespan', dose: 'Continuous low dose', pmid: '19587683', note: 'Not directly translatable to humans' },
      { label: 'Human pulse (discussion)', dose: '3–6 mg weekly', note: 'Physician-supervised only — not TNiC recommendation' },
      { label: 'Mannick immune study', dose: 'Low-dose mTOR inhibition', pmid: '25540326', note: 'Different paradigm than transplant dosing' },
    ],
    redFlags: [
      'Any non-pharmacy source offering sirolimus',
      'Continuous daily dosing without immunosuppression monitoring',
      'Skipping CBC/lipids because "longevity dose is low"',
      'Live vaccines during active rapamycin use',
    ],
    sourcingNote:
      'TNiC documents evidence for physician conversations only. The only acceptable source is a licensed prescriber and pharmacy.',
  },
];

export function getBuyerGuide(compoundId: string): CompoundBuyerGuide | undefined {
  return compoundBuyerGuides.find((g) => g.compoundId === compoundId);
}

export function getBuyerGuideByModuleSlug(slug: string): CompoundBuyerGuide | undefined {
  return compoundBuyerGuides.find((g) => g.compoundId === slug);
}