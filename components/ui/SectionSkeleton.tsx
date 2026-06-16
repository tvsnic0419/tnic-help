/** Lightweight placeholder while below-fold homepage sections load */
export function SectionSkeleton({ height = 'md' }: { height?: 'sm' | 'md' | 'lg' }) {
  const h = { sm: 'min-h-[200px]', md: 'min-h-[320px]', lg: 'min-h-[480px]' }[height];
  return (
    <div
      className={`${h} py-16 border-b border-white/[0.04] animate-pulse`}
      aria-hidden="true"
    >
      <div className="container-page space-y-4">
        <div className="h-4 w-32 bg-white/5 rounded" />
        <div className="h-8 w-64 bg-white/5 rounded" />
        <div className="h-4 w-full max-w-xl bg-white/5 rounded" />
      </div>
    </div>
  );
}