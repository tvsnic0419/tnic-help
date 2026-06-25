import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import Hero from '@/components/Hero';
import { HomepageOSFunnel } from '@/components/sections/HomepageOSFunnel';
import { PlatformPreview } from '@/components/sections/PlatformPreview';
import { TrustBanner } from '@/components/TrustBanner';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { ResearchIntel } from '@/components/sections/ResearchIntel';
import { CompetitiveEdge } from '@/components/sections/CompetitiveEdge';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { HomepagePersonalizedRail } from '@/components/sections/HomepagePersonalizedRail';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { PlatformTicker } from '@/components/ui/PlatformTicker';
import { PremiumManifestoSection } from '@/components/sections/PremiumManifestoSection';
import { SiteGuide } from '@/components/SiteGuide';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.home();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ScrollProgress />
        <Nav />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <PlatformTicker />
          <PremiumManifestoSection />
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
        </main>
        <ToolsDock />
        <Footer />
    </div>
  );
}