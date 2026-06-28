import { SubPageLayout } from '@/components/layouts/SubPageLayout';
import { SynergyMatrixTable } from '@/components/library/SynergyMatrixTable';
import { StructuredData } from '@/components/seo/StructuredData';
import { buildCollectionPageSchema } from '@/lib/seo';

export const metadata = {
  title: 'Compound Synergy Matrix — TNiC Anti-Aging Library',
  description:
    'Pairwise synergy scores for all 14 evidence-graded longevity compounds. Discover which stacks produce the strongest mechanistic overlap — from 9/10 power pairs to pairs requiring caution.',
  alternates: { canonical: '/library/synergy-matrix' },
};

export default function SynergyMatrixPage() {
  const schemas = [
    buildCollectionPageSchema({
      name: 'Compound Synergy Matrix',
      description: 'Pairwise synergy scores for 14 longevity compounds with mechanism annotations.',
      path: '/library/synergy-matrix',
      itemCount: 14,
    }),
  ];

  return (
    <SubPageLayout>
      <StructuredData schemas={schemas} />
      <div className="container-page py-12 md:py-16">
        <div className="max-w-5xl mx-auto mb-10">
          <p className="text-[10px] font-mono tracking-widest text-accent-cyan mb-3 uppercase">
            Compound Intelligence · Synergy Matrix
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            14 × 14 Synergy Scorecard
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Every cell shows the pairwise synergy score (1–10) for two compounds from the TNiC
            library. Scores of 8+ indicate direct mechanistic co-activation backed by published
            data. Amber cells flag pairs with monitored cautions. Click any cell for the
            mechanism detail and a link to build that stack.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            <span className="font-mono">14 compounds</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="font-mono">91 unique pairs</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="font-mono">18 named interactions</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="font-mono">4 pair cautions</span>
          </div>
        </div>

        <SynergyMatrixTable />

        <p className="mt-10 text-xs text-muted-foreground max-w-2xl leading-relaxed">
          Synergy scores reflect mechanistic evidence for complementary pathway co-activation — not
          clinical trial data for the stacked combination. Scores are editorial synthesis from
          published literature; not a peer-reviewed meta-score. For medical advice, consult your
          physician.
        </p>
      </div>
    </SubPageLayout>
  );
}
