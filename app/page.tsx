import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';

// Lazy loaded components for better performance
const HowItWorks = dynamic(() => import('@/components/ui/HowItWorks').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-2xl mx-auto max-w-6xl" />,
  ssr: false
});

const PlatformTicker = dynamic(() => import('@/components/PlatformTicker'), { ssr: false });
const PremiumManifestoSection = dynamic(() => import('@/components/sections/PremiumManifestoSection'), { ssr: false });
const StackImpactPreview = dynamic(() => import('@/components/sections/StackImpactPreview'), { ssr: false });
const ClockImpactSection = dynamic(() => import('@/components/sections/ClockImpactSection'), { ssr: false });
const NinetyDayCycle = dynamic(() => import('@/components/sections/NinetyDayCycle'), { ssr: false });
const HomepagePersonalizedRail = dynamic(() => import('@/components/sections/HomepagePersonalizedRail'), { ssr: false });
const PlatformPreview = dynamic(() => import('@/components/sections/PlatformPreview'), { ssr: false });
const HomepageOSFunnel = dynamic(() => import('@/components/sections/HomepageOSFunnel'), { ssr: false });
const HallmarkProblemTiles = dynamic(() => import('@/components/sections/HallmarkProblemTiles'), { ssr: false });
const LibraryHighlights = dynamic(() => import('@/components/sections/LibraryHighlights'), { ssr: false });
const ResearchIntel = dynamic(() => import('@/components/sections/ResearchIntel'), { ssr: false });
const CompetitiveEdge = dynamic(() => import('@/components/sections/CompetitiveEdge'), { ssr: false });
const SiteGuide = dynamic(() => import('@/components/sections/SiteGuide'), { ssr: false });
const TrustBanner = dynamic(() => import('@/components/sections/TrustBanner'), { ssr: false });
const HomepageCTA = dynamic(() => import('@/components/sections/HomepageCTA'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Critical above-the-fold content */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-2xl mx-auto max-w-6xl" />}>
        <HowItWorks />
      </Suspense>

      {/* Lazy loaded below-the-fold sections */}
      <PlatformTicker />
      <PremiumManifestoSection />
      <StackImpactPreview />
      <ClockImpactSection />
      <NinetyDayCycle />
      <HomepagePersonalizedRail />
      <PlatformPreview />
      <HomepageOSFunnel />
      <HallmarkProblemTiles />
      <LibraryHighlights />
      <ResearchIntel />
      <CompetitiveEdge />
      <SiteGuide />
      <TrustBanner />
      <HomepageCTA />
    </>
  );
}
