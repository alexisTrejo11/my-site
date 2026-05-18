import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LearningDataService } from '../../services/learning-data.service';
import { NoteMetadata } from '../../core/models/note-metadata';

interface RoadmapTopic {
  title: string;
  slug: string;
  done: boolean;
}

interface RoadmapPhase {
  phase: string;
  topics: RoadmapTopic[];
}

interface Pillar {
  id: string;
  title: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
  badgeClass: string;
  description: string;
  phases: RoadmapPhase[];
}

interface FrameworkConfig {
  id: string;
  title: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
  badgeClass: string;
  description: string;
}

interface FrameworkGroup extends FrameworkConfig {
  notes: NoteMetadata[];
}

const FRAMEWORK_CONFIGS: FrameworkConfig[] = [
  {
    id: 'spring-boot',
    title: 'Spring Boot',
    icon: '☕',
    accentFrom: 'from-green-500',
    accentTo: 'to-emerald-400',
    badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    description: 'IoC containers, data persistence with JPA, REST APIs, Spring Security, and testing slices.',
  },
  {
    id: 'django',
    title: 'Django',
    icon: '🦄',
    accentFrom: 'from-emerald-600',
    accentTo: 'to-green-400',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    description: 'MVT pattern, ORM optimization, DRF serializers & ViewSets, authentication and async Django.',
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    icon: '⚡',
    accentFrom: 'from-teal-500',
    accentTo: 'to-cyan-400',
    badgeClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    description: 'ASGI foundations, Pydantic v2, async database sessions, Alembic migrations, and background tasks.',
  },
];

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './learning.html',
})
export class Learning implements OnInit {
  private service = inject(LearningDataService);

  private catalog = signal<NoteMetadata[]>([]);
  isCatalogLoading = signal(true);

  expandedPhases = signal<Set<string>>(new Set(['backend-0', 'devops-0', 'frontend-0']));

  /** Total number of published notes in the catalog. */
  readonly catalogCount = computed(() => this.catalog().length);

  /** Notes grouped per framework — used by the Framework Deep-Dives section. */
  readonly frameworkGroups = computed<FrameworkGroup[]>(() =>
    FRAMEWORK_CONFIGS.map((fw) => ({
      ...fw,
      notes: this.catalog().filter((n) => n.subcategory === fw.id),
    }))
  );

  readonly pillars: Pillar[] = [
    {
      id: 'backend',
      title: 'Backend Engineering',
      icon: '⚙️',
      accentFrom: 'from-blue-500',
      accentTo: 'to-cyan-400',
      badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      description: 'Distributed systems, scalable APIs, data persistence, and event-driven architectures.',
      phases: [
        {
          phase: 'Phase 1 · Foundations',
          topics: [
            { title: 'HTTP & REST Fundamentals', slug: 'http-rest-fundamentals', done: true },
            { title: 'SQL & Relational Databases', slug: 'sql-databases', done: true },
            { title: 'Authentication Patterns', slug: 'authentication-patterns', done: true },
          ],
        },
        {
          phase: 'Phase 2 · Frameworks',
          topics: [
            { title: 'Microservices Architecture', slug: 'microservices', done: true },
            { title: 'Message Brokers & Queues', slug: 'message-brokers', done: false },
            { title: 'GraphQL APIs', slug: 'rest-graphql-apis', done: false },
          ],
        },
        {
          phase: 'Phase 3 · High Availability',
          topics: [
            { title: 'Event-Driven Systems', slug: 'event-driven-systems', done: false },
            { title: 'CQRS & Event Sourcing', slug: 'cqrs-event-sourcing', done: false },
            { title: 'Database Sharding', slug: 'database-sharding', done: false },
          ],
        },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      icon: '☁️',
      accentFrom: 'from-violet-500',
      accentTo: 'to-purple-400',
      badgeClass: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
      description: 'Resilient infrastructure, automated deployments, containers, and cloud-native operations.',
      phases: [
        {
          phase: 'Phase 1 · Foundations',
          topics: [
            { title: 'Linux & Shell Scripting', slug: 'linux-shell', done: true },
            { title: 'Docker & Containers', slug: 'docker-containers', done: true },
            { title: 'Git & Version Control', slug: 'git-version-control', done: true },
          ],
        },
        {
          phase: 'Phase 2 · Pipelines',
          topics: [
            { title: 'CI/CD with GitHub Actions', slug: 'cicd-pipelines', done: true },
            { title: 'Infrastructure as Code', slug: 'infrastructure-as-code', done: false },
            { title: 'Kubernetes Orchestration', slug: 'kubernetes', done: false },
          ],
        },
        {
          phase: 'Phase 3 · Cloud Infrastructure',
          topics: [
            { title: 'AWS Core Services', slug: 'cloud-infrastructure', done: false },
            { title: 'Observability & Tracing', slug: 'monitoring-observability', done: false },
            { title: 'Service Mesh & mTLS', slug: 'service-mesh', done: false },
          ],
        },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      icon: '🖥️',
      accentFrom: 'from-emerald-500',
      accentTo: 'to-teal-400',
      badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      description: 'Performant, scalable, and accessible user interfaces — Angular internals, state, and micro-frontends.',
      phases: [
        {
          phase: 'Phase 1 · Foundations',
          topics: [
            { title: 'Angular Core & Signals', slug: 'angular-internals', done: true },
            { title: 'RxJS & Observables', slug: 'rxjs-observables', done: true },
            { title: 'CSS Architecture', slug: 'css-architecture', done: true },
          ],
        },
        {
          phase: 'Phase 2 · Frameworks',
          topics: [
            { title: 'State Management', slug: 'state-management', done: true },
            { title: 'Performance Optimization', slug: 'performance-optimization', done: false },
            { title: 'Web Vitals & Metrics', slug: 'web-vitals', done: false },
          ],
        },
        {
          phase: 'Phase 3 · High Availability',
          topics: [
            { title: 'Micro-Frontends', slug: 'micro-frontends', done: false },
            { title: 'SSR & Hydration', slug: 'ssr-hydration', done: false },
            { title: 'Design Systems', slug: 'design-systems', done: false },
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.service.getCatalog().subscribe({
      next: (data) => {
        this.catalog.set(data);
        this.isCatalogLoading.set(false);
      },
      error: () => this.isCatalogLoading.set(false),
    });
  }

  phaseKey(pillarId: string, phaseIndex: number): string {
    return `${pillarId}-${phaseIndex}`;
  }

  togglePhase(key: string): void {
    this.expandedPhases.update((set) => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  isPhaseExpanded(key: string): boolean {
    return this.expandedPhases().has(key);
  }

  completedCount(pillar: Pillar): number {
    return pillar.phases.flatMap((p) => p.topics).filter((t) => t.done).length;
  }

  totalCount(pillar: Pillar): number {
    return pillar.phases.flatMap((p) => p.topics).length;
  }

  progressPercent(pillar: Pillar): number {
    const total = this.totalCount(pillar);
    return total === 0 ? 0 : Math.round((this.completedCount(pillar) / total) * 100);
  }
}
