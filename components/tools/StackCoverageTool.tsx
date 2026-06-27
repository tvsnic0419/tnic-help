'use client';

import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { useStack } from '@/context/PlatformContext';
import { CompoundStackAnalyzer } from '@/components/library/CompoundStackAnalyzer';
import { CompoundSelectorGrid } from '@/components/stacks/CompoundSelectorGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { ToolDisclaimer } from './ToolDisclaimer';

export function StackCoverageTool() {
  const { selected, toggle } = useStack();

  return (
    <div className="space-y-6">
      <ToolDisclaimer />

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card variant="elevated" className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Your stack</CardTitle>
              <CardDescription>
                Toggle compounds to update your hallmark coverage map in real time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompoundSelectorGrid selected={selected} onToggle={toggle} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card variant="scientific">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-emerald" aria-hidden="true" />
                <CardTitle>Hallmark coverage map</CardTitle>
              </div>
              <CardDescription>
                Shows which of the 12 hallmarks of aging your stack addresses — and which gaps remain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompoundStackAnalyzer
                compoundIds={selected}
                showGapRecommendations
              />

              {selected.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Tap any hallmark label to read the full evidence deep-dive.
                  </p>
                  <Link
                    href="/stacks"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-violet hover:text-accent-cyan transition focus-ring rounded-lg px-1"
                  >
                    Build in Stack Architect <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
