import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Eye, FlaskConical, ClipboardList } from 'lucide-react';
import type { EvidenceTier } from '@/lib/types';
import { EvidenceTag } from '@/components/trust/EvidenceTag';

function renderInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="text-cyan-400 bg-white/5 px-1 rounded text-xs">$1</code>');
}

function parseAttrs(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

type ParsedBlock =
  | { kind: 'directive'; type: string; attrs: Record<string, string>; body: string }
  | { kind: 'markdown'; content: string };

function parseBlocks(content: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = content.split('\n');
  let i = 0;
  let mdBuffer: string[] = [];

  const flushMd = () => {
    if (mdBuffer.length) {
      const joined = mdBuffer.join('\n').trim();
      if (joined) blocks.push({ kind: 'markdown', content: joined });
      mdBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith(':::')) {
      flushMd();
      const header = line.slice(3).trim();
      const spaceIdx = header.indexOf(' ');
      const type = spaceIdx > 0 ? header.slice(0, spaceIdx) : header;
      const attrString = spaceIdx > 0 ? header.slice(spaceIdx + 1) : '';
      const attrs = parseAttrs(attrString);
      if (!attrs.tier && /^[ABC]$/.test(type)) {
        attrs.tier = type;
      }
      i++;
      const bodyLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith(':::')) {
        bodyLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].startsWith(':::')) i++;
      blocks.push({ kind: 'directive', type: /^[ABC]$/.test(type) ? 'evidence' : type, attrs, body: bodyLines.join('\n').trim() });
    } else {
      mdBuffer.push(line);
      i++;
    }
  }
  flushMd();
  return blocks;
}

function renderDirective(block: Extract<ParsedBlock, { kind: 'directive' }>, key: number) {
  const { type, attrs, body } = block;

  if (type === 'cta') {
    const href = attrs.href ?? '/stacks';
    const title = attrs.title ?? 'Take action';
    const variant = attrs.variant ?? 'primary';
    const isPrimary = variant === 'primary';
    return (
      <div
        key={key}
        className={`my-6 rounded-xl p-5 border ${
          isPrimary
            ? 'bg-cyan-400/10 border-cyan-400/30'
            : 'glass border-white/[0.08]'
        }`}
      >
        <p className="text-sm font-semibold text-white mb-2">{title}</p>
        {body && (
          <p
            className="text-sm text-zinc-400 mb-4"
            dangerouslySetInnerHTML={{ __html: renderInline(body) }}
          />
        )}
        <Link
          href={href}
          className="focus-ring interactive inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-emerald-400 rounded-md"
        >
          {attrs.label ?? 'Open'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (type === 'visual') {
    return (
      <div
        key={key}
        className="my-6 rounded-xl p-5 border border-violet-400/20 bg-violet-400/5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-violet-400" aria-hidden="true" />
          <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider">Suggested visual</p>
        </div>
        <p
          className="text-sm text-zinc-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderInline(body || attrs.description || '') }}
        />
      </div>
    );
  }

  if (type === 'evidence') {
    const tier = (attrs.tier ?? 'B') as EvidenceTier;
    return (
      <div
        key={key}
        className="my-6 rounded-xl p-5 border border-white/[0.08] bg-white/[0.02]"
      >
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <EvidenceTag tier={tier} size="sm" />
        </div>
        <p
          className="text-sm text-zinc-400 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderInline(body) }}
        />
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div
        key={key}
        className="my-6 rounded-xl p-5 border border-amber-400/30 bg-amber-400/5"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
            {attrs.title ?? 'Important'}
          </p>
        </div>
        <p
          className="text-sm text-zinc-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderInline(body) }}
        />
      </div>
    );
  }

  if (type === 'personal') {
    return (
      <div
        key={key}
        className="my-6 rounded-xl p-5 border border-emerald-400/20 bg-emerald-400/5"
      >
        <div className="flex items-center gap-2 mb-3">
          <ClipboardList className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
            {attrs.title ?? 'Personal results template'}
          </p>
        </div>
        {renderMarkdownBlock(body, key)}
      </div>
    );
  }

  return (
    <div key={key} className="my-4 text-sm text-zinc-500 font-mono">
      [{type}] {body}
    </div>
  );
}

function renderMarkdownBlock(content: string, blockKey: number) {
  const paragraphs = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  paragraphs.forEach((block, i) => {
    const key = `${blockKey}-${i}`;
    const trimmed = block.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={key} className="text-2xl font-bold mt-2 mb-4 text-white">
          {trimmed.slice(2)}
        </h1>,
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key} className="text-xl font-bold mt-8 mb-3 text-white">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key} className="text-lg font-semibold mt-6 mb-2 text-zinc-200">
          {trimmed.slice(4)}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={key}
          className="border-l-2 border-cyan-400/50 pl-4 my-4 text-sm text-zinc-400 italic"
          dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(2)) }}
        />,
      );
      return;
    }

    if (trimmed.startsWith('|')) {
      const rows = trimmed.split('\n').filter((r) => !r.match(/^\|[\s-|]+\|$/));
      elements.push(
        <div key={key} className="overflow-x-auto my-4">
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
        <ol key={key} className="list-decimal list-inside space-y-1 my-4 text-sm text-zinc-400">
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
        <ul key={key} className="list-disc list-inside space-y-1 my-4 text-sm text-zinc-400">
          {items.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: renderInline(item.slice(2)) }} />
          ))}
        </ul>,
      );
      return;
    }

    elements.push(
      <p
        key={key}
        className="text-sm text-zinc-400 leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }}
      />,
    );
  });

  return <>{elements}</>;
}

export function MdxRenderer({ content }: { content: string }) {
  const blocks = parseBlocks(content);
  const elements: ReactNode[] = [];

  blocks.forEach((block, i) => {
    if (block.kind === 'directive') {
      elements.push(renderDirective(block, i));
    } else {
      elements.push(<div key={i}>{renderMarkdownBlock(block.content, i)}</div>);
    }
  });

  return <article className="prose-invert max-w-none">{elements}</article>;
}