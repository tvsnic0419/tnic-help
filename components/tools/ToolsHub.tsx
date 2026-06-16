'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Layers,
  Wand2,
  FlaskConical,
  TrendingUp,
  Calculator,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { TabBar } from '@/components/ui/TabBar';
import { EvidenceTagLegend } from '@/components/trust/EvidenceTag';
import { StackSimulatorTool } from './StackSimulatorTool';
import { ProtocolCustomizerTool } from './ProtocolCustomizerTool';
import { BiomarkerImpactTool } from './BiomarkerImpactTool';
import { HealthspanEstimatorTool } from './HealthspanEstimatorTool';
import { ToolDisclaimer } from './ToolDisclaimer';

type ToolTab = 'simulator' | 'protocol' | 'biomarker' | 'healthspan';

const tabs = [
  { id: 'simulator' as const, label: 'Stack Simulator', icon: Layers, badge: 'Advanced' },
  { id: 'protocol' as const, label: 'Protocol Builder', icon: Wand2 },
  { id: 'biomarker' as const, label: 'Biomarker Impact', icon: FlaskConical },
  { id: 'healthspan' as const, label: 'Healthspan Estimator', icon: TrendingUp },
];

const tabDescriptions: Record<ToolTab, string> = {
  simulator:
    'Real-time synergy scoring, pair-level interaction checks, age-adjusted dosing, and side-effect risk index with hallmark radar chart.',
  protocol:
    'Input age, goals, lifestyle, and logged labs → get a tailored multi-hallmark protocol with AM/PM schedule, lifestyle pillars, and monitoring panel.',
  biomarker:
    'Select any TNiC biomarker to see ranked compound and lifestyle interventions by evidence-weighted impact score.',
  healthspan:
    'Project healthspan score and biological age improvements over 12–24 weeks based on your profile, stack, and lab data.',
};

export function ToolsHub() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ToolTab | null;
  const [active, setActive] = useState<ToolTab>(
    tabParam && tabs.some((t) => t.id === tabParam) ? tabParam : 'simulator',
  );

  useEffect(() => {
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActive(tabParam);
    }
  }, [tabParam]);

  const onTabChange = useCallback((id: ToolTab) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', id);
    window.history.replaceState({}, '', url.toString());
  }, []);

  return (
    <section className="bg-[#030712] min-h-screen pt-24 pb-20">
      <div className="container-page">
        <PageHeader
          icon={Calculator}
          eyebrow="Interactive Tools"
          title="Longevity Decision Engine"
          description="Four evidence-graded tools that turn library knowledge into actionable protocols. All outputs are educational — not medical advice."
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

        <p className="text-body-sm text-zinc-500 mb-8 max-w-3xl">{tabDescriptions[active]}</p>

        <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          {active === 'simulator' && <StackSimulatorTool />}
          {active === 'protocol' && <ProtocolCustomizerTool />}
          {active === 'biomarker' && <BiomarkerImpactTool />}
          {active === 'healthspan' && <HealthspanEstimatorTool />}
        </div>

        <div className="mt-12">
          <ToolDisclaimer variant="warning" />
        </div>
      </div>
    </section>
  );
}