---
name: unslop
description: Turns vibecoded, AI-looking UI into a designed interface with its own character. Finds a direction from the product itself, then fixes spacing, color, icons, copy, type, layout, details, visuals and motion in that order, and can generate a real hero visual with an image tool when one is available. Use when the user asks to unslop, polish, clean up or redesign a screen so it stops looking AI-generated, or when a UI shows the usual tells like purple gradients, glows, gradient text, emoji labels, "New ✨" badges, glossy blobs, uppercase tracked labels, pulsing elements or uneven spacing. Works on React, Tailwind, HTML and CSS, for dashboards, apps and landing pages.
---

# Unslop UI Engine

Eliminate generic AI-generated interface patterns and replace them with deliberate, high-craft, professional web interfaces.

## 1. The Core Philosophy: Eliminate AI Slop

AI code generators share predictable visual tells:
- Cliché purple/indigo gradients (`#4F46E5`, `#6366F1`, `#7C3AED`)
- Overused background glows, ambient blurred radial blobs, and neon borders
- Emojis used as makeshift UI icons (e.g. 🚀, ✨, 🔥, 💡)
- Cluttered uppercase tracked labels (`letter-spacing: 0.1em`)
- Over-animated, pulsing buttons and generic glassmorphism cards
- Uneven padding, irregular margins, and inconsistent component heights

## 2. The Nine-Pass Refinement Workflow

When invoked on a file or component:

1. **Audit**: Identify all visual AI tells, emojis, mismatched token colors, and broken responsive margins.
2. **Spacing & Grid**: Align layout to a strict 4px/8px modular scale (`gap-2`, `gap-4`, `gap-6`, `p-4`, `p-6`). Ensure baseline consistency across cards.
3. **Color & Contrast**: Replace random hex values with system design tokens (`var(--color-primary)`, `var(--color-surface)`, `var(--color-text)`). Guarantee WCAG AA 4.5:1 minimum text contrast in both Light and Dark themes.
4. **Icons**: Replace every emoji with clean, sharp vector SVGs (Heroicons or Lucide). Icons must match text color (`currentColor`) and have standard bounding boxes (`16px`, `20px`, or `24px`).
5. **Copy & Microcopy**: Remove robotic AI phrasing (*"Unlock your potential"*, *"Empower your journey"*, *"Delve into"*). Replace with concise, functional, user-centric English text.
6. **Typography**: Establish clear hierarchy (Display, H1, H2, Body, Caption). Enforce proportional line heights (`1.2` for headings, `1.5` for body).
7. **Layout & Cards**: Create deliberate grouping, unified corner radiuses (`var(--radius-md)`), and subtle depth using layered borders (`1px solid var(--border-color)`) instead of heavy diffuse shadows.
8. **Visual Highlights (One Bright Element)**: Keep secondary chrome quiet. Reserve visual vibrancy for key domain features (e.g., interactive data canvas, active roadmap stage, or hero graphic).
9. **Motion & Interaction**: Apply smooth, subtle hover transitions (`150ms-250ms cubic-bezier(0.4, 0, 0.2, 1)`) with `cursor: pointer` on all interactive triggers. Zero erratic or distraction loops.
