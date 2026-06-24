import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomepageOSFunnel } from '@/components/sections/HomepageOSFunnel';
import { HomepageTrustStrip } from '@/components/sections/HomepageTrustStrip';
import { PlatformPreview } from '@/components/sections/PlatformPreview';
import { TrustBanner } from '@/components/TrustBanner';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { ResearchIntel } from '@/components/sections/ResearchIntel';
import { HomepageBriefRail } from '@/components/sections/HomepageBriefRail';
import { HomepageCompareRow } from '@/components/sections/HomepageCompareRow';
import { CompetitiveEdge } from '@/components/sections/CompetitiveEdge';
import { HomepageTrust } from '@/components/sections/HomepageTrust';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { HomepageProductRail } from '@/components/sections/HomepageProductRail';
import { HomepagePersonalizedRail } from '@/components/sections/HomepagePersonalizedRail';
import { NextUpSection } from '@/components/sections/NextUpSection';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { HomepageSynergyNetwork } from '@/components/sections/HomepageSynergyNetwork';
import { PlatformTicker } from '@/components/ui/PlatformTicker';
import { SiteGuide } from '@/components/SiteGuide';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.home();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ScrollProgress />
        <Nav />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <PlatformTicker />
          <HomepagePersonalizedRail />
          <HomepageTrustStrip />
          <PlatformPreview />
          <HomepageOSFunnel />
          <SiteGuide />
          <HallmarkProblemTiles />
          <HomepageSynergyNetwork />
          <TrustBanner />
          <LibraryHighlights />
          <HomepageCompareRow />
          <ResearchIntel />
          <HomepageBriefRail />
          <CompetitiveEdge />
          <HomepageProductRail />
          <HomepageTrust />
          <HomepageCTA />
          <NextUpSection />
        </main>
        <ToolsDock />
        <Footer />
    </div>
  );
}