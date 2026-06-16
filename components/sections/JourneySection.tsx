'use client';

import { motion } from 'framer-motion';
import { User, FlaskConical, Layers, Rocket } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { journeyMilestones } from '@/lib/journey';

const typeStyle = {
  personal: { icon: User, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  experiment: { icon: FlaskConical, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  protocol: { icon: Layers, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  platform: { icon: Rocket, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
};

export function JourneySection() {
  return (
    <SectionShell
      id="journey"
      mod="MOD-JRN-10"
      theme="amber"
      badge="Radical Transparency"
      title="The TNiC Journey"
      subtitle="Real N=1 experiments, actual protocol evolution, and honest labeling of what is personal data vs. population science. This is how the platform was built — not copied from a marketing deck."
      className="bg-[#0a0f1a]/60"
    >
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-2xl p-6">
          <p className="text-[10px] font-mono text-amber-400 uppercase mb-2">Personal (N=1)</p>
          <p className="text-sm text-zinc-400">
            My lab values, subjective outcomes, and protocol changes over time. Sample size = 1. Your results will differ.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-[10px] font-mono text-emerald-400 uppercase mb-2">Population Science</p>
          <p className="text-sm text-zinc-400">
            PubMed-cited mechanisms, clinical trial doses, and hallmark frameworks apply broadly — with evidence tiers shown.
          </p>
        </div>
      </div>

      <div className="relative max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
        {journeyMilestones.map((m, i) => {
          const style = typeStyle[m.type];
          const Icon = style.icon;
          return (
            <motion.div
              key={m.date}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative pl-12 pb-10 last:pb-0"
            >
              <div className={`absolute left-2.5 w-3 h-3 rounded-full ${style.bg} border-2 border-amber-400/50`} />
              <div className="gradient-border p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.color}`}>
                    <Icon className="w-3 h-3" />
                    {m.type}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{m.date}</span>
                </div>
                <h3 className="font-bold mb-1">{m.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{m.desc}</p>
                {m.metric && (
                  <p className="text-xs font-mono text-amber-400/80 mt-2">{m.metric}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}