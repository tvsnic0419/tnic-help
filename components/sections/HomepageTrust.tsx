'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, FileCheck, Scale } from 'lucide-react';
import { platformStats, trustPillars } from '@/lib/homepage';

const pillarIcons = [Shield, Eye, FileCheck, Scale];

export function HomepageTrust() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-accent-emerald/[0.03] to-transparent border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {platformStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="stat-card rounded-2xl p-5 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold font-mono text-accent-emerald tabular-nums">{stat.value}</p>
              <p className="text-label text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-label text-accent-emerald mb-3">WHY TRUST TNIC</p>
          <h2 className="heading-section">
            Graded by evidence. Built for trust.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">
            We name the trial, the PMID, the year, and the effect size. We label every projection as modeled — not lab-measured. No black-box recommendations, no hidden affiliate pressure on evidence grading.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            return (
              <motion.a
                key={pillar.title}
                href={pillar.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-premium glow-hover-emerald p-5 group block border border-border/60"
              >
                <Icon className="w-5 h-5 text-accent-emerald mb-3" />
                <h3 className="font-bold text-sm mb-2 group-hover:text-emerald-300 transition">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.a>
            );
          })}
        </div>

        <p className="text-center text-caption mt-10 font-mono">
          TNiC is an educational platform — not a medical provider. Projections ≠ lab diagnostics. Consult your physician before any protocol.
        </p>
      </div>
    </section>
  );
}
