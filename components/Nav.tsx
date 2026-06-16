'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Dna, Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { SiteSearch } from '@/components/SiteSearch';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isExternal = (href: string) => href.startsWith('/');

  return (
    <nav className="fixed top-0 w-full z-50" aria-label="Main navigation">
      <div className="absolute inset-0 bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="relative container-page py-3 md:py-4 flex justify-between items-center gap-4">
        <Link href="/" className="focus-ring interactive flex items-center gap-2 rounded-lg shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
            <Dna className="w-4 h-4 text-black" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            TN<span className="text-cyan-400">i</span>C
          </span>
        </Link>

        <div className="hidden lg:flex gap-1 xl:gap-2">
          {navLinks.map((link) =>
            isExternal(link.href) ? (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring interactive px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring interactive px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <SiteSearch />
          <a
            href="#learn"
            className="focus-ring interactive flex items-center gap-2 bg-white text-black px-5 py-2.5 min-h-[var(--space-touch)] rounded-full text-sm font-semibold hover:bg-cyan-400"
          >
            Start Learning
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="focus-ring touch-target lg:hidden flex items-center justify-center text-zinc-400 hover:text-white rounded-lg"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative bg-[#030712]/98 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                isExternal(link.href) ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring interactive flex justify-between items-center text-zinc-200 hover:text-cyan-400 py-3.5 min-h-[var(--space-touch)] text-base font-medium border-b border-white/[0.04] last:border-0"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring interactive flex justify-between items-center text-zinc-200 hover:text-cyan-400 py-3.5 min-h-[var(--space-touch)] text-base font-medium border-b border-white/[0.04] last:border-0"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="focus-ring interactive bg-cyan-400 text-black px-5 py-3.5 min-h-[var(--space-touch)] rounded-xl text-sm font-semibold text-center mt-3"
              >
                Run Defense Scan
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}