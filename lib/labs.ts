import { biomarkers } from './data';

export interface LabEntry {
  id: string;
  markerId: string;
  value: number;
  date: string;
}

export const LABS_STORAGE_KEY = 'tnic-labs';

export function getLabStatus(markerId: string, value: number): 'optimal' | 'watch' | 'critical' {
  if (markerId === 'hscrp') {
    if (value < 1) return 'optimal';
    if (value <= 3) return 'watch';
    return 'critical';
  }
  if (markerId === 'nad') {
    if (value >= 80) return 'optimal';
    if (value >= 50) return 'watch';
    return 'critical';
  }
  if (markerId === 'gsh') {
    if (value >= 5) return 'optimal';
    if (value >= 3.5) return 'watch';
    return 'critical';
  }
  if (value >= 70) return 'optimal';
  if (value >= 45) return 'watch';
  return 'critical';
}

export function parseOptimalRange(optimal: string): { min: number; max: number } | null {
  const match = optimal.match(/([\d.]+)\s*[–-]\s*([\d.]+)/);
  if (match) return { min: parseFloat(match[1]), max: parseFloat(match[2]) };
  const lt = optimal.match(/<\s*([\d.]+)/);
  if (lt) return { min: 0, max: parseFloat(lt[1]) };
  return null;
}

export function exportLabsCsv(entries: LabEntry[]): string {
  const header = 'date,marker_id,marker_name,value,unit,status';
  const rows = entries.map((e) => {
    const b = biomarkers.find((x) => x.id === e.markerId);
    const status = getLabStatus(e.markerId, e.value);
    return `${e.date},${e.markerId},"${b?.name ?? e.markerId}",${e.value},"${b?.unit ?? ''}",${status}`;
  });
  return [header, ...rows].join('\n');
}

export function isTrendGood(markerId: string, direction: 'up' | 'down'): boolean {
  if (markerId === 'hscrp' || markerId === '8ohdg' || markerId === 'oxldl') return direction === 'down';
  return direction === 'up';
}