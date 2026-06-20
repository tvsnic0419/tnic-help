'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Sparkles, ClipboardList } from 'lucide-react';
import { StarterQuiz } from '@/components/sections/StarterQuiz';
import { StatStrip } from '@/components/ui/StatStrip';
import { ContextRail } from '@/components/ui/ContextRail';
import { platformStats } from '@/lib/platform-stats';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative hero-mesh noise min-h-[88vh] md:min-h-[92vh] flex items-center pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="hero-beam" aria-hidden="true" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 card-premium rounded-full px-5 py-2 mb-8 text-sm text-foreground/80"
            >
              <Sparkles className="w-4 h-4 text-accent-emerald animate-pulse-glow" aria-hidden="true" />
              <span>Anti-Aging Operating System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.05] mb-6"
            >
              Your longevity OS.
              <br />
              <span className="shimmer-text">Local. Cited. Yours.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-body max-w-xl mb-8 mx-auto lg:mx-0"
            >
              Initialize your personal command center — stack architect, lab hub, hallmark library,
              and six evidence-graded tools. No accounts. Data stays in your browser until you export.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <StatStrip stats={[...platformStats]} variant="hero" ariaLabel="Platform scale" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/quiz"
                className="focus-ring interactive group relative bg-gradient-to-r from-accent-cyan to-accent-emerald text-black px-6 md:px-8 py-4 min-h-[var(--space-touch)] rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg glow-hover-cyan"
              >
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
                Start 3-Min Quiz
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/dashboard"
                className="focus-ring interactive card-premium px-6 md:px-8 py-4 min-h-[var(--space-touch)] rounded-2xl font-medium hover:border-accent-emerald/30 flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                Open Longevity OS
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-caption font-mono mt-6 mx-auto lg:mx-0"
            >
              Educational only · Not medical advice
            </motion.p>
          </div>

          <motion.div
            id="starter-quiz"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-5 scroll-mt-28"
          >
            <StarterQuiz />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-14 md:mt-16 max-w-4xl mx-auto lg:mx-0"
        >
          <ContextRail
            what="A privacy-first longevity operating system — not a supplement store or medical service."
            why="Most longevity sites sell products or hide evidence tiers. TNiC grades every claim and keeps your data local."
            next="Take the 3-min quiz for a personalized stack preset, or open your OS dashboard to start building."
            theme="cyan"
          />
        </motion.div>
      </div>
    </section>
  );
}