# TNiC Design System & Style Guide

> Version 1.0 · June 2026  
> Governs typography, spacing, components, accessibility, and page patterns across tnic.help.

---

## 1. Design Principles

1. **Scannable first** — Users skim. Lead with labels, stats, and cards; bury detail in accordons.
2. **Evidence visible** — Tier badges, citations, and status colors appear before prose.
3. **Mobile-native** — 44px touch targets, horizontal scroll for tables/tabs, single-column defaults.
4. **Privacy legible** — Local-first data patterns are explained inline, not hidden in footnotes.
5. **Accessible by default** — Focus rings, semantic HTML, WCAG AA contrast, reduced-motion support.

---

## 2. Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-base` | `#030712` | Page background |
| `--color-bg-elevated` | `#0a0f1a` | Gradient-border cards |
| `--color-text-primary` | `#fafafa` | Headings, values |
| `--color-text-secondary` | `#d4d4d8` | Body copy (AA on base) |
| `--color-text-muted` | `#a1a1aa` | Supporting text |
| `--color-text-faint` | `#71717a` | Labels, captions |
| `--color-border-subtle` | `rgba(255,255,255,0.06)` | Card borders |
| `--color-border-focus` | `rgba(34,211,238,0.6)` | Focus rings |

### Theme accents (one per hub/section)

| Theme | Hub / Section | Solid CTA |
|-------|---------------|-----------|
| `cyan` | Library, Science | `bg-cyan-400` |
| `violet` | Stacks | `bg-violet-400` |
| `rose` | Labs | `bg-rose-400` |
| `emerald` | Trust, Success | `bg-emerald-400` |
| `amber` | Warnings | `bg-amber-400` |

### Status colors

| Status | Text | Background |
|--------|------|------------|
| Optimal | `text-emerald-400` | `bg-emerald-400/10` |
| Watch | `text-amber-400` | `bg-amber-400/10` |
| Critical | `text-rose-400` | `bg-rose-400/10` |

---

## 3. Typography Scale

| Class | Size | Use |
|-------|------|-----|
| `.heading-page` | clamp 30–48px | Hub H1 |
| `.heading-section` | clamp 24–40px | Section H2 |
| `.heading-card` | 16px / 600 | Card titles |
| `.text-body` | 16px / 1.65 | Descriptions |
| `.text-body-sm` | 14px / 1.6 | Card body, table cells |
| `.text-caption` | 12px | Meta, disclaimers |
| `.text-label` | 11px mono uppercase | Eyebrows, column headers |

**Before:** Mixed `text-[10px]`, `text-xs`, `text-sm` with no hierarchy.  
**After:** Six semantic classes used consistently via `PageHeader`, `SectionShell`, cards.

---

## 4. Spacing & Layout

| Token | Value |
|-------|-------|
| `.container-page` | max 80rem, fluid `px` clamp 16–24px |
| Page vertical | `py-16 md:py-24 lg:py-28` |
| Section vertical | `py-16 md:py-24 lg:py-32` |
| Grid gap | `gap-4 md:gap-6 lg:gap-8` |
| Touch min | `--space-touch: 2.75rem` (44px) |

---

## 5. Components (`components/ui/`)

| Component | Purpose |
|-----------|---------|
| `PageShell` | Hub page wrapper + container |
| `PageHeader` | Eyebrow + title + description + meta |
| `TabBar` | Accessible tablist with scroll on mobile |
| `StatStrip` | 2-col mobile → auto-fit desktop summary |
| `Button` | primary / secondary / ghost / danger |
| `Accordion` | Expandable detail without page jump |
| `DataTable` | Scrollable table + `sr-only` caption |
| `Card` patterns | `.card-base`, `.card-elevated`, `.glass` |

Import theme maps from `lib/design-system.ts`.

---

## 6. Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| Focus visible | `.focus-ring` on all interactives |
| Skip link | `SkipLink` → `#main-content` |
| Touch targets | `min-h-[var(--space-touch)]` on buttons/nav |
| Color contrast | Body text `#d4d4d8` on `#030712` ≥ 7:1 |
| Motion | `prefers-reduced-motion` disables animations |
| Tables | `scope="col"`, caption, horizontal scroll |
| Tabs | `role="tablist"`, `aria-selected`, `aria-controls` |
| Forms | `<label>` + `htmlFor`, `aria-label` on icon-only |
| Live regions | `aria-live="polite"` on dynamic panels |

---

## 7. Page Patterns

### Hub pages (`/library`, `/stacks`, `/labs`)

```
PageShell
  └─ PageHeader (theme-colored eyebrow)
  └─ StatStrip (optional metrics)
  └─ TabBar (scrollable mobile)
  └─ tabpanel content
```

### Homepage sections

```
SectionShell (theme prop)
  └─ heading-section + text-body subtitle
  └─ content grid
```

---

## 8. Before / After — Key Pages

### Homepage Hero

| Before | After |
|--------|-------|
| `href="#library"` anchor | `href="/library"` dedicated hub |
| `text-lg text-zinc-300` | `.text-body` token |
| Fixed `px-6` | `.container-page` fluid padding |
| No focus ring on CTAs | `.focus-ring` + 44px min height |
| `min-h-[92vh]` on mobile | `85vh` mobile, `92vh` desktop |

### `/library` — Anti-Aging Library

| Before | After |
|--------|-------|
| Custom centered header markup | `PageHeader` component |
| `text-[10px]` hallmark labels | `.text-label` + `.heading-card` |
| 2–3 col grid cramped on mobile | 1 col → 2 col → sidebar |
| Search input without label | `<label class="sr-only">` + `input-base` |
| No `aria-current` on selection | `aria-current` on active hallmark |
| Detail in plain div | `card-elevated` summary card |

### `/stacks` — Stacks Library

| Before | After |
|--------|-------|
| Duplicated tab button styles | `TabBar` with `role="tablist"` |
| Inconsistent header | `PageHeader` + meta line |
| Raw `<table>` | `DataTable` + `scope="col"` + caption |
| Filter selects without labels | `aria-label` + `input-base` |

### `/labs` — Lab Hub

| Before | After |
|--------|-------|
| `text-[9px]` stat labels | `StatStrip` + `.text-label` |
| 5-col stats broken on mobile | 2-col mobile summary strip |
| Tab buttons wrap awkwardly | Horizontal scroll `TabBar` |
| Alert as plain text | `role="status"` summary card |
| Duplicate builder at bottom | Preserved with `aria-label` section |

### Global Nav

| Before | After |
|--------|-------|
| Logo `href="#"` | `Link href="/"` |
| No escape key on mobile menu | Escape closes + body scroll lock |
| `aria-label` only on menu button | Full `aria-expanded` / `aria-controls` |
| 8 links same weight | 44px row height, clearer tap zones |
| Hash-only hub links | `/library`, `/stacks`, `/labs` |

### Footer

| Before | After |
|--------|-------|
| 3 columns, no hub links | 4 columns with Library/Stacks/Labs |
| `text-sm...` | (content continues in original but truncated for this construction; full original preserved up to this point) |

---

## 9. Illustration & Visual Depth System (v1.1) — June 2026

**Principles**
- Every hallmark and synergy must have a lightweight, theme-consistent SVG or React component for mechanistic clarity.
- Use consistent `viewBox="0 0 400 300"`, dark fills (`#020811`), luminous strokes in section accent (cyan for NRF2/Library, emerald for Mitochondrial, violet for SIRT1).
- Animations: Subtle pulse-glow or drift on hover only; respect `prefers-reduced-motion`.
- Accessibility: `aria-label` on SVGs, decorative elements `aria-hidden`.
- Integration: Import in MDX via frontmatter `visual_component: "GenomicInstabilityVisual"`. Render conditionally in `app/library/[slug]/page.tsx` and hallmark cards.

**Hallmark SVG Specs**
- Genomic Instability: DNA helix with PARP/NMN repair nodes, cyan accents.
- Mitochondrial Dysfunction: Cristae with GlyNAC/NMN fueling, emerald glow on healthy mitochondria.
- Future: Senescence (cell with SASP markers), Proteostasis (proteasome/autophagy), etc.

**Synergy Network Component**
- SVG nodes (compounds) connected by evidence-weighted edges.
- Color by pathway; stroke-width by Tier/evidence strength.
- Hover shows PMID tooltip or synergy uplift %.
- Reusable in `<SynergyNetworkTeaser />` and full explorer later.

**Card & Visual Polish**
- `.card-elevated`: Add `group-hover:scale-[1.015] transition-transform duration-200` and subtle `bg-gradient-to-br from-[rgba(0,224,255,0.03)]`.
- Inline SVGs in cards for hallmark icons (use lucide-react fallbacks or custom).
- Stat numbers: Use `framer-motion` CountUp or CSS for perceived dynamism.

**Implementation Notes**
- Place new components in `components/illustrations/` (or `components/` for simplicity).
- Update `app/library/page.tsx` to render full 12-hallmark grid with visual teasers.
- Test with `npm run dev`; verify contrast and mobile.

---

**Note on merge**: This version 1.1 extends the June 2026 foundation with the illustration system required for full 12-hallmark visual depth and synergy visualization.