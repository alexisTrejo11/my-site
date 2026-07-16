import { Routes } from '@angular/router';

export const learningRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./learning-layout/learning-layout').then((m) => m.LearningLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./learning').then((m) => m.Learning),
      },
      {
        path: 'glossary',
        loadComponent: () => import('./glossary/glossary').then((m) => m.Glossary),
      },
      {
        path: ':slug',
        loadComponent: () => import('./note-viewer/note-viewer').then((m) => m.NoteViewer),
      },
    ],
  },
];
