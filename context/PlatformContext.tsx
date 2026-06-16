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
import { exportLabsCsv as labsToCsv, type LabEntry } from '@/lib/labs';
import {
  type HallmarkNotesMap,
  type HallmarkPersonalEntry,
  DEFAULT_HALLMARK_ENTRY,
} from '@/lib/hallmark-notes';
import {
  STORAGE_KEYS,
  getPrivacyMode,
  setPrivacyMode as persistPrivacyMode,
  readStorageItem,
  writeStorageItem,
  purgeAllHealthData,
  sanitizeLabEntries,
  hasPrivacyConsent,
  setPrivacyConsent,
  type PrivacyStorageMode,
} from '@/lib/privacy';
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
  privacyMode: PrivacyStorageMode;
  setPrivacyMode: (mode: PrivacyStorageMode) => void;
  purgeAllHealthData: () => void;
  privacyConsent: boolean;
  acceptPrivacyConsent: () => void;
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
  const [privacyMode, setPrivacyModeState] = useState<PrivacyStorageMode>('local');
  const [privacyConsent, setPrivacyConsentState] = useState(false);

  useEffect(() => {
    const fromUrl = readStackFromUrl();
    const mode = getPrivacyMode();
    setPrivacyModeState(mode);

    const stackRaw = readStorageItem<string[]>(STORAGE_KEYS.stack, [], mode);
    const profileRaw = readStorageItem<Profile | null>(STORAGE_KEYS.profile, null, mode);
    const labsRaw = readStorageItem<LabEntry[]>(STORAGE_KEYS.labs, [], mode);
    const checklistRaw = readStorageItem<string[]>(STORAGE_KEYS.checklist, [], mode);
    const notesRaw = readStorageItem<HallmarkNotesMap>(STORAGE_KEYS.hallmarkNotes, {}, mode);

    if (fromUrl) setSelectedState(fromUrl);
    else if (stackRaw.length) {
      setSelectedState(stackRaw.filter((id) => compounds.some((c) => c.id === id)));
    }
    if (profileRaw) setProfileState({ ...DEFAULT_PROFILE, ...profileRaw });
    setLabs(sanitizeLabEntries(labsRaw));
    if (checklistRaw.length) setChecklist(checklistRaw);
    if (Object.keys(notesRaw).length) setHallmarkNotesState(notesRaw);
    setPrivacyConsentState(hasPrivacyConsent());
    setHydrated(true);
  }, []);

  const syncUrl = useCallback((ids: string[]) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('stack', ids.join(','));
    window.history.replaceState({}, '', url.toString());
  }, []);

  const persistLabs = useCallback(
    (next: LabEntry[]) => {
      setLabs(next);
      writeStorageItem(STORAGE_KEYS.labs, next, privacyMode);
    },
    [privacyMode],
  );

  const setSelected = useCallback(
    (ids: string[]) => {
      setSelectedState(ids);
      if (hydrated) {
        syncUrl(ids);
        writeStorageItem(STORAGE_KEYS.stack, ids, privacyMode);
      }
    },
    [hydrated, syncUrl, privacyMode],
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
    writeStorageItem(STORAGE_KEYS.stack, selected, privacyMode);
    syncUrl(selected);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [selected, syncUrl, privacyMode]);

  const setProfile = useCallback(
    (patch: Partial<Profile>) => {
      setProfileState((prev) => {
        const next = { ...prev, ...patch };
        writeStorageItem(STORAGE_KEYS.profile, next, privacyMode);
        return next;
      });
    },
    [privacyMode],
  );

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
      writeStorageItem(STORAGE_KEYS.hallmarkNotes, next, privacyMode);
      return next;
    });
  }, [privacyMode]);

  const toggleChecklist = useCallback(
    (step: string) => {
      setChecklist((prev) => {
        const next = prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step];
        writeStorageItem(STORAGE_KEYS.checklist, next, privacyMode);
        return next;
      });
    },
    [privacyMode],
  );

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
        writeStorageItem(STORAGE_KEYS.profile, next, privacyMode);
      }
      if (Array.isArray(data.labs)) persistLabs(sanitizeLabEntries(data.labs));
      if (data.checklist) {
        setChecklist(data.checklist);
        writeStorageItem(STORAGE_KEYS.checklist, data.checklist, privacyMode);
      }
      if (data.hallmarkNotes) {
        setHallmarkNotesState(data.hallmarkNotes);
        writeStorageItem(STORAGE_KEYS.hallmarkNotes, data.hallmarkNotes, privacyMode);
      }
      return true;
    } catch {
      return false;
    }
  }, [setSelected, persistLabs, privacyMode]);

  const setPrivacyMode = useCallback((mode: PrivacyStorageMode) => {
    persistPrivacyMode(mode);
    setPrivacyModeState(mode);
  }, []);

  const handlePurgeAll = useCallback(() => {
    purgeAllHealthData();
    setSelectedState([...DEFAULT_STACK]);
    setProfileState(DEFAULT_PROFILE);
    setLabs([]);
    setChecklist([]);
    setHallmarkNotesState({});
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('stack');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const acceptPrivacyConsent = useCallback(() => {
    setPrivacyConsent(true);
    setPrivacyConsentState(true);
  }, []);

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
    privacyMode,
    setPrivacyMode,
    purgeAllHealthData: handlePurgeAll,
    privacyConsent,
    acceptPrivacyConsent,
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