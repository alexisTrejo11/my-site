import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectDocs } from './pages/project-docs/project-docs';
import { ProjectsList } from './pages/projects-list/projects-list';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Overview } from './pages/project-docs/sections/overview/overview';
import { CodeShowcase } from './pages/project-docs/sections/code-showcase/code-showcase';
import { ApiExplorer } from './pages/project-docs/sections/api-explorer/api-explorer';
import { ProjectFeatures } from './pages/project-docs/sections/project-features/project-features';
import { Infrastructure } from './pages/project-docs/sections/infrastructure/infrastructure';
import { ProjectArchitecture } from './pages/project-docs/sections/project-architecture/project-architecture';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsList,
      },
      {
        path: ':projectId',
        component: ProjectDocs,
        children: [
          { path: 'overview', component: Overview },
          { path: 'architecture', component: ProjectArchitecture },
          { path: 'code', component: CodeShowcase },
          { path: 'api', component: ApiExplorer },
          { path: 'features', component: ProjectFeatures },
          { path: 'infrastructure', component: Infrastructure },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ],
      },
    ],
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
