import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechStackService } from './tech-stack.service';
import { Technology, TechCategoryInfo } from './tech-stack.model';

type TechStatistics = ReturnType<TechStackService['getStatistics']>;
type TechFilter = 'highlight' | 'all' | TechCategoryInfo['id'];

@Component({
  selector: 'app-tech-stack',
  imports: [CommonModule],
  templateUrl: './tech-stack.html',
})
export class TechStack implements OnInit {
  private techStackService = inject(TechStackService);

  technologies: Technology[] = [];
  highlightedTechnologies: Technology[] = [];
  categories: TechCategoryInfo[] = [];
  selectedFilter: TechFilter = 'highlight';
  isLoading = true;
  statistics: TechStatistics | null = null;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.technologies = this.techStackService.getAllTechnologies();
      this.highlightedTechnologies = this.techStackService.getHighlightedTechnologies();
      this.categories = this.techStackService.getCategories();
      this.statistics = this.techStackService.getStatistics();
      this.isLoading = false;
    }, 300);
  }

  get filteredTechnologies(): Technology[] {
    if (this.selectedFilter === 'highlight') {
      return this.highlightedTechnologies;
    }
    if (this.selectedFilter === 'all') {
      return this.technologies;
    }
    return this.technologies.filter((tech) => tech.category === this.selectedFilter);
  }

  get isDefaultFilter(): boolean {
    return this.selectedFilter === 'highlight';
  }

  selectFilter(filter: TechFilter): void {
    this.selectedFilter = filter;
  }

  resetFilter(): void {
    this.selectedFilter = 'highlight';
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'advanced':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'beginner':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getLevelText(level: string): string {
    switch (level) {
      case 'expert':
        return 'Expert';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'beginner':
        return 'Beginner';
      default:
        return level;
    }
  }
}
