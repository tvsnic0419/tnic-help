import { NextResponse } from 'next/server';
import { parsePartnerJson, PARTNER_SCHEMA } from '@/lib/lab-partner-import';

export const runtime = 'nodejs';

/**
 * Partner results webhook — validates secret, normalizes payload.
 * Partners POST tnic-lab-partner/v1 JSON when panel completes.
 */
export async function POST(request: Request) {
  const secret = process.env.LAB_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get('x-tnic-webhook-secret');
    if (header !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const body = await request.json();
    const result = parsePartnerJson(body);

    if (result.entries.length === 0) {
      return NextResponse.json(
        { ok: false, schema: PARTNER_SCHEMA, errors: result.errors },
        { status: 422 },
      );
    }

    const orderId =
      typeof body === 'object' && body !== null && 'order_id' in body
        ? String((body as { order_id: unknown }).order_id)
        : undefined;

    return NextResponse.json({
      ok: true,
      event: 'panel.complete',
      order_id: orderId,
      entries: result.entries,
      errors: result.errors,
      meta: result.meta,
      import_payload: typeof body === 'object' && body !== null ? body : undefined,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    schema: PARTNER_SCHEMA,
    method: 'POST',
    headers: { 'x-tnic-webhook-secret': 'required when LAB_WEBHOOK_SECRET is set' },
    description: 'Partner pushes completed panel results; client polls or receives push notification.',
  });
}