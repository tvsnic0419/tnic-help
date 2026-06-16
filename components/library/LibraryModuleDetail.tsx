'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Layers, FlaskConical, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { LibraryModule } from '@/lib/library-modules';
import { libraryCategoryMeta } from '@/lib/library-modules';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { compounds } from '@/lib/data';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { MdxRenderer } from './MdxRenderer';

export function LibraryModuleDetail({
  module,
  mdxBody,
}: {
  module: LibraryModule;
  mdxBody: string | null;
}) {
  const categoryMeta = libraryCategoryMeta[module.category];
  const relatedHallmarks = hallmarkLibrary.filter((h) => module.relatedHallmarkIds.includes(h.id));
  const relatedCompound = module.compoundId ? compounds.find((c) => c.id === module.compoundId) : null;
  const synergyCompounds = module.synergyCompoundIds
    ?.map((id) => compounds.find((c) => c.id === id))
    .filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/library#content-modules"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-cyan-400 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-6">
            <div className="card-elevated p-6">
              <p className="text-[10px] font-mono text-cyan-400 tracking-widest mb-2 uppercase">
                {categoryMeta.label}
              </p>
              <EvidenceTag tier={module.evidenceTier} size="lg" className="mb-4" />
              <h2 className="text-lg font-bold mb-4">Module outline</h2>
              <ol className="space-y-2">
                {module.outline.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-400">
                    <span className="text-cyan-400 font-mono text-xs shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {relatedHallmarks.length > 0 && (
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] font-mono text-violet-400 uppercase mb-3">Related hallmarks</p>
                <ul className="space-y-2">
                  {relatedHallmarks.map((h) => (
                    <li key={h.id}>
                      <Link
                        href={`/library/${h.slug}`}
                        className="text-sm text-zinc-400 hover:text-cyan-400 transition"
                      >
                        #{h.number} {h.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedCompound && (
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] font-mono text-emerald-400 uppercase mb-3">TNiC compound</p>
                <p className="text-sm font-semibold text-white">{relatedCompound.name}</p>
                <p className="text-xs text-zinc-500 mt-1">{relatedCompound.dose} · {relatedCompound.timing}</p>
                <Link href="/stacks" className="text-xs text-cyan-400 hover:text-emerald-400 mt-3 inline-block">
                  Add to stack →
                </Link>
              </div>
            )}

            {synergyCompounds.length > 0 && (
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] font-mono text-emerald-400 uppercase mb-3">Stack compounds</p>
                <ul className="space-y-2">
                  {synergyCompounds.map((c) => (
                    <li key={c!.id} className="text-sm text-zinc-400">
                      {c!.name}
                    </li>
                  ))}
                </ul>
                <Link href="/stacks" className="text-xs text-cyan-400 hover:text-emerald-400 mt-3 inline-block">
                  Open Stack Architect →
                </Link>
              </div>
            )}

            {module.relatedSynergySlugs && module.relatedSynergySlugs.length > 0 && (
              <div className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <p className="text-[10px] font-mono text-cyan-400 uppercase">Related synergies</p>
                </div>
                <ul className="space-y-2">
                  {module.relatedSynergySlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/library/synergies/${slug}`}
                        className="text-sm text-zinc-400 hover:text-cyan-400 transition"
                      >
                        {slug.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/labs"
              className="focus-ring interactive flex items-center gap-3 glass glass-hover rounded-xl p-4"
            >
              <FlaskConical className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Labs hub</p>
                <p className="text-xs text-zinc-500">Track biomarkers for this module</p>
              </div>
            </Link>
          </aside>

          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{module.title}</h1>
              <p className="text-lg text-zinc-400 mb-4">{module.tagline}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{module.summary}</p>
            </motion.div>

            {module.requiresDisclaimer && (
              <div className="rounded-xl p-5 border border-amber-400/30 bg-amber-400/5 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-200 mb-1">Prescription / educational only</p>
                  <p className="text-sm text-zinc-400">
                    This module is for informed physician discussions. TNiC does not prescribe or recommend self-medication.{' '}
                    <Link href="/trust/disclaimers" className="text-cyan-400 hover:text-emerald-400">
                      Read disclaimers
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {mdxBody ? (
              <div className="gradient-border p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <p className="text-[10px] font-mono text-cyan-400 uppercase">Deep dive</p>
                </div>
                <MdxRenderer content={mdxBody} />
              </div>
            ) : (
              <div className="glass rounded-xl p-8 text-center text-zinc-500">
                Content module in progress. Outline available in sidebar.
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                href="/stacks"
                className="focus-ring interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-sm font-semibold text-cyan-400 hover:bg-cyan-400/20"
              >
                Build your stack
              </Link>
              <Link
                href="/labs"
                className="focus-ring interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-semibold text-zinc-300"
              >
                Open Labs hub
              </Link>
              <Link
                href="/trust"
                className="focus-ring interactive inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-sm font-semibold text-zinc-300"
              >
                Evidence methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}