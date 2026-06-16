'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Library, CheckCircle2 } from 'lucide-react';
import { heroValueProps } from '@/lib/homepage';
import { StarterQuiz } from '@/components/sections/StarterQuiz';

export function HeroSection() {
  return (
    <section id="hero" className="relative hero-mesh noise min-h-[85vh] md:min-h-[92vh] flex items-center pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Value proposition */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm text-foreground/80"
            >
              <Library className="w-4 h-4 text-accent-cyan" />
              <span>The Definitive Longevity Library</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-[3.4rem] font-bold tracking-tight leading-[1.05] mb-6"
            >
              Every pathway.
              <br />
              <span className="shimmer-text">Every citation.</span>
              <br />
              One trusted resource.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-body max-w-xl mb-6 mx-auto lg:mx-0"
            >
              TNiC is the free longevity library for health-optimized adults — hallmarks of aging,
              evidence-graded stacks, PubMed-linked research, and interactive tools that rival platforms
              charging hundreds per panel.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="space-y-2 mb-8 max-w-md mx-auto lg:mx-0"
            >
              {heroValueProps.map((item) => (
                <li key={item} className="flex items-center gap-2 text-body-sm">
                  <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/library"
                className="focus-ring interactive group bg-white text-black px-6 md:px-8 py-4 min-h-[var(--space-touch)] rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-accent-cyan"
              >
                Explore the Library
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="#learn"
                className="focus-ring interactive glass px-6 md:px-8 py-4 min-h-[var(--space-touch)] rounded-2xl font-medium hover:border-accent-cyan/30 text-center"
              >
                Start Learning Free
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-[10px] text-caption mt-6 font-mono mx-auto lg:mx-0"
            >
              Educational only · Not medical advice · Modeled projections clearly labeled
            </motion.p>
          </div>

          {/* Interactive starter quiz */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-5"
          >
            <StarterQuiz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}