import type { PresetKey } from './presets';

export type ResearchImpact = 'breakthrough' | 'clinical' | 'preclinical';

export interface ResearchFeedItem {
  id: string;
  title: string;
  source: string;
  date: string;
  tag: string;
  summary: string;
  pmid: string;
  impact: ResearchImpact;
  relatedHrefs: { label: string; href: string }[];
  presetKey?: PresetKey;
}

export const researchImpactStyles = {
  breakthrough: { color: 'text-accent-amber bg-accent-amber/10', label: 'Breakthrough' },
  clinical: { color: 'text-accent-emerald bg-accent-emerald/10', label: 'Clinical Trial' },
  preclinical: { color: 'text-accent-cyan bg-accent-cyan/10', label: 'Preclinical' },
} as const;