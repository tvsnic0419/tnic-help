import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomepageTrustStrip } from '@/components/sections/HomepageTrustStrip';
import { PlatformPreview } from '@/components/sections/PlatformPreview';
import { HallmarkProblemTiles } from '@/components/sections/HallmarkProblemTiles';
import { HomepageSynergyNetwork } from '@/components/sections/HomepageSynergyNetwork';
import { CompetitiveEdge } from '@/components/sections/CompetitiveEdge';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { PlatformTicker } from '@/components/ui/PlatformTicker';
import { PremiumManifestoSection } from '@/components/sections/PremiumManifestoSection';
import { StackImpactPreview } from '@/components/sections/StackImpactPreview';
import { ClockImpactSection } from '@/components/sections/ClockImpactSection';
import { NinetyDayCycle } from '@/components/sections/NinetyDayCycle';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.home();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <HomepageTrustStrip />
        <PlatformTicker />
        <PremiumManifestoSection />
        <StackImpactPreview />
        <ClockImpactSection />
        <NinetyDayCycle />
        <PlatformPreview />
        <HallmarkProblemTiles />
        <HomepageSynergyNetwork />
        <LibraryHighlights />
        <CompetitiveEdge />
        <HomepageCTA />
      </main>
      <ToolsDock />
      <Footer />
    </div>
  );
}
