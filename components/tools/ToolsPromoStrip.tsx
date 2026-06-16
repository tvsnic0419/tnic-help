import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

const toolLinks = [
  { href: '/tools?tab=simulator', label: 'Stack Simulator', desc: 'Synergy + risk' },
  { href: '/tools?tab=protocol', label: 'Protocol Builder', desc: 'Age + goals → plan' },
  { href: '/tools?tab=biomarker', label: 'Biomarker Impact', desc: 'Lab interventions' },
  { href: '/tools?tab=healthspan', label: 'Healthspan Estimator', desc: '24w projection' },
] as const;

interface ToolsPromoStripProps {
  /** Contextual headline */
  headline?: string;
  className?: string;
}

export function ToolsPromoStrip({
  headline = 'Turn library knowledge into action',
  className = '',
}: ToolsPromoStripProps) {
  return (
    <div className={`gradient-border p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-violet-400" />
            <p className="text-label text-violet-400">Interactive Tools</p>
          </div>
          <h3 className="heading-section text-xl mb-2">{headline}</h3>
          <p className="text-body-sm text-zinc-500">
            Evidence-graded simulators with disclaimers. Educational only — not medical advice.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {toolLinks.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="focus-ring interactive glass glass-hover rounded-xl p-3 text-center group"
            >
              <p className="text-xs font-semibold text-zinc-300 group-hover:text-cyan-400 transition-colors">
                {t.label}
              </p>
              <p className="text-[10px] text-zinc-600 mt-0.5">{t.desc}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/tools"
          className="focus-ring interactive inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-violet-400 hover:text-emerald-400"
        >
          All tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}