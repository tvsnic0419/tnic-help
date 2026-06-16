'use client';

import { useState } from 'react';
import { ArrowRight, Shield, Zap, Users, BookOpen } from 'lucide-react';

export default function TNiC() {
  const [stackGoal, setStackGoal] = useState<'nrf2' | 'mito'>('nrf2');

  const recommended = {
    nrf2: ['GlyNAC ET by Nutri', 'Sulforaphane', 'R-Alpha Lipoic Acid'],
    mito: ['Ca-AKG by Do Not Age', 'Codeage NMN Platinum', 'Trans-Resveratrol'],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* NAV */}
      <nav className="fixed top-0 w-full bg-zinc-950/90 backdrop-blur-lg z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-tighter text-cyan-400">TNiC</div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#science" className="hover:text-cyan-400 transition">Science</a>
            <a href="#compounds" className="hover:text-cyan-400 transition">Compounds</a>
            <a href="#stacks" className="hover:text-cyan-400 transition">Stacks</a>
            <a href="#future" className="hover:text-cyan-400 transition">Future</a>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition">Join Defense Network</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-bg pt-32 pb-32 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-zinc-900/80 border border-cyan-500/30 rounded-3xl px-6 py-2 mb-8">
            <Shield className="text-cyan-400" /> Premium Cellular Resilience
          </div>
          <h1 className="section-title text-6xl md:text-7xl mb-8">
            Your Cells Are The<br />Operating System of<br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Longevity</span>
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Targeting NRF2, glutathione, mitochondria, and the 12 Hallmarks of Aging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#stacks" className="bg-white text-black px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg hover:scale-105 transition">
              Build Your Stack <ArrowRight />
            </a>
            <a href="#science" className="border-2 border-white/40 hover:bg-white/10 px-10 py-4 rounded-2xl font-medium text-lg transition">Explore The Science</a>
          </div>
        </div>
      </section>

      {/* INTERACTIVE STACKS */}
      <section id="stacks" className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="section-title text-center mb-4">Intelligent Defense Stacks</h2>
          <p className="text-center text-zinc-400 text-xl mb-12">Click to switch goals</p>

          <div className="flex justify-center gap-6 mb-16">
            <button onClick={() => setStackGoal('nrf2')} className={`px-10 py-4 rounded-3xl text-lg font-medium transition ${stackGoal === 'nrf2' ? 'bg-cyan-500 text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}>NRF2 Activation</button>
            <button onClick={() => setStackGoal('mito')} className={`px-10 py-4 rounded-3xl text-lg font-medium transition ${stackGoal === 'mito' ? 'bg-cyan-500 text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}>Mitochondrial Renewal</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recommended[stackGoal].map((item, i) => (
              <div key={i} className="card-hover bg-zinc-950 border border-zinc-700 rounded-3xl p-10">
                <div className="text-cyan-400 mb-6">★ Premium Choice</div>
                <h3 className="text-3xl font-bold mb-6">{item}</h3>
                <a href="https://amazon.com" target="_blank" className="inline-block border border-white/30 hover:border-cyan-400 px-8 py-3 rounded-2xl text-sm">Shop Now →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Original Content Teaser */}
      <section id="science" className="py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="section-title mb-8">The Science</h2>
          <p className="text-xl text-zinc-400">NRF2 is the master regulator of over 200 antioxidant and detoxification genes. Our approach combines cutting-edge research with practical, high-bioavailability formulations.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-zinc-900 p-8 rounded-3xl">Oxidative Stress &amp; Mitochondrial Decline</div>
            <div className="bg-zinc-900 p-8 rounded-3xl">Inflammaging &amp; Senescence</div>
            <div className="bg-zinc-900 p-8 rounded-3xl">Glutathione &amp; NRF2 Collapse</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500">
        TNiC • Not medical advice. Consult professionals. © 2026
      </footer>
    </div>
  );
}
