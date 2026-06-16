'use client';

import { ClipboardList, LineChart, Lightbulb, Dna, Shield } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: 'Input Your Labs',
    desc: 'Log single markers, enter a full blood panel, or upload a CSV from your lab portal. All processing happens locally.',
    active: true,
  },
  {
    step: 2,
    icon: LineChart,
    title: 'Track Trends',
    desc: 'Repeat tests over time to unlock trajectory charts. Green zones show optimal ranges; trends flag improving vs declining markers.',
    active: true,
  },
  {
    step: 3,
    icon: Dna,
    title: 'Hallmark Risk Map',
    desc: 'Each biomarker links to longevity hallmarks. See which aging processes are under stress and read prognosis insights.',
    active: true,
  },
  {
    step: 4,
    icon: Lightbulb,
    title: 'Get Recommendations',
    desc: 'Personalized compound, monitoring, and clinical suggestions based on your values, trends, and active stack.',
    active: true,
  },
  {
    step: 5,
    icon: Shield,
    title: 'Export & Own Your Data',
    desc: 'Download CSV, sync with your stack builder, or wipe all data. No accounts, no cloud, no lock-in.',
    active: true,
  },
];

interface UserFlowGuideProps {
  currentStep?: number;
}

export function UserFlowGuide({ currentStep }: UserFlowGuideProps) {
  return (
    <div className="glass rounded-2xl p-5 mb-8">
      <p className="text-[10px] font-mono text-accent-rose uppercase tracking-wider mb-4">User Flow</p>
      <div className="grid sm:grid-cols-5 gap-3">
        {steps.map((s) => {
          const Icon = s.icon;
          const isCurrent = currentStep === s.step;
          return (
            <div
              key={s.step}
              className={`rounded-xl p-3 transition-all ${
                isCurrent ? 'bg-accent-rose/10 border border-accent-rose/30' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-mono ${isCurrent ? 'text-accent-rose' : 'text-caption'}`}>
                  0{s.step}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-accent-rose' : 'text-muted-foreground'}`} />
              </div>
              <h4 className="font-semibold text-xs mb-1">{s.title}</h4>
              <p className="text-[10px] text-caption leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}