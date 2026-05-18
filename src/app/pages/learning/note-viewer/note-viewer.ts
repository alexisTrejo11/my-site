import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NoteMetadata {
  title: string;
  summary: string;
  category: string;
  readingMinutes: number;
  breadcrumb: string[];
  lastUpdated: string;
}

const SLUG_META: Record<string, NoteMetadata> = {
  microservices: {
    title: 'Microservices Architecture',
    summary:
      'An architectural pattern that structures an application as a collection of loosely coupled, independently deployable services — each responsible for a distinct business capability.',
    category: 'Backend',
    readingMinutes: 8,
    breadcrumb: ['Learning Hub', 'Backend Engineering', 'Microservices'],
    lastUpdated: 'May 2026',
  },
  'event-driven-systems': {
    title: 'Event-Driven Systems',
    summary:
      'A design paradigm where components communicate by producing and consuming events — enabling high decoupling, scalability, and resilience in distributed architectures.',
    category: 'Backend',
    readingMinutes: 10,
    breadcrumb: ['Learning Hub', 'Backend Engineering', 'Event-Driven Systems'],
    lastUpdated: 'May 2026',
  },
  'docker-containers': {
    title: 'Docker & Containers',
    summary:
      'Containerization technology that packages applications with their dependencies into isolated, portable units — reproducible across any environment.',
    category: 'DevOps',
    readingMinutes: 7,
    breadcrumb: ['Learning Hub', 'DevOps & Cloud', 'Docker & Containers'],
    lastUpdated: 'May 2026',
  },
  'angular-internals': {
    title: 'Angular Internals & Change Detection',
    summary:
      'A deep dive into Angular\'s runtime machinery — the compiler, dependency injection tree, zone.js, and the new Signals-based reactivity model.',
    category: 'Frontend',
    readingMinutes: 12,
    breadcrumb: ['Learning Hub', 'Frontend Architecture', 'Angular Internals'],
    lastUpdated: 'May 2026',
  },
};

const DEFAULT_META: NoteMetadata = {
  title: 'Engineering Reference',
  summary: 'A curated technical reference note from the Knowledge Hub.',
  category: 'General',
  readingMinutes: 5,
  breadcrumb: ['Learning Hub', 'Reference'],
  lastUpdated: 'May 2026',
};

const CATEGORY_BADGE: Record<string, string> = {
  Backend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  DevOps: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Frontend: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  General: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

@Component({
  selector: 'app-note-viewer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './note-viewer.html',
  styleUrl: './note-viewer.scss',
})
export class NoteViewer implements OnInit {
  private route = inject(ActivatedRoute);

  slug = signal('');
  meta = computed<NoteMetadata>(() => SLUG_META[this.slug()] ?? DEFAULT_META);

  badgeClass = computed(() => CATEGORY_BADGE[this.meta().category] ?? CATEGORY_BADGE['General']);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug.set(params.get('slug') ?? '');
    });
  }
}
