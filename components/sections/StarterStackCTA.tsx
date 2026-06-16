'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, CheckCheck, ArrowRight } from 'lucide-react';
import { starterStack } from '@/lib/journey';
import { useStack } from '@/context/PlatformContext';

export function StarterStackCTA() {
  const { applyPreset } = useStack();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const stackText = [
    `# ${starterStack.name}`,
    starterStack.subtitle,
    '',
    ...starterStack.compounds.map(
      (c) => `• ${c.name} — ${c.dose} (${c.timing})\n  Tier ${c.tier}: ${c.why}`,
    ),
    '',
    starterStack.disclaimer,
    '',
    'Build your custom stack: https://tnic.help/#stacks',
  ].join('\n');

  const copyStack = () => {
    navigator.clipboard.writeText(stackText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadInArchitect = () => {
    applyPreset('starter');
    document.getElementById('stacks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative border-y border-white/[0.06] bg-gradient-to-b from-violet-400/5 to-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-[10px] text-violet-400 tracking-widest mb-3">FREE LEAD MAGNET</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get the Starter Defense Stack
            </h2>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Three Tier-A compounds, clinical doses, AM timing, and the science behind each —
              the same entry protocol behind TNiC. Copy instantly or load into Stack Architect.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyStack}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-violet-400 transition-all"
              >
                {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Stack Now'}
              </button>
              <button
                onClick={loadInArchitect}
                className="flex items-center gap-2 glass px-6 py-3 rounded-xl font-semibold text-sm hover:border-violet-400/30 transition-all"
              >
                Load in Architect <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="gradient-border p-6">
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-4">{starterStack.name}</p>
            {starterStack.compounds.map((c) => (
              <div key={c.name} className="border-b border-white/[0.06] py-4 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{c.name}</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Tier {c.tier}</span>
                </div>
                <p className="text-xs font-mono text-zinc-500 mb-1">{c.dose} · {c.timing}</p>
                <p className="text-xs text-zinc-400">{c.why}</p>
              </div>
            ))}
            <p className="text-[10px] text-zinc-600 mt-4">{starterStack.disclaimer}</p>

            {!submitted ? (
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-xs text-zinc-500 mb-3">Or email it to yourself:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-400/50"
                  />
                  <button
                    onClick={() => email.includes('@') && setSubmitted(true)}
                    disabled={!email.includes('@')}
                    className="flex items-center gap-1 bg-violet-400 text-black px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-30"
                  >
                    <Download className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-emerald-400 mt-6 pt-4 border-t border-white/[0.06]"
              >
                Stack summary queued for {email}. (Connect Resend/ConvertKit in production.)
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}