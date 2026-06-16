'use client';

import { usePlatform } from '@/context/PlatformContext';
import { NotebookPen, TrendingUp } from 'lucide-react';
import type { HallmarkLibraryEntry } from '@/lib/types';

export function HallmarkNotesPanel({ hallmark }: { hallmark: HallmarkLibraryEntry }) {
  const { hallmarkNotes, setHallmarkNote, selected } = usePlatform();
  const entry = hallmarkNotes[hallmark.id] ?? { status: 50, notes: '', updatedAt: '' };

  const activeCompounds = hallmark.relatedCompoundIds.filter((id) => selected.includes(id));

  return (
    <div className="gradient-border p-6">
      <div className="flex items-center gap-2 mb-5">
        <NotebookPen className="w-4 h-4 text-emerald-400" />
        <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
          My Results & Notes
        </p>
      </div>

      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <label className="text-xs text-zinc-500">Personal status (how this hallmark feels for you)</label>
          <span className="font-mono text-sm text-emerald-400">{entry.status}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={entry.status}
          onChange={(e) => setHallmarkNote(hallmark.id, { status: Number(e.target.value) })}
          className="w-full age-slider"
        />
        <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-1">
          <span>Critical</span>
          <span>Optimal</span>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-xs text-zinc-500 block mb-2">Private notes (saved locally)</label>
        <textarea
          value={entry.notes}
          onChange={(e) => setHallmarkNote(hallmark.id, { notes: e.target.value })}
          placeholder="Lab results, symptoms, protocol changes, physician feedback…"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400/50 resize-y min-h-[100px]"
        />
        {entry.updatedAt && (
          <p className="text-[10px] text-zinc-600 mt-1">Last updated: {entry.updatedAt.slice(0, 10)}</p>
        )}
      </div>

      <div className="glass rounded-xl p-4 mb-4">
        <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Tracking prompts</p>
        <ul className="space-y-1">
          {hallmark.personalPrompts.map((p) => (
            <li key={p} className="text-xs text-zinc-400 flex items-start gap-2">
              <TrendingUp className="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-4">
        <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Your stack coverage</p>
        {activeCompounds.length > 0 ? (
          <p className="text-xs text-emerald-400">
            {activeCompounds.length} of {hallmark.relatedCompoundIds.length} TNiC compounds active in your stack
          </p>
        ) : (
          <p className="text-xs text-zinc-500">
            No targeting compounds in your active stack.{' '}
            <a href="/#stacks" className="text-cyan-400 hover:underline">Build stack →</a>
          </p>
        )}
        <p className="text-[10px] text-zinc-600 mt-2">
          Biomarkers: {hallmark.biomarkers.join(' · ')}
          {' — '}
          <a href="/#labs" className="text-rose-400 hover:underline">Log in Lab Tracker</a>
        </p>
      </div>
    </div>
  );
}