'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Dna, Menu, Search, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { SiteSearch } from '@/components/SiteSearch';
import { COMMAND_PALETTE_EVENT } from '@/components/os/CommandPalette';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

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
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl border-b border-border" />
      <div className="relative container-page py-3 md:py-4 flex justify-between items-center gap-4">
        <Link href="/" className="focus-ring interactive flex items-center gap-2 rounded-lg shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-emerald flex items-center justify-center">
            <Dna className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            TN<span className="text-accent-cyan">i</span>C
          </span>
        </Link>

        <div className="hidden lg:flex gap-1 xl:gap-2">
          {navLinks.map((link) =>
            isExternal(link.href) ? (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring interactive px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-accent-cyan"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring interactive px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-accent-cyan"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle compact />
          <SiteSearch />
          <Link
            href="/dashboard"
            className="focus-ring interactive flex items-center gap-2 bg-foreground text-background px-5 py-2.5 min-h-[var(--space-touch)] rounded-full text-sm font-semibold hover:bg-accent-emerald hover:text-primary-foreground"
          >
            Open OS
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle compact />
          <button
            onClick={() => window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT))}
            className="focus-ring touch-target flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="focus-ring touch-target flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
            className="lg:hidden relative bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                isExternal(link.href) ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring interactive flex justify-between items-center text-foreground hover:text-accent-cyan py-3.5 min-h-[var(--space-touch)] text-base font-medium border-b border-border last:border-0"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring interactive flex justify-between items-center text-foreground hover:text-accent-cyan py-3.5 min-h-[var(--space-touch)] text-base font-medium border-b border-border last:border-0"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="focus-ring interactive bg-accent-emerald text-primary-foreground px-5 py-3.5 min-h-[var(--space-touch)] rounded-xl text-sm font-semibold text-center mt-3"
              >
                Open Longevity OS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}