'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, Zap, Layers } from 'lucide-react';
import { quizSteps, getQuizResult, type QuizAnswers } from '@/lib/homepage';
import { QuizResultPanel } from '@/components/quiz/QuizResultPanel';
import { parseQuizSearchParams } from '@/lib/quiz-share';

const goalIcons = {
  book: BookOpen,
  shield: Shield,
  zap: Zap,
  layers: Layers,
};

export function StarterQuiz({ variant = 'embedded' }: { variant?: 'embedded' | 'page' }) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (variant !== 'page') return;
    const shared = parseQuizSearchParams(searchParams.toString());
    if (shared) {
      setAnswers(shared);
      setDone(true);
      setStep(quizSteps.length - 1);
    }
  }, [searchParams, variant]);

  const current = quizSteps[step];
  const progress = done ? 100 : ((step + 1) / quizSteps.length) * 100;

  const select = (optionId: string) => {
    const key = current.id as keyof QuizAnswers;
    const next = { ...answers, [key]: optionId };
    setAnswers(next);

    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const result = done ? getQuizResult(answers) : null;

  return (
    <div
      className={`p-6 md:p-8 ${variant === 'page' ? 'card-ultra shadow-lg shadow-accent-emerald/10' : ''}`}
      role="form"
      aria-label="3-minute starter quiz"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-mono text-[10px] text-accent-cyan tracking-widest mb-1">3-MIN QUIZ</p>
          <h3 className="text-lg font-bold">
            {variant === 'page' ? 'Your personalized path' : 'Find Your Entry Point'}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {variant === 'embedded' && (
            <Link
              href="/quiz"
              className="focus-ring text-[10px] font-mono text-accent-cyan hover:underline rounded"
            >
              Full screen
            </Link>
          )}
          <span className="text-[10px] font-mono text-muted-foreground">
            {done ? 'Complete' : `Step ${step + 1}/${quizSteps.length}`}
          </span>
        </div>
      </div>

      <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-emerald rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
          >
            <p className="text-sm font-semibold mb-4">{current.question}</p>
            <div className="space-y-2">
              {current.options.map((opt) => {
                const Icon = 'icon' in opt ? goalIcons[opt.icon] : null;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => select(opt.id)}
                    className="focus-ring w-full text-left glass glass-hover rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:border-accent-cyan/30"
                  >
                    {Icon && <Icon className="w-4 h-4 text-accent-cyan shrink-0" />}
                    <div>
                      <p className="text-sm font-semibold">{opt.label}</p>
                      {'desc' in opt && <p className="text-[10px] text-muted-foreground">{opt.desc}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : result && (
          <QuizResultPanel result={result} answers={answers} onRetake={reset} />
        )}
      </AnimatePresence>
    </div>
  );
}