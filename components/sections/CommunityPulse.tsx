'use client';

import { motion } from 'framer-motion';
import { communityPulse, platformStats } from '@/lib/data';

export function CommunityPulse() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0a0f1a]/80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-emerald-400/5" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {platformStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-cyan-400 stat-glow">{s.value}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[10px] text-zinc-600 mb-4">Educational content scope — not user analytics</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {communityPulse.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="text-center"
            >
              <p className="text-lg font-bold font-mono text-white">{c.metric}</p>
              <p className="text-xs text-zinc-500">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}