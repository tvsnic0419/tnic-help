import { getBuyerGuide } from './buyer-guides';
import type { CompoundBuyerGuide } from './buyer-guides';

export interface StackShopItem {
  compoundId: string;
  compoundName: string;
  dose: string;
  timing: string;
  buyerGuide?: CompoundBuyerGuide;
  moduleHref: string;
  compareHref?: string;
  priority: 'essential' | 'recommended' | 'optional';
}

const compoundModuleMap: Record<string, { name: string; slug: string; synergy?: boolean }> = {
  glynac: { name: 'GlyNAC', slug: 'glynac' },
  nmn: { name: 'NMN', slug: 'nmn' },
  sulforaphane: { name: 'Sulforaphane', slug: 'sulforaphane' },
  resveratrol: { name: 'Trans-Resveratrol', slug: 'resveratrol' },
  cakg: { name: 'Ca-AKG', slug: 'nad-mito-stack', synergy: true },
  rala: { name: 'R-Alpha Lipoic Acid', slug: 'glynac-nrf2-triad', synergy: true },
};

/** Map active stack IDs to shop intelligence — no affiliate URLs, buyer-guide driven */
export function getStackShopItems(compoundIds: string[]): StackShopItem[] {
  const unique = [...new Set(compoundIds)];

  return unique
    .map((id) => {
      const meta = compoundModuleMap[id];
      if (!meta) return null;

      const guide = getBuyerGuide(id);
      const dose = guide?.doseAnchors[0]?.dose ?? 'See module';
      const timing =
        id === 'resveratrol' ? 'PM with fat meal' : id === 'nmn' ? 'AM fasted' : 'AM';

      return {
        compoundId: id,
        compoundName: meta.name,
        dose,
        timing,
        buyerGuide: guide,
        moduleHref: meta.synergy
          ? `/library/synergies/${meta.slug}`
          : `/library/compounds/${meta.slug}`,
        compareHref: guide?.relatedCompareSlug
          ? `/library/compare/${guide.relatedCompareSlug}`
          : undefined,
        priority: ['glynac', 'nmn', 'sulforaphane'].includes(id) ? 'essential' : 'recommended',
      } satisfies StackShopItem;
    })
    .filter(Boolean) as StackShopItem[];
}

export const shopDisclosure = {
  title: 'Zero inventory conflict',
  body: 'TNiC does not sell supplements, hold inventory, or earn commissions on product links. The Protocol Shop is a verification layer — use buyer guides to evaluate any supplier against RCT doses and COA requirements.',
  affiliateNote:
    'Future affiliate partnerships, if any, will be disclosed per product and never influence evidence tiers or stack recommendations.',
};