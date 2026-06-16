import { Dna, Shield, BookOpen, HelpCircle } from 'lucide-react';

const footerLinks = [
  { href: '#trust', label: 'Trust & Standards', icon: Shield },
  { href: '#learn', label: 'Consumer Guide', icon: BookOpen },
  { href: '#learn', label: 'FAQ', icon: HelpCircle },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                <Dna className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="font-bold">
                TN<span className="text-cyan-400">i</span>C
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Independent longevity intelligence. Evidence-graded compounds,
              transparent methodology, and consumer safety at the center of every recommendation.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-4">Consumer Resources</p>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-4">Important Notice</p>
            <p className="text-sm text-zinc-500 leading-relaxed mb-3">
              TNiC is an educational platform, not a medical provider. Biological age
              and biomarker projections are modeled estimates — not laboratory diagnostics.
            </p>
            <p className="text-sm text-zinc-600">
              Consult a qualified physician before starting any supplement protocol.
              Some links are affiliate partnerships — disclosed in our{' '}
              <a href="#trust" className="text-cyan-400/70 hover:text-cyan-400">Transparency Pledge</a>.
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm font-mono">© 2026 TNiC · Independent · Evidence-First</p>
          <div className="flex gap-4 text-[10px] font-mono text-zinc-600">
            <span>Tier A: 4 compounds</span>
            <span>Tier B: 2 compounds</span>
            <span>847 citations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}