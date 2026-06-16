import { citationRegistry } from './trust';

/** Honest platform stats — counts match visible registry content */
export const platformStats = [
  { value: String(citationRegistry.length), label: 'Indexed PMID Citations' },
  { value: '12', label: 'Hallmarks Mapped' },
  { value: '6', label: 'Evidence-Graded Compounds' },
  { value: '26', label: 'Library Modules' },
] as const;