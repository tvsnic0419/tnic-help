import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — TNiC.help',
  description: 'Free and premium plans for evidence-based longevity science. Track biomarkers, build protocols, and explore the hallmarks of aging.',
};

interface Tier {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  accent: string;
  badge?: string;
  cta: { label: string; href: string };
  features: string[];
}

const TIERS: Tier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: 'Free',
    period: 'forever',
    tagline: 'Everything you need to start.',
    accent: 'accent-cyan',
    cta: { label: 'Get started', href: '/library' },
    features: [
      'Full Hallmark Library (12 hallmarks)',
      'Compound Library (14 evidence-graded compounds)',
      'Stack Architect — unlimited stacks',
      'All 6 healthspan tools',
      'Primary citations (PMID links)',
      'Local-only data storage',
      'No account required',
    ],
  },
  {
    id: 'practitioner',
    name: 'Practitioner',
    price: '$9',
    period: '/month',
    tagline: 'Lab tracking and protocol exports.',
    accent: 'accent-emerald',
    badge: 'Most popular',
    cta: { label: 'Coming soon', href: '/trust' },
    features: [
      'Everything in Explorer',
      'Lab Tracker with trend charts',
      'Protocol PDF export',
      'Biomarker alert thresholds',
      'Stack synergy scores (full detail)',
      'Cross-hallmark impact matrix',
      'Priority email support',
    ],
  },
  {
    id: 'protocol-plus',
    name: 'Protocol+',
    price: '$29',
    period: '/month',
    tagline: 'For practitioners and researchers.',
    accent: 'accent-violet',
    cta: { label: 'Coming soon', href: '/trust' },
    features: [
      'Everything in Practitioner',
      'Client protocol builder',
      'Shareable stack links',
      'Research brief exports (APA)',
      'Clinical trial radar (ClinicalTrials.gov)',
      'API access (beta)',
      'Dedicated onboarding call',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-24">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase mb-3">Pricing</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Science-first. No paywalls on knowledge.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The full library, compound database, and all tools are free — forever. Premium plans add lab tracking, exports, and practitioner features.
          </p>
        </div>

        {/* Tier grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative glass rounded-2xl p-6 flex flex-col ${tier.badge ? 'ring-1 ring-accent-emerald/30' : ''}`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent-emerald text-black text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-wider">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className={`text-[10px] font-mono uppercase tracking-widest text-${tier.accent} mb-1`}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">{tier.tagline}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-foreground/80">
                    <Check className={`w-3.5 h-3.5 text-${tier.accent} shrink-0 mt-0.5`} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.cta.href}
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition
                  ${tier.id === 'explorer'
                    ? 'bg-accent-cyan text-black hover:bg-accent-emerald'
                    : 'border border-border hover:border-border/80 hover:bg-card/60 text-muted-foreground cursor-not-allowed'
                  }`}
              >
                {tier.cta.label}
                {tier.id === 'explorer' && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ strip */}
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-5">Common questions</p>
          <div className="space-y-5">
            {[
              {
                q: 'Is my data private?',
                a: 'All data stays in your browser via localStorage. Nothing is sent to our servers. Ever.',
              },
              {
                q: 'Do I need an account?',
                a: 'No account is needed for Explorer. Premium features will require a login to sync data across devices.',
              },
              {
                q: 'When will premium plans launch?',
                a: 'We\'re in active development. Join the waitlist by visiting /trust and we\'ll notify you first.',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="text-sm font-semibold mb-1">{q}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
