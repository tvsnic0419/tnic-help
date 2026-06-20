'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Sparkles, ClipboardList } from 'lucide-react';
import { StarterQuiz } from '@/components/sections/StarterQuiz';
import { StatStrip } from '@/components/ui/StatStrip';
import { ContextRail } from '@/components/ui/ContextRail';
import { HeroRings } from '@/components/ui/HeroRings';
import { platformStats } from '@/lib/platform-stats';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative hero-mesh hero-cinematic noise scan-overlay min-h-[90vh] md:min-h-[94vh] flex items-center pt-24 md:pt-28 pb-14 md:pb-20 overflow-hidden"
    >
      <HeroRings />
      <div className="hero-beam" aria-hidden="true" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 grid-overlay" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 card-ultra rounded-full px-5 py-2.5 mb-8 text-sm text-foreground/90"
            >
              <Sparkles className="w-4 h-4 text-accent-emerald animate-pulse-glow" aria-hidden="true" />
              <span className="font-medium">Anti-Aging Operating System</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-glow" aria-hidden="true" />
              <span className="text-caption font-mono hidden sm:inline">v1.20</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display mb-6"
            >
              Your longevity OS.
              <br />
              <span className="shimmer-text">Local. Cited. Yours.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-body text-lg max-w-xl mb-8 mx-auto lg:mx-0"
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
              <Link href="/quiz" className="focus-ring btn-gradient group">
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
                Start 3-Min Quiz
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/dashboard" className="focus-ring btn-ghost-premium">
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
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 80 }}
            className="lg:col-span-5 scroll-mt-28 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-accent-cyan/20 via-accent-emerald/10 to-accent-violet/15 rounded-3xl blur-2xl opacity-60 pointer-events-none" aria-hidden="true" />
            <div className="relative card-ultra card-ultra-hover p-1">
              <StarterQuiz />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-14 md:mt-20 max-w-4xl mx-auto lg:mx-0"
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