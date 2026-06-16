import { SectionSkeleton } from '@/components/ui/SectionSkeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#030712] pt-24">
      <SectionSkeleton height="lg" />
    </div>
  );
}