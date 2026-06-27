'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FlaskConical, Zap, Clock, Link2 } from 'lucide-react';
import Link from 'next/link';
import type { Compound } from '@/lib/types';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { getHallmarkVisual } from '@/lib/hallmark-visuals';
import { biomarkers } from '@/lib/data';
import { stackInteractions } from '@/lib/stack-analysis';
import { MdxRenderer } from './MdxRenderer';
import { HallmarkIcon } from './HallmarkIcon';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MedicalDisclaimer } from '@/components/trust/MedicalDisclaimer';

const BADGE_META: Record<string, { label: string; color: string; bg: string }> = {
  nrf2:      { label: 'NRF2 Axis',            color: 'var(--accent-emerald)', bg: 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald' },
  mito:      { label: 'Mitochondrial',         color: 'var(--accent-cyan)',    bg: 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan' },
  sirt1:     { label: 'Sirtuin / SIRT1',       color: 'var(--accent-violet)',  bg: 'bg-accent-violet/10 border-accent-violet/30 text-accent-violet' },
  hybrid:    { label: 'Multi-Pathway',          color: 'var(--accent-violet)',  bg: 'bg-accent-violet/10 border-accent-violet/30 text-accent-violet' },
  autophagy: { label: 'Autophagy',             color: 'var(--accent-rose)',    bg: 'bg-accent-rose/10 border-accent-rose/30 text-accent-rose' },
  longevity: { label: 'Longevity / Senolytic', color: 'var(--accent-amber)',   bg: 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber' },
};

const TIMING_LABELS: Record<string, string> = {
  AM: 'Morning (AM)',
  PM: 'Evening (PM)',
  'AM/PM': 'Morning & Evening',
};

function PubMedLink({ pmid }: { pmid: string }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[10px] font-mono text-accent-cyan hover:text-accent-emerald transition-colors"
      aria-label={`Open PMID ${pmid} on PubMed`}
    >
      PMID {pmid}
      <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
    </a>
  );
}

function HallmarkCoverageGrid({ coveredIds }: { coveredIds: string[] }) {
  const coveredSet = new Set(coveredIds);
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan mb-3">
        Hallmarks addressed
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {hallmarkLibrary.map((h) => {
          const covered = coveredSet.has(h.id);
          const meta = getHallmarkVisual(h.visual);
          return (
            <Link
              key={h.id}
              href={`/library/${h.slug}`}
              className={`group rounded-lg p-2 flex flex-col items-center gap-1 transition-all text-center ${
                covered
                  ? 'bg-muted/30 hover:bg-muted/50'
                  : 'opacity-25 pointer-events-none'
              }`}
              tabIndex={covered ? 0 : -1}
              aria-label={`${h.title}${covered ? '' : ' — not targeted'}`}
            >
              <HallmarkIcon
                type={h.visual}
                size={22}
                ring={covered}
                className={covered ? '' : 'grayscale'}
              />
              <span
                className="text-[8px] leading-tight font-mono"
                style={{ color: covered ? meta.colorVar : 'var(--muted-foreground)' }}
              >
                {meta.shortLabel}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="text-[9px] text-muted-foreground mt-2">
        {coveredIds.length} of 12 hallmarks — tap to explore
      </p>
    </div>
  );
}

function SynergyPanel({ compoundId }: { compoundId: string }) {
  const synergies = stackInteractions.filter(
    (i) =>
      i.type === 'synergy' &&
      (i.compoundIds[0] === compoundId || i.compoundIds[1] === compoundId),
  );
  if (synergies.length === 0) return null;

  return (
    <div className="glass rounded-xl p-4">
      <p className="text-[10px] font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5 text-accent-violet">
        <Link2 className="w-3 h-3" /> Synergies
      </p>
      <div className="space-y-2">
        {synergies.map((syn) => {
          const partnerId = syn.compoundIds[0] === compoundId ? syn.compoundIds[1] : syn.compoundIds[0];
          return (
            <div key={syn.compoundIds.join('-')} className="text-xs">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <Link
                  href={`/library/compounds/${partnerId}`}
                  className="font-semibold text-foreground hover:text-accent-violet transition-colors"
                >
                  {syn.title}
                </Link>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">{syn.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonitoringPanel({ compoundId }: { compoundId: string }) {
  const relevant = biomarkers.filter((b) => b.compounds.includes(compoundId));
  if (relevant.length === 0) return null;

  return (
    <div className="glass rounded-xl p-5">
      <p className="text-[10px] font-mono text-accent-emerald uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <FlaskConical className="w-3 h-3" /> Monitoring Biomarkers
      </p>
      <div className="space-y-3">
        {relevant.map((b) => (
          <div key={b.id} className="border-l-2 border-accent-emerald/30 pl-3">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-foreground">{b.name}</span>
              <span className="text-[9px] font-mono text-muted-foreground">{b.unit}</span>
            </div>
            <div className="flex gap-3 mb-1">
              <span className="text-[9px] font-mono text-accent-emerald">Optimal: {b.optimal}</span>
              <span className="text-[9px] font-mono text-accent-rose">Watch: {b.critical}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompoundDetail({
  compound,
  mdxBody,
}: {
  compound: Compound;
  mdxBody: string | null;
}) {
  const badge = BADGE_META[compound.badge] ?? BADGE_META.hybrid;

  const uniqueStudies = compound.studies.filter(
    (s, idx, arr) => arr.findIndex((x) => x.pmid === s.pmid) === idx,
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-6 md:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
            { label: 'Compounds', href: '/library/compounds' },
            { label: compound.name },
          ]}
        />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            {/* Protocol card */}
            <div className="glass rounded-xl p-5 space-y-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  Pathway
                </p>
                <p className="text-sm font-semibold">{compound.pathway}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border ${badge.bg}`}
                >
                  {badge.label}
                </span>
                <EvidenceTag tier={compound.evidence} size="sm" />
              </div>
              <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">
                    Protocol Dose
                  </p>
                  <p className="text-xs font-semibold">{compound.dose}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Timing
                  </p>
                  <p className="text-xs font-semibold">{TIMING_LABELS[compound.timing] ?? compound.timing}</p>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Bioavailability
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${compound.bioavailability}%`, background: badge.color }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: badge.color }}>
                    {compound.bioavailability}%
                  </span>
                </div>
              </div>
            </div>

            <HallmarkCoverageGrid coveredIds={compound.hallmarks} />
            <SynergyPanel compoundId={compound.id} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: badge.color }}>
                {badge.label.toUpperCase()} — {compound.pathway.toUpperCase()}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">{compound.name}</h1>
              <div className="glass rounded-xl p-5 mb-4">
                <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">Mechanism</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{compound.mechanism}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{compound.desc}</p>
            </motion.div>

            {/* Evidence table */}
            {uniqueStudies.length > 0 && (
              <div>
                <p className="text-[10px] font-mono text-accent-amber uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Key Evidence
                </p>
                <div className="space-y-2">
                  {uniqueStudies.map((study) => (
                    <div
                      key={study.pmid}
                      className="glass rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-snug mb-1 text-foreground">
                          {study.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          <span className="font-mono">{study.journal}</span>
                          <span className="mx-1.5 text-muted-foreground/40">·</span>
                          {study.year}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <PubMedLink pmid={study.pmid} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <MonitoringPanel compoundId={compound.id} />

            {mdxBody && (
              <div className="gradient-border p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  <p className="text-[10px] font-mono text-accent-cyan uppercase">
                    Deep Dive — Mechanism & Evidence
                  </p>
                </div>
                <MdxRenderer content={mdxBody} />
              </div>
            )}

            <MedicalDisclaimer context="compound" />

            <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5">
                    Add {compound.name.split(' ')[0]} to Stack Architect
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed max-w-sm">
                    See synergy scores, contraindications, and optimised dosing windows alongside your other compounds.
                  </p>
                </div>
              </div>
              <Link
                href={`/stacks?add=${compound.id}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan text-black text-sm font-bold transition hover:bg-accent-emerald whitespace-nowrap"
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
