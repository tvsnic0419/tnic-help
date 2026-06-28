import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { compounds } from '@/lib/data';
import { EvidenceTag } from '@/components/trust/EvidenceTag';

const FEATURED = ['glynac', 'nmn', 'sulforaphane', 'cakg', 'urolithina', 'fisetin'];

export function CompoundLibraryBridge() {
  const featured = FEATURED.map((id) => compounds.find((c) => c.id === id)).filter(Boolean) as (typeof compounds)[0][];

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-accent-violet" aria-hidden="true" />
              <p className="text-[10px] font-mono text-accent-violet uppercase tracking-widest">
                Compound Library
              </p>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Evidence Reference Guides
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
              Mechanism, human trial evidence, hallmark coverage, and monitoring biomarkers — one page per compound.
            </p>
          </div>
          <Link
            href="/library/compounds"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-violet hover:text-accent-cyan transition-colors focus-ring rounded-md"
          >
            All {compounds.filter((c) => c.studies.length > 0).length} compounds
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featured.map((compound) => (
            <Link
              key={compound.id}
              href={`/library/compounds/${compound.id}`}
              className="group glass glass-hover focus-ring interactive rounded-xl p-4 flex items-start gap-3 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent-cyan transition-colors">
                    {compound.name}
                  </span>
                  <EvidenceTag tier={compound.evidence} size="sm" />
                </div>
                <p className="text-[11px] text-muted-foreground">{compound.pathway}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1 line-clamp-2 leading-relaxed">
                  {compound.mechanism}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent-violet group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
