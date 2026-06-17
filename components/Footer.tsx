import Link from 'next/link';
import {
  Dna,
  Shield,
  BookOpen,
  Layers,
  FlaskConical,
  Library,
  LayoutDashboard,
  HelpCircle,
  GraduationCap,
  Rocket,
} from 'lucide-react';
import { citationRegistry } from '@/lib/trust';

const hubLinks = [
  { href: '/dashboard', label: 'My Longevity OS', icon: LayoutDashboard },
  { href: '/quiz', label: '3-Min Quiz', icon: HelpCircle },
  { href: '/library', label: 'Anti-Aging Library', icon: Library },
  { href: '/learn', label: 'Learn Hub', icon: GraduationCap },
  { href: '/stacks', label: 'Stacks & Protocols', icon: Layers },
  { href: '/labs', label: 'Lab Analysis Hub', icon: FlaskConical },
];

const resourceLinks = [
  { href: '/#next-up', label: "What's Next", icon: Rocket },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/trust', label: 'Trust & Transparency', icon: Shield },
  { href: '/trust/methodology', label: 'Methodology', icon: BookOpen },
  { href: '/trust/disclaimers', label: 'Disclaimers', icon: BookOpen },
  { href: '/trust/updates', label: 'Update History', icon: BookOpen },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16" role="contentinfo">
      <div className="container-page">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="focus-ring inline-flex items-center gap-2 mb-4 rounded-lg">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent-cyan to-accent-emerald flex items-center justify-center">
                <Dna className="w-4 h-4 text-black" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg">
                TN<span className="text-accent-cyan">i</span>C
              </span>
            </Link>
            <p className="text-body-sm max-w-xs">
              Independent longevity intelligence. Evidence-graded compounds,
              transparent methodology, and consumer safety at the center of every recommendation.
            </p>
          </div>

          <div>
            <p className="text-label mb-4">Hubs</p>
            <ul className="space-y-3">
              {hubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring interactive flex items-center gap-2 text-body-sm hover:text-accent-cyan rounded-md"
                  >
                    <link.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-4">Resources</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-ring interactive flex items-center gap-2 text-body-sm hover:text-accent-cyan rounded-md"
                  >
                    <link.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label mb-4">Important Notice</p>
            <p className="text-body-sm mb-3">
              TNiC is educational — not a medical provider. Biological age
              and biomarker projections are modeled estimates, not lab diagnostics.
            </p>
            <p className="text-caption">
              Consult a physician before starting any protocol.{' '}
              <a href="/trust/disclaimers" className="text-accent-cyan hover:underline focus-ring rounded">
                Transparency Pledge
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-caption font-mono">© 2026 TNiC · Independent · Evidence-First</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption font-mono">
            <span>Tier A: 4 compounds</span>
            <span>Tier B: 2 compounds</span>
            <span>{citationRegistry.length} indexed PMIDs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}