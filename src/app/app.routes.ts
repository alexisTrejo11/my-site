import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/profile/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/portfolio/projects-list/projects-list').then((m) => m.ProjectsList),
      },
      {
        path: ':projectId',
        loadComponent: () => import('./features/portfolio/project-docs/project-docs').then((m) => m.ProjectDocs),
        children: [
          {
            path: 'overview',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/overview/overview').then((m) => m.Overview),
          },
          {
            path: 'architecture',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/project-architecture/project-architecture').then(
                (m) => m.ProjectArchitecture,
              ),
          },
          {
            path: 'code',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/code-showcase/code-showcase').then(
                (m) => m.CodeShowcase,
              ),
          },
          {
            path: 'api',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/api-explorer/api-explorer').then(
                (m) => m.ApiExplorer,
              ),
          },
          {
            path: 'features',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/project-features/project-features').then(
                (m) => m.ProjectFeatures,
              ),
          },
          {
            path: 'infrastructure',
            loadComponent: () =>
              import('./features/portfolio/project-docs/sections/infrastructure/infrastructure').then(
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
    loadComponent: () => import('./features/profile/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/profile/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./features/knowledge-base/learning.routes').then((m) => m.learningRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
