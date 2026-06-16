'use client';

import { ArrowRight, Scan, BookOpen, LayoutDashboard } from 'lucide-react';

const paths = [
  {
    icon: BookOpen,
    title: 'Learn the fundamentals',
    desc: 'Glossary, FAQ, red flags, and realistic outcome timelines — before you buy anything.',
    href: '#learn',
    cta: 'Open Learn Center',
    accent: 'cyan',
  },
  {
    icon: Scan,
    title: 'Run your defense scan',
    desc: 'Estimate biological age from lifestyle inputs. Get a pathway-prioritized stack recommendation.',
    href: '#calculator',
    cta: 'Calculate Bio Age',
    accent: 'rose',
  },
  {
    icon: LayoutDashboard,
    title: 'Launch your command center',
    desc: 'Stack, labs, checklist, and bio age — unified in one personal dashboard. Data stays local.',
    href: '#dashboard',
    cta: 'Open Dashboard',
    accent: 'emerald',
  },
];

const accentMap = {
  cyan: 'hover:border-cyan-400/40 group-hover:text-cyan-400',
  rose: 'hover:border-rose-400/40 group-hover:text-rose-400',
  emerald: 'hover:border-emerald-400/40 group-hover:text-emerald-400',
};

export function HomepageCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 via-transparent to-violet-400/5 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start where you are.<br />
            <span className="shimmer-text">Go as deep as you want.</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            The definitive longevity library — free, cited, and built to guide you from curiosity to protocol.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {paths.map((path) => (
            <a
              key={path.title}
              href={path.href}
              className={`glass glass-hover rounded-2xl p-7 group transition-all ${accentMap[path.accent as keyof typeof accentMap]}`}
            >
              <path.icon className="w-6 h-6 text-zinc-400 group-hover:scale-110 transition-transform mb-4" />
              <h3 className="font-bold mb-2">{path.title}</h3>
              <p className="text-sm text-zinc-500 mb-5 leading-relaxed">{path.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold transition">
                {path.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          ))}
        </div>

        <div className="gradient-border p-8 md:p-10 text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] text-violet-400 tracking-widest mb-3">READY TO BUILD?</p>
          <h3 className="text-2xl font-bold mb-3">Your first stack takes 60 seconds</h3>
          <p className="text-sm text-zinc-400 mb-6">
            Take the starter quiz above, or jump straight into Stack Architect with evidence-graded presets.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#hero"
              className="bg-white text-black px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-cyan-400 transition-all"
            >
              Retake Starter Quiz
            </a>
            <a
              href="#stacks"
              className="glass px-8 py-3.5 rounded-xl font-semibold text-sm hover:border-violet-400/40 transition-all flex items-center justify-center gap-2"
            >
              Open Stack Architect <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}