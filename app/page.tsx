import dynamic from 'next/dynamic';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Footer } from '@/components/Footer';
import { ToolsDock } from '@/components/ToolsDock';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBanner } from '@/components/TrustBanner';
import { LibraryHighlights } from '@/components/sections/LibraryHighlights';
import { HomepageTrust } from '@/components/sections/HomepageTrust';
import { HomepageCTA } from '@/components/sections/HomepageCTA';

/** Below-fold sections — code-split to reduce initial JS bundle */
const SiteGuide = dynamic(() => import('@/components/SiteGuide').then((m) => ({ default: m.SiteGuide })), {
  loading: () => <SectionSkeleton height="sm" />,
});
const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then((m) => ({ default: m.AboutSection })), {
  loading: () => <SectionSkeleton />,
});
const JourneySection = dynamic(() => import('@/components/sections/JourneySection').then((m) => ({ default: m.JourneySection })), {
  loading: () => <SectionSkeleton />,
});
const PersonalDashboard = dynamic(() => import('@/components/sections/PersonalDashboard').then((m) => ({ default: m.PersonalDashboard })), {
  loading: () => <SectionSkeleton />,
});
const LearnCenter = dynamic(() => import('@/components/sections/LearnCenter').then((m) => ({ default: m.LearnCenter })), {
  loading: () => <SectionSkeleton height="lg" />,
});
const AntiAgingLibrary = dynamic(() => import('@/components/library/AntiAgingLibrary').then((m) => ({ default: m.AntiAgingLibrary })), {
  loading: () => <SectionSkeleton height="lg" />,
});
const ScienceSection = dynamic(() => import('@/components/sections/ScienceSection').then((m) => ({ default: m.ScienceSection })), {
  loading: () => <SectionSkeleton />,
});
const PathwayMap = dynamic(() => import('@/components/sections/PathwayMap').then((m) => ({ default: m.PathwayMap })), {
  loading: () => <SectionSkeleton />,
});
const ResearchIntel = dynamic(() => import('@/components/sections/ResearchIntel').then((m) => ({ default: m.ResearchIntel })), {
  loading: () => <SectionSkeleton />,
});
const TrustCenter = dynamic(() => import('@/components/sections/TrustCenter').then((m) => ({ default: m.TrustCenter })), {
  loading: () => <SectionSkeleton />,
});
const BiomarkerCommand = dynamic(() => import('@/components/sections/BiomarkerCommand').then((m) => ({ default: m.BiomarkerCommand })), {
  loading: () => <SectionSkeleton />,
});
const LabTracker = dynamic(() => import('@/components/sections/LabTracker').then((m) => ({ default: m.LabTracker })), {
  loading: () => <SectionSkeleton />,
});
const CompoundLab = dynamic(() => import('@/components/sections/CompoundLab').then((m) => ({ default: m.CompoundLab })), {
  loading: () => <SectionSkeleton />,
});
const StackArchitect = dynamic(() => import('@/components/sections/StackArchitect').then((m) => ({ default: m.StackArchitect })), {
  loading: () => <SectionSkeleton height="lg" />,
});
const StarterStackCTA = dynamic(() => import('@/components/sections/StarterStackCTA').then((m) => ({ default: m.StarterStackCTA })), {
  loading: () => <SectionSkeleton height="sm" />,
});
const ProtocolTimeline = dynamic(() => import('@/components/sections/ProtocolTimeline').then((m) => ({ default: m.ProtocolTimeline })), {
  loading: () => <SectionSkeleton />,
});
const DefenseCalculator = dynamic(() => import('@/components/sections/DefenseCalculator').then((m) => ({ default: m.DefenseCalculator })), {
  loading: () => <SectionSkeleton />,
});
const CommunityPulse = dynamic(() => import('@/components/sections/CommunityPulse').then((m) => ({ default: m.CommunityPulse })), {
  loading: () => <SectionSkeleton height="sm" />,
});
const FutureSection = dynamic(() => import('@/components/sections/FutureSection').then((m) => ({ default: m.FutureSection })), {
  loading: () => <SectionSkeleton height="sm" />,
});
const NetworkCTA = dynamic(() => import('@/components/sections/NetworkCTA').then((m) => ({ default: m.NetworkCTA })), {
  loading: () => <SectionSkeleton height="sm" />,
});

export default function TNiC() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content" tabIndex={-1}>
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