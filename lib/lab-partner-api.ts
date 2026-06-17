import { PARTNER_SCHEMA, PARTNER_JSON_EXAMPLE } from './lab-partner-import';
import { SITE } from './site';

/** Public API contract for lab partner integrations (Sprint 9 beta) */
export const labPartnerApiSpec = {
  version: '1.0.0-beta',
  schema: PARTNER_SCHEMA,
  endpoints: [
    {
      method: 'POST' as const,
      path: '/api/labs/partner-import',
      description: 'Normalize partner panel JSON into TNiC lab entries. Stateless — does not store health data.',
    },
  ],
  webhookNote:
    'Partners may POST results to the import endpoint; the Labs hub imports the normalized response locally. OAuth and order-at-home flows ship Q3 2026.',
  examplePayload: PARTNER_JSON_EXAMPLE,
  responseShape: {
    ok: true,
    entries: [{ markerId: 'gsh', value: 5.2, date: '2026-06-16' }],
    errors: [] as string[],
    meta: { panel_id: 'longevity-baseline', partner: 'demo-lab', schema: PARTNER_SCHEMA },
  },
  docsUrl: `${SITE.url}/labs#partner-import`,
};