export interface LabPartnerPanel {
  id: string;
  name: string;
  status: 'waitlist' | 'beta' | 'live';
  markers: string[];
  description: string;
  eta: string;
}

export const labPartnerPanels: LabPartnerPanel[] = [
  {
    id: 'longevity-baseline',
    name: 'Longevity Baseline Panel',
    status: 'beta',
    markers: ['GSH', 'hs-CRP', 'NAD+ metabolites', 'oxLDL', 'AKG'],
    description:
      'Tier 1 panel — import via Partner Beta tab using TNiC Partner v1 CSV/JSON or POST /api/labs/partner-import.',
    eta: 'Import live',
  },
  {
    id: 'inflammation-surge',
    name: 'Inflammaging Check',
    status: 'beta',
    markers: ['hs-CRP', 'IL-6 (optional)', 'GGT'],
    description: 'Focused panel for NRF2 stack responders — partner codes HS-CRP, GSH supported.',
    eta: 'Import live',
  },
  {
    id: 'mito-nad',
    name: 'Mitochondrial + NAD Panel',
    status: 'waitlist',
    markers: ['NAD+ index', 'Fasting glucose', 'Resting HR guidance'],
    description: 'Order-at-home bundle — OAuth order flow ships Q4 2026. NAD_INDEX import supported now.',
    eta: 'Q4 2026',
  },
];

export const LAB_PARTNER_WAITLIST_KEY = 'tnic:lab-partner-waitlist';