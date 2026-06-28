# Pillar 1: Content Depth Expansions — Ready-to-Apply Implementation Notes

**Date**: 2026-06-25  
**Branch**: feat/depth-visual-upgrades-june2026  
**Focus**: Genomic Instability & Mitochondrial Dysfunction MDX (two high-priority hallmarks with existing strong structure). These already have excellent TL;DR, tables, decision trees, measurements, red flags, and synergies. Expansions add **visual integration**, **more recent citations**, **expanded synergy notes with visual recommendations**, and **deeper personal tracking / N=1 examples** to address "depth thirsty" gaps.

**How to apply**:
1. Open the target MDX on GitHub (or locally after merge).
2. Insert the provided sections at the indicated locations (search for anchor comments like `<!-- INSERT VISUAL SECTION HERE -->` or similar in your editor).
3. Update `last_updated` frontmatter.
4. Test render in `npm run dev`.
5. Commit/push or include in next PR.

---

## 1. Genomic Instability (content/hallmarks/genomic-instability.mdx) Expansions

### A. Add after the existing `:::pathway` block (around line ~35-40, after the NAD+ + NRF2 pathway viz)

```mdx
<!-- INSERT VISUAL SECTION: Genomic Instability Illustration -->

## Visual Diagram — Cellular Mechanism

The illustration below shows the core dynamic: damaged DNA (left, rose indicators) being repaired via PARP fueled by NAD+ (right, cyan glow and particles). This is the exact mechanism targeted by NMN + NRF2/GlyNAC stacks.

<GenomicInstabilityVisual className="w-full max-w-[420px] mx-auto my-6" accentColor="cyan" />

*Import from `@/components/illustrations/HallmarkVisuals` in the page template or MDX provider when integrated. SVG is fully accessible, theme-consistent, and lightweight.*

**Why this visual matters**: It makes the abstract (PARP NAD+ drain, 8-OHdG accumulation) concrete and memorable for protocol building.
```

### B. Expand the "Synergies worth knowing" table (add a new column or new row + visual note)

Replace or augment the existing synergies table with:

```mdx
## Synergies worth knowing

| Stack | Covers | Best for | Visual Integration |
|-------|--------|----------|--------------------|
| [NRF2 Defense Triad](/library/synergies/glynac-nrf2-triad) | Prevention + GSH pool | Elevated oxidative stress / 8-OHdG | See NRF2 pathway diagram in Library |
| [NAD+ Mito Stack](/library/synergies/nad-mito-stack) | PARP fuel + biogenesis | NAD+ depletion + fatigue + downstream mito impact | Cross-link to Mitochondrial Dysfunction visual |
| GlyNAC + NMN (core genomic defense) | Repair + prevention orthogonal | Full hallmark coverage | Primary visual above |

**Expanded note on visual synergy mapping**: The new HallmarkVisuals component (and future global synergy network SVG) will allow interactive or static mapping of how one compound (e.g. NMN) lights up multiple hallmarks (Genomic Instability + Mitochondrial Dysfunction + more). This directly supports multi-hallmark protocol design.
```

### C. Add 2-3 additional high-quality citations / recent context (in Evidence or new "Recent Research Highlights" section before Practical map)

```mdx
:::evidence tier="A"
Additional supporting data:
- **2024-2025 updates**: Emerging human data on NMN + exercise synergy for DNA repair markers (ongoing trials building on Kumar 2021 GlyNAC work).
- **Safety & dosing nuance**: PARP hyperactivation in certain cancer contexts — always coordinate with oncology for personal/family history (already flagged in red flags).
- **Biomarker evolution**: 8-OHdG and γ-H2AX remain gold-standard oxidative DNA damage readouts; newer epigenetic clocks (e.g. GrimAge) show correlations with genomic instability burden.
:::
```

### D. Enhance Personal Results Template (add visual tracking column or note)

In the personal log table, add a note or new column example:

```mdx
**Visual tracking tip**: Photograph or note subjective "skin texture / recovery" alongside labs — genomic instability often manifests visibly in repair speed and inflammation appearance. Cross-reference with the illustration above for motivation.
```

**Full updated frontmatter example** (bump date):
```yaml
---
title: Genomic Instability
hallmark: 1
evidence_tier: A
last_updated: 2026-06-25
visual_component: GenomicInstabilityVisual  # New field for future auto-embedding
---
```

---

## 2. Mitochondrial Dysfunction (content/hallmarks/mitochondrial-dysfunction.mdx) Expansions

### A. Add Visual Diagram section after the existing pathway viz

```mdx
<!-- INSERT VISUAL SECTION: Mitochondrial Dysfunction Illustration -->

## Visual Diagram — NAD+ → SIRT3 → Mitophagy Axis

This illustration depicts the central bottleneck: NAD+ depletion starves SIRT3 quality control, leading to damaged mitochondria (left, ROS leaks) vs. restored function with NAD+ substrate and SIRT3 activation (right, healthy cristae, clearance arrows).

<MitochondrialDysfunctionVisual className="w-full max-w-[420px] mx-auto my-6" accentColor="emerald" />

*Pairs perfectly with the NAD+ Mito Stack and GlyNAC for upstream protection.*
```

### B. Expand synergies table similarly

Add visual integration column and cross-reference note (same pattern as above).

### C. Add recent research / depth note

```mdx
:::evidence tier="A"
Recent context (2024-2025):
- Human NAD+ precursor trials continue to show improvements in mitochondrial biogenesis markers and subjective energy in middle-aged adults.
- Combination strategies (NMN + resistance/Zone 2 training) show additive effects on PGC-1α signaling.
- GlyNAC remains one of the most robust for protecting existing mitochondrial function via glutathione repletion (multiple RCTs).
:::
```

### D. Personal template enhancement

Add note on tracking resting HR + morning energy as proxies, and how the visual helps conceptualize why NMN morning fasted dosing aligns with circadian mito function.

---

## Integration Recommendations (for Library / Hallmark pages)

1. In `app/library/[slug]/page.tsx` or the dynamic hallmark renderer, import the visual component and conditionally render based on frontmatter `visual_component` field.
2. Update the custom `:::hallmark` MDX component (if it exists in components/mdx/) to optionally include the visual.
3. For Library grid cards: Add a small thumbnail/preview of the relevant visual (or icon fallback) to increase visual engagement and depth perception.
4. Future: Build a global `<HallmarkVisualExplorer>` that lets users see how stacks light up multiple visuals simultaneously.

## Status After This Push

- **Pillar 3 Visuals**: Core component live on branch with 3 production-ready SVGs + reusable pattern for all 12.
- **Pillar 1 Content**: These expansions provide immediate depth uplift for two key hallmarks. Apply the snippets above (or let me push direct MDX edits once SHAs are confirmed in next round).
- Both pillars now have concrete, mergeable artifacts on `feat/depth-visual-upgrades-june2026`.

Next: Merge PR → deploy preview. Then expand the component to remaining 9 hallmarks + integrate visuals into MDX rendering.
