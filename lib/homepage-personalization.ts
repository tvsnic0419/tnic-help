import { stackPresets, type PresetKey } from './presets';
import { getQuizResult, type QuizAnswers } from './homepage';
import { buildShopPresetUrl } from './stack-url';

export interface QuizProfile {
  goal?: string;
  age?: string;
  experience?: string;
  preset: string;
}

export function getHeroPersonalization(quiz: QuizProfile | null | undefined) {
  if (!quiz?.preset || !(quiz.preset in stackPresets)) {
    return {
      line1: 'Aging is not inevitable.',
      line2: 'Your longevity OS starts here.',
      subcopy:
        'The first privacy-first longevity platform built on the 12 Hallmarks of Aging — not supplement marketing. Six evidence-graded modules, every compound rated Tier A/B/C from human trials. Your health data never leaves your browser.',
      primary: { href: '/quiz', label: 'Build Your Protocol' },
      secondary: { href: '/dashboard', label: 'Open Longevity OS' },
      contextNext:
        'Take the 3-min quiz to get a mechanism-matched stack preset, or open the OS dashboard to start building, tracking, and optimizing your longevity protocol today.',
    };
  }

  const preset = quiz.preset as PresetKey;
  const stack = stackPresets[preset];
  const answers: QuizAnswers = {
    goal: quiz.goal,
    age: quiz.age,
    experience: quiz.experience,
  };
  const result = getQuizResult(answers);

  return {
    line1: 'Welcome back.',
    line2: `${stack.label} is ready.`,
    subcopy: result.insight,
    primary: { href: `/stacks?preset=${preset}`, label: `Resume ${stack.label}` },
    secondary: { href: buildShopPresetUrl(preset), label: 'Verify picks at Shop' },
    contextNext: `Load ${stack.label} in Stack Architect (${stack.ids.length} compounds), log baseline labs, then verify brands with stack-filtered COA checklists.`,
  };
}

const OS_HREF_ORDER: Record<string, string[]> = {
  learn: ['/library', '/dashboard', '/stacks', '/labs', '/tools'],
  defense: ['/tools', '/stacks', '/labs', '/library', '/dashboard'],
  energy: ['/stacks', '/labs', '/dashboard', '/library', '/tools'],
  full: ['/dashboard', '/stacks', '/labs', '/library', '/tools'],
};

export function getOsFunnelOrder(goal?: string): string[] {
  return OS_HREF_ORDER[goal ?? ''] ?? OS_HREF_ORDER.full;
}

const PRESET_COMPOUNDS: Record<PresetKey, string[]> = {
  starter: ['glynac', 'sulforaphane', 'rala'],
  nrf2: ['glynac', 'sulforaphane', 'rala'],
  mito: ['nmn', 'cakg', 'resveratrol', 'rala'],
  hybrid: ['glynac', 'sulforaphane', 'nmn', 'cakg', 'resveratrol'],
  longevity: ['urolithina', 'fisetin', 'omega3', 'nmn', 'resveratrol'],
  metabolic: ['berberine', 'omega3', 'coq10', 'rala'],
};

export function getPresetCompoundIds(preset?: string): string[] {
  if (preset && preset in PRESET_COMPOUNDS) {
    return PRESET_COMPOUNDS[preset as PresetKey];
  }
  return [];
}