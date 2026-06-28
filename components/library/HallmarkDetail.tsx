'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Network, FlaskConical, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { HallmarkLibraryEntry } from '@/lib/types';
import { HallmarkVisual } from './HallmarkVisual';
import { InterventionExplorer } from './InterventionExplorer';
import { HallmarkNotesPanel } from './HallmarkNotesPanel';
import { MdxRenderer } from './MdxRenderer';
import { ContextRail } from '@/components/ui/ContextRail';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MedicalDisclaimer } from '@/components/trust/MedicalDisclaimer';
import { getHallmarkContext } from '@/lib/hub-context';
import { SystemsSynthesisView } from './SystemsSynthesisView';
import { HALLMARK_VISUALS } from '@/components/illustrations/HallmarkVisuals';

export function HallmarkDetail({
  hallmark,
  mdxBody,
  illustrationSrc: _illustrationSrc,
}: {
  hallmark: HallmarkLibraryEntry;
  mdxBody: string | null;
  /** Verified server-side path to Canva PNG — undefined falls back to SVG */
  illustrationSrc?: string;
}) {
  const MechanismVisual = HALLMARK_VISUALS[hallmark.id];

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 md:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
            { label: hallmark.title },
          ]}
        />

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
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">{hallmark.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{hallmark.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{hallmark.summary}</p>
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">Mechanism</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.mechanism}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] font-mono text-accent-amber uppercase mb-2">Why it matters</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{hallmark.whyItMatters}</p>
              </div>
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

            <MedicalDisclaimer context="hallmark" />

            {/* Protocol CTA */}
            <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FlaskConical className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">
                    Build a protocol targeting {hallmark.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm">
                    Stack Architect shows synergy scores, dosing windows, and contraindications for compounds that address this hallmark.
                  </p>
                </div>
              </div>
              <Link
                href={`/stacks?hallmark=${hallmark.id}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-emerald text-black text-sm font-bold transition hover:bg-accent-cyan whitespace-nowrap"
              >
                Stack Architect
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}