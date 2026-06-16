'use client';

import { useState } from 'react';
import { Copy, CheckCheck, Download, FileJson, Share2 } from 'lucide-react';
import { useStack } from '@/context/PlatformContext';
import { analyzeStack, formatStackExport, formatStackJson } from '@/lib/stack-analysis';

interface StackExportProps {
  stackName?: string;
}

export function StackExport({ stackName }: StackExportProps) {
  const { selected, shareUrl } = useStack();
  const [copied, setCopied] = useState<'text' | 'json' | 'url' | null>(null);
  const analysis = analyzeStack(selected);

  const copyText = async () => {
    await navigator.clipboard.writeText(formatStackExport(selected, analysis, shareUrl));
    setCopied('text');
    setTimeout(() => setCopied(null), 2000);
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(formatStackJson(selected, analysis, stackName));
    setCopied('json');
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([formatStackJson(selected, analysis, stackName)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnic-stack-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: stackName ?? 'My TNiC Stack', url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied('url');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  if (selected.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-[10px] font-mono text-violet-400 uppercase tracking-wider mb-4">Export Protocol</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={copyText}
          className="flex flex-col items-center gap-1.5 glass py-3 rounded-xl text-xs font-semibold hover:border-violet-400/30 transition-all"
        >
          {copied === 'text' ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied === 'text' ? 'Copied!' : 'Copy Text'}
        </button>
        <button
          onClick={copyJson}
          className="flex flex-col items-center gap-1.5 glass py-3 rounded-xl text-xs font-semibold hover:border-violet-400/30 transition-all"
        >
          {copied === 'json' ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <FileJson className="w-4 h-4" />}
          {copied === 'json' ? 'Copied!' : 'Copy JSON'}
        </button>
        <button
          onClick={downloadJson}
          className="flex flex-col items-center gap-1.5 glass py-3 rounded-xl text-xs font-semibold hover:border-violet-400/30 transition-all"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={share}
          className="flex flex-col items-center gap-1.5 bg-violet-400 text-black py-3 rounded-xl text-xs font-semibold hover:bg-cyan-400 transition-all"
        >
          {copied === 'url' ? <CheckCheck className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          {copied === 'url' ? 'Copied!' : 'Share'}
        </button>
      </div>
    </div>
  );
}