'use client';

import { useState } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export default function TNiC() {
  const [email, setEmail] = useState('');
  const [stackGoal, setStackGoal] = useState<'nrf2' | 'mito'>('nrf2');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! High-signal longevity updates incoming.');
    setEmail('');
  };

  const recommended = {
    nrf2: ['GlyNAC ET', 'Sulforaphane', 'R-Alpha Lipoic Acid'],
    mito: ['Ca-AKG', 'Codeage NMN Platinum', 'Trans-Resveratrol'],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-lg z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">TNiC</div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#science" className="hover:text-cyan-400 transition-colors">Science</a>
            <a href="#compounds" className="hover:text-cyan-400 transition-colors">Compounds</a>
            <a href="#recommendations" className="hover:text-cyan-400 transition-colors">Stacks</a>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-full font-medium transition">Join Defense Network</button>
        </div>
      </nav>

      <section className="hero-bg pt-32 pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-cyan-500/30 rounded-full px-4 py-1 mb-6">
            <Shield className="w-4 h-4 text-cyan-400" /> Cellular Resilience
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Master Your Cells.<br />Master Longevity.
          </h1>
          <p className="text-xl text-zinc-400 mb-10">NRF2 • Glutathione • Mitochondrial Defense</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#recommendations" className="bg-white text-black px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition">
              Build Your Stack <ArrowRight />
            </a>
            <a href="#science" className="border border-white/30 hover:bg-white/5 px-10 py-4 rounded-2xl font-medium transition">Deep Science</a>
          </div>
        </div>
      </section>

      <section id="recommendations" className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4">Intelligent Stack Builder</h2>
          <p className="text-zinc-400 mb-10">Choose your primary goal</p>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {(['nrf2', 'mito'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setStackGoal(g)}
                className={`px-8 py-3 rounded-2xl font-medium transition-all ${stackGoal === g ? 'bg-cyan-500 text-black shadow-lg' : 'bg-zinc-800 hover:bg-zinc-700'}`}
              >
                {g === 'nrf2' ? 'NRF2 Activation' : 'Mitochondrial Renewal'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommended[stackGoal].map((supp, i) => (
              <div key={i} className="card-hover bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-left">
                <div className="h-1.5 w-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{supp}</h3>
                <p className="text-zinc-400 mb-8">High-bioavailability • Evidence-backed</p>
                <a href="https://www.amazon.com/s?k=supplement" target="_blank" className="block text-center border border-white/20 hover:bg-white/5 py-3 rounded-2xl text-sm font-medium transition">
                  Shop on Amazon →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
