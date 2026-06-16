'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Wrench, Table2, BookOpen } from 'lucide-react';
import { eliteStacks } from '@/lib/stacks-library';
import { DynamicStackBuilder } from './DynamicStackBuilder';
import { EliteStackCard } from './EliteStackCard';
import { StackComparisonTable } from './StackComparisonTable';

type Tab = 'catalog' | 'builder' | 'compare';

const tabs: { id: Tab; label: string; icon: typeof Layers }[] = [
  { id: 'catalog', label: 'Elite Stacks', icon: BookOpen },
  { id: 'builder', label: 'Stack Builder', icon: Wrench },
  { id: 'compare', label: 'Compare', icon: Table2 },
];

export function StacksLibrary() {
  const [tab, setTab] = useState<Tab>('catalog');

  return (
    <div className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6 text-sm text-zinc-300">
            <Layers className="w-4 h-4 text-violet-400" />
            Stacks & Protocols Library
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Elite Interactive Stack Intelligence
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Pre-built evidence-graded protocols with dosing, monitoring, and cost breakdowns.
            Build custom stacks with real-time synergy and contraindication analysis. Export and share.
          </p>
          <p className="text-[10px] font-mono text-zinc-600 mt-4">
            {eliteStacks.length} elite stacks · 6 evidence-graded compounds · Educational only — not medical advice
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  if (t.id === 'builder') {
                    setTimeout(() => document.getElementById('stack-builder')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-violet-400 text-black'
                    : 'glass text-zinc-400 hover:text-white hover:border-violet-400/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'catalog' && (
            <div className="space-y-4">
              <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-2">
                Pre-Built Elite Protocols — click to expand full breakdown
              </p>
              {eliteStacks.map((stack, i) => (
                <EliteStackCard key={stack.id} stack={stack} expanded={i === 0} />
              ))}
            </div>
          )}

          {tab === 'builder' && (
            <div id="stack-builder">
              <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-6">
                Dynamic Stack Builder — real-time synergy & safety analysis
              </p>
              <DynamicStackBuilder />
            </div>
          )}

          {tab === 'compare' && (
            <div>
              <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-6">
                Comparison Table — filter by goal, cost, and complexity
              </p>
              <StackComparisonTable />
            </div>
          )}
        </motion.div>

        {/* Always-visible builder shortcut when not on builder tab */}
        {tab !== 'builder' && (
          <div className="mt-16 pt-10 border-t border-white/[0.06]">
            <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-6 text-center">
              Quick Stack Builder
            </p>
            <div id="stack-builder">
              <DynamicStackBuilder />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}