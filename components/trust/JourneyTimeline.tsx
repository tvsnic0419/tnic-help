'use client';

import { motion } from 'framer-motion';
import { User, FlaskConical, Layers, Rocket } from 'lucide-react';
import type { JourneyMilestone, JourneyMilestoneType } from '@/lib/types';
import { getCitationById } from '@/lib/trust';
import { EvidenceTag } from './EvidenceTag';
import { PmidLink } from './SourceCitation';

const typeStyle: Record<
  JourneyMilestoneType,
  { icon: typeof User; color: string; bg: string; label: string }
> = {
  personal: { icon: User, color: 'text-cyan-400', bg: 'bg-cyan-400/10', label: 'Personal (N=1)' },
  experiment: { icon: FlaskConical, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Experiment' },
  protocol: { icon: Layers, color: 'text-violet-400', bg: 'bg-violet-400/10', label: 'Protocol' },
  platform: { icon: Rocket, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Platform' },
};

interface JourneyTimelineProps {
  milestones: JourneyMilestone[];
  showCitations?: boolean;
}

export function JourneyTimeline({ milestones, showCitations = true }: JourneyTimelineProps) {
  return (
    <div className="relative max-w-3xl" role="list" aria-label="Journey timeline">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/40 to-transparent" aria-hidden="true" />
      {milestones.map((m, i) => {
        const style = typeStyle[m.type];
        const Icon = style.icon;
        return (
          <motion.div
            key={`${m.date}-${m.title}`}
            role="listitem"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative pl-12 pb-8 last:pb-0"
          >
            <div
              className={`absolute left-2.5 w-3 h-3 rounded-full ${style.bg} border-2 border-amber-400/50`}
              aria-hidden="true"
            />
            <div className="card-elevated p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 text-label px-2 py-0.5 rounded-full ${style.bg} ${style.color}`}>
                  <Icon className="w-3 h-3" aria-hidden="true" />
                  {style.label}
                </span>
                {m.personal && (
                  <span className="text-label text-amber-400/80">N=1 · not population data</span>
                )}
                <time className="font-mono text-caption">{m.date}</time>
                {m.evidenceTier && <EvidenceTag tier={m.evidenceTier} size="sm" />}
              </div>
              <h3 className="heading-card text-base md:text-lg mb-1">{m.title}</h3>
              <p className="text-body-sm">{m.desc}</p>
              {m.metric && (
                <p className="text-caption font-mono text-amber-400/90 mt-2">{m.metric}</p>
              )}
              {showCitations && m.citationIds && m.citationIds.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/[0.06]">
                  {m.citationIds.map((id) => {
                    const cite = getCitationById(id);
                    return cite?.pmid ? (
                      <PmidLink key={id} pmid={cite.pmid} label={cite.authors?.split(' et al')[0] ?? cite.title.slice(0, 30)} />
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}