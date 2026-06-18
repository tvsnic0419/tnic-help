'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Check, Layers, Compass } from 'lucide-react';
import { compounds } from '@/lib/data';
import { usePlatform } from '@/context/PlatformContext';
import type { PresetKey } from '@/lib/presets';
import type { getQuizResult } from '@/lib/homepage';

type QuizResult = ReturnType<typeof getQuizResult>;

const AGE_PROFILE_MAP: Record<string, number> = {
  '30-40': 35,
  '41-50': 45,
  '51-60': 55,
  '60+': 65,
};

interface QuizResultPanelProps {
  result: QuizResult;
  answers: { goal?: string; age?: string; experience?: string };
  onRetake: () => void;
}

export function QuizResultPanel({ result, answers, onRetake }: QuizResultPanelProps) {
  const router = useRouter();
  const { applyPreset, setProfile, setQuizResult } = usePlatform();

  useEffect(() => {
    setQuizResult({
      goal: answers.goal ?? 'learn',
      age: answers.age,
      experience: answers.experience,
      preset: result.preset,
      completedAt: new Date().toISOString(),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStackAndOpenArchitect = () => {
    applyPreset(result.preset as PresetKey);
    if (answers.age && AGE_PROFILE_MAP[answers.age]) {
      setProfile({ age: AGE_PROFILE_MAP[answers.age] });
    }
    router.push(`/stacks?from=quiz&preset=${result.preset}`);
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent-emerald/20 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-accent-emerald" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-accent-emerald mb-1">Quiz complete — pick your next step</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{result.insight}</p>
        </div>
      </div>

      <div className="glass rounded-xl p-4 mb-4">
        <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">
          Recommended preset: {result.stack.label}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {result.stack.ids.map((id) => {
            const c = compounds.find((x) => x.id === id);
            return c ? (
              <span
                key={id}
                className="text-[10px] bg-accent-violet/10 text-violet-300 px-2 py-0.5 rounded font-semibold"
              >
                {c.name}
              </span>
            ) : null;
          })}
        </div>
        <p className="text-[10px] text-muted-foreground">{result.stack.desc}</p>
      </div>

      <div className="space-y-2" role="group" aria-label="Quiz result actions">
        <button
          type="button"
          onClick={loadStackAndOpenArchitect}
          className="focus-ring w-full text-left rounded-xl bg-accent-cyan text-black p-4 hover:bg-accent-emerald transition-all"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Load stack &amp; open Architect</p>
                <p className="text-xs opacity-80 mt-0.5">
                  Applies <strong>{result.stack.label}</strong> preset ({result.stack.ids.length} compounds) and
                  opens the Builder tab
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </div>
        </button>

        <Link
          href={result.primary.href}
          className="focus-ring block w-full text-left rounded-xl glass glass-hover p-4 transition-all hover:border-accent-cyan/30"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">{result.primary.cta}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{result.primary.title}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
          </div>
        </Link>

        <button
          type="button"
          onClick={onRetake}
          className="focus-ring w-full flex items-center justify-center gap-2 glass py-3 rounded-xl text-xs text-muted-foreground hover:text-foreground transition"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          Retake quiz
          <span className="text-caption">— try a different goal or experience level</span>
        </button>
      </div>
    </motion.div>
  );
}