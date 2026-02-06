import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FEATURE_CATEGORIES,
  FEATURE_STATUS_CONFIG,
  DUMMY_PROJECT_FEATURES,
  FeatureCategoryInfo,
} from './dummy_data';
import { FeatureCategory, ProjectFeature } from '../../../../core/models/project-docs.models';

@Component({
  selector: 'app-features-projects',
  imports: [CommonModule],
  templateUrl: './features-projects.html',
})
export class ProjectFeatures {
  // All features data
  readonly features = signal<ProjectFeature[]>(DUMMY_PROJECT_FEATURES);

  // Filter state
  readonly selectedCategory = signal<FeatureCategory | 'all'>('all');
  readonly searchQuery = signal<string>('');

  // Category configuration
  readonly categories = FEATURE_CATEGORIES;
  readonly statusConfig = FEATURE_STATUS_CONFIG;

  // Computed filtered features
  readonly filteredFeatures = computed(() => {
    let result = this.features();

    // Filter by category
    if (this.selectedCategory() !== 'all') {
      result = result.filter((f) => f.category === this.selectedCategory());
    }

    // Filter by search
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(query) ||
          f.description.toLowerCase().includes(query) ||
          f.highlights.some((h) => h.toLowerCase().includes(query)),
      );
    }

    return result;
  });

  // Stats computed
  readonly totalFeatures = computed(() => this.features().length);
  readonly stableFeatures = computed(
    () => this.features().filter((f) => f.status === 'stable').length,
  );
  readonly betaFeatures = computed(() => this.features().filter((f) => f.status === 'beta').length);

  // Methods
  selectCategory(category: FeatureCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  getCategoryInfo(categoryId: FeatureCategory): FeatureCategoryInfo | undefined {
    return this.categories.find((c) => c.id === categoryId);
  }

  getStatusConfig(status: string): { label: string; color: string; bgColor: string } {
    return this.statusConfig[status as keyof typeof this.statusConfig];
  }

  getTrendIcon(trend?: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '';
    }
  }

  getTrendColor(trend?: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      case 'stable':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return '';
    }
  }
}
