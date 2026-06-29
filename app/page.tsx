import { Hero } from '@/components/Hero';
import { PlatformTicker } from '@/components/PlatformTicker';
import { PremiumManifestoSection } from '@/components/sections/PremiumManifestoSection';
import { StackImpactPreview } from '@/components/sections/StackImpactPreview';
import { ClockImpactSection } from '@/components/sections/ClockImpactSection';
import { NinetyDayCycle } from '@/components/sections/NinetyDayCycle';
import { HomepagePersonalizedRail } from '@/components/sections/HomepagePersonalizedRail';
import { PlatformPreview } from '@/components/sections/PlatformPreview';
import { HomepageOSFunnel } from '@/components/sections/HomepageOSFunnel';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { ResearchIntel } from '@/components/sections/ResearchIntel';
import { CompetitiveEdge } from '@/components/sections/CompetitiveEdge';
import { SiteGuide } from '@/components/sections/SiteGuide';
import { TrustBanner } from '@/components/sections/TrustBanner';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { HowItWorks } from '@/components/ui/HowItWorks';

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* NEW: Clear 3-step onboarding guidance right after hero */}
      <HowItWorks />

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
