'use client';

import { useRef, useState } from 'react';
import { Plus, Upload, FileText, ClipboardPaste, CheckCircle2, AlertCircle } from 'lucide-react';
import { biomarkers } from '@/lib/data';
import { LABS_CSV_TEMPLATE, parseLabsCsv } from '@/lib/labs';
import { usePlatform } from '@/context/PlatformContext';

type InputMode = 'single' | 'panel' | 'upload';

export function BiomarkerInput() {
  const { addLab, importLabs } = usePlatform();
  const [mode, setMode] = useState<InputMode>('single');
  const [markerId, setMarkerId] = useState(biomarkers[0].id);
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [panelDate, setPanelDate] = useState(new Date().toISOString().slice(0, 10));
  const [panelValues, setPanelValues] = useState<Record<string, string>>({});
  const [uploadMsg, setUploadMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pasteText, setPasteText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const addSingle = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    addLab(markerId, num, date);
    setValue('');
    setUploadMsg({ type: 'success', text: `Logged ${biomarkers.find((b) => b.id === markerId)?.name}` });
    setTimeout(() => setUploadMsg(null), 2500);
  };

  const addPanel = () => {
    let count = 0;
    for (const b of biomarkers) {
      const v = parseFloat(panelValues[b.id] ?? '');
      if (!isNaN(v)) {
        addLab(b.id, v, panelDate);
        count++;
      }
    }
    if (count > 0) {
      setPanelValues({});
      setUploadMsg({ type: 'success', text: `Logged ${count} markers from panel` });
      setTimeout(() => setUploadMsg(null), 2500);
    }
  };

  const handleCsv = (text: string) => {
    const { entries, errors } = parseLabsCsv(text);
    if (entries.length === 0) {
      setUploadMsg({ type: 'error', text: errors[0] ?? 'No valid rows found' });
      return;
    }
    const count = importLabs(entries);
    const errNote = errors.length ? ` (${errors.length} rows skipped)` : '';
    setUploadMsg({ type: 'success', text: `Imported ${count} readings${errNote}` });
    setPasteText('');
    setTimeout(() => setUploadMsg(null), 4000);
  };

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => handleCsv(e.target?.result as string);
    reader.readAsText(file);
  };

  const modes: { id: InputMode; label: string }[] = [
    { id: 'single', label: 'Single Marker' },
    { id: 'panel', label: 'Full Panel' },
    { id: 'upload', label: 'Upload CSV' },
  ];

  return (
    <div className="gradient-border p-6">
      <div className="flex flex-wrap gap-2 mb-5">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === m.id
                ? 'bg-rose-400 text-black'
                : 'glass text-zinc-400 hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {uploadMsg && (
        <div
          className={`flex items-center gap-2 text-xs mb-4 px-3 py-2 rounded-lg ${
            uploadMsg.type === 'success'
              ? 'bg-emerald-400/10 text-emerald-400'
              : 'bg-rose-400/10 text-rose-400'
          }`}
        >
          {uploadMsg.type === 'success' ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5" />
          )}
          {uploadMsg.text}
        </div>
      )}

      {mode === 'single' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Biomarker</label>
            <select
              value={markerId}
              onChange={(e) => setMarkerId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-400/50"
            >
              {biomarkers.map((b) => (
                <option key={b.id} value={b.id} className="bg-zinc-900">
                  {b.name} ({b.unit})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Value</label>
              <input
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 1.2"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-400/50"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Test Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-400/50"
              />
            </div>
          </div>
          <p className="text-[10px] text-zinc-600">
            Optimal: {biomarkers.find((b) => b.id === markerId)?.optimal}{' '}
            {biomarkers.find((b) => b.id === markerId)?.unit}
          </p>
          <button
            onClick={addSingle}
            className="w-full flex items-center justify-center gap-2 bg-rose-400 text-black py-3 rounded-xl font-semibold text-sm hover:bg-cyan-400 transition-all"
          >
            <Plus className="w-4 h-4" /> Log Result
          </button>
        </div>
      )}

      {mode === 'panel' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Panel Date</label>
            <input
              type="date"
              value={panelDate}
              onChange={(e) => setPanelDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-400/50"
            />
          </div>
          <p className="text-[10px] font-mono text-rose-400 uppercase">Enter values from your blood panel (leave blank to skip)</p>
          <div className="grid sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
            {biomarkers.map((b) => (
              <div key={b.id} className="glass rounded-xl p-3">
                <label className="text-xs font-semibold text-zinc-300 block mb-1">{b.name}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={panelValues[b.id] ?? ''}
                    onChange={(e) => setPanelValues((prev) => ({ ...prev, [b.id]: e.target.value }))}
                    placeholder={b.optimal}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400/50"
                  />
                  <span className="text-[10px] text-zinc-600 shrink-0">{b.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addPanel}
            className="w-full flex items-center justify-center gap-2 bg-rose-400 text-black py-3 rounded-xl font-semibold text-sm hover:bg-cyan-400 transition-all"
          >
            <Plus className="w-4 h-4" /> Log Panel
          </button>
        </div>
      )}

      {mode === 'upload' && (
        <div className="space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) onFile(file);
            }}
            className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-rose-400/30 transition"
          >
            <Upload className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <p className="text-sm font-semibold mb-1">Drop CSV or click to upload</p>
            <p className="text-xs text-zinc-500">Processed locally — file never leaves your browser</p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFile(file);
                e.target.value = '';
              }}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 block mb-1 flex items-center gap-2">
              <ClipboardPaste className="w-3.5 h-3.5" /> Or paste CSV
            </label>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={LABS_CSV_TEMPLATE.split('\n')[0]}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono outline-none focus:border-rose-400/50 resize-none"
            />
            <button
              onClick={() => pasteText && handleCsv(pasteText)}
              disabled={!pasteText.trim()}
              className="mt-2 text-xs font-semibold text-rose-400 hover:text-cyan-400 transition disabled:opacity-40"
            >
              Parse & Import
            </button>
          </div>

          <details className="glass rounded-xl p-4">
            <summary className="text-xs font-semibold text-zinc-400 cursor-pointer flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> CSV Template Format
            </summary>
            <pre className="mt-3 text-[10px] font-mono text-zinc-600 overflow-x-auto whitespace-pre">
              {LABS_CSV_TEMPLATE}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}