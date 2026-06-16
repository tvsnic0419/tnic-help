'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Dna, Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { SiteSearch } from '@/components/SiteSearch';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06]" />
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
            <Dna className="w-4 h-4 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            TN<span className="text-cyan-400">i</span>C
          </span>
        </a>

        <div className="hidden lg:flex gap-6 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors group"
              title={link.mod}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <SiteSearch />
          <a
            href="#learn"
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-cyan-400 transition-all duration-300"
          >
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative bg-[#030712]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex justify-between text-zinc-300 hover:text-cyan-400 transition py-2"
                >
                  {link.label}
                  <span className="font-mono text-[10px] text-zinc-600">{link.mod}</span>
                </a>
              ))}
              <a
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="bg-cyan-400 text-black px-5 py-3 rounded-full text-sm font-semibold text-center mt-2"
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