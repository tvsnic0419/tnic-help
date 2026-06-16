'use client';

import { Shield, HardDrive, WifiOff, Trash2, Download, Lock } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';

const principles = [
  {
    icon: HardDrive,
    title: 'Local-First Storage',
    desc: 'All lab readings persist in your browser\'s localStorage only. No account, no server, no database.',
  },
  {
    icon: WifiOff,
    title: 'Zero Network Transmission',
    desc: 'CSV uploads are parsed in-memory via FileReader. Values never leave your device during input or analysis.',
  },
  {
    icon: Lock,
    title: 'You Own the Data',
    desc: 'Export CSV or full platform JSON anytime. Delete all data with one click. No vendor lock-in.',
  },
  {
    icon: Shield,
    title: 'No Third-Party Analytics on Labs',
    desc: 'Lab values are excluded from any tracking. Analysis runs client-side in JavaScript — no API calls.',
  },
];

export function PrivacyPanel() {
  const { labs, clearLabs, exportLabsCsv } = usePlatform();

  const downloadCsv = () => {
    const blob = new Blob([exportLabsCsv()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnic-labs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border border-emerald-400/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-400/10">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Privacy-First Architecture</h3>
            <p className="text-xs text-zinc-500">Your lab data is yours — period.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="glass rounded-xl p-4">
                <Icon className="w-4 h-4 text-emerald-400 mb-2" />
                <h4 className="font-semibold text-xs mb-1">{p.title}</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <p className="text-[10px] font-mono text-zinc-500 uppercase mb-3">Data Controls</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadCsv}
            disabled={labs.length === 0}
            className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-cyan-400 transition disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV ({labs.length} readings)
          </button>
          <button
            onClick={() => {
              if (labs.length > 0 && confirm('Delete all lab data? This cannot be undone.')) {
                clearLabs();
              }
            }}
            disabled={labs.length === 0}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-rose-400 transition disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete All Lab Data
          </button>
        </div>
        <p className="text-[10px] text-zinc-600 mt-3">
          Storage key: <code className="text-zinc-500">tnic-labs</code> in localStorage · Synced with platform export/import
        </p>
      </div>
    </div>
  );
}