import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SkipLink } from "@/components/SkipLink";
import { PlatformProviderWrapper } from "@/components/PlatformProviderWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TNiC — Evidence-Based Longevity Education & Tools",
  description:
    "Free educational platform for healthspan optimization. Learn the 12 Hallmarks of Aging, build evidence-graded supplement stacks, explore biomarkers, and access PubMed-cited longevity research.",
  keywords: [
    "longevity",
    "biohacking",
    "NRF2",
    "glutathione",
    "NMN",
    "NAD+",
    "healthspan",
    "anti-aging",
    "GlyNAC",
    "hallmarks of aging",
    "supplement stack",
    "biological age",
  ],
  openGraph: {
    title: "TNiC — Evidence-Based Longevity Education",
    description:
      "Authoritative longevity science made accessible. Interactive tools, safety guidance, and PubMed-cited protocols for health-optimized adults.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
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