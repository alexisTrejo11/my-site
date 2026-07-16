import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import {
  buildCatalogTree,
  filterCatalogTree,
  normalizeCategory,
  subcategoryKey,
} from '../../../core/utils/catalog-tree';
import { LearningDataService } from '../learning.service';
import { NoteMetadata } from '../learning.model';

@Component({
  selector: 'app-learning-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './learning-layout.html',
})
export class LearningLayout implements OnInit {
  private service = inject(LearningDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isSidebarOpen = signal(true);
  isCatalogLoading = signal(true);
  searchQuery = signal('');

  private catalog = signal<NoteMetadata[]>([]);
  private openCategories = signal<Set<string>>(new Set(['backend', 'fundamentals']));
  private openSubcategories = signal<Set<string>>(new Set());

  readonly sidebarTree = computed(() => buildCatalogTree(this.catalog()));

  readonly filteredTree = computed(() =>
    filterCatalogTree(this.sidebarTree(), this.searchQuery()),
  );

  readonly catalogCount = computed(() => this.catalog().length);

  ngOnInit(): void {
    this.service.getCatalog().subscribe({
      next: (data) => {
        this.catalog.set(data);
        this.isCatalogLoading.set(false);
        this.expandForCurrentRoute(data);
      },
      error: () => this.isCatalogLoading.set(false),
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.expandForCurrentRoute(this.catalog()));
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update((v) => !v);
  }

  toggleCategory(id: string): void {
    this.openCategories.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  toggleSubcategory(categoryId: string, subcategoryId: string): void {
    const key = subcategoryKey(categoryId, subcategoryId);
    this.openSubcategories.update((set) => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  isCategoryOpen(id: string): boolean {
    return this.openCategories().has(id);
  }

  isSubcategoryOpen(categoryId: string, subcategoryId: string): boolean {
    return this.openSubcategories().has(subcategoryKey(categoryId, subcategoryId));
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);

    if (!value.trim()) return;

    const matching = filterCatalogTree(this.sidebarTree(), value);
    this.openCategories.set(new Set(matching.map((c) => c.id)));
    this.openSubcategories.set(
      new Set(
        matching.flatMap((c) =>
          c.subcategories.map((sub) => subcategoryKey(c.id, sub.id)),
        ),
      ),
    );
  }

  private expandForCurrentRoute(catalog: NoteMetadata[]): void {
    const slug = this.route.firstChild?.snapshot.paramMap.get('slug');
    if (!slug) return;

    const note = catalog.find((n) => n.slug === slug);
    if (!note) return;

    const categoryId = normalizeCategory(note.category);

    this.openCategories.update((set) => new Set(set).add(categoryId));
    this.openSubcategories.update((set) =>
      new Set(set).add(subcategoryKey(categoryId, note.subcategory)),
    );
  }
}
