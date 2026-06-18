'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, FlaskConical, ArrowRight, ExternalLink } from 'lucide-react';
import { featuredStacks, latestResearch } from '@/lib/homepage';
import { compounds } from '@/lib/data';

const impactColor = {
  breakthrough: 'text-accent-amber bg-accent-amber/10',
  clinical: 'text-accent-emerald bg-accent-emerald/10',
  preclinical: 'text-accent-cyan bg-accent-cyan/10',
};

export function LibraryHighlights() {
  return (
    <section id="library" className="py-20 md:py-28 bg-background border-b border-border section-glow-violet">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-label text-accent-violet mb-3">THE LIBRARY</p>
            <h2 className="heading-section">
              Curated stacks. Live research.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Not a supplement catalog — an evidence library. Every stack is graded, every study linked to actionable compounds.
            </p>
          </div>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan hover:text-accent-emerald transition shrink-0"
          >
            Full library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Featured Stacks */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Layers className="w-4 h-4 text-accent-violet" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">Featured Stacks</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredStacks.map((stack, i) => (
                <motion.a
                  key={stack.key}
                  href="/stacks"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass glass-hover rounded-2xl p-5 group block"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-label text-accent-violet">{stack.compoundCount} compounds</span>
                    <ArrowRight className="w-4 h-4 text-caption group-hover:text-accent-violet transition" />
                  </div>
                  <h4 className="font-bold mb-1 group-hover:text-violet-300 transition">{stack.label}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{stack.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {stack.ids.slice(0, 3).map((id) => {
                      const c = compounds.find((x) => x.id === id);
                      return c ? (
                        <span key={id} className="text-[9px] font-mono text-caption bg-muted/50 px-1.5 py-0.5 rounded">
                          {c.name.split(' ')[0]}
                        </span>
                      ) : null;
                    })}
                    {stack.ids.length > 3 && (
                      <span className="text-[9px] font-mono text-caption">+{stack.ids.length - 3}</span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Latest Research */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <FlaskConical className="w-4 h-4 text-accent-emerald" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80">Latest Research</h3>
            </div>
            <div className="space-y-3">
              {latestResearch.map((article, i) => (
                <motion.a
                  key={article.id}
                  href="/trust/updates"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass glass-hover rounded-2xl p-5 flex gap-4 group block"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${impactColor[article.impact]}`}>
                        {article.tag}
                      </span>
                      <span className="text-caption font-mono">{article.date}</span>
                    </div>
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-emerald-300 transition line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-caption mt-1">{article.source}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-caption group-hover:text-accent-emerald shrink-0 mt-1 transition" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}