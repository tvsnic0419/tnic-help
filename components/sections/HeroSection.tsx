'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { degradationMetrics } from '@/lib/data';

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-zinc-500">{label}</span>
        <span className={`font-mono font-semibold ${value < 50 ? 'text-rose-400' : value < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const [age, setAge] = useState(45);
  const metrics = degradationMetrics(age);

  return (
    <section id="hero" className="relative hero-mesh noise min-h-screen flex items-center pt-24 pb-16">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm text-zinc-300"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Cellular Command Center</span>
              <Sparkles className="w-3 h-3 text-emerald-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Understand Aging.
              <br />
              <span className="shimmer-text">Build Your Defense.</span>
              <br />
              Extend Healthspan.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-300 max-w-xl mb-4 leading-relaxed mx-auto lg:mx-0"
            >
              TNiC is a free educational platform for evidence-based longevity — explaining NRF2, glutathione,
              NAD+, and the 12 Hallmarks of Aging with interactive tools, safety guidance, and PubMed citations.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-sm text-zinc-500 mb-8 mx-auto lg:mx-0"
            >
              Not medical advice. Modeled projections — not lab diagnostics. Always consult your physician.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#learn"
                className="group bg-white text-black px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all duration-300"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#stacks" className="glass px-8 py-4 rounded-2xl font-medium hover:border-cyan-400/30 transition-all">
                Build a Stack
              </a>
            </motion.div>
          </div>

          {/* Cellular Degradation Simulator */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="gradient-border p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[10px] text-cyan-400 tracking-widest mb-1">MOD-HERO-00</p>
                <h3 className="text-xl font-bold">Cellular Degradation Simulator</h3>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold stat-glow text-cyan-400">{metrics.defense}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Defense Index</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="age-slider" className="text-sm text-zinc-400">Chronological Age</label>
                <span className="text-2xl font-bold font-mono text-white">{age}</span>
              </div>
              <input
                id="age-slider"
                type="range"
                min={25}
                max={80}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full age-slider"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1 font-mono">
                <span>25</span>
                <span>OPTIMAL</span>
                <span>80</span>
              </div>
            </div>

            <div className="space-y-4">
              <MetricBar label="Glutathione Pool" value={metrics.glutathione} color="bg-emerald-400" />
              <MetricBar label="NAD+ Reserves" value={metrics.nad} color="bg-cyan-400" />
              <MetricBar label="NRF2 Activation" value={metrics.nrf2} color="bg-violet-400" />
              <MetricBar label="Mitochondrial Output" value={metrics.mito} color="bg-amber-400" />
            </div>

            <p className="mt-6 text-xs text-zinc-500 leading-relaxed border-t border-white/[0.06] pt-4">
              {age < 35
                ? 'Cellular defense systems operating near peak capacity. Prevention protocols yield maximum ROI.'
                : age < 55
                  ? 'Accelerating decline detected. NRF2 and glutathione pathways showing measurable depletion.'
                  : 'Critical defense collapse. Multi-pathway intervention required — hybrid stack recommended.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}