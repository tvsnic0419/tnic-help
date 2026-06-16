'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BookOpen, FlaskConical, Zap } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { researchFeed } from '@/lib/data';

const impactStyles = {
  breakthrough: { icon: Zap, color: 'text-amber-400 bg-amber-400/10', label: 'Breakthrough' },
  clinical: { icon: FlaskConical, color: 'text-emerald-400 bg-emerald-400/10', label: 'Clinical Trial' },
  preclinical: { icon: BookOpen, color: 'text-cyan-400 bg-cyan-400/10', label: 'Preclinical' },
};

const tags = ['All', ...Array.from(new Set(researchFeed.map((r) => r.tag)))];

export function ResearchIntel() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(researchFeed[0].id);

  const filtered = filter === 'All' ? researchFeed : researchFeed.filter((r) => r.tag === filter);

  return (
    <SectionShell
      id="research"
      mod="MOD-INT-03"
      theme="emerald"
      badge="Research Intelligence"
      title="Longevity Intel Feed"
      subtitle="Lifespan.io publishes the news. TNiC connects it to your protocol. Every study mapped to actionable compounds and biomarkers."
      className="bg-[#0a0f1a]/60"
    >
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === tag ? 'bg-emerald-400 text-black' : 'glass text-zinc-400 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((article) => {
          const style = impactStyles[article.impact];
          const ImpactIcon = style.icon;
          const isOpen = expanded === article.id;
          return (
            <motion.div
              key={article.id}
              layout
              className={`rounded-2xl overflow-hidden transition-all ${
                isOpen ? 'gradient-border' : 'glass glass-hover'
              }`}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : article.id)}
                className="w-full flex items-start gap-4 p-6 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.color}`}>
                  <ImpactIcon className="w-5 h-5" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.color}`}>
                      {style.label}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">{article.date}</span>
                    <span className="text-[10px] text-emerald-400/70">{article.tag}</span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg">{article.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{article.source}</p>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-white/[0.06] mx-6">
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4 pt-4">{article.summary}</p>
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-cyan-400 transition-colors font-mono"
                      >
                        PubMed: {article.pmid} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}