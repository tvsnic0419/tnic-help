/**
 * Central registries for content modules and interactive tools.
 * Add new tools or library categories here — routing/UI picks them up automatically.
 */

import type { LibraryModuleCategory } from './library-modules';
import { libraryModules, libraryCategoryMeta } from './library-modules';

export type ToolId = 'simulator' | 'protocol' | 'biomarker' | 'healthspan';

export interface ToolRegistryEntry {
  id: ToolId;
  slug: ToolId;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  keywords: string[];
  evidenceNote: string;
}

export const toolsRegistry: ToolRegistryEntry[] = [
  {
    id: 'simulator',
    slug: 'simulator',
    label: 'Stack Simulator',
    shortLabel: 'Synergy + risk',
    description:
      'Real-time synergy scoring, pair-level interaction checks, age-adjusted dosing, and side-effect risk index.',
    href: '/tools?tab=simulator',
    keywords: ['supplement synergy', 'drug interaction checker', 'stack dosing'],
    evidenceNote: 'Uses Tier A/B compound safety database and published trial dose ranges.',
  },
  {
    id: 'protocol',
    slug: 'protocol',
    label: 'Protocol Builder',
    shortLabel: 'Age + goals → plan',
    description:
      'Input age, goals, lifestyle, and labs → tailored multi-hallmark protocol with AM/PM schedule.',
    href: '/tools?tab=protocol',
    keywords: ['longevity protocol', 'personalized supplement plan', 'hallmarks protocol'],
    evidenceNote: 'Hallmark prioritization from goals + lifestyle + optional lab integration.',
  },
  {
    id: 'biomarker',
    slug: 'biomarker',
    label: 'Biomarker Impact',
    shortLabel: 'Lab interventions',
    description:
      'Ranked compound and lifestyle interventions by evidence-weighted impact on each biomarker.',
    href: '/tools?tab=biomarker',
    keywords: ['biomarker optimization', 'GSH NAD hs-CRP', 'lab interpretation'],
    evidenceNote: 'Impact scores weight evidence tier and mechanistic relevance — not clinical guarantees.',
  },
  {
    id: 'healthspan',
    slug: 'healthspan',
    label: 'Healthspan Estimator',
    shortLabel: '24w projection',
    description:
      'Project healthspan score and biological age over 12–24 weeks from profile, stack, and labs.',
    href: '/tools?tab=healthspan',
    keywords: ['healthspan calculator', 'biological age estimate', 'longevity projection'],
    evidenceNote: 'Educational model based on trial timelines — not a medical prediction.',
  },
];

export function getToolById(id: ToolId): ToolRegistryEntry | undefined {
  return toolsRegistry.find((t) => t.id === id);
}

export function getLibraryCatalog() {
  return {
    categories: libraryCategoryMeta,
    modules: libraryModules,
    counts: {
      compounds: libraryModules.filter((m) => m.category === 'compounds').length,
      synergies: libraryModules.filter((m) => m.category === 'synergies').length,
      lifestyle: libraryModules.filter((m) => m.category === 'lifestyle').length,
      guides: libraryModules.filter((m) => m.category === 'guides').length,
      total: libraryModules.length,
    },
  };
}

export type { LibraryModuleCategory };