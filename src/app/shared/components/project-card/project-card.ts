import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, RouterLink],
  template: `
    <article
      class="group bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      [class.featured]="featured()"
    >
      <!-- Project Image/Header -->
      <div class="relative h-48" [ngClass]="getHeaderClasses()">
        <div
          class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"
        ></div>

        <!-- Icon/Label -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-6xl text-white/20 font-mono">
            {{ icon() || '{}' }}
          </div>
        </div>

        <!-- Featured Badge -->
        @if (featured()) {
          <div
            class="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full"
          >
            FEATURED
          </div>
        }

        <!-- Status Badge -->
        @if (project().status) {
          <div
            class="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full"
            [ngClass]="getStatusClasses()"
          >
            {{ project().status }}
          </div>
        }
      </div>

      <!-- Project Content -->
      <div class="p-6">
        <!-- Title -->
        <h3
          class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          {{ project().name }}
        </h3>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {{ project().description }}
        </p>

        <!-- Metrics -->
        @if (showMetrics() && project().docs.overview.metrics.length > 0) {
          <div
            class="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-gray-200 dark:border-gray-800"
          >
            @for (metric of project().docs.overview.metrics; track metric.label) {
              <div class="text-center">
                <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {{ metric.value }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500">
                  {{ metric.label }}
                </div>
              </div>
            }
          </div>
        }

        <!-- View Details Button -->
        <a
          [routerLink]="['/projects', project().projectId]"
          class="block w-full py-3 text-center border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
        >
          {{ buttonText() || 'View Documentation →' }}
        </a>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host(.featured) {
        border-color: rgba(245, 158, 11, 0.3);
      }
    `,
  ],
})
export class ProjectCard {
  project = input.required<Project>();
  featured = input<boolean>(false);
  showMetrics = input<boolean>(true);
  maxTags = input<number>(3);
  buttonText = input<string | null>(null);
  icon = input<string | null>(null);
  variant = input<'default' | 'compact' | 'detailed'>('default');

  getHeaderClasses(): string {
    if (this.project().category === 'backend') {
      return 'bg-gradient-to-br from-blue-500 to-purple-600';
    } else if (this.project().category === 'frontend') {
      return 'bg-gradient-to-br from-green-400 to-blue-500';
    } else if (this.project().category === 'fullstack') {
      return 'bg-gradient-to-br from-yellow-400 to-red-500';
    } else if (this.project().category === 'devops') {
      return 'bg-gradient-to-br from-gray-700 to-black';
    } else {
      return 'bg-gray-200';
    }
  }

  getStatusClasses(): string {
    switch (this.project().status) {
      case 'deployed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'develop':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
