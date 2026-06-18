import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LearningDataService } from '../../services/learning-data.service';
import { NoteMetadata } from '../../core/models/note-metadata';
import { CATEGORY_CONFIG } from '../../core/constants/learning-catalog';
import { buildCatalogTree } from '../../core/utils/catalog-tree';

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
  expandedCategories = signal<Set<string>>(new Set(['backend', 'fundamentals']));

  readonly catalogCount = computed(() => this.catalog().length);

  readonly categoryGroups = computed(() =>
    buildCatalogTree(this.catalog()).map((category) => ({
      ...category,
      ...CATEGORY_CONFIG[category.id],
      accentFrom: CATEGORY_CONFIG[category.id]?.accentFrom ?? 'from-gray-500',
      accentTo: CATEGORY_CONFIG[category.id]?.accentTo ?? 'to-gray-400',
      badgeClass: CATEGORY_CONFIG[category.id]?.badgeClass ?? 'bg-gray-100 text-gray-700',
      description: CATEGORY_CONFIG[category.id]?.description ?? '',
    })),
  );

  ngOnInit(): void {
    this.service.getCatalog().subscribe({
      next: (data) => {
        this.catalog.set(data);
        this.isCatalogLoading.set(false);
      },
      error: () => this.isCatalogLoading.set(false),
    });
  }

  toggleCategory(key: string): void {
    this.expandedCategories.update((set) => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  isCategoryExpanded(key: string): boolean {
    return this.expandedCategories().has(key);
  }
}
