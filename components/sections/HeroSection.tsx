'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Sparkles, ClipboardList } from 'lucide-react';
import { StarterQuiz } from '@/components/sections/StarterQuiz';
import { StatStrip } from '@/components/ui/StatStrip';
import { ContextRail } from '@/components/ui/ContextRail';
import { HeroRings } from '@/components/ui/HeroRings';
import { HeroNetworkCanvas } from '@/components/ui/HeroNetworkCanvas';
import { platformStats } from '@/lib/platform-stats';
import { usePlatform } from '@/context/PlatformContext';
import { getHeroPersonalization } from '@/lib/homepage-personalization';

export function HeroSection() {
  const { quizResult } = usePlatform();
  const hero = getHeroPersonalization(quizResult);

  return (
    <section
      id="hero"
      className="relative hero-mesh hero-cinematic noise scan-overlay min-h-[90vh] md:min-h-[94vh] flex items-center pt-24 md:pt-28 pb-14 md:pb-20 overflow-hidden"
    >
      <HeroNetworkCanvas />
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
              className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start"
            >
              <span className="badge-live">
                <span className="badge-live-dot" aria-hidden="true" />
                Platform Active
              </span>
              <span className="inline-flex items-center gap-2 card-premium rounded-full px-5 py-2.5 text-sm text-foreground/90">
                <Sparkles className="w-4 h-4 text-accent-violet animate-pulse-glow" aria-hidden="true" />
                <span className="font-medium">Anti-Aging Operating System</span>
                <span className="text-caption font-mono hidden sm:inline text-accent-cyan">v2.0</span>
              </span>
            </motion.div>

            {/* LCP-critical: render visible at first paint (no opacity:0 entrance) so
                the headline counts toward Largest Contentful Paint immediately. */}
            <motion.h1
              initial={false}
              className="headline-editorial mb-5"
            >
              {hero.line1}
              <br />
              <span className="gradient-sweep-text">{hero.line2}</span>
            </motion.h1>

            <motion.p
              initial={false}
              className="text-body text-lg max-w-xl mb-8 mx-auto lg:mx-0 leading-relaxed"
            >
              {hero.subcopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <StatStrip stats={[...platformStats]} variant="hero" ariaLabel="Platform scale" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-data-panel mb-8 max-w-xl mx-auto lg:mx-0"
              aria-label="Platform research foundation"
            >
              <p className="data-readout mb-2">// RESEARCH FOUNDATION</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every protocol is mapped to peer-reviewed mechanisms. No compound enters the library without a
                {' '}<span className="text-accent-cyan font-semibold">PMID citation</span>,
                {' '}<span className="text-accent-emerald font-semibold">hallmark assignment</span>, and
                {' '}<span className="text-accent-violet font-semibold">evidence tier rating</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={hero.primary.href} className="focus-ring btn-gradient group">
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
                {hero.primary.label}
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link href={hero.secondary.href} className="focus-ring btn-ghost-premium">
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                {hero.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-caption font-mono mt-6 mx-auto lg:mx-0"
            >
              Educational only · Not medical advice · Data stays local
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
            <div className="relative card-premium p-1">
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
            what="A privacy-first longevity OS built on 12 Hallmarks of Aging — not a supplement store or medical service."
            why="Most longevity sites sell products before explaining the mechanism. TNiC grades every compound claim, cites every PMID, and keeps your health data in your own browser — never on TNiC servers."
            next={hero.contextNext}
            theme="cyan"
          />
        </motion.div>
      </div>
    </section>
  );
}