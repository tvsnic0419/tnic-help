import { stackPresets } from './presets';
import { researchFeed, platformStats } from './data';

export const heroValueProps = [
  '12 Hallmarks of Aging — fully mapped',
  '6 evidence-graded compounds with PubMed links',
  'Free interactive tools — no paywall',
];

export const quizSteps = [
  {
    id: 'goal',
    question: 'What brings you to TNiC today?',
    options: [
      { id: 'learn', label: 'Understand the science first', icon: 'book' as const },
      { id: 'defense', label: 'Strengthen antioxidant defenses', icon: 'shield' as const },
      { id: 'energy', label: 'Restore energy & NAD+', icon: 'zap' as const },
      { id: 'full', label: 'Build a complete protocol', icon: 'layers' as const },
    ],
  },
  {
    id: 'age',
    question: 'Your age range',
    options: [
      { id: '30-40', label: '30–40', desc: 'Prevention window' },
      { id: '41-50', label: '41–50', desc: 'Early decline signals' },
      { id: '51-60', label: '51–60', desc: 'Accelerated depletion' },
      { id: '60+', label: '60+', desc: 'Multi-pathway focus' },
    ],
  },
  {
    id: 'experience',
    question: 'Your supplement experience',
    options: [
      { id: 'new', label: 'Brand new', desc: 'Start with fundamentals' },
      { id: 'some', label: 'Some experience', desc: 'Ready to optimize' },
      { id: 'advanced', label: 'Advanced', desc: 'Compare & stack' },
    ],
  },
] as const;

export type QuizAnswers = {
  goal?: string;
  age?: string;
  experience?: string;
};

export function getQuizResult(answers: QuizAnswers) {
  const preset =
    answers.goal === 'energy' ? 'mito'
      : answers.goal === 'defense' ? 'nrf2'
        : answers.goal === 'full' ? 'hybrid'
          : 'starter';

  const paths = {
    learn: { title: 'Start with the Learn Center', href: '#learn', cta: 'Open Learn Center' },
    defense: { title: 'Run your Defense Scan', href: '#calculator', cta: 'Calculate Bio Age' },
    energy: { title: 'Explore mitochondrial pathways', href: '#science', cta: 'View Science' },
    full: { title: 'Open your Personal Dashboard', href: '#dashboard', cta: 'Go to Dashboard' },
  };

  const primary = paths[answers.goal as keyof typeof paths] ?? paths.learn;
  const stack = stackPresets[preset];

  const insight =
    answers.goal === 'learn'
      ? 'Smart first move. TNiC maps every compound to hallmarks, evidence tiers, and safety data before you stack anything.'
      : answers.age === '60+'
        ? 'At 60+, dual-pathway coverage (NRF2 + mitochondrial) typically yields the best modeled defense index.'
        : answers.experience === 'new'
          ? 'We recommend the Tier-A starter protocol — three human-trial-backed compounds with clear dosing.'
          : 'Your profile points to an evidence-graded preset. Load it in Stack Architect and adjust from there.';

  return { preset, stack, primary, insight };
}

export const featuredStacks = (Object.keys(stackPresets) as (keyof typeof stackPresets)[]).map((key) => ({
  key,
  ...stackPresets[key],
  compoundCount: stackPresets[key].ids.length,
}));

export const latestResearch = researchFeed.slice(0, 3);

export const trustPillars = [
  {
    title: 'Evidence-Graded',
    desc: 'Every compound rated Tier A/B/C based on human trial data — never hidden behind marketing.',
    href: '#compounds',
  },
  {
    title: 'Modeled vs. Lab',
    desc: 'Projections are clearly labeled. Log real bloodwork in Lab Tracker to compare against models.',
    href: '/labs',
  },
  {
    title: 'Safety First',
    desc: 'Contraindications, red flags, and physician-export protocols in the Trust Center.',
    href: '/trust',
  },
  {
    title: 'Radical Transparency',
    desc: 'No affiliate pressure on recommendations. Methodology, limitations, and sources are open.',
    href: '#about',
  },
];

export { platformStats };