import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { SkipLink } from '@/components/SkipLink';
import { PlatformProviderWrapper } from '@/components/PlatformProviderWrapper';
import { SITE, LONGEVITY_KEYWORDS } from '@/lib/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.fullName,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Free educational platform for healthspan optimization. Learn the 12 Hallmarks of Aging, build evidence-graded supplement stacks, track biomarkers locally, and access PubMed-cited longevity research.',
  keywords: [...LONGEVITY_KEYWORDS],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    title: SITE.fullName,
    description:
      'Authoritative longevity science made accessible. Interactive tools, safety guidance, and PubMed-cited protocols for health-optimized adults.',
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.fullName,
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.fullName,
    description: 'Evidence-based longevity education, stacks, labs, and interactive tools.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full">
        <SkipLink />
        <PlatformProviderWrapper>{children}</PlatformProviderWrapper>
      </body>
    </html>
  );
}