import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningDataService } from '../../../services/learning-data.service';
import { NoteMetadata } from '../../../core/models/note-metadata';

const SUBCATEGORY_BADGE: Record<string, string> = {
  'spring-boot': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  django: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  fastapi: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'architecture-patterns': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'communication-patterns': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'observability-and-security': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  introduction: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const SUBCATEGORY_LABEL: Record<string, string> = {
  'spring-boot': 'Spring Boot',
  django: 'Django',
  fastapi: 'FastAPI',
  'architecture-patterns': 'Architecture',
  'communication-patterns': 'Communication',
  'observability-and-security': 'Observability',
  introduction: 'Introduction',
};

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './glossary.html',
  styleUrl: './glossary.scss',
})
export class Glossary implements OnInit {
  private service = inject(LearningDataService);

  private catalog = signal<NoteMetadata[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  searchQuery = signal('');
  selectedSubcategory = signal('all');

  /** Dynamically derived list of unique subcategories present in the catalog. */
  readonly subcategories = computed<string[]>(() => {
    const unique = [...new Set(this.catalog().map((n) => n.subcategory))].sort();
    return ['all', ...unique];
  });

  /** Reactively filtered notes based on the active subcategory badge and search query. */
  readonly filteredGlossary = computed<NoteMetadata[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const sub = this.selectedSubcategory();

    return this.catalog().filter((note) => {
      const matchesSub = sub === 'all' || note.subcategory === sub;
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        note.tags.some((t) => t.toLowerCase().includes(query));
      return matchesSub && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.service.getCatalog().subscribe({
      next: (data) => {
        this.catalog.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  setSubcategory(sub: string): void {
    this.selectedSubcategory.set(sub);
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  badgeClass(subcategory: string): string {
    return (
      SUBCATEGORY_BADGE[subcategory] ??
      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
    );
  }

  subcategoryLabel(sub: string): string {
    if (sub === 'all') return 'All';
    return (
      SUBCATEGORY_LABEL[sub] ??
      sub.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }

  difficultyBadge(difficulty: string): string {
    const d = difficulty.toLowerCase();
    if (d.includes('advanced')) return 'text-red-500 dark:text-red-400';
    if (d.includes('intermediate')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  }
}
