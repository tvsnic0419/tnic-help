'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Layers,
  Wand2,
  FlaskConical,
  TrendingUp,
  Calculator,
  Network,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { EvidenceTagLegend } from '@/components/trust/EvidenceTag';
import { toolsRegistry, type ToolId } from '@/lib/registry';
import { ToolDisclaimer } from './ToolDisclaimer';

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

const tabIcons = {
  simulator: Layers,
  network: Network,
  protocol: Wand2,
  biomarker: FlaskConical,
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
    <section className="bg-background min-h-screen pt-24 pb-20">
      <div className="container-page">
        <PageHeader
          icon={Calculator}
          eyebrow="Interactive Tools"
          title="Longevity Decision Engine"
          description="Five evidence-graded tools that turn library knowledge into actionable protocols. Rule-based engines with transparent reasoning — not generative AI."
          theme="violet"
          as="h1"
        />

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
          {active === 'healthspan' && <HealthspanEstimatorTool />}
        </div>

        <div className="mt-12">
          <ToolDisclaimer variant="warning" />
        </div>
      </div>
    </section>
  );
}