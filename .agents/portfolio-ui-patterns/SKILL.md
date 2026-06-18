---
name: portfolio-ui-patterns
description: >-
  Reusable UI patterns and shared components for the Alexis Trejo portfolio—cards, heroes,
  sidebars, code blocks, loading/error states, project cards. Use when building templates,
  layouts, or matching existing UX on new features.
---

# Portfolio UI patterns

## App shell

```
app-root
├── app-header (fixed, backdrop-blur, theme toggle)
├── main.pt-20
│   └── router-outlet (page content)
└── app-footer
```

**Project docs** use a separate full-width layout (`app-project-docs`): fixed mobile header + collapsible sidebar + `router-outlet` for sections. No global footer inside docs shell.

## Page types

| Type | Shell | Example |
|------|--------|---------|
| Marketing | `min-h-screen bg-white dark:bg-gray-950` + stacked sections | `home`, `about`, `contact` |
| List | centered grid + `app-projects-grid` | `projects-list` |
| Project docs | sidebar + `max-w-7xl` content | `project-docs` children |

Marketing pages compose **section components** only in the parent `template` (see `home.ts`, `about.ts`).

## Shared components (`src/app/shared/components/`)

| Selector | When to use |
|----------|-------------|
| `app-badge` | Status chips; `type` input: primary, success, warning, error, gray, info |
| `app-project-card` | Project grid item; `project` required input |
| `app-projects-grid` | Responsive grid of projects |
| `app-icon` | Named SVG icons (document, search, code, …) — prefer inline SVG in heroes if icon not in map |
| `app-error-loading` | Failed fetch with retry; emits `retryEvent` |
| `BaseDocComponent` | Abstract base for project-doc sections (loading/error/data) |

Import shared components in the standalone component `imports` array.

## Hero pattern (home)

- Full viewport section with gradient orbs + subtle grid
- Optional decorative `code-block` terminal (macOS traffic lights + `code-line` / `code-line-number`)
- Split layout: `lg:grid-cols-2` — copy left, visual right
- Name: `text-gradient-primary` + plain surname
- Typing effect: `font-mono`, `$` in `text-emerald-500`
- CTAs: `btn-gradient-primary`, `btn-secondary`, bordered social links
- Photo: gradient glow frame, `rounded-full`, floating badge cards with `animate-float`

## Section pattern (marketing)

```html
<section class="py-20 px-6">
  <div class="max-w-6xl mx-auto">
    <h2 class="section-title text-center mb-4">...</h2>
    <p class="section-subtitle text-center mx-auto mb-12">...</p>
    <!-- content -->
  </div>
</section>
```

Stats band: `bg-gradient-brand` with glass cards (`bg-white/10 backdrop-blur-sm border-white/20`).

## Project card

- `article` with `hover:-translate-y-2`, `hover:shadow-2xl`
- Header: category-based gradient (`getHeaderClasses()`)
- Status badge top-left; FEATURED top-right
- Metrics row: 3-column grid from `project.docs.overview.metrics`
- CTA: full-width bordered button → `/projects/:projectId`

## Project docs sidebar nav

- Items: Overview, Architecture, Code, API, Features, Infrastructure
- Link classes: default `flex items-center gap-3 px-4 py-3 rounded-lg …`
- Active: `routerLinkActive="bg-blue-600 !text-white dark:bg-blue-500"`
- Icons: SVG under `public/icons/…` with `dark:invert dark:brightness-200 dark:hue-rotate-180`

## Doc section content states

Every section extending `BaseDocComponent` should mirror `overview.html`:

1. **Loading**: centered spinner `border-b-2 border-blue-600`
2. **Error**: icon + message + `btn` retry
3. **Success**: section-specific child components

Alternatively use `app-error-loading` for errors with `(retryEvent)="retry()"`.

## Code block pattern

Used in API explorer, infrastructure, hero. Structure:

```html
<div class="code-block">
  <div class="code-header">
    <span class="text-sm text-gray-400">filename or label</span>
    <button class="btn-icon text-gray-400 hover:text-white">copy</button>
  </div>
  <pre class="code-content"><code>...</code></pre>
</div>
```

For syntax-highlighted snippets use Prism (`language-*` classes) per `prism-custom.scss`. Hero uses div-based lines instead of `<pre>`.

**Note:** `.code-block` / `.tab` / `.tab-active` classes are used in templates; if styles are missing, add to `src/styles.scss` `@layer components` matching:

```scss
.code-block { @apply rounded-xl overflow-hidden border border-gray-800 bg-gray-900; }
.code-header { @apply flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700; }
.code-content { @apply p-4 overflow-x-auto font-mono text-sm text-gray-100; }
.tab { @apply px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800; }
.tab-active { @apply px-4 py-2 rounded-lg text-sm bg-blue-600 text-white; }
```

## Icons

- **Inline SVG** (stroke, `viewBox="0 0 24 24"`): primary pattern in header, hero, cards
- **Phosphor** (`ph ph-*`): architecture page, `app-error-loading` — ensure Phosphor CSS is loaded if adding new `ph` icons
- **Public assets**: `/icons/general/*.svg`, `/at-logo.svg`

## Forms & inputs

Use `.input` from global styles. Focus states already defined (`ring-blue-600`).

## Accessibility

- `aria-label` on icon-only buttons (theme toggle, mobile menu)
- `rel="noopener noreferrer"` on external links
- Template lint: `angular-eslint` accessibility rules enabled

## Animation checklist for new sections

- [ ] `dark:` variants on all surfaces
- [ ] `transition-all duration-300` on interactive elements
- [ ] Optional `animate-fade-in-up` or stagger for lists
- [ ] Hover: `hover:scale-105` on primary buttons (already in `.btn-primary`)

See [examples.md](examples.md) for copy-paste snippets.
