'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { consumerFAQ, glossary, compounds } from '@/lib/data';
import { COMMAND_PALETTE_EVENT } from '@/components/os/CommandPalette';

type Result = { type: string; title: string; excerpt: string; href: string };

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !open && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const results = useMemo<Result[]>(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const found: Result[] = [];

    consumerFAQ.forEach((f) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        found.push({ type: 'FAQ', title: f.question, excerpt: f.answer.slice(0, 100) + '…', href: '#learn' });
      }
    });
    glossary.forEach((g) => {
      if (g.term.toLowerCase().includes(q) || g.simple.toLowerCase().includes(q)) {
        found.push({ type: 'Glossary', title: g.term, excerpt: g.simple, href: '#learn' });
      }
    });
    compounds.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.pathway.toLowerCase().includes(q)) {
        found.push({ type: 'Compound', title: c.name, excerpt: c.pathway, href: '#compounds' });
      }
    });

    const sections = [
      { q: 'dashboard', title: 'Personal Dashboard', href: '/dashboard' },
      { q: 'lab', title: 'Lab Analysis Hub', href: '/labs' },
      { q: 'stack', title: 'Stack Architect', href: '#stacks' },
      { q: 'bio age', title: 'Biological Age Calculator', href: '#calculator' },
      { q: 'biomarker', title: 'Biomarker Command', href: '#biomarkers' },
      { q: 'trust', title: 'Trust Hub', href: '/trust' },
    ];
    sections.forEach((s) => {
      if (s.q.includes(q) || s.title.toLowerCase().includes(q)) {
        found.push({ type: 'Tool', title: s.title, excerpt: 'Jump to section', href: s.href });
      }
    });

    return found.slice(0, 8);
  }, [query]);

  return (
    <div className="relative">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT))}
        className="focus-ring interactive p-2 text-muted-foreground hover:text-foreground transition flex items-center gap-1 rounded-lg"
        aria-label="Open command palette (Ctrl+K or /)"
        title="Command palette (⌘K)"
      >
        <Search className="w-5 h-5" />
        <span className="hidden xl:inline text-[10px] font-mono text-caption border border-border px-1.5 py-0.5 rounded">
          ⌘K
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 md:w-96 glass rounded-2xl p-4 shadow-2xl z-50 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search FAQ, glossary, compounds…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-caption"
              aria-label="Search"
            />
            <button onClick={() => { setOpen(false); setQuery(''); }} aria-label="Close search">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          {results.length > 0 ? (
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {results.map((r) => (
                <li key={r.title + r.type}>
                  <a
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="block p-2 rounded-lg hover:bg-muted/50 transition text-sm"
                  >
                    <span className="text-[10px] font-mono text-accent-cyan">{r.type}</span>
                    <p className="font-semibold">{r.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{r.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <p className="text-xs text-muted-foreground py-2">No results. Try NRF2, glutathione, or safety.</p>
          ) : (
            <p className="text-xs text-caption py-2">Type 2+ characters. Press Esc to close.</p>
          )}
        </div>
      )}
    </div>
  );
}