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
    {
      method: 'GET' as const,
      path: '/api/labs/partner/oauth/start',
      description: 'Initiate OAuth — demo partner redirects to /labs with authorization code.',
    },
    {
      method: 'POST' as const,
      path: '/api/labs/partner/oauth/token',
      description: 'Exchange authorization code for Bearer access token.',
    },
    {
      method: 'POST' as const,
      path: '/api/labs/partner/order',
      description: 'Create at-home panel order; demo returns import_payload for immediate Labs hub import.',
    },
    {
      method: 'POST' as const,
      path: '/api/labs/partner/webhook',
      description: 'Partner pushes completed panel results; validates x-tnic-webhook-secret when configured.',
    },
  ],
  webhookNote:
    'Partners POST completed panels to /api/labs/partner/webhook or the import endpoint. OAuth order-at-home demo is live at /labs#lab-partner-oauth.',
  examplePayload: PARTNER_JSON_EXAMPLE,
  responseShape: {
    ok: true,
    entries: [{ markerId: 'gsh', value: 5.2, date: '2026-06-16' }],
    errors: [] as string[],
    meta: { panel_id: 'longevity-baseline', partner: 'demo-lab', schema: PARTNER_SCHEMA },
  },
  docsUrl: `${SITE.url}/labs#partner-import`,
};