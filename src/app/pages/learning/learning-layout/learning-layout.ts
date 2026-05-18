import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SidebarTopic {
  label: string;
  slug: string;
}

interface SidebarSection {
  id: string;
  label: string;
  icon: string;
  topics: SidebarTopic[];
}

@Component({
  selector: 'app-learning-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './learning-layout.html',
})
export class LearningLayout {
  isSidebarOpen = signal(true);
  openSections = signal<Set<string>>(new Set(['backend']));
  searchQuery = signal('');

  readonly sidebarSections: SidebarSection[] = [
    {
      id: 'backend',
      label: 'Backend Engineering',
      icon: '⚙️',
      topics: [
        { label: 'Microservices', slug: 'microservices' },
        { label: 'Event-Driven Systems', slug: 'event-driven-systems' },
        { label: 'Message Brokers', slug: 'message-brokers' },
        { label: 'REST & GraphQL APIs', slug: 'rest-graphql-apis' },
        { label: 'Database Design', slug: 'database-design' },
        { label: 'Authentication Patterns', slug: 'authentication-patterns' },
      ],
    },
    {
      id: 'devops',
      label: 'DevOps & Cloud',
      icon: '☁️',
      topics: [
        { label: 'Docker & Containers', slug: 'docker-containers' },
        { label: 'CI/CD Pipelines', slug: 'cicd-pipelines' },
        { label: 'Kubernetes', slug: 'kubernetes' },
        { label: 'Cloud Infrastructure', slug: 'cloud-infrastructure' },
        { label: 'Monitoring & Observability', slug: 'monitoring-observability' },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend Architecture',
      icon: '🖥️',
      topics: [
        { label: 'Angular Internals', slug: 'angular-internals' },
        { label: 'State Management', slug: 'state-management' },
        { label: 'Performance Optimization', slug: 'performance-optimization' },
        { label: 'Web Vitals', slug: 'web-vitals' },
        { label: 'Micro-Frontends', slug: 'micro-frontends' },
      ],
    },
  ];

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  toggleSection(id: string): void {
    this.openSections.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isSectionOpen(id: string): boolean {
    return this.openSections().has(id);
  }
}
