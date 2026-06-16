interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatStripProps {
  stats: StatItem[];
  ariaLabel?: string;
}

export function StatStrip({ stats, ariaLabel = 'Key metrics' }: StatStripProps) {
  return (
    <div className="summary-strip mb-8" role="group" aria-label={ariaLabel}>
      {stats.map((stat) => (
        <div key={stat.label} className="card-base p-4 text-center">
          <p className={`text-2xl md:text-3xl font-bold tabular-nums ${stat.color ?? 'text-zinc-100'}`}>
            {stat.value}
          </p>
          <p className="text-label mt-1.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}