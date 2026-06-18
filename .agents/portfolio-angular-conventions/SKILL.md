---
name: portfolio-angular-conventions
description: >-
  Angular 20 conventions for the Alexis Trejo portfolio—standalone components, zoneless SSR,
  routing, services, file layout, naming, and data patterns. Use when creating components,
  services, routes, or refactoring TypeScript in this repo.
---

# Portfolio Angular conventions

## Stack

| Piece | Version / choice |
|-------|------------------|
| Angular | 20.x standalone components |
| Change detection | Zoneless (`provideZonelessChangeDetection`) |
| SSR | `@angular/ssr` + hydration + event replay |
| HTTP | `provideHttpClient(withFetch())` |
| Styling | SCSS + Tailwind 3 (`src/styles.scss`) |
| Lint | `angular-eslint`, prefix `app` |

## File & naming

| Item | Convention |
|------|------------|
| Component files | `feature-name.ts` + `feature-name.html` (no `.component` suffix) |
| Selector | `app-kebab-case` (ESLint enforced) |
| Schematics | `skipTests: true` by default |
| Models | `src/app/core/models/` |
| Constants | `src/app/core/constants/` |
| Services | `src/app/services/` |
| Shared UI | `src/app/shared/components/` |
| Page sections | `src/app/pages/<page>/components/<section>/` |

## Component template

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-feature',
  imports: [CommonModule /* , RouterModule, child components */],
  templateUrl: './my-feature.html',
  // styleUrl: './my-feature.scss'  // only if component-specific styles needed
})
export class MyFeature {}
```

- Prefer **inline `template`** only for thin page shells (see `home.ts`, `about.ts`)
- Use **`input()` / `output()`** signals API for component I/O (`project-card`, `badge`)
- Legacy `@Input()` still appears in `IconComponent` — match surrounding file when editing

## Control flow

Use built-in `@if`, `@for`, `@switch` (not `*ngIf` / `*ngFor`).

```html
@for (item of items; track item.id) {
  <div>{{ item.label }}</div>
}
```

## State & lifecycle

- **Signals** for local UI state in layout (`Header`: `signal()` for menu, theme, scroll)
- **RxJS** for route params and HTTP: `takeUntil(destroy$)` with `Subject<void>` in `OnDestroy`
- **SSR-safe browser APIs**: `inject(PLATFORM_ID)` + `isPlatformBrowser` before `window`, `localStorage`, `document`

## Routing (`app.routes.ts`)

- Lazy `loadComponent` for every page
- Project docs: nested children under `projects/:projectId`
- Default child redirect: `{ path: '', redirectTo: 'overview', pathMatch: 'full' }`
- Wildcard → home

Add new top-level routes as siblings of `about`, `contact`.

## Project docs data flow

1. Parent `ProjectDocs` reads `:projectId`, loads `Project` via `ProjectsService`
2. Child sections extend **`BaseDocComponent<T>`**:
   - Implement `fetchData(projectId): Observable<T>`
   - Subscribe to `route.parent?.params` for `projectId`
   - Use `isLoading`, `error`, `data`, `retry()` from base

```typescript
export class Overview extends BaseDocComponent<Project> {
  fetchData(projectId: string): Observable<Project> {
    return this.projectService
      .getProjectById(projectId)
      .pipe(filter((p): p is Project => p !== undefined));
  }
}
```

## Services

- `ProjectsService`: project list/detail (source for cards and docs)
- `TechStackService`: tech metadata
- Inject with `inject(Service)` in components

## Personal / static data

Use `PERSONAL_DATA` from `core/constants/personal-data.ts` for email, GitHub, LinkedIn — do not hardcode URLs in multiple places.

## Prettier

- `printWidth: 100`, `singleQuote: true`
- HTML parsed with Angular parser

## Testing

- Specs exist for some doc sections (`*.spec.ts`); new components often skip tests per schematic
- Run `ng test` / `ng lint` before PR

## Dependencies to know

- **PrismJS** — code highlighting in docs
- **Mermaid** — architecture diagrams
- **axios** — available; prefer `HttpClient` for new Angular code
- **Angular Material** — in `package.json`; prefer Tailwind + shared components for new UI unless extending Material screens

## Anti-patterns

- Do not use NgModules for new features
- Do not access `document`/`localStorage` without platform check (breaks SSR)
- Do not add `zone.js` — app is zoneless
- Do not create `*.component.ts` filenames (inconsistent with repo)
