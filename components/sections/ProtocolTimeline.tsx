'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Calendar } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { protocolSchedule, compounds } from '@/lib/data';
import { useStack } from '@/context/PlatformContext';

const periodIcon = {
  AM: Sun,
  PM: Moon,
  Weekly: Calendar,
};

const periodColor = {
  AM: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  PM: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  Weekly: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

export function ProtocolTimeline() {
  const { selected } = useStack();

  return (
    <SectionShell
      id="protocol"
      mod="MOD-PRT-07"
      theme="violet"
      badge="Daily Protocol Engine"
      title="Your Daily Schedule"
      subtitle="Synced to your Stack Architect selections. Highlighted compounds are in your active stack."
      className="bg-[#0a0f1a]/60"
    >
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/40 via-violet-400/30 to-cyan-400/20 md:-translate-x-px" />

        {protocolSchedule.map((block, i) => {
          const Icon = periodIcon[block.period];
          const color = periodColor[block.period];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex items-start gap-6 mb-8 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''} hidden md:block`}>
                {i % 2 === 0 && (
                  <TimelineCard block={block} color={color} Icon={Icon} activeStack={selected} />
                )}
              </div>

              <div className={`w-4 h-4 rounded-full shrink-0 mt-3 z-10 border-2 ${
                block.compounds.length > 0 ? 'bg-violet-400 border-violet-400' : 'bg-zinc-800 border-zinc-600'
              }`} />

              <div className="flex-1">
                <div className="md:hidden">
                  <TimelineCard block={block} color={color} Icon={Icon} activeStack={selected} />
                </div>
                {i % 2 !== 0 && (
                  <div className="hidden md:block">
                    <TimelineCard block={block} color={color} Icon={Icon} activeStack={selected} />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function TimelineCard({
  block,
  color,
  Icon,
  activeStack,
}: {
  block: typeof protocolSchedule[0];
  color: string;
  Icon: typeof Sun;
  activeStack: string[];
}) {
  const hasActiveCompound = block.compounds.some((id) => activeStack.includes(id));
  return (
    <div className={`rounded-2xl p-5 inline-block text-left w-full ${hasActiveCompound ? 'gradient-border' : 'glass opacity-70'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full border ${color}`}>
          <Icon className="w-3 h-3" />
          {block.period}
        </span>
        <span className="font-mono text-xs text-zinc-500">{block.time}</span>
      </div>
      <h4 className="font-bold mb-2">{block.action}</h4>
      <p className="text-xs text-zinc-500 mb-3">{block.rationale}</p>
      {block.compounds.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {block.compounds.map((cid) => {
            const c = compounds.find((x) => x.id === cid);
            return c ? (
              <span
                key={cid}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  activeStack.includes(cid)
                    ? 'bg-violet-400/20 text-violet-300 border border-violet-400/40'
                    : 'bg-zinc-800 text-zinc-600 line-through'
                }`}
              >
                {c.name}
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}