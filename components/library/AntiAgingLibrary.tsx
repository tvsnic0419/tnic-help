'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Library, Network } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { PageHeader } from '@/components/ui/PageHeader';
import { HallmarkIllustration, HallmarkIllustrationThumb } from '@/components/illustrations/HallmarkIllustration';

import { InterventionExplorer } from './InterventionExplorer';
import { HallmarkNotesPanel } from './HallmarkNotesPanel';
import { usePlatform } from '@/context/PlatformContext';
import { getHubContext } from '@/lib/hub-context';
import { getHallmarkVisual } from '@/lib/hallmark-visuals';

interface AntiAgingLibraryProps {
  /** Use h1 when rendered as dedicated /library page */
  asPageTitle?: boolean;
}

export function AntiAgingLibrary({ asPageTitle = false }: AntiAgingLibraryProps) {
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
    <section
      id="anti-aging-library"
      aria-labelledby="library-heading"
      className="py-16 md:py-24 lg:py-28 bg-background border-b border-border"
    >
      <div className="container-page">
        <PageHeader
          id="library-heading"
          icon={Library}
          eyebrow="Anti-Aging Library"
          title="The 12 Hallmarks of Aging"
          description="Each hallmark explained with visuals, evidence-ranked interventions, PubMed citations, and personal notes. Select a hallmark to explore."
          meta={notedCount > 0 ? `${notedCount} hallmark${notedCount > 1 ? 's' : ''} with personal notes saved locally` : undefined}
          theme="cyan"
          as={asPageTitle ? 'h1' : 'h2'}
          context={getHubContext('library')}
        />

        {/* Systems Map CTA */}
        <div className="flex justify-center mb-6">
          <Link
            href="/library/systems"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-violet glass glass-hover px-5 py-2.5 rounded-full glow-hover-violet transition"
          >
            <Network className="w-4 h-4" />
            Explore Systems Map — cross-hallmark synthesis
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative max-w-lg mx-auto mb-8 md:mb-10">
          <label htmlFor="hallmark-search" className="sr-only">
            Search hallmarks or interventions
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
          <input
            id="hallmark-search"
            type="search"
            placeholder="Search hallmarks or interventions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-base pl-11"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Hallmark selector */}
          <nav className="lg:col-span-4" aria-label="Hallmark list">
            <p className="text-label text-accent-cyan mb-3 hidden lg:block">Select hallmark</p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 max-h-none lg:max-h-[32rem] lg:overflow-y-auto lg:pr-1 scroll-region"
              role="list"
            >
              {filtered.map((h) => {
                const hasNotes = !!hallmarkNotes[h.id]?.notes;
                const isActive = selected === h.id;
                const meta = getHallmarkVisual(h.visual);
                return (
                  <button
                    key={h.id}
                    role="listitem"
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setSelected(h.id)}
                    className={`focus-ring interactive text-left rounded-xl overflow-hidden transition-all ${
                      isActive
                        ? 'ring-1 ring-accent-cyan/40 shadow-lg shadow-accent-cyan/5'
                        : 'glass glass-hover'
                    }`}
                  >
                    {/* Mini illustration thumbnail */}
                    <div className="relative w-full h-20 bg-[#030712]">
                      <HallmarkIllustrationThumb visual={h.visual} className="w-full h-full rounded-none" />
                      {/* Active overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-accent-cyan/8 ring-inset ring-1 ring-accent-cyan/20 rounded-none" />
                      )}
                      {/* Number badge */}
                      <span className="absolute top-1.5 left-2 text-[9px] font-mono tracking-widest" style={{ color: meta.colorVar }} aria-hidden="true">
                        #{h.number}
                      </span>
                      {hasNotes && (
                        <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-accent-emerald" title="Has personal notes" />
                      )}
                    </div>
                    {/* Text below thumbnail */}
                    <div className="p-3 pt-2.5">
                      <h3 className="text-[11px] font-semibold leading-tight text-foreground">{h.title}</h3>
                      {/* Intervention stats */}
                      <div className="flex items-center gap-2 mt-1.5 mb-1.5">
                        <span className="text-[9px] font-mono text-muted-foreground">
                          {h.interventions.length} interventions
                        </span>
                        {h.interventions.filter((i) => i.evidence === 'A').length > 0 && (
                          <span className="text-[9px] font-mono font-semibold text-accent-emerald">
                            {h.interventions.filter((i) => i.evidence === 'A').length}×A
                          </span>
                        )}
                        {h.interventions.some((i) => i.category === 'compound' && i.tnicAvailable) && (
                          <span className="text-[9px] font-mono text-accent-cyan">
                            {h.interventions.filter((i) => i.category === 'compound' && i.tnicAvailable).length} compounds
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-0.5 rounded-full bg-border overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${h.coverage}%`, background: meta.colorVar }} />
                        </div>
                        <span className="text-[9px] font-mono shrink-0" style={{ color: meta.colorVar }}>{h.coverage}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Detail panel */}
          <article className="lg:col-span-8" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="card-elevated overflow-hidden">
                  {/* Full-width illustration header */}
                  <div className="relative w-full h-52 bg-[#030712]">
                    <HallmarkIllustration
                      visual={active.visual}
                      slug={active.slug}
                      coverage={active.coverage}
                      number={active.number}
                      variant="card"
                      className="!rounded-none !aspect-auto w-full h-full"
                    />
                    {/* Gradient fade at bottom for text overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d1117] to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 px-6 pb-4">
                      <p className="text-[10px] font-mono text-muted-foreground tracking-widest">HALLMARK {active.number} OF 12</p>
                    </div>
                  </div>
                  {/* Text content below illustration */}
                  <div className="p-6 md:p-8">
                    <h3 className="heading-section text-2xl md:text-3xl mb-2">{active.title}</h3>
                    <p className="text-body-sm text-muted-foreground mb-3">{active.tagline}</p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">{active.summary}</p>
                    <Link
                      href={`/library/${active.slug}`}
                      className="focus-ring interactive inline-flex items-center gap-2 mt-5 text-sm font-semibold text-accent-cyan hover:text-accent-emerald rounded-md"
                    >
                      Full deep dive + mechanism maps <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <HallmarkNotesPanel hallmark={active} />

                <div>
                  <p className="text-label text-accent-emerald mb-4">Intervention Explorer</p>
                  <InterventionExplorer
                    interventions={active.interventions}
                    hallmarkTitle={active.title}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </section>
  );
}