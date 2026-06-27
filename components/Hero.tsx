'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, LayoutDashboard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { StarterQuiz } from '@/components/sections/StarterQuiz';
import { StatStrip } from '@/components/ui/StatStrip';
import { HeroAgingTicker } from '@/components/ui/HeroAgingTicker';
import { ContextRail } from '@/components/ui/ContextRail';
import { HeroNetworkCanvas } from '@/components/ui/HeroNetworkCanvas';
import { Logo } from '@/components/ui/Logo';
import { platformStats } from '@/lib/platform-stats';
import { usePlatform } from '@/context/PlatformContext';
import { getHeroPersonalization } from '@/lib/homepage-personalization';

export default function Hero() {
  const { quizResult } = usePlatform();
  const hero = getHeroPersonalization(quizResult);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] md:min-h-[96vh] flex items-center pt-24 md:pt-28 pb-14 md:pb-20 overflow-hidden"
      style={{ background: '#020811' }}
    >
      {/* SVG cinematic background — drop hero-premium.jpg here to override */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/premium/hero-premium.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.88) contrast(1.06) saturate(1.1)',
        }}
        aria-hidden="true"
      />

      {/* Subtle gradient overlay to blend photo into page palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(2,8,17,0.55) 0%, rgba(6,14,28,0.35) 50%, rgba(11,21,40,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Single ambient layer — molecular network only */}
      <HeroNetworkCanvas />
      <div className="absolute inset-0 grid-overlay" aria-hidden="true" />

      <div className="relative container-page w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left column — brand + copy + CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 lg:mb-8"
            >
              <Logo
                variant="lockup"
                size="hero"
                priority
                className="mx-auto lg:mx-0 drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3 mb-8 justify-center lg:justify-start"
            >
              <span className="badge-live">
                <span className="badge-live-dot" aria-hidden="true" />
                Platform Active
              </span>
              <span className="inline-flex items-center gap-2 tnic-glass rounded-full px-5 py-2.5 text-sm text-white/90">
                <Sparkles
                  className="w-4 h-4 animate-pulse-glow"
                  style={{ color: '#00F5FF' }}
                  aria-hidden="true"
                />
                <span className="font-medium">Anti-Aging Operating System</span>
                <span
                  className="text-caption font-mono hidden sm:inline"
                  style={{ color: '#00F5FF' }}
                >
                  v2.0
                </span>
              </span>
            </motion.div>

            {/* LCP-critical: render immediately so the headline registers as LCP at first paint */}
            <motion.h1 initial={false} className="headline-editorial mb-5">
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
              transition={{ delay: 0.28 }}
            >
              <HeroAgingTicker />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
            >
              <Link
                href={hero.primary.href}
                className="focus-ring tnic-button-primary group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm"
              >
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
                {hero.primary.label}
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={hero.secondary.href}
                className="focus-ring tnic-button-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
              >
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                {hero.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-caption font-mono mt-6 mx-auto lg:mx-0 text-white/40"
            >
              Educational only · Not medical advice · Data stays local
            </motion.p>
          </div>

          {/* Right column — quiz card */}
          <motion.div
            id="starter-quiz"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 80 }}
            className="lg:col-span-5 scroll-mt-28 relative"
          >
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom right, rgba(0,245,255,0.20), rgba(52,211,153,0.10), rgba(167,139,250,0.15))',
              }}
              aria-hidden="true"
            />
            <div className="relative tnic-glass rounded-2xl p-1">
              <StarterQuiz />
            </div>
          </motion.div>
        </div>

        {/* Context rail */}
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
