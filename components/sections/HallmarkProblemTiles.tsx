'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target } from 'lucide-react';
import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { HallmarkIcon } from '@/components/library/HallmarkIcon';
import { EvidenceTag } from '@/components/trust/EvidenceTag';
import type { EvidenceTier } from '@/lib/types';

export function HallmarkProblemTiles() {
  return (
    <section
      id="hallmark-targets"
      className="py-20 md:py-28 border-b border-border bg-gradient-to-b from-card to-background section-glow-violet relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-violet)_0%,_transparent_55%)] opacity-[0.07] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-accent-violet" />
            <p className="text-label text-accent-violet">
              Target what slows with age
            </p>
          </div>
          <h2 className="heading-section mb-4">
            Twelve hallmarks. Twelve entry points.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each tile maps a biological problem to elevated MDX modules, top interventions, and lab markers.
            Pick the hallmark that matches your symptoms — not the supplement ad you saw last.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {hallmarkLibrary.map((h, i) => {
            const top = h.interventions[0];
            const tier = (top?.evidence ?? 'B') as EvidenceTier;

            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
              >
                <Link
                  href={`/library/${h.slug}`}
                  className="focus-ring block h-full glass glass-hover rounded-2xl p-5 group border border-border/80 hover:border-accent-violet/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <HallmarkIcon type={h.visual} size={36} />
                    <span className="text-label">
                      #{String(h.number).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm mb-1 group-hover:text-accent-violet transition leading-snug">
                    {h.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                    {h.tagline}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                        style={{ width: `${h.coverage}%` }}
                      />
                    </div>
                    <span className="text-label">{h.coverage}%</span>
                  </div>

                  {top && (
                    <div className="pt-3 border-t border-border/60">
                      <p className="text-label text-accent-emerald mb-1">
                        Top intervention
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium truncate">{top.name}</p>
                        <EvidenceTag tier={tier} size="sm" />
                      </div>
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open module <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/library"
            className="focus-ring interactive inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-sm font-semibold"
          >
            Explore full library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}