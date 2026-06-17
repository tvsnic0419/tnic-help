'use client';

import Link from 'next/link';
import { ShoppingBag, Shield, ArrowRight, ClipboardCheck, ExternalLink } from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { stackPresets, type PresetKey } from '@/lib/presets';
import { getStackShopItems, shopDisclosure } from '@/lib/protocol-shop';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/utils';

const presetOptions: { key: PresetKey; label: string }[] = [
  { key: 'starter', label: 'Starter Elite' },
  { key: 'nrf2', label: 'NRF2 Defense' },
  { key: 'mito', label: 'Mito Renewal' },
  { key: 'hybrid', label: 'Full Hybrid' },
];

export function ProtocolShopPanel() {
  const { selected, applyPreset } = usePlatform();
  const items = getStackShopItems(selected);

  const exportChecklist = () => {
    const lines = [
      '# TNiC Protocol Shop — Verification Checklist',
      `# Generated ${new Date().toISOString().slice(0, 10)}`,
      '',
      ...items.flatMap((item) => [
        `## ${item.compoundName}`,
        `- Dose anchor: ${item.dose}`,
        `- Timing: ${item.timing}`,
        ...(item.buyerGuide?.formRequirements.map((r) => `- Form: ${r}`) ?? []),
        ...(item.buyerGuide?.coaDemands.map((c) => `- COA: ${c.label}`) ?? []),
        ...(item.buyerGuide?.redFlags.slice(0, 2).map((r) => `- Red flag: ${r}`) ?? []),
        '',
      ]),
      shopDisclosure.body,
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnic-protocol-checklist-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        icon={ShoppingBag}
        eyebrow="Protocol Shop · Sprint 7"
        title="Buy Smart — Not Branded"
        description="Stack-filtered verification checklists from buyer guides. Demand COA, match RCT doses, avoid red flags. TNiC earns $0 from products."
        theme="amber"
        align="left"
      />

      <div className="rounded-xl border border-accent-amber/25 bg-accent-amber/5 p-5 mb-8 flex gap-3">
        <Shield className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold mb-1">{shopDisclosure.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{shopDisclosure.body}</p>
          <p className="text-xs text-muted-foreground mt-2 italic">{shopDisclosure.affiliateNote}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <p className="text-label w-full mb-1">Load preset</p>
        {presetOptions.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => applyPreset(p.key)}
            className="focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold glass hover:border-accent-amber/30 transition"
          >
            {p.label}
          </button>
        ))}
        <Link
          href="/stacks"
          className="focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold text-accent-cyan hover:underline"
        >
          Custom stack in Architect →
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-muted-foreground mb-4">No compounds in your active stack.</p>
          <Link
            href="/quiz"
            className="focus-ring inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Take 3-Min Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div
                key={item.compoundId}
                className="glass glass-hover rounded-2xl p-5 border border-border/80"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{item.compoundName}</h3>
                      <span
                        className={cn(
                          'text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border',
                          item.priority === 'essential'
                            ? 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20'
                            : 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
                        )}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">
                      {item.dose} · {item.timing}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`${item.moduleHref}#buyer-guide`}
                      className="focus-ring text-xs font-semibold text-accent-cyan hover:underline rounded"
                    >
                      Buyer guide
                    </Link>
                    {item.compareHref && (
                      <Link
                        href={item.compareHref}
                        className="focus-ring text-xs font-semibold text-accent-violet hover:underline rounded"
                      >
                        Compare
                      </Link>
                    )}
                  </div>
                </div>

                {item.buyerGuide && (
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {item.buyerGuide.coaDemands.slice(0, 4).map((c) => (
                      <li key={c.id} className="flex gap-2">
                        <ClipboardCheck className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                        {c.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={exportChecklist}
            className="focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-amber/20 border border-accent-amber/30 text-accent-amber px-6 py-3 rounded-xl font-semibold text-sm hover:bg-accent-amber/30 transition"
          >
            <ExternalLink className="w-4 h-4" />
            Export verification checklist
          </button>
        </>
      )}
    </div>
  );
}