'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Shield, Zap, Layers, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { quizSteps, getQuizResult, type QuizAnswers } from '@/lib/homepage';
import { compounds } from '@/lib/data';
import { useStack } from '@/context/PlatformContext';
import type { PresetKey } from '@/lib/presets';

const goalIcons = {
  book: BookOpen,
  shield: Shield,
  zap: Zap,
  layers: Layers,
};

export function StarterQuiz() {
  const { applyPreset } = useStack();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

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

  const loadStack = () => {
    if (result) applyPreset(result.preset as PresetKey);
  };

  return (
    <div className="gradient-border p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-mono text-[10px] text-accent-cyan tracking-widest mb-1">STARTER QUIZ</p>
          <h3 className="text-lg font-bold">Find Your Entry Point</h3>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          {done ? 'Complete' : `Step ${step + 1}/${quizSteps.length}`}
        </span>
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
                    onClick={() => select(opt.id)}
                    className="w-full text-left glass glass-hover rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:border-accent-cyan/30"
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
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-emerald/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-accent-emerald" />
              </div>
              <div>
                <p className="text-sm font-bold text-accent-emerald mb-1">Your personalized path</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{result.insight}</p>
              </div>
            </div>

            <div className="glass rounded-xl p-4 mb-4">
              <p className="text-[10px] font-mono text-accent-violet uppercase mb-2">
                Recommended: {result.stack.label} Stack
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {result.stack.ids.map((id) => {
                  const c = compounds.find((x) => x.id === id);
                  return c ? (
                    <span key={id} className="text-[10px] bg-accent-violet/10 text-violet-300 px-2 py-0.5 rounded font-semibold">
                      {c.name}
                    </span>
                  ) : null;
                })}
              </div>
              <p className="text-[10px] text-muted-foreground">{result.stack.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={loadStack}
                className="col-span-2 flex items-center justify-center gap-2 bg-accent-cyan text-black py-3 rounded-xl text-sm font-semibold hover:bg-accent-emerald transition-all"
              >
                Load Stack in Architect <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={result.primary.href}
                className="flex items-center justify-center gap-1 glass py-2.5 rounded-xl text-xs font-semibold hover:border-accent-cyan/30 transition"
              >
                {result.primary.cta}
              </a>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-1 glass py-2.5 rounded-xl text-xs text-muted-foreground hover:text-foreground transition"
              >
                <RotateCcw className="w-3 h-3" /> Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}