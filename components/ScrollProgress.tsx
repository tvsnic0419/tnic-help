'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/data';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const sections = navLinks.map((l) => l.href.slice(1));
      const hero = document.getElementById('hero');
      if (hero && scrollTop < hero.offsetHeight * 0.5) {
        setActive('hero');
        return;
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollTop >= el.offsetTop - 200) {
          setActive(sections[i]);
          return;
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {navLinks.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 justify-end"
              title={link.label}
            >
              <span
                className={`text-[10px] font-mono transition-all duration-300 ${
                  isActive ? 'text-cyan-400 opacity-100' : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                }`}
              >
                {link.mod}
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 scale-150 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                    : 'bg-zinc-700 group-hover:bg-zinc-500'
                }`}
              />
            </a>
          );
        })}
      </div>
    </>
  );
}