'use client';
/* eslint-disable react-hooks/set-state-in-effect --
   The mount/URL-driven effect(s) below set state from client-only sources
   (localStorage, window, or URL search params) or trigger entrance animations.
   These cannot run during SSR, so the initial setState is intentional and not a
   value derivable during render. Reviewed 2026-06-21; safe to keep. */

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Layers,
  Wand2,
  FlaskConical,
  TrendingUp,
  Calculator,
  Network,
  BarChart3,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { EvidenceTagLegend } from '@/components/trust/EvidenceTag';
import { toolsRegistry, type ToolId } from '@/lib/registry';
import { ToolDisclaimer } from './ToolDisclaimer';
import { ContextRail } from '@/components/ui/ContextRail';
import { getHubContext, getToolContext } from '@/lib/hub-context';

const StackSimulatorTool = dynamic(
  () => import('./StackSimulatorTool').then((m) => ({ default: m.StackSimulatorTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);
const StackNetworkTool = dynamic(
  () => import('./StackNetworkTool').then((m) => ({ default: m.StackNetworkTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);
const ProtocolEngineTool = dynamic(
  () => import('./ProtocolEngineTool').then((m) => ({ default: m.ProtocolEngineTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);
const BiomarkerDashboardTool = dynamic(
  () => import('./BiomarkerDashboardTool').then((m) => ({ default: m.BiomarkerDashboardTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);
const HealthspanEstimatorTool = dynamic(
  () => import('./HealthspanEstimatorTool').then((m) => ({ default: m.HealthspanEstimatorTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);
const BiomarkerImpactTool = dynamic(
  () => import('./BiomarkerImpactTool').then((m) => ({ default: m.BiomarkerImpactTool })),
  { loading: () => <SectionSkeleton height="lg" /> },
);

const tabIcons = {
  simulator: Layers,
  network: Network,
  protocol: Wand2,
  biomarker: FlaskConical,
  impact: BarChart3,
  healthspan: TrendingUp,
} as const;

const tabs = toolsRegistry.map((t) => ({
  id: t.id,
  label: t.label,
  icon: tabIcons[t.id],
  badge: t.badge,
}));

export function ToolsHub() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ToolId | null;
  const [active, setActive] = useState<ToolId>(
    tabParam && toolsRegistry.some((t) => t.id === tabParam) ? tabParam : 'simulator',
  );

  useEffect(() => {
    if (tabParam && toolsRegistry.some((t) => t.id === tabParam)) {
      setActive(tabParam);
    }
  }, [tabParam]);

  const onTabChange = useCallback((id: ToolId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', id);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const activeTool = toolsRegistry.find((t) => t.id === active)!;

  return (
    <section className="bg-background min-h-screen pt-6 md:pt-8 pb-20">
      <div className="container-page">
        <PageHeader
          icon={Calculator}
          eyebrow="Interactive Tools"
          title="Longevity Decision Engine"
          description="Six evidence-graded tools that turn library knowledge into actionable protocols. Rule-based engines with transparent reasoning — not generative AI."
          theme="violet"
          as="h1"
          context={getHubContext('tools')}
        />

        <ContextRail
          {...getToolContext(active)}
          theme="cyan"
          className="mb-8 max-w-4xl"
        />

        <Link
          href="/elite-8"
          className="focus-ring block mb-8 card-premium border border-accent-amber/25 bg-gradient-to-br from-accent-amber/8 to-transparent rounded-2xl p-5 md:p-6 hover:border-accent-amber/40 transition group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="icon-badge-amber w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent-amber" aria-hidden="true" />
              </div>
              <div>
                <p className="text-label text-accent-amber mb-1">Featured tool</p>
                <h2 className="font-bold text-lg group-hover:text-accent-amber transition">Elite 8 Longevity Quotient</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  Eight interventions ranked by modeled LQ score — head-to-head compare, weight tuner, Rx disclaimers, and links to evidence modules.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-amber shrink-0">
              Open ranking <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <div className="mb-8">
          <EvidenceTagLegend />
        </div>

        <TabBar
          tabs={tabs}
          active={active}
          onChange={onTabChange}
          theme="violet"
          ariaLabel="Longevity tools"
          className="mb-6"
        />

        <p className="text-body-sm text-muted-foreground mb-2 max-w-3xl">{activeTool.description}</p>
        <p className="text-caption text-caption mb-8 max-w-3xl">{activeTool.evidenceNote}</p>

        <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          {active === 'simulator' && <StackSimulatorTool />}
          {active === 'network' && <StackNetworkTool />}
          {active === 'protocol' && <ProtocolEngineTool />}
          {active === 'biomarker' && <BiomarkerDashboardTool />}
          {active === 'impact' && <BiomarkerImpactTool />}
          {active === 'healthspan' && <HealthspanEstimatorTool />}
        </div>

        <div className="mt-12">
          <ToolDisclaimer variant="warning" />
        </div>
      </div>
    </section>
  );
}