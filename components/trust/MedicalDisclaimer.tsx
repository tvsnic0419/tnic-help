import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicalDisclaimerProps {
  context?: 'tool' | 'hallmark' | 'compound' | 'lab';
  className?: string;
  compact?: boolean;
}

const CONTEXT_TEXT: Record<NonNullable<MedicalDisclaimerProps['context']>, string> = {
  tool: 'This tool generates educational estimates based on population-level research. Results are not a clinical assessment or diagnosis.',
  hallmark: 'The information on this page is for educational purposes only. It describes mechanisms studied in research settings, not a treatment protocol.',
  compound: 'Supplement information here is based on published research. This is not medical advice. Consult a qualified clinician before starting any regimen.',
  lab: 'Reference ranges shown are for educational context only and may differ from your laboratory\'s ranges. Always review results with your healthcare provider.',
};

export function MedicalDisclaimer({ context = 'tool', className, compact = false }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <p className={cn('text-[10px] font-mono text-muted-foreground flex items-center gap-1.5', className)}>
        <AlertTriangle className="w-3 h-3 text-accent-amber shrink-0" aria-hidden="true" />
        Educational only · Not medical advice · Not a substitute for clinical care
      </p>
    );
  }

  return (
    <div className={cn('rounded-xl border border-accent-amber/20 bg-accent-amber/5 px-4 py-3 flex items-start gap-3', className)}>
      <AlertTriangle className="w-4 h-4 text-accent-amber shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-[10px] font-mono font-semibold text-accent-amber uppercase tracking-wider mb-0.5">
          Educational use only
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {CONTEXT_TEXT[context]}{' '}
          <span className="font-semibold text-foreground/60">
            This is not medical advice and does not constitute a diagnosis or treatment recommendation.
          </span>
        </p>
      </div>
    </div>
  );
}
