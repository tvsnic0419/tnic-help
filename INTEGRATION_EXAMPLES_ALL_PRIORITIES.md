# All Upgraded Code — Integration Examples & Deployment

**Branch**: feat/expand-hallmark-visuals-6more  
**Date**: June 25, 2026

This file contains ready-to-paste code for all 4 priorities so you can execute the full upgrade immediately after merge.

## 1. Visuals Expansion (Completed)

New individual components added:
- CellularSenescenceVisual.tsx
- ChronicInflammationVisual.tsx
- EpigeneticAlterationsVisual.tsx
- TelomereAttritionVisual.tsx

(Plus previous: GenomicInstability, MitochondrialDysfunction, Proteostasis, and Contextual wrappers)

**Usage**:
```tsx
import { CellularSenescenceVisual } from '@/components/illustrations/CellularSenescenceVisual';
import { ChronicInflammationVisual } from '@/components/illustrations/ChronicInflammationVisual';

<CellularSenescenceVisual className="w-full max-w-md" accentColor="#f87171" />
<ChronicInflammationVisual className="w-full max-w-md" accentColor="#fbbf24" />
```

## 2. Integrate Contextual Cards into Library / Hallmark Pages

```tsx
import { 
  ContextualGenomicInstability, 
  ContextualMitochondrialDysfunction 
} from '@/components/illustrations/ContextualHallmarkVisuals';

// Library grid or deep-dive page
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ContextualMitochondrialDysfunction contextLevel="detailed" />
  <ContextualGenomicInstability contextLevel="detailed" />
</div>
```

## 3. Apply Interconnection Text to MDX (example for any hallmark)

```mdx
## Visual + Cross-Hallmark Context

<ContextualMitochondrialDysfunction contextLevel="detailed" className="my-8" />

**Key interconnections**:
- Mitochondrial ROS accelerates Genomic Instability (H1).
- GlyNAC provides multi-hallmark benefits (H1, H4, H6, H10).
- Fixing mito often improves secondary DNA damage markers.

**Example**: Users with low NAD+ + high 8-OHdG frequently see both improve when prioritizing NMN + Zone 2 first.
```

## 4. Add Visual Thumbnails to Library Listing

```tsx
// Inside your Library card component
{slug === 'mitochondrial-dysfunction' && <MitochondrialDysfunctionVisual className="h-24 w-full object-contain mb-3" />}
{slug === 'cellular-senescence' && <CellularSenescenceVisual className="h-24 w-full object-contain mb-3" />}
{slug === 'chronic-inflammation' && <ChronicInflammationVisual className="h-24 w-full object-contain mb-3" />}
```

## Deployment

Merge this branch to main → Vercel auto-deploys all upgraded code.
