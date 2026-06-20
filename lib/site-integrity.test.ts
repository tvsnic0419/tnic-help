import { describe, expect, it } from 'vitest';
import { compounds, safetyNotes } from './data';
import { libraryModules } from './library-modules';
import { ELITE_8_COMPOUNDS } from './elite-8-data';

describe('site data integrity', () => {
  it('every stack compound has a safety profile', () => {
    for (const compound of compounds) {
      expect(
        safetyNotes.some((n) => n.compoundId === compound.id),
        `missing safety profile for ${compound.id}`,
      ).toBe(true);
    }
  });

  it('Tier B library compounds have MDX modules', () => {
    const tierB = ['taurine', 'spermidine', 'pterostilbene'];
    for (const id of tierB) {
      expect(libraryModules.some((m) => m.slug === id && m.category === 'compounds')).toBe(true);
    }
  });

  it('Elite 8 OTC compounds link to library routes when available', () => {
    const otcWithLibrary = ELITE_8_COMPOUNDS.filter((c) => !c.isRx && c.libraryHref);
    expect(otcWithLibrary.length).toBeGreaterThanOrEqual(5);
    for (const c of otcWithLibrary) {
      expect(c.libraryHref).toMatch(/^\/library\/compounds\//);
    }
  });
});