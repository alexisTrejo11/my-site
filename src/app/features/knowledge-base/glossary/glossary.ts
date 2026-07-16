import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteMetadata } from '../learning.model';
import {
  categoryLabel,
  subcategoryBadgeClass,
  subcategoryLabel,
} from '../../../core/constants/learning-catalog';
import { LearningDataService } from '../learning.service';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './glossary.html',
  styleUrl: './glossary.scss',
})
export class Glossary implements OnInit {
  private service = inject(LearningDataService);
  private route = inject(ActivatedRoute);

  private catalog = signal<NoteMetadata[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  searchQuery = signal('');
  selectedCategory = signal('all');
  selectedSubcategory = signal('all');

  readonly categories = computed<string[]>(() => {
    const unique = [...new Set(this.catalog().map((n) => n.category))].sort();
    return ['all', ...unique];
  });

  readonly subcategories = computed<string[]>(() => {
    const cat = this.selectedCategory();
    const notes =
      cat === 'all' ? this.catalog() : this.catalog().filter((n) => n.category === cat);
    const unique = [...new Set(notes.map((n) => n.subcategory))].sort();
    return ['all', ...unique];
  });

  readonly filteredGlossary = computed<NoteMetadata[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const sub = this.selectedSubcategory();

    return this.catalog().filter((note) => {
      const matchesCat = cat === 'all' || note.category === cat;
      const matchesSub = sub === 'all' || note.subcategory === sub;
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        note.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCat && matchesSub && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const sub = params.get('sub');
      if (sub) {
        this.selectedSubcategory.set(sub);
      }
    });

    this.service.getCatalog().subscribe({
      next: (data) => {
        this.catalog.set(data);
        this.isLoading.set(false);

        const sub = this.route.snapshot.queryParamMap.get('sub');
        if (sub) {
          const match = data.find((n) => n.subcategory === sub);
          if (match) {
            this.selectedCategory.set(match.category);
          }
        }
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.selectedSubcategory.set('all');
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

  badgeClass = subcategoryBadgeClass;
  subcategoryLabel = subcategoryLabel;
  categoryLabel = categoryLabel;

  difficultyBadge(difficulty: string): string {
    const d = difficulty.toLowerCase();
    if (d.includes('advanced')) return 'text-red-500 dark:text-red-400';
    if (d.includes('intermediate')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  }
}
