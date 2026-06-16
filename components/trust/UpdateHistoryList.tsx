import type { UpdateCategory, UpdateHistoryEntry } from '@/lib/types';

const categoryStyle: Record<UpdateCategory, string> = {
  feature: 'text-cyan-400 bg-cyan-400/10',
  evidence: 'text-emerald-400 bg-emerald-400/10',
  safety: 'text-rose-400 bg-rose-400/10',
  content: 'text-violet-400 bg-violet-400/10',
  design: 'text-amber-400 bg-amber-400/10',
};

interface UpdateHistoryListProps {
  entries: UpdateHistoryEntry[];
}

export function UpdateHistoryList({ entries }: UpdateHistoryListProps) {
  return (
    <div className="space-y-4" role="feed" aria-label="Platform update history">
      {entries.map((entry) => (
        <article key={`${entry.version}-${entry.date}`} className="card-base p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-sm font-bold text-zinc-200">v{entry.version}</span>
            <time className="text-caption">{entry.date}</time>
            <span className={`text-label px-2 py-0.5 rounded-full ${categoryStyle[entry.category]}`}>
              {entry.category}
            </span>
          </div>
          <h3 className="heading-card text-base mb-3">{entry.title}</h3>
          <ul className="space-y-1.5">
            {entry.changes.map((change) => (
              <li key={change} className="text-body-sm flex gap-2">
                <span className="text-emerald-400 shrink-0" aria-hidden="true">•</span>
                {change}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}