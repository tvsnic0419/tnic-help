import { describe, expect, it } from 'vitest';
import {
  buildQuizShareUrl,
  buildQuizStacksUrl,
  buildQuizShopUrl,
  buildQuizShareText,
  isCompleteQuizAnswers,
  parseQuizSearchParams,
} from './quiz-share';

const sampleAnswers = {
  goal: 'energy',
  age: '41-50',
  experience: 'some',
} as const;

describe('quiz-share', () => {
  it('detects complete quiz answers', () => {
    expect(isCompleteQuizAnswers(sampleAnswers)).toBe(true);
    expect(isCompleteQuizAnswers({ goal: 'energy' })).toBe(false);
  });

  it('builds shareable quiz URL with preset', () => {
    const url = buildQuizShareUrl(sampleAnswers);
    expect(url).toContain('https://tnic.help/quiz?');
    expect(url).toContain('goal=energy');
    expect(url).toContain('preset=mito');
  });

  it('builds stacks and shop deep links', () => {
    expect(buildQuizStacksUrl('mito')).toBe('https://tnic.help/stacks?from=quiz&preset=mito');
    expect(buildQuizShopUrl('mito')).toBe('https://tnic.help/shop?stack=mito');
  });

  it('parses quiz search params', () => {
    const parsed = parseQuizSearchParams('?goal=energy&age=41-50&experience=some');
    expect(parsed).toEqual(sampleAnswers);
  });

  it('includes stack info in share text', () => {
    const text = buildQuizShareText(sampleAnswers);
    expect(text).toContain('Mitochondrial');
    expect(text).toContain('Stack Architect');
    expect(text).toContain('#longevity');
  });
});