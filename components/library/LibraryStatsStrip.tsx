import { hallmarkLibrary } from '@/lib/hallmarks-library';
import { libraryModules } from '@/lib/library-modules';
import { citationRegistry } from '@/lib/trust';

function computeStats() {
  let interventions = 0;
  let tierA = 0;
  let compoundInterventions = 0;
  let biomarkers = 0;

  for (const h of hallmarkLibrary) {
    interventions += h.interventions.length;
    tierA += h.interventions.filter((i) => i.evidence === 'A').length;
    compoundInterventions += h.interventions.filter(
      (i) => i.category === 'compound' && i.tnicAvailable,
    ).length;
    biomarkers += h.biomarkers.length;
  }

  return {
    hallmarks: hallmarkLibrary.length,
    interventions,
    tierA,
    compoundInterventions,
    biomarkers,
    modules: libraryModules.length,
    citations: citationRegistry.length,
  };
}

export function LibraryStatsStrip() {
  const s = computeStats();

  const stats = [
    { value: s.hallmarks, label: 'Hallmarks', detail: 'Complete coverage' },
    { value: s.interventions, label: 'Interventions', detail: `${s.tierA} tier-A evidence` },
    { value: s.compoundInterventions, label: 'Compounds', detail: 'Available to stack' },
    { value: s.biomarkers, label: 'Biomarkers', detail: 'Trackable signals' },
    { value: s.modules, label: 'Deep-dive modules', detail: 'With buyer guides' },
    { value: s.citations, label: 'Citations', detail: 'PubMed traceable' },
  ] as const;

  return (
    <div
      className="border-b border-border bg-background/60"
      role="region"
      aria-label="Library statistics"
    >
      <div className="container-page py-4">
        <dl className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-xl font-black font-mono tabular-nums text-foreground">
                  {stat.value}
                </span>
                <span className="block text-[10px] font-semibold text-muted-foreground mt-0.5">
                  {stat.label}
                </span>
                <span className="block text-[9px] font-mono text-muted-foreground/60 mt-0.5 hidden sm:block">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
