import { NextResponse } from 'next/server';
import { createDemoToken, DEMO_PARTNER_ID, validateDemoToken } from '@/lib/lab-partner-oauth';

export const runtime = 'nodejs';

/** Exchange authorization code for access token */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = typeof body.code === 'string' ? body.code : '';
    const partnerId = typeof body.partner_id === 'string' ? body.partner_id : DEMO_PARTNER_ID;

    if (!code) {
      return NextResponse.json({ error: 'code required' }, { status: 400 });
    }

    if (partnerId === DEMO_PARTNER_ID && code.startsWith('demo_')) {
      const access_token = createDemoToken(partnerId);
      const now = Date.now();
      return NextResponse.json({
        access_token,
        token_type: 'Bearer',
        expires_in: 3600,
        partner_id: partnerId,
        scope: 'labs.read orders.create',
        connected_at: new Date(now).toISOString(),
        expires_at: new Date(now + 3600_000).toISOString(),
      });
    }

    if (validateDemoToken(code, partnerId)) {
      const access_token = createDemoToken(partnerId);
      const now = Date.now();
      return NextResponse.json({
        access_token,
        token_type: 'Bearer',
        expires_in: 3600,
        partner_id: partnerId,
        connected_at: new Date(now).toISOString(),
        expires_at: new Date(now + 3600_000).toISOString(),
      });
    }

    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}