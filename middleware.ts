import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CANONICAL_SITE_URL } from '@/lib/site';

const CANONICAL_HOST = new URL(CANONICAL_SITE_URL).hostname;

function canonicalRedirect(request: NextRequest): NextResponse | null {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase();
  const proto = request.headers.get('x-forwarded-proto');
  const needsHttps = proto === 'http';
  const needsApex = host === `www.${CANONICAL_HOST}`;

  if (!needsHttps && !needsApex) return null;

  const url = request.nextUrl.clone();
  url.protocol = 'https';
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    const redirect = canonicalRedirect(request);
    if (redirect) return redirect;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};