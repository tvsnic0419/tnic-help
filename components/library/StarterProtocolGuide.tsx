'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, FlaskConical, Zap, Clock, BarChart3, TestTube, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import { MedicalDisclaimer } from '@/components/trust/MedicalDisclaimer';

// ─── Data ────────────────────────────────────────────────────────────────────

const FOUNDATION = [
  {
    id: 'glynac',
    name: 'GlyNAC',
    pathway: 'Glutathione Synthesis',
    badge: 'NRF2',
    badgeColor: '#10b981',
    lq: 78,
    lqColor: '#22d3ee',
    evidence: 'A' as const,
    dose: '600mg glycine + 600mg NAC',
    timing: 'AM — with breakfast',
    mechanism: 'Supplies both rate-limiting substrates for glutathione synthesis, rebuilding a triad depleted ~10–15% per decade. Three independent RCTs confirm restoration of GSH, mitochondrial function, and oxidative balance within 16–24 weeks.',
    pmids: ['34129059', '36656670', '35975308'],
    accentColor: 'var(--accent-emerald)',
    accentHex: '#10b981',
    hallmarks: ['Mitochondrial Dysfunction', 'Oxidative Stress', 'Proteostasis Loss'],
    why: 'Glutathione (GSH) is the body\'s master antioxidant — and it declines with age faster than any other longevity biomarker. GlyNAC is the only compound with three human RCTs directly demonstrating multi-hallmark reversal at physiological doses.',
  },
  {
    id: 'nmn',
    name: 'NMN',
    pathway: 'NAD+ Restoration',
    badge: 'Mito',
    badgeColor: '#22d3ee',
    lq: 75,
    lqColor: '#22d3ee',
    evidence: 'A' as const,
    dose: '500mg NMN',
    timing: 'AM — fasted or before breakfast',
    mechanism: 'Direct NAD+ precursor bypassing rate-limiting NAMPT. Restores NAD+ pools, activating SIRT1/3 deacetylases, PARP-mediated DNA repair, and mitophagy signaling. NAD+ declines ~50% between ages 40–60.',
    pmids: ['36482258', '33888596', '29514064'],
    accentColor: 'var(--accent-cyan)',
    accentHex: '#22d3ee',
    hallmarks: ['Mitochondrial Dysfunction', 'Genomic Instability', 'Epigenetic Drift', 'Cellular Senescence'],
    why: 'The NAD+ decline is one of the most well-characterized aging changes in biochemistry. NMN is the most direct, bioavailable precursor — Science-published RCT data confirms skeletal muscle insulin sensitivity improvement in prediabetic adults at 250mg/day.',
  },
  {
    id: 'sulforaphane',
    name: 'Sulforaphane',
    pathway: 'NRF2 Activation',
    badge: 'NRF2',
    badgeColor: '#10b981',
    lq: 72,
    lqColor: '#10b981',
    evidence: 'A' as const,
    dose: '10–35mg glucoraphanin equiv.',
    timing: 'AM — fasted, 30 min before food',
    mechanism: 'Isothiocyanate that covalently modifies KEAP1, releasing NRF2 to translocate into the nucleus and activate 200+ cytoprotective genes including GST, NQO1, HO-1, and GCLC.',
    pmids: ['18454171', '27356680', '38772511'],
    accentColor: 'var(--accent-emerald)',
    accentHex: '#10b981',
    hallmarks: ['Genomic Instability', 'Chronic Inflammation', 'Proteostasis Loss'],
    why: 'Sulforaphane\'s NRF2 activation upregulates the enzymes that synthesize glutathione — directly amplifying GlyNAC\'s effect. It\'s the upstream gene switch; GlyNAC is the substrate supply. Together they create a dual-layer antioxidant defense no single compound achieves.',
  },
] as const;

const SYNERGIES = [
  {
    a: 'GlyNAC',
    b: 'Sulforaphane',
    score: 9,
    title: 'GSH substrate + NRF2 enzyme induction',
    detail: 'GlyNAC supplies glycine and NAC (the rate-limiting substrates for glutathione). Sulforaphane activates NRF2 → GCLC/GCLM enzyme expression. Together: more substrate AND more enzyme = geometric GSH amplification.',
    color: '#10b981',
  },
  {
    a: 'NMN',
    b: 'GlyNAC',
    score: 7,
    title: 'NAD+ restoration + mitochondrial redox protection',
    detail: 'NMN rebuilds NAD+ pools, fueling SIRT3-mediated mitochondrial deacetylation. GlyNAC\'s GSH protects those same mitochondria from ROS. These work on complementary mitochondrial axes — energetics vs. protection.',
    color: '#22d3ee',
  },
  {
    a: 'NMN',
    b: 'Sulforaphane',
    score: 6,
    title: 'Epigenetic clock + oxidative gene regulation',
    detail: 'NMN → SIRT1 → histone deacetylation. Sulforaphane → NRF2 → antioxidant gene induction. Both influence epigenetic aging via different nuclear programs, with emerging evidence of co-regulation at the AMPK axis.',
    color: '#a78bfa',
  },
];

const MILESTONES = [
  {
    day: 30,
    color: '#a78bfa',
    title: 'Biochemical Foundation',
    items: [
      { label: 'NAD+ metabolites rising', detail: 'Blood NAD+ detectable rise by week 4 (PMID 36482258). Subjective energy shift common.', emoji: '↑' },
      { label: 'GSH synthesis initiated', detail: 'GlyNAC begins restoring glutathione pools — not yet at full restoration, but oxidative stress biomarkers begin falling.', emoji: '↑' },
      { label: 'NRF2 pathway active', detail: 'Sulforaphane induces NRF2 within hours. At day 30, NQO1/GCLC expression measurably elevated in blood cells.', emoji: '↑' },
      { label: 'Hcy trending down', detail: 'Homocysteine (linked to low GSH) typically begins falling in week 3–4 with GlyNAC supplementation.', emoji: '↓' },
    ],
  },
  {
    day: 60,
    color: '#22d3ee',
    title: 'Functional Improvement',
    items: [
      { label: 'Mitochondrial function improving', detail: 'GlyNAC RCTs show mitochondrial membrane potential and ATP synthesis measurably improved by week 8. Correlated with physical endurance gains.', emoji: '↑' },
      { label: 'SIRT1 activation established', detail: 'At 250–500mg NMN/day, SIRT1 activity reaches new steady state. Insulin sensitivity improvement visible in prediabetics by week 8 (Science 2021).', emoji: '↑' },
      { label: 'hs-CRP trending down', detail: 'Inflammation biomarker decline typical by week 8 across both GlyNAC and sulforaphane RCTs.', emoji: '↓' },
      { label: 'Physical function improving', detail: 'GlyNAC 16-week RCT: grip strength, gait speed, exercise capacity all improved vs. placebo.', emoji: '↑' },
    ],
  },
  {
    day: 90,
    color: '#10b981',
    title: 'Measurable Longevity Markers',
    items: [
      { label: 'Full GSH restoration', detail: 'GlyNAC 16-week RCTs show complete restoration of blood glutathione to youthful levels by week 16. At 90 days you\'re approaching this endpoint.', emoji: '↑' },
      { label: 'Epigenetic shift possible', detail: 'DunedinPACE and GrimAge methylation clocks are sensitive to metabolic improvements. At 90 days with this stack, measurable deceleration is plausible.', emoji: '↓' },
      { label: 'Repeat labs now', detail: 'This is the ideal time to recheck GSH, NAD+, hs-CRP, Hcy, and HbA1c. Compare to baseline.', emoji: '🔬' },
      { label: 'Decision point', detail: 'If response is strong, consider adding Tier-B layer (Ca-AKG, taurine, spermidine). If baseline labs were normal, continue foundation stack.', emoji: '→' },
    ],
  },
];

const LABS = [
  { name: 'Whole blood glutathione', abbr: 'GSH', why: 'Direct GlyNAC target. Expect +30–40% at 16 weeks.', timing: 'Baseline + Day 90', type: 'primary' },
  { name: 'NAD+ / NADH ratio', abbr: 'NAD+', why: 'Direct NMN target. Rise confirms absorption and conversion.', timing: 'Baseline + Day 90', type: 'primary' },
  { name: 'High-sensitivity CRP', abbr: 'hs-CRP', why: 'Systemic inflammation marker. All three compounds should reduce.', timing: 'Baseline + Day 90', type: 'primary' },
  { name: 'Homocysteine', abbr: 'Hcy', why: 'Elevated Hcy reflects low GSH. GlyNAC typically brings this down.', timing: 'Baseline + Day 90', type: 'primary' },
  { name: 'HbA1c', abbr: 'A1c', why: 'Metabolic marker — NMN improves insulin sensitivity in muscle tissue.', timing: 'Baseline + Day 90', type: 'secondary' },
  { name: 'Fasting glucose + insulin', abbr: 'HOMA-IR', why: 'Confirms NMN\'s insulin sensitization effect.', timing: 'Baseline + Day 90', type: 'secondary' },
  { name: 'DunedinPACE (optional)', abbr: 'Pace', why: 'Most sensitive epigenetic aging clock to metabolic interventions.', timing: 'Baseline + Month 6', type: 'optional' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PubMedLink({ pmid }: { pmid: string }) {
  return (
    <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-[10px] font-mono text-accent-cyan/70 hover:text-accent-cyan transition-colors"
      aria-label={`Open PMID ${pmid} on PubMed`}
    >
      {pmid}
      <ExternalLink className="w-2 h-2" aria-hidden="true" />
    </a>
  );
}

function LqRing({ score, color, size = 56 }: { score: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="white" strokeOpacity="0.06" strokeWidth="4" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth="4" fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-mono font-black leading-none" style={{ color }}>{score}</span>
        <span className="text-[8px] font-mono text-muted-foreground/60 leading-none">LQ</span>
      </div>
    </div>
  );
}

function CompoundCard({ c, index }: { c: typeof FOUNDATION[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <LqRing score={c.lq} color={c.lqColor} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-base text-foreground">{c.name}</h3>
              <EvidenceTag tier={c.evidence} size="sm" />
              <span
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-current/20"
                style={{ color: c.badgeColor }}
              >
                {c.badge}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">{c.pathway}</p>
          </div>
        </div>

        {/* Dose + timing */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="glass rounded-lg px-3 py-2">
            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-0.5">Dose</p>
            <p className="text-[11px] font-semibold text-foreground leading-tight">{c.dose}</p>
          </div>
          <div className="glass rounded-lg px-3 py-2">
            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-0.5">When</p>
            <p className="text-[11px] font-semibold text-foreground leading-tight">{c.timing}</p>
          </div>
        </div>

        {/* Why section */}
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{c.why}</p>

        {/* Expand for mechanism */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
          aria-expanded={open}
        >
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {open ? 'Hide mechanism' : 'Mechanism detail'}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border/40">
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{c.mechanism}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-mono text-muted-foreground/50">PMIDs:</span>
                  {c.pmids.map((pmid) => (
                    <PubMedLink key={pmid} pmid={pmid} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer: hallmarks + deep dive link */}
      <div className="px-5 py-3 border-t border-border/30 bg-muted/10 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {c.hallmarks.slice(0, 2).map((h) => (
            <span key={h} className="text-[9px] font-mono text-muted-foreground/60 bg-white/[0.04] px-1.5 py-0.5 rounded">
              {h}
            </span>
          ))}
          {c.hallmarks.length > 2 && (
            <span className="text-[9px] font-mono text-muted-foreground/40">+{c.hallmarks.length - 2}</span>
          )}
        </div>
        <Link
          href={`/library/compounds/${c.id}`}
          className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-accent-cyan hover:text-accent-emerald transition-colors"
        >
          Full profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

function SynergyScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-sm"
          style={{
            background: i < score ? '#a78bfa' : 'rgba(255,255,255,0.06)',
          }}
        />
      ))}
      <span className="ml-1.5 text-[10px] font-mono font-bold text-accent-violet">{score}/10</span>
    </div>
  );
}

function MilestoneCard({ m, index }: { m: typeof MILESTONES[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border/30 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-black shrink-0"
          style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}30` }}
        >
          {m.day}
        </div>
        <div>
          <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: m.color }}>Day {m.day}</p>
          <p className="text-sm font-bold text-foreground">{m.title}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {m.items.map((item) => (
          <div key={item.label} className="flex gap-2.5">
            <span className="text-sm shrink-0 mt-0.5">{item.emoji}</span>
            <div>
              <p className="text-[11px] font-semibold text-foreground mb-0.5">{item.label}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StarterProtocolGuide() {
  return (
    <section className="py-16 md:py-24 bg-background pb-28">
      <div className="container-page">
        <PageHeader
          icon={FlaskConical}
          eyebrow="Starter Protocol"
          title="Foundation Stack: Your First 90 Days"
          description="Three Tier-A compounds — selected for the highest LQ scores, strongest human RCT evidence, and mutually reinforcing mechanisms. Every claim PMID-cited."
          theme="cyan"
          as="h1"
        />

        {/* Quick nav links */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link href="/library/compounds" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan glass glass-hover px-3.5 py-2 rounded-full transition">
            <FlaskConical className="w-3.5 h-3.5" />
            Full Compound Library
          </Link>
          <Link href="/library/synergy-matrix" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet glass glass-hover px-3.5 py-2 rounded-full transition">
            <Zap className="w-3.5 h-3.5" />
            14×14 Synergy Matrix
          </Link>
          <Link href="/elite-8" className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-amber glass glass-hover px-3.5 py-2 rounded-full transition">
            <BarChart3 className="w-3.5 h-3.5" />
            Elite 8 Ranking
          </Link>
        </div>

        {/* ── Section 1: The Three Compounds ── */}
        <div className="mb-14">
          <p className="text-label text-accent-cyan mb-5">The Foundation Three</p>
          <div className="grid md:grid-cols-3 gap-4">
            {FOUNDATION.map((c, i) => (
              <CompoundCard key={c.id} c={c} index={i} />
            ))}
          </div>
        </div>

        {/* ── Section 2: AM Schedule ── */}
        <div className="mb-14">
          <p className="text-label text-accent-emerald mb-5 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Morning Protocol (All AM)
          </p>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-6">
              All three foundation compounds are AM-dosed — simplifying adherence. The optimal order is:
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
              {[
                { time: 'Wake', step: '① NMN 500mg', note: 'Fasted — take immediately on waking', color: '#22d3ee' },
                { time: '+30 min', step: '② Sulforaphane', note: '10–35mg equiv., still fasted', color: '#10b981' },
                { time: '+60 min', step: '③ GlyNAC', note: '600mg glycine + 600mg NAC with breakfast', color: '#10b981' },
              ].map((s, i, arr) => (
                <div key={s.step} className="flex items-start sm:items-center gap-3 sm:gap-0 flex-1 w-full sm:w-auto">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-black"
                      style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}
                    >
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px h-6 bg-border/40 sm:hidden mt-1" />
                    )}
                  </div>
                  <div className="flex-1 sm:px-4">
                    <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">{s.time}</p>
                    <p className="text-sm font-bold" style={{ color: s.color }}>{s.step}</p>
                    <p className="text-[11px] text-muted-foreground">{s.note}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border/30">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Why fasted for NMN and sulforaphane?</span>{' '}
                NMN absorption is partially competed by food-derived nicotinamide. Sulforaphane from glucoraphanin requires myrosinase activity that is blunted by cooking and some food co-ingestion. GlyNAC with food reduces GI discomfort from NAC at higher doses.
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 3: Synergy Map ── */}
        <div className="mb-14">
          <p className="text-label text-accent-violet mb-5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            Stack Synergies
          </p>
          <div className="space-y-3">
            {SYNERGIES.map((s) => (
              <div key={`${s.a}-${s.b}`} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{s.a}</span>
                    <span className="text-muted-foreground/40 text-xs">×</span>
                    <span className="text-sm font-bold text-foreground">{s.b}</span>
                  </div>
                  <SynergyScore score={s.score} />
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">{s.title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/library/synergy-matrix"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet hover:text-accent-cyan transition-colors"
            >
              Explore all 91 compound synergy pairs in the full matrix <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Section 4: 90-Day Timeline ── */}
        <div className="mb-14">
          <p className="text-label text-accent-emerald mb-5">Expected Outcomes by Phase</p>
          <div className="grid md:grid-cols-3 gap-4">
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.day} m={m} index={i} />
            ))}
          </div>
        </div>

        {/* ── Section 5: Recommended Labs ── */}
        <div className="mb-14">
          <p className="text-label text-accent-amber mb-5 flex items-center gap-2">
            <TestTube className="w-3.5 h-3.5" />
            Biomarker Baseline — Run Before Day 1
          </p>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/10">
                    <th className="text-left px-5 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Biomarker</th>
                    <th className="text-left px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:table-cell">Why It Matters</th>
                    <th className="text-left px-4 py-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">When</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {LABS.map((lab, i) => (
                    <tr
                      key={lab.name}
                      className={`border-b border-border/20 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
                    >
                      <td className="px-5 py-3">
                        <p className="text-xs font-semibold text-foreground">{lab.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground/60">{lab.abbr}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{lab.why}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[10px] font-mono text-muted-foreground">{lab.timing}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                            lab.type === 'primary'
                              ? 'bg-accent-cyan/10 text-accent-cyan'
                              : lab.type === 'secondary'
                              ? 'bg-accent-violet/10 text-accent-violet'
                              : 'bg-muted/40 text-muted-foreground'
                          }`}
                        >
                          {lab.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-border/30 bg-muted/10">
              <p className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Primary</span> markers are directly linked to this stack&rsquo;s mechanisms.{' '}
                <span className="font-semibold text-foreground">Secondary</span> markers provide metabolic context.{' '}
                <span className="font-semibold text-foreground">Optional</span> markers (DunedinPACE) are the highest-signal epigenetic aging tests but cost $200–400.
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 6: What's Next ── */}
        <div className="mb-10">
          <p className="text-label text-accent-cyan mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            After Day 90 — Expanding the Stack
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Add Ca-AKG',
                desc: 'Alpha-ketoglutarate fuels the TCA cycle and epigenetic dioxygenases. Human trial shows 8-year epigenetic age reduction. Pairs well with NMN.',
                href: '/library/compounds/cakg',
                color: 'var(--accent-cyan)',
              },
              {
                title: 'Add Taurine',
                desc: 'Cell osmolyte and mitochondrial protector. LQ 72. Strong synergy with NMN (7/10). 11-year mouse lifespan extension triggered research into humans.',
                href: '/library/compounds/taurine',
                color: 'var(--accent-violet)',
              },
              {
                title: 'Add Spermidine',
                desc: 'Polyamine that induces autophagy. Combined with NMN synergy score 8/10. Human data shows cognitive and cardiac benefit in older adults.',
                href: '/library/compounds/spermidine',
                color: 'var(--accent-emerald)',
              },
            ].map((next) => (
              <Link
                key={next.title}
                href={next.href}
                className="glass glass-hover focus-ring rounded-2xl p-5 flex flex-col gap-2 transition-all group"
              >
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: next.color }}>Tier B Addition</p>
                <p className="text-sm font-bold text-foreground group-hover:text-accent-cyan transition-colors">{next.title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">{next.desc}</p>
                <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: next.color }}>
                  View profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <MedicalDisclaimer />
      </div>
    </section>
  );
}
