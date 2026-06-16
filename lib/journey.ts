export const journeyMilestones = [
  {
    date: '2024 Q1',
    title: 'Health Reset Trigger',
    type: 'personal' as const,
    desc: 'Recovering from burnout and metabolic decline. Started tracking sleep, hs-CRP, and subjective energy daily.',
    metric: null,
  },
  {
    date: '2024 Q3',
    title: 'GlyNAC Protocol Begins',
    type: 'experiment' as const,
    desc: 'N=1 trial: 600mg glycine + 600mg NAC daily. Targeting glutathione restoration based on Kumar et al. human trials.',
    metric: 'Glutathione ↑ (subjective recovery)',
  },
  {
    date: '2025 Q1',
    title: 'NRF2 Stack Formalized',
    type: 'protocol' as const,
    desc: 'Added sulforaphane + R-ALA. Built first synergy matrix mapping compounds to hallmarks of aging.',
    metric: '3-compound NRF2 stack',
  },
  {
    date: '2025 Q3',
    title: 'Mitochondrial Layer Added',
    type: 'experiment' as const,
    desc: 'Introduced NMN + Ca-AKG after baseline labs. NAD+ pathway prioritized based on age-related decline data.',
    metric: 'NAD+ precursor stack',
  },
  {
    date: '2026 Q2',
    title: 'TNiC Platform Launch',
    type: 'platform' as const,
    desc: 'Opened tools publicly: Stack Architect, Bio Age calculator, biomarker projections. Radical transparency — modeled vs. lab data always labeled.',
    metric: 'tnic.help live',
  },
];

export const starterStack = {
  name: 'TNiC Starter Defense Stack',
  subtitle: 'Evidence-graded entry protocol for adults 35+',
  compounds: [
    { name: 'GlyNAC ET', dose: '600mg glycine + 600mg NAC', timing: 'AM', tier: 'A', why: 'Restores glutathione — depleted 10–15% per decade' },
    { name: 'Sulforaphane', dose: '10–35mg glucoraphanin', timing: 'AM', tier: 'A', why: 'Activates NRF2 — master antioxidant gene switch' },
    { name: 'NMN', dose: '250–500mg', timing: 'AM', tier: 'A', why: 'Replenishes NAD+ — declines ~50% by age 60' },
  ],
  disclaimer: 'Educational template only. Consult your physician. Adjust based on your labs, medications, and tolerance.',
};