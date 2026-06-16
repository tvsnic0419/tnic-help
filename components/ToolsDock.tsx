'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Activity,
  FlaskConical,
  Layers,
  Scan,
  Calendar,
  ChevronUp,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';

const tools = [
  { href: '#dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#biomarkers', label: 'Biomarkers', icon: Activity },
  { href: '/labs', label: 'Labs', icon: FlaskConical },
  { href: '#stacks', label: 'Stack', icon: Layers },
  { href: '#calculator', label: 'Bio Age', icon: Scan },
  { href: '#protocol', label: 'Protocol', icon: Calendar },
] as const;

export function ToolsDock() {
  const { score, selected } = usePlatform();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-white/5 transition"
              aria-expanded={expanded}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400">TOOLS</span>
                {selected.length > 0 && (
                  <span className="text-[10px] font-mono bg-violet-400/20 text-violet-300 px-2 py-0.5 rounded-full">
                    {selected.length} · {score}
                  </span>
                )}
              </div>
              <ChevronUp className={`w-4 h-4 text-zinc-500 ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap justify-center gap-1 px-2 pb-2">
                    {tools.map((t) => (
                      <a
                        key={t.href}
                        href={t.href}
                        onClick={() => setExpanded(false)}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] font-semibold text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition min-w-[64px]"
                      >
                        <t.icon className="w-4 h-4" />
                        {t.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}