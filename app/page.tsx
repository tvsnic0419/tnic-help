import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { SiteGuide } from '@/components/SiteGuide';
import { TrustBanner } from '@/components/TrustBanner';
import { ToolsDock } from '@/components/ToolsDock';
import { HeroSection } from '@/components/sections/HeroSection';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { HomepageTrust } from '@/components/sections/HomepageTrust';
import { HomepageCTA } from '@/components/sections/HomepageCTA';
import { AboutSection } from '@/components/sections/AboutSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { PersonalDashboard } from '@/components/sections/PersonalDashboard';
import { LearnCenter } from '@/components/sections/LearnCenter';
import { AntiAgingLibrary } from '@/components/library/AntiAgingLibrary';
import { ScienceSection } from '@/components/sections/ScienceSection';
import { TrustCenter } from '@/components/sections/TrustCenter';
import { PathwayMap } from '@/components/sections/PathwayMap';
import { BiomarkerCommand } from '@/components/sections/BiomarkerCommand';
import { LabTracker } from '@/components/sections/LabTracker';
import { CompoundLab } from '@/components/sections/CompoundLab';
import { StackArchitect } from '@/components/sections/StackArchitect';
import { StarterStackCTA } from '@/components/sections/StarterStackCTA';
import { ProtocolTimeline } from '@/components/sections/ProtocolTimeline';
import { DefenseCalculator } from '@/components/sections/DefenseCalculator';
import { ResearchIntel } from '@/components/sections/ResearchIntel';
import { CommunityPulse } from '@/components/sections/CommunityPulse';
import { FutureSection } from '@/components/sections/FutureSection';
import { NetworkCTA } from '@/components/sections/NetworkCTA';

export default function TNiC() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content">
        <HeroSection />
        <TrustBanner />
        <LibraryHighlights />
        <HomepageTrust />
        <HomepageCTA />
        <SiteGuide />
        <AboutSection />
        <JourneySection />

        <PersonalDashboard />
        <LearnCenter />
        <AntiAgingLibrary />
        <ScienceSection />
        <PathwayMap />
        <ResearchIntel />
        <TrustCenter />

        <BiomarkerCommand />
        <LabTracker />
        <CompoundLab />
        <StackArchitect />
        <StarterStackCTA />
        <ProtocolTimeline />
        <DefenseCalculator />

        <CommunityPulse />
        <FutureSection />
        <NetworkCTA />
      </main>
      <ToolsDock />
      <Footer />
    </div>
  );
}