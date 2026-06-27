'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Network, ChevronRight, Pill } from 'lucide-react';
import Link from 'next/link';
import type { HallmarkLibraryEntry } from '@/lib/types';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { compounds } from '@/lib/data';
import { HallmarkVisual } from './HallmarkVisual';
import { InterventionExplorer } from './InterventionExplorer';
import { HallmarkNotesPanel } from './HallmarkNotesPanel';
import { MdxRenderer } from './MdxRenderer';
import { ContextRail } from '@/components/ui/ContextRail';
import { getHallmarkContext } from '@/lib/hub-context';
import { SystemsSynthesisView } from './SystemsSynthesisView';
import { HALLMARK_VISUALS } from '@/components/illustrations/HallmarkVisuals';

export function HallmarkDetail({
  hallmark,
  mdxBody,
}: {
  hallmark: HallmarkLibraryEntry;
  mdxBody: string | null;
}) {
  const MechanismVisual = HALLMARK_VISUALS[hallmark.id];

  const idx = hallmarkLibrary.findIndex((h) => h.id === hallmark.id);
  const prev = idx > 0 ? hallmarkLibrary[idx - 1] : null;
  const next = idx < hallmarkLibrary.length - 1 ? hallmarkLibrary[idx + 1] : null;

  const relatedCompounds = hallmark.relatedCompoundIds
    .map((id) => compounds.find((c) => c.id === id))
    .filter(Boolean) as (typeof compounds)[number][];

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 md:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
          <Link href="/library" className="hover:text-foreground transition">Library</Link>
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span className="text-foreground font-medium truncate">{hallmark.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <HallmarkVisual
              visual={hallmark.visual}
              coverage={hallmark.coverage}
              number={hallmark.number}
            />
            {MechanismVisual && (
              <div className="glass rounded-xl overflow-hidden">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider px-4 pt-3 pb-1">
                  Mechanism Diagram
                </p>
                <MechanismVisual className="w-full" />
              </div>
            )}
            <HallmarkNotesPanel hallmark={hallmark} />
          </div>

          <div className="lg:col-span-8 space-y-10">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-mono text-[10px] text-accent-cyan tracking-widest mb-2">
                HALLMARK {hallmark.number} OF 12
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{hallmark.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{hallmark.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{hallmark.summary}</p>
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">Mechanism</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.mechanism}</p>
              </div>
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-[10px] font-mono text-accent-amber uppercase mb-2">Why it matters</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.whyItMatters}</p>
              </div>

              {relatedCompounds.length > 0 && (
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Pill className="w-3.5 h-3.5 text-accent-emerald" aria-hidden="true" />
                    <p className="text-[10px] font-mono text-accent-emerald uppercase">Related Compounds</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relatedCompounds.map((c) => (
                      <Link
                        key={c.id}
                        href={`/library/compounds/${c.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold glass glass-hover text-accent-cyan hover:text-accent-emerald transition focus-ring"
                      >
                        {c.name}
                        <span className="font-mono text-[9px] text-muted-foreground">Tier {c.evidence}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <ContextRail {...getHallmarkContext(hallmark)} theme="cyan" />

            {mdxBody && (
              <div className="gradient-border p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  <p className="text-[10px] font-mono text-accent-cyan uppercase">Deep dive (MDX)</p>
                </div>
                <MdxRenderer content={mdxBody} />
              </div>
            )}

            <div>
              <p className="text-[10px] font-mono text-accent-emerald uppercase tracking-wider mb-4">
                Intervention Explorer — ranked by evidence
              </p>
              <InterventionExplorer
                interventions={hallmark.interventions}
                hallmarkTitle={hallmark.title}
              />
            </div>

            {/* Systems Synthesis */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-accent-violet" />
                  <p className="text-[10px] font-mono text-accent-violet uppercase tracking-wider">
                    System Effects — cross-hallmark synthesis
                  </p>
                </div>
                <Link
                  href="/library/systems"
                  className="text-xs font-semibold text-accent-violet hover:text-accent-violet/80 transition shrink-0"
                >
                  Full Systems Map →
                </Link>
              </div>
              <SystemsSynthesisView hallmarkId={hallmark.id} />
            </div>

            {/* Prev / Next navigation */}
            <nav
              aria-label="Hallmark navigation"
              className="flex items-center justify-between gap-4 pt-6 border-t border-border"
            >
              {prev ? (
                <Link
                  href={`/library/${prev.slug}`}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-cyan transition focus-ring rounded-lg p-1"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-[10px] font-mono uppercase tracking-wider">Previous</span>
                    <span className="font-semibold group-hover:text-accent-cyan transition">{prev.title}</span>
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/library/${next.slug}`}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-cyan transition text-right focus-ring rounded-lg p-1"
                >
                  <span>
                    <span className="block text-[10px] font-mono uppercase tracking-wider">Next</span>
                    <span className="font-semibold group-hover:text-accent-cyan transition">{next.title}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
