import { AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

export function ToolDisclaimer({ variant = 'info' }: { variant?: 'info' | 'warning' }) {
  const isWarning = variant === 'warning';
  return (
    <div
      className={`rounded-xl p-4 border flex gap-3 ${
        isWarning
          ? 'border-amber-400/30 bg-amber-400/5'
          : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      {isWarning ? (
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      ) : (
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
      )}
      <p className="text-xs text-zinc-500 leading-relaxed">
        <strong className={isWarning ? 'text-amber-200' : 'text-zinc-400'}>
          Educational tool — not medical advice.
        </strong>{' '}
        Outputs are evidence-informed models for personal exploration. Dosing suggestions derive from
        published trial ranges, not prescriptions.{' '}
        <Link href="/trust/disclaimers" className="text-cyan-400 hover:text-emerald-400">
          Read disclaimers
        </Link>{' '}
        ·{' '}
        <Link href="/trust/methodology" className="text-cyan-400 hover:text-emerald-400">
          Evidence methodology
        </Link>
      </p>
    </div>
  );
}