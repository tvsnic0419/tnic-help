'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { compounds, synergyScore, calculateDefenseProfile } from '@/lib/data';
import { stackPresets, type PresetKey } from '@/lib/presets';
import { LABS_STORAGE_KEY, exportLabsCsv as labsToCsv, type LabEntry } from '@/lib/labs';
import {
  HALLMARK_NOTES_KEY,
  type HallmarkNotesMap,
  type HallmarkPersonalEntry,
  DEFAULT_HALLMARK_ENTRY,
} from '@/lib/hallmark-notes';

const STACK_KEY = 'tnic-stack';
const PROFILE_KEY = 'tnic-profile';
const CHECKLIST_KEY = 'tnic-checklist';
const DEFAULT_STACK = stackPresets.starter.ids;

export interface Profile {
  age: number;
  stress: number;
  sleep: number;
  exercise: number;
  scanned: boolean;
}

interface PlatformContextValue {
  selected: string[];
  toggle: (id: string) => void;
  setSelected: (ids: string[]) => void;
  applyPreset: (key: PresetKey) => void;
  score: number;
  selectedCompounds: typeof compounds;
  shareUrl: string;
  saveStack: () => void;
  saved: boolean;
  profile: Profile;
  setProfile: (patch: Partial<Profile>) => void;
  defenseProfile: ReturnType<typeof calculateDefenseProfile>;
  labs: LabEntry[];
  addLab: (markerId: string, value: number, date: string) => void;
  importLabs: (rows: { markerId: string; value: number; date: string }[]) => number;
  removeLab: (id: string) => void;
  clearLabs: () => void;
  exportLabsCsv: () => string;
  checklist: string[];
  toggleChecklist: (step: string) => void;
  hallmarkNotes: HallmarkNotesMap;
  setHallmarkNote: (hallmarkId: string, patch: Partial<HallmarkPersonalEntry>) => void;
  exportAll: () => string;
  importAll: (json: string) => boolean;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

const DEFAULT_PROFILE: Profile = {
  age: 48,
  stress: 55,
  sleep: 60,
  exercise: 45,
  scanned: false,
};

function readStackFromUrl(): string[] | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('stack');
  if (!param) return null;
  const ids = param.split(',').filter((id) => compounds.some((c) => c.id === id));
  return ids.length > 0 ? ids : null;
}

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [selected, setSelectedState] = useState<string[]>([...DEFAULT_STACK]);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);
  const [labs, setLabs] = useState<LabEntry[]>([]);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [hallmarkNotes, setHallmarkNotesState] = useState<HallmarkNotesMap>({});

  useEffect(() => {
    const fromUrl = readStackFromUrl();
    try {
      const stackRaw = localStorage.getItem(STACK_KEY);
      const profileRaw = localStorage.getItem(PROFILE_KEY);
      const labsRaw = localStorage.getItem(LABS_STORAGE_KEY);
      const checklistRaw = localStorage.getItem(CHECKLIST_KEY);
      const hallmarkNotesRaw = localStorage.getItem(HALLMARK_NOTES_KEY);

      if (fromUrl) setSelectedState(fromUrl);
      else if (stackRaw) {
        const ids = JSON.parse(stackRaw) as string[];
        setSelectedState(ids.filter((id) => compounds.some((c) => c.id === id)));
      }
      if (profileRaw) setProfileState({ ...DEFAULT_PROFILE, ...JSON.parse(profileRaw) });
      if (labsRaw) setLabs(JSON.parse(labsRaw));
      if (checklistRaw) setChecklist(JSON.parse(checklistRaw));
      if (hallmarkNotesRaw) setHallmarkNotesState(JSON.parse(hallmarkNotesRaw));
    } catch { /* empty */ }
    setHydrated(true);
  }, []);

  const syncUrl = useCallback((ids: string[]) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('stack', ids.join(','));
    window.history.replaceState({}, '', url.toString());
  }, []);

  const persistLabs = useCallback((next: LabEntry[]) => {
    setLabs(next);
    localStorage.setItem(LABS_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const setSelected = useCallback(
    (ids: string[]) => {
      setSelectedState(ids);
      if (hydrated) {
        syncUrl(ids);
        localStorage.setItem(STACK_KEY, JSON.stringify(ids));
      }
    },
    [hydrated, syncUrl],
  );

  const toggle = useCallback(
    (id: string) => {
      setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
    },
    [selected, setSelected],
  );

  const applyPreset = useCallback(
    (key: PresetKey) => setSelected([...stackPresets[key].ids]),
    [setSelected],
  );

  const saveStack = useCallback(() => {
    localStorage.setItem(STACK_KEY, JSON.stringify(selected));
    syncUrl(selected);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [selected, syncUrl]);

  const setProfile = useCallback((patch: Partial<Profile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addLab = useCallback(
    (markerId: string, value: number, date: string) => {
      persistLabs([...labs, { id: crypto.randomUUID(), markerId, value, date }]);
    },
    [labs, persistLabs],
  );

  const importLabs = useCallback(
    (rows: { markerId: string; value: number; date: string }[]) => {
      const newEntries = rows.map((r) => ({
        id: crypto.randomUUID(),
        markerId: r.markerId,
        value: r.value,
        date: r.date,
      }));
      persistLabs([...labs, ...newEntries]);
      return newEntries.length;
    },
    [labs, persistLabs],
  );

  const removeLab = useCallback(
    (id: string) => persistLabs(labs.filter((e) => e.id !== id)),
    [labs, persistLabs],
  );

  const clearLabs = useCallback(() => persistLabs([]), [persistLabs]);

  const exportLabsCsv = useCallback(() => labsToCsv(labs), [labs]);

  const setHallmarkNote = useCallback((hallmarkId: string, patch: Partial<HallmarkPersonalEntry>) => {
    setHallmarkNotesState((prev) => {
      const next = {
        ...prev,
        [hallmarkId]: {
          ...DEFAULT_HALLMARK_ENTRY,
          ...prev[hallmarkId],
          ...patch,
          updatedAt: new Date().toISOString(),
        },
      };
      localStorage.setItem(HALLMARK_NOTES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleChecklist = useCallback((step: string) => {
    setChecklist((prev) => {
      const next = prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step];
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const exportAll = useCallback(
    () => JSON.stringify({ stack: selected, profile, labs, checklist, hallmarkNotes, exportedAt: new Date().toISOString() }, null, 2),
    [selected, profile, labs, checklist, hallmarkNotes],
  );

  const importAll = useCallback((json: string) => {
    try {
      const data = JSON.parse(json);
      if (data.stack) setSelected(data.stack);
      if (data.profile) {
        const next = { ...DEFAULT_PROFILE, ...data.profile };
        setProfileState(next);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      }
      if (data.labs) persistLabs(data.labs);
      if (data.checklist) {
        setChecklist(data.checklist);
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(data.checklist));
      }
      if (data.hallmarkNotes) {
        setHallmarkNotesState(data.hallmarkNotes);
        localStorage.setItem(HALLMARK_NOTES_KEY, JSON.stringify(data.hallmarkNotes));
      }
      return true;
    } catch {
      return false;
    }
  }, [setSelected, persistLabs]);

  const defenseProfile = useMemo(
    () => calculateDefenseProfile(profile.age, profile.stress, profile.sleep, profile.exercise),
    [profile],
  );

  const selectedCompounds = useMemo(
    () => compounds.filter((c) => selected.includes(c.id)),
    [selected],
  );

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return `https://tnic.help/?stack=${selected.join(',')}`;
    const url = new URL(window.location.href);
    url.searchParams.set('stack', selected.join(','));
    return url.toString();
  }, [selected]);

  const value: PlatformContextValue = {
    selected,
    toggle,
    setSelected,
    applyPreset,
    score: synergyScore(selected),
    selectedCompounds,
    shareUrl,
    saveStack,
    saved,
    profile,
    setProfile,
    defenseProfile,
    labs,
    addLab,
    importLabs,
    removeLab,
    clearLabs,
    exportLabsCsv,
    checklist,
    toggleChecklist,
    hallmarkNotes,
    setHallmarkNote,
    exportAll,
    importAll,
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider');
  return ctx;
}

export function useStack() {
  const p = usePlatform();
  return {
    selected: p.selected,
    toggle: p.toggle,
    setSelected: p.setSelected,
    score: p.score,
    selectedCompounds: p.selectedCompounds,
    shareUrl: p.shareUrl,
    saveStack: p.saveStack,
    saved: p.saved,
    applyPreset: p.applyPreset,
  };
}