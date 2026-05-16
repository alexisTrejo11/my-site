---
name: portfolio-new-pages
description: >-
  Step-by-step workflow to add marketing pages or project documentation sections to the
  Alexis Trejo portfolio. Use when the user asks for a new page, route, or project-docs tab.
---

# Adding pages to the portfolio

Read [portfolio-design-system](../portfolio-design-system/SKILL.md) and [portfolio-ui-patterns](../portfolio-ui-patterns/SKILL.md) before implementing.

## A. New marketing page (Home / About / Contact style)

### 1. Generate structure

```bash
ng generate component pages/my-page --skip-tests
mkdir -p src/app/pages/my-page/components
```

### 2. Build the page component

Parent composes sections only:

```typescript
@Component({
  selector: 'app-my-page',
  imports: [SectionA, SectionB, CtaSection],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-950">
      <app-section-a />
      <app-section-b />
      <app-cta-section />
    </div>
  `,
})
export class MyPage {}
```

### 3. Register route

In `src/app/app.routes.ts`:

```typescript
{
  path: 'my-page',
  loadComponent: () => import('./pages/my-page/my-page').then((m) => m.MyPage),
},
```

### 4. Add header nav

In `src/app/layout/header/header.ts`, append to `navLinks`:

```typescript
{ label: 'My Page', path: '/my-page' },
```

### 5. Section checklist

Each section component should:

- [ ] Use `section-title` / `section-subtitle` for headings
- [ ] Use `max-w-7xl` or `max-w-6xl` inner container
- [ ] Include full `dark:` styling
- [ ] Reuse `CtaSection` at bottom when appropriate

---

## B. New project-docs section

### 1. Create section component

Path: `src/app/pages/project-docs/sections/<name>/`

```bash
ng generate component pages/project-docs/sections/my-section --skip-tests
```

Extend `BaseDocComponent<YourDataType>` if loading per-project data.

### 2. Template shell

Copy loading/error/success pattern from `overview.html`:

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
  @if (isLoading) { /* spinner */ }
  @else if (error) { /* error + retry */ }
  @else if (data) { /* content */ }
</div>
```

### 3. Register child route

Under `projects/:projectId` children in `app.routes.ts`:

```typescript
{
  path: 'my-section',
  loadComponent: () =>
    import('./pages/project-docs/sections/my-section/my-section').then(
      (m) => m.MySection,
    ),
},
```

### 4. Add sidebar item

In `project-docs.ts` `navItems`:

```typescript
{ label: 'My Section', path: 'my-section', iconPath: 'icons/general/….svg' },
```

Place icon under `public/icons/`.

### 5. Extend project model (if needed)

- Types: `src/app/core/models/project-docs.models.ts` or `project.ts`
- Data: project JSON / service backing `ProjectsService`
- Dummy data: `pages/project-docs/dummy_data/` for local dev

---

## C. New shared component

1. Place in `src/app/shared/components/<name>/`
2. Standalone, `selector: 'app-<name>'`
3. Document in `portfolio-ui-patterns` if reusable across 2+ pages
4. Prefer `input()` signals over many `@Input()`s

---

## D. Verification

```bash
npm run lint
npm run build
```

Manually check:

- [ ] Light and dark mode
- [ ] Mobile layout (docs sidebar, header menu)
- [ ] SSR: no `window` errors in server log
- [ ] Active nav highlights (`routerLinkActive` / `isActiveLink`)

---

## Route map (current)

| Path | Component |
|------|-----------|
| `/` | Home |
| `/projects` | ProjectsList |
| `/projects/:id/overview` | Overview |
| `/projects/:id/architecture` | ProjectArchitecture |
| `/projects/:id/code` | CodeShowcase |
| `/projects/:id/api` | ApiExplorer |
| `/projects/:id/features` | ProjectFeatures |
| `/projects/:id/infrastructure` | Infrastructure |
| `/about` | About |
| `/contact` | Contact |
