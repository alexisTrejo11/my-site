import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Category = 'All' | 'Backend' | 'DevOps' | 'Frontend';

interface GlossaryItem {
  term: string;
  category: Exclude<Category, 'All'>;
  plain: string;
  slug: string;
}

const GLOSSARY_DATA: GlossaryItem[] = [
  // Backend
  {
    term: 'Microservices',
    category: 'Backend',
    plain:
      'An architectural style where an application is split into small, independently deployable services — each owning a single business capability.',
    slug: 'microservices',
  },
  {
    term: 'ORM',
    category: 'Backend',
    plain:
      'Object-Relational Mapper — a library that lets you interact with a relational database using objects and methods instead of writing raw SQL.',
    slug: 'sql-databases',
  },
  {
    term: 'Message Broker',
    category: 'Backend',
    plain:
      'Middleware (e.g. RabbitMQ, Kafka) that receives messages from producers and routes them to consumers, decoupling services from each other.',
    slug: 'message-brokers',
  },
  {
    term: 'Event Sourcing',
    category: 'Backend',
    plain:
      'Storing state as a sequence of immutable events rather than current values — allowing full audit trails and temporal queries.',
    slug: 'cqrs-event-sourcing',
  },
  {
    term: 'CQRS',
    category: 'Backend',
    plain:
      'Command Query Responsibility Segregation — separating the models for reading data (queries) and writing data (commands) for better scalability.',
    slug: 'cqrs-event-sourcing',
  },
  {
    term: 'CAP Theorem',
    category: 'Backend',
    plain:
      'A distributed systems rule: you can only guarantee two of three properties — Consistency, Availability, Partition Tolerance — at any given time.',
    slug: 'database-sharding',
  },
  {
    term: 'API Gateway',
    category: 'Backend',
    plain:
      'A single entry-point that routes client requests to downstream microservices, handling cross-cutting concerns like auth, rate limiting, and logging.',
    slug: 'rest-graphql-apis',
  },
  {
    term: 'JWT',
    category: 'Backend',
    plain:
      'JSON Web Token — a compact, self-contained way to transmit identity claims between parties as a cryptographically signed JSON payload.',
    slug: 'authentication-patterns',
  },
  // DevOps
  {
    term: 'Container',
    category: 'DevOps',
    plain:
      'A lightweight, portable package containing an app and all its dependencies — isolated from the host OS using Linux namespaces and cgroups.',
    slug: 'docker-containers',
  },
  {
    term: 'CI/CD Pipeline',
    category: 'DevOps',
    plain:
      'An automated workflow that builds, tests, and deploys code on every commit — Continuous Integration catches bugs early, Continuous Delivery ships them fast.',
    slug: 'cicd-pipelines',
  },
  {
    term: 'IaC',
    category: 'DevOps',
    plain:
      'Infrastructure as Code — managing servers and cloud resources through machine-readable config files (Terraform, Pulumi) instead of manual clicks.',
    slug: 'infrastructure-as-code',
  },
  {
    term: 'Kubernetes',
    category: 'DevOps',
    plain:
      'An open-source container orchestration platform that automates deployment, scaling, and self-healing of containerized applications across a cluster.',
    slug: 'kubernetes',
  },
  {
    term: 'Observability',
    category: 'DevOps',
    plain:
      'The ability to understand a system\'s internal state from its external outputs — combining logs, metrics, and distributed traces (the three pillars).',
    slug: 'monitoring-observability',
  },
  {
    term: 'Service Mesh',
    category: 'DevOps',
    plain:
      'A dedicated infrastructure layer (e.g. Istio) that handles service-to-service communication — providing mTLS, retries, circuit-breaking, and traffic shaping.',
    slug: 'service-mesh',
  },
  // Frontend
  {
    term: 'Change Detection',
    category: 'Frontend',
    plain:
      'Angular\'s mechanism for synchronizing the component view with application state — triggered by events, timers, or HTTP responses.',
    slug: 'angular-internals',
  },
  {
    term: 'State Management',
    category: 'Frontend',
    plain:
      'A predictable pattern for managing application-wide data — typically via a centralized store (NgRx, Akita, Signals) so any component can read or update it.',
    slug: 'state-management',
  },
  {
    term: 'Core Web Vitals',
    category: 'Frontend',
    plain:
      'Google\'s set of real-world performance metrics: LCP (loading), FID/INP (interactivity), and CLS (visual stability) — directly tied to SEO ranking.',
    slug: 'web-vitals',
  },
  {
    term: 'Micro-Frontend',
    category: 'Frontend',
    plain:
      'Decomposing a frontend monolith into smaller, independently deployable apps — each owned by a separate team — composed at runtime in the browser.',
    slug: 'micro-frontends',
  },
  {
    term: 'Hydration',
    category: 'Frontend',
    plain:
      'The process of attaching Angular event listeners and state to server-rendered HTML already in the DOM — avoiding a blank flash on initial load.',
    slug: 'ssr-hydration',
  },
  {
    term: 'Tree Shaking',
    category: 'Frontend',
    plain:
      'A dead-code elimination technique used by bundlers (Webpack, esbuild) to remove unused exports from the final JavaScript bundle.',
    slug: 'performance-optimization',
  },
];

const CATEGORIES: Category[] = ['All', 'Backend', 'DevOps', 'Frontend'];

const BADGE_CLASSES: Record<Exclude<Category, 'All'>, string> = {
  Backend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  DevOps: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Frontend: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './glossary.html',
  styleUrl: './glossary.scss',
})
export class Glossary {
  readonly categories = CATEGORIES;
  readonly badgeClasses = BADGE_CLASSES;

  searchQuery = signal('');
  activeCategory = signal<Category>('All');

  readonly filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.activeCategory();

    return GLOSSARY_DATA.filter((item) => {
      const matchesCategory = cat === 'All' || item.category === cat;
      const matchesSearch =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.plain.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  });

  setCategory(cat: Category): void {
    this.activeCategory.set(cat);
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  badgeClass(cat: Exclude<Category, 'All'>): string {
    return BADGE_CLASSES[cat];
  }
}
