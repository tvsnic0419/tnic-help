'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Library } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { HallmarkVisual } from './HallmarkVisual';
import { InterventionExplorer } from './InterventionExplorer';
import { HallmarkNotesPanel } from './HallmarkNotesPanel';
import { usePlatform } from '@/context/PlatformContext';

export function AntiAgingLibrary() {
  const [selected, setSelected] = useState(hallmarkLibrary[0].id);
  const [query, setQuery] = useState('');
  const { hallmarkNotes } = usePlatform();

  const filtered = useMemo(() => {
    if (!query.trim()) return hallmarkLibrary;
    const q = query.toLowerCase();
    return hallmarkLibrary.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.summary.toLowerCase().includes(q) ||
        h.interventions.some((i) => i.name.toLowerCase().includes(q)),
    );
  }, [query]);

  const active = hallmarkLibrary.find((h) => h.id === selected)!;
  const notedCount = Object.keys(hallmarkNotes).filter((k) => hallmarkNotes[k]?.notes).length;

  return (
    <section id="anti-aging-library" className="py-20 md:py-28 bg-[#030712] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-zinc-300">
            <Library className="w-4 h-4 text-cyan-400" />
            Anti-Aging Library
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            The 12 Hallmarks of Aging
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The definitive reference — each hallmark explained with visuals, evidence-ranked interventions,
            PubMed citations, and personal notes integration. Click any hallmark to explore.
          </p>
          {notedCount > 0 && (
            <p className="text-[10px] font-mono text-emerald-400 mt-3">
              {notedCount} hallmark{notedCount > 1 ? 's' : ''} with personal notes saved locally
            </p>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Search hallmarks or interventions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400/50"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Hallmark grid */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((h) => {
                const hasNotes = !!hallmarkNotes[h.id]?.notes;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelected(h.id)}
                    className={`text-left p-3 rounded-xl transition-all ${
                      selected === h.id
                        ? 'bg-cyan-400/10 border border-cyan-400/30'
                        : 'glass glass-hover'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-zinc-600">#{h.number}</span>
                    <h4 className="font-semibold text-xs mt-0.5 leading-tight">{h.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-mono text-cyan-400">{h.coverage}%</span>
                      {hasNotes && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-mono text-[10px] text-cyan-400 mb-1">HALLMARK {active.number}</p>
                    <h3 className="text-2xl font-bold mb-2">{active.title}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{active.tagline}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{active.summary}</p>
                    <Link
                      href={`/library/${active.slug}`}
                      className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-cyan-400 hover:text-emerald-400 transition"
                    >
                      Full deep dive + MDX <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <HallmarkVisual
                    visual={active.visual}
                    coverage={active.coverage}
                    number={active.number}
                  />
                </div>

                <HallmarkNotesPanel hallmark={active} />

                <div>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-4">
                    Intervention Explorer
                  </p>
                  <InterventionExplorer
                    interventions={active.interventions}
                    hallmarkTitle={active.title}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}