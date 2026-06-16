import type { ReactNode } from 'react';

function renderInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="text-cyan-400 bg-white/5 px-1 rounded text-xs">$1</code>');
}

export function MdxRenderer({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-white">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-zinc-200">
          {trimmed.slice(4)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-cyan-400/50 pl-4 my-4 text-sm text-zinc-400 italic"
          dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(2)) }}
        />,
      );
      return;
    }

    if (trimmed.startsWith('|')) {
      const rows = trimmed.split('\n').filter((r) => !r.match(/^\|[\s-|]+\|$/));
      elements.push(
        <div key={i} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split('|').filter(Boolean).map((c) => c.trim());
                const Tag = ri === 0 ? 'th' : 'td';
                return (
                  <tr key={ri} className="border-b border-white/[0.06]">
                    {cells.map((cell, ci) => (
                      <Tag
                        key={ci}
                        className={`py-2 px-3 text-left ${ri === 0 ? 'text-[10px] font-mono text-zinc-500 uppercase' : 'text-zinc-400'}`}
                      >
                        {cell}
                      </Tag>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>,
      );
      return;
    }

    if (trimmed.match(/^\d+\.\s/)) {
      const items = trimmed.split('\n').filter((l) => l.match(/^\d+\.\s/));
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 my-4 text-sm text-zinc-400">
          {items.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: renderInline(item.replace(/^\d+\.\s/, '')) }} />
          ))}
        </ol>,
      );
      return;
    }

    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((l) => l.startsWith('- '));
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-4 text-sm text-zinc-400">
          {items.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: renderInline(item.slice(2)) }} />
          ))}
        </ul>,
      );
      return;
    }

    elements.push(
      <p
        key={i}
        className="text-sm text-zinc-400 leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }}
      />,
    );
  });

  return <article className="prose-invert max-w-none">{elements}</article>;
}