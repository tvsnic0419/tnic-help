/**
 * Curated product picks — one recommended brand per compound with verified buy links.
 * Images are served locally from /public/products/ with SVG fallbacks per compound.
 */

export interface ProductPick {
  compoundId: string;
  compoundName: string;
  brand: string;
  productName: string;
  /** Local product photo (primary) */
  imageSrc: string;
  /** Illustrated fallback if primary fails to load */
  fallbackImageSrc: string;
  /** Manufacturer product / buy page */
  purchaseUrl: string;
  /** Brand homepage */
  brandWebsite: string;
  /** Optional second product (e.g. GlyNAC needs glycine + NAC) */
  companionPurchase?: {
    label: string;
    purchaseUrl: string;
    imageSrc?: string;
    fallbackImageSrc?: string;
  };
  /** ISO date when purchaseUrl was last verified */
  linkVerifiedAt?: string;
  whyThisPick: string;
  doseNote: string;
}

const PRODUCTS = '/products';

export const PRODUCT_PICKS: Record<string, ProductPick> = {
  glynac: {
    compoundId: 'glynac',
    compoundName: 'GlyNAC',
    brand: 'Codeage',
    productName: 'Liposomal Glycine + Liposomal NAC',
    imageSrc: `${PRODUCTS}/glynac.jpg`,
    fallbackImageSrc: `${PRODUCTS}/glynac.svg`,
    purchaseUrl:
      'https://www.codeage.com/products/liposomal-glycine-free-form-amino-acid-capsules',
    brandWebsite: 'https://www.codeage.com',
    companionPurchase: {
      label: 'Also add: Codeage Liposomal NAC',
      purchaseUrl:
        'https://www.codeage.com/products/liposomal-nac-n-acetyl-l-cysteine-capsules',
      imageSrc: `${PRODUCTS}/glynac.jpg`,
      fallbackImageSrc: `${PRODUCTS}/glynac.svg`,
    },
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      'Matched pair from one manufacturer — liposomal delivery, clear dosing, widely available.',
    doseNote: 'Target ~7g glycine + ~600mg NAC daily (split doses). Buy both products.',
  },
  nmn: {
    compoundId: 'nmn',
    compoundName: 'NMN',
    brand: 'Codeage Amen',
    productName: 'NMN Nicotinamide Mononucleotide 500mg',
    imageSrc: `${PRODUCTS}/nmn.jpg`,
    fallbackImageSrc: `${PRODUCTS}/nmn.svg`,
    purchaseUrl: 'https://www.codeage.com/products/amen-nmn-supplement',
    brandWebsite: 'https://www.codeage.com',
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      '500mg per capsule — matches common longevity protocol doses. Third-party tested.',
    doseNote: 'Typical: 500mg–1g daily. Start at 500mg.',
  },
  nr: {
    compoundId: 'nr',
    compoundName: 'NR (Nicotinamide Riboside)',
    brand: 'Tru Niagen',
    productName: 'Niagen® 300mg NR-Cl',
    imageSrc: `${PRODUCTS}/nmn.jpg`,
    fallbackImageSrc: `${PRODUCTS}/nmn.svg`,
    purchaseUrl: 'https://www.truniagen.com/products/tru-niagen',
    brandWebsite: 'https://www.truniagen.com',
    linkVerifiedAt: '2026-06-19',
    whyThisPick:
      'Pharmaceutical-grade NR-Cl (Niagen®) — the molecule used in published human NAD+ trials. Clear 300mg dose per capsule.',
    doseNote: 'Typical: 300–1000 mg/day NR. Start 300mg; retest NAD+ at week 4.',
  },
  sulforaphane: {
    compoundId: 'sulforaphane',
    compoundName: 'Sulforaphane',
    brand: 'Avmacol',
    productName: 'Avmacol Extra Strength',
    imageSrc: `${PRODUCTS}/sulforaphane.png`,
    fallbackImageSrc: `${PRODUCTS}/sulforaphane.svg`,
    purchaseUrl: 'https://www.avmacol.com/products/avmacol-extra-strength',
    brandWebsite: 'https://www.avmacol.com',
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      'Clinically studied sulforaphane glucosinolate (TrueBroc®). Standard reference product.',
    doseNote: '1–2 tablets daily with food (provides SGS equivalent).',
  },
  resveratrol: {
    compoundId: 'resveratrol',
    compoundName: 'Resveratrol',
    brand: 'Thorne',
    productName: 'ResveraCel',
    imageSrc: `${PRODUCTS}/resveratrol.jpg`,
    fallbackImageSrc: `${PRODUCTS}/resveratrol.svg`,
    purchaseUrl: 'https://www.thorne.com/products/dp/resveracel',
    brandWebsite: 'https://www.thorne.com',
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      'Resveratrol + nicotinamide riboside stack. Thorne is a trusted clinical brand.',
    doseNote: 'Per label — typically 1–2 capsules daily.',
  },
  cakg: {
    compoundId: 'cakg',
    compoundName: 'Ca-AKG',
    brand: 'DoNotAge',
    productName: 'Pure Ca-AKG',
    imageSrc: `${PRODUCTS}/cakg.png`,
    fallbackImageSrc: `${PRODUCTS}/cakg.svg`,
    purchaseUrl: 'https://donotage.org/ca-akg',
    brandWebsite: 'https://donotage.org',
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      'Direct from the longevity research brand. Pure calcium alpha-ketoglutarate.',
    doseNote: 'Typical research dose: ~1g Ca-AKG daily.',
  },
  rala: {
    compoundId: 'rala',
    compoundName: 'R-ALA',
    brand: 'GeroNova',
    productName: 'Bio-Enhanced R-Lipoic Acid 300mg',
    imageSrc: `${PRODUCTS}/rala.png`,
    fallbackImageSrc: `${PRODUCTS}/rala.svg`,
    purchaseUrl:
      'https://geronova.com/product/bio-enhanced-r-lipoic-acid-vegcaps-300mg-60caps/',
    brandWebsite: 'https://geronova.com',
    linkVerifiedAt: '2026-06-18',
    whyThisPick:
      'Stabilized R-form (not racemic ALA). 300mg matches common protocol doses.',
    doseNote: '300mg R-ALA daily, often split AM/PM.',
  },
};

export const productPicks: ProductPick[] = Object.values(PRODUCT_PICKS);

export function getProductPick(compoundId: string): ProductPick | undefined {
  return PRODUCT_PICKS[compoundId];
}

export function getProductPickByName(compoundName: string): ProductPick | undefined {
  const key = compoundName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const aliases: Record<string, string> = {
    glynac: 'glynac',
    nmn: 'nmn',
    nicotinamidemononucleotide: 'nmn',
    sulforaphane: 'sulforaphane',
    resveratrol: 'resveratrol',
    caakg: 'cakg',
    calciumalphaketoglutarate: 'cakg',
    rala: 'rala',
    rlipoicacid: 'rala',
    rlipoic: 'rala',
  };
  const id = aliases[key];
  return id ? PRODUCT_PICKS[id] : undefined;
}