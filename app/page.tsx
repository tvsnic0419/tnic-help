import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomepageOSFunnel } from '@/components/sections/HomepageOSFunnel';
import { TrustBanner } from '@/components/TrustBanner';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { HomepageTrust } from '@/components/sections/HomepageTrust';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
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
          <HomepageOSFunnel />
          <TrustBanner />
          <LibraryHighlights />
          <HomepageTrust />
          <HomepageCTA />
          <SiteGuide />
        </main>
        <ToolsDock />
        <Footer />
    </div>
  );
}