import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/projects-list/projects-list').then((m) => m.ProjectsList),
      },
      {
        path: ':projectId',
        loadComponent: () => import('./pages/project-docs/project-docs').then((m) => m.ProjectDocs),
        children: [
          {
            path: 'overview',
            loadComponent: () =>
              import('./pages/project-docs/sections/overview/overview').then((m) => m.Overview),
          },
          {
            path: 'architecture',
            loadComponent: () =>
              import('./pages/project-docs/sections/project-architecture/project-architecture').then(
                (m) => m.ProjectArchitecture,
              ),
          },
          {
            path: 'code',
            loadComponent: () =>
              import('./pages/project-docs/sections/code-showcase/code-showcase').then(
                (m) => m.CodeShowcase,
              ),
          },
          {
            path: 'api',
            loadComponent: () =>
              import('./pages/project-docs/sections/api-explorer/api-explorer').then(
                (m) => m.ApiExplorer,
              ),
          },
          {
            path: 'features',
            loadComponent: () =>
              import('./pages/project-docs/sections/project-features/project-features').then(
                (m) => m.ProjectFeatures,
              ),
          },
          {
            path: 'infrastructure',
            loadComponent: () =>
              import('./pages/project-docs/sections/infrastructure/infrastructure').then(
                (m) => m.Infrastructure,
              ),
          },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ],
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./pages/learning/learning.routes').then((m) => m.learningRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
