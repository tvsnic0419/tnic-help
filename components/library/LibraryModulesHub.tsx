'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Pill, Layers, HeartPulse, FlaskConical } from 'lucide-react';
import {
  libraryModules,
  libraryCategoryMeta,
  getModulePath,
  type LibraryModuleCategory,
} from '@/lib/library-modules';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { PageHeader } from '@/components/ui/PageHeader';

const categoryIcons: Record<LibraryModuleCategory, typeof Pill> = {
  compounds: Pill,
  synergies: Layers,
  lifestyle: HeartPulse,
  guides: FlaskConical,
};

const categoryOrder = (Object.keys(libraryCategoryMeta) as LibraryModuleCategory[]).sort(
  (a, b) => libraryCategoryMeta[a].hubOrder - libraryCategoryMeta[b].hubOrder,
);

export function LibraryModulesHub() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return libraryModules;
    const q = query.toLowerCase();
    return libraryModules.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.outline.some((o) => o.toLowerCase().includes(q)),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<LibraryModuleCategory, typeof libraryModules>();
    categoryOrder.forEach((cat) => map.set(cat, []));
    filtered.forEach((m) => {
      const list = map.get(m.category) ?? [];
      list.push(m);
      map.set(m.category, list);
    });
    return map;
  }, [filtered]);

  return (
    <section
      id="content-modules"
      aria-labelledby="modules-heading"
      className="py-16 md:py-24 bg-[#030712] border-b border-white/[0.06]"
    >
      <div className="container-page">
        <PageHeader
          id="modules-heading"
          icon={FlaskConical}
          eyebrow="Content Modules"
          title="Elite Anti-Aging Library"
          description="Compound deep-dives, synergy guides, lifestyle pillars, and testing protocols — evidence-graded, MDX-ready, with personal tracking templates."
          theme="emerald"
          as="h2"
        />

        <div className="relative max-w-lg mx-auto mb-10">
          <label htmlFor="module-search" className="sr-only">
            Search library modules
          </label>
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="module-search"
            type="search"
            placeholder="Search compounds, synergies, lifestyle, guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-base pl-11"
          />
        </div>

        <div className="space-y-14">
          {categoryOrder.map((category) => {
            const modules = grouped.get(category) ?? [];
            if (modules.length === 0) return null;
            const meta = libraryCategoryMeta[category];
            const Icon = categoryIcons[category];

            return (
              <div key={category}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20 shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="heading-section text-xl md:text-2xl">{meta.label}</h3>
                    <p className="text-body-sm text-zinc-500 mt-1">{meta.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {modules.map((mod) => (
                    <Link
                      key={mod.slug}
                      href={getModulePath(mod)}
                      className="focus-ring interactive card-elevated p-5 flex flex-col h-full group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <EvidenceTag tier={mod.evidenceTier} size="sm" />
                        {mod.requiresDisclaimer && (
                          <span className="text-[10px] font-mono text-amber-400">Rx</span>
                        )}
                      </div>
                      <h4 className="heading-card mb-1 group-hover:text-cyan-400 transition-colors">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mb-3">{mod.tagline}</p>
                      <p className="text-body-sm flex-1">{mod.summary.slice(0, 120)}…</p>
                      <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-cyan-400 group-hover:text-emerald-400">
                        Deep dive <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}