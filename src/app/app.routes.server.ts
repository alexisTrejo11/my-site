import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:projectId/**',
    renderMode: RenderMode.Server,
  },
  // Learning fetches notes-catalog.json at runtime — do not prerender.
  {
    path: 'learning',
    renderMode: RenderMode.Server,
  },
  {
    path: 'learning/**',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
