import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Protocol Brief subscribe — forwards to webhook when configured,
 * otherwise returns RSS/JSON feed URLs for automated delivery.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email required' }, { status: 400 });
    }

    const webhook = process.env.BRIEF_SUBSCRIBE_WEBHOOK_URL;
    let mode: 'webhook' | 'feed' = 'feed';

    if (webhook) {
      try {
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: 'tnic-protocol-brief',
            subscribed_at: new Date().toISOString(),
            frequency: 'weekly',
          }),
        });
        if (res.ok) mode = 'webhook';
      } catch {
        /* fall through to feed mode */
      }
    }

    return NextResponse.json({
      ok: true,
      mode,
      message:
        mode === 'webhook'
          ? 'Subscribed — weekly delivery will start when the list is processed.'
          : 'Use RSS/JSON feeds for automated delivery until email backend is fully live.',
      feeds: {
        rss: '/brief/feed.xml',
        json: '/brief/feed.json',
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}