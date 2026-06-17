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
    status: 'waitlist',
    markers: ['GSH', 'hs-CRP', 'NAD+ metabolites', 'oxLDL', 'AKG'],
    description:
      'At-home or walk-in panel matching TNiC Tier 1 markers — CSV export compatible with Labs hub import format.',
    eta: 'Q3 2026',
  },
  {
    id: 'inflammation-surge',
    name: 'Inflammaging Check',
    status: 'waitlist',
    markers: ['hs-CRP', 'IL-6 (optional)', 'GGT'],
    description: 'Focused panel for NRF2 stack responders — retest at month 3 per testing guide cadence.',
    eta: 'Q3 2026',
  },
  {
    id: 'mito-nad',
    name: 'Mitochondrial + NAD Panel',
    status: 'waitlist',
    markers: ['NAD+ index', 'Fasting glucose', 'Resting HR guidance'],
    description: 'Week-4 NAD+ check bundle for Mito Stack users with wearable sync instructions.',
    eta: 'Q4 2026',
  },
];

export const LAB_PARTNER_WAITLIST_KEY = 'tnic:lab-partner-waitlist';