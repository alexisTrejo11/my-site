---
name: portfolio-design-system
description: >-
  Design tokens for the Alexis Trejo portfolio (emerald/teal/indigo brand, Inter/Fira Code,
  dark mode, Tailwind utilities). Use when styling UI, choosing colors/fonts, or matching
  visual identity on new pages or components.
---

# Portfolio design system

## Brand identity

Backend-engineer portfolio with a **terminal/code aesthetic** and a **emerald → teal → indigo** brand gradient. Accent interactions often use **blue-600** (buttons, focus, links). Logo/header uses an additional **pink → violet → blue** animated gradient (`.logo-gradient`).

## Typography

| Role | Stack | Usage |
|------|--------|--------|
| Body | `Inter` (300–800) | All UI copy; loaded in `src/index.html` |
| Code | `Fira Code`, `JetBrains Mono`, `Consolas` | `font-mono`, terminals, Prism blocks |
| Sans fallback | `system-ui`, `-apple-system` | Via Tailwind `font-sans` |

Responsive type utilities: `.text-responsive-xs` through `.text-responsive-xl`, `.p-responsive`, `.gap-responsive`.

## Color tokens

### Brand gradient (primary)

CSS variables in `:root` (`src/styles.scss`):

| Token | Light | Dark (`.dark`) |
|-------|--------|----------------|
| Emerald | `#10b981` | `#059669` |
| Teal | `#0d9488` | `#0f766e` |
| Indigo | `#4338ca` | `#3730a3` |

Utilities: `.gradient-primary`, `.text-gradient-primary`, `.section-title`, `.btn-gradient-primary`, `.bg-gradient-brand`, `.bg-gradient-brand-subtle`, `.border-gradient-primary`.

### Surfaces & text

| Element | Light | Dark |
|---------|--------|------|
| Page background | `bg-white` | `dark:bg-gray-950` |
| Card | `bg-white` + `border-gray-200` | `dark:bg-gray-950` + `dark:border-gray-800` |
| Muted text | `text-gray-600` | `dark:text-gray-400` |
| Body text | `text-gray-900` | `dark:text-white` |
| Sidebar (docs) | `bg-gray-50` | `dark:bg-gray-900` |

Gray scale extended in `tailwind.config.js` (`gray-50` … `gray-950`).

### Semantic / UI accents

- **Links & primary actions**: `blue-600` / `dark:blue-400` (`.btn-primary`, focus ring `ring-blue-500`)
- **Success / terminal prompt**: `emerald-500` / `dark:emerald-400`
- **Stats highlights**: emerald, cyan, indigo on hero cards
- **Errors**: `red-600` / `dark:red-400`

Tailwind `primary-*` in config is sky-blue (`#0ea5e9`) — used sparingly; prefer brand CSS variables for hero/marketing sections.

## Dark mode

- **Strategy**: `darkMode: 'class'` on `<html>` (see `Header` in `src/app/layout/header/header.ts`)
- **Persistence**: `localStorage.theme` = `'dark'` | `'light'`
- **Default**: system `prefers-color-scheme` if no saved theme
- **Always pair**: every surface/text class needs a `dark:` variant

## Global component classes (`src/styles.scss`)

Prefer these over one-off Tailwind for consistency:

| Class | Purpose |
|-------|---------|
| `.card`, `.card-hover`, `.card-interactive` | Panels |
| `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-icon` | Actions |
| `.btn-gradient-primary` | Primary CTA (brand gradient) |
| `.badge`, `.badge-primary`, `.badge-success`, … | Status chips |
| `.input` | Form fields |
| `.nav-link`, `.nav-link-active` | Doc sidebar (active = blue fill) |
| `.section-title`, `.section-subtitle` | Page headings |
| `.text-gradient`, `.text-gradient-primary` | Gradient text |

## Motion & effects

- Global transition on color/border/shadow/transform (0.3s)
- Utilities: `.animate-fade-in`, `.animate-slide-up`, `.animate-fade-in-up`, `.hover-lift`, `.hover-glow`, `.glass`, `.grid-pattern`
- Hero: blurred gradient orbs, optional grid SVG overlay, `animate-bounce` scroll hint
- Scrollbar: emerald→indigo gradient thumb

## Code / syntax

- Prism theme: `prism-tomorrow` + custom tokens in `src/prism/prism-custom.scss`
- Light code bg: `#f8fafc`; dark: `#1e293b`
- Token colors align with brand (emerald strings, violet keywords, blue numbers)

## Layout rhythm

- Max content width: `max-w-7xl mx-auto`
- Horizontal padding: `px-4 sm:px-6 lg:px-8` or `.p-responsive`
- Section vertical spacing: `py-8 lg:py-12` (docs) or `py-20` (marketing)
- App shell: `main` has `pt-20` below fixed header (`src/app/app.ts`)

## Do / don't

**Do**

- Use `dark:` on borders, backgrounds, and text together
- Use brand gradient for hero titles and primary CTAs
- Use `font-mono` for CLI/typing effects (`$` prompt in emerald)

**Don't**

- Introduce new primary hues without tying to emerald/teal/indigo or existing blue accent
- Use Material components for new UI unless extending existing Material usage
- Rely on `prefers-color-scheme` alone — theme is class-driven on `html`

## Quick reference

```html
<!-- Page shell -->
<div class="min-h-screen bg-white dark:bg-gray-950">...
</div>

<!-- Section heading -->
<h2 class="section-title">Title</h2>
<p class="section-subtitle">Subtitle</p>

<!-- Primary CTA -->
<button class="btn-gradient-primary">Action</button>

<!-- Card -->
<div class="card p-6">...
</div>
```

See [tokens.md](tokens.md) for copy-paste hex and Tailwind class lists.
