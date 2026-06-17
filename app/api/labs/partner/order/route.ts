import { NextResponse } from 'next/server';
import {
  createDemoOrder,
  DEMO_PARTNER_ID,
  validateDemoToken,
} from '@/lib/lab-partner-oauth';

export const runtime = 'nodejs';

/** Create at-home panel order — demo returns import payload immediately */
export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization');
    const token = auth?.replace(/^Bearer\s+/i, '') ?? '';

    const body = await request.json();
    const panelId = typeof body.panel_id === 'string' ? body.panel_id : 'longevity-baseline';
    const partnerId = typeof body.partner_id === 'string' ? body.partner_id : DEMO_PARTNER_ID;

    if (!token || !validateDemoToken(token, partnerId)) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 401 });
    }

    const order = createDemoOrder(panelId);
    return NextResponse.json({ ok: true, ...order });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}