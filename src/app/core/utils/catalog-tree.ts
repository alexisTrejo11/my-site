import { NoteMetadata } from '../../features/knowledge-base/learning.model';
import { CATEGORY_CONFIG, categoryLabel, subcategoryLabel } from '../constants/learning-catalog';

export interface CatalogNoteLink {
  title: string;
  slug: string;
}

export interface CatalogSubcategory {
  id: string;
  title: string;
  notes: CatalogNoteLink[];
}

export interface CatalogCategory {
  id: string;
  title: string;
  icon: string;
  noteCount: number;
  subcategories: CatalogSubcategory[];
}

export const CATEGORY_ORDER = [
  'fundamentals',
  'languages',
  'backend',
  'devops',
  'databases',
  'data-science',
];

/** Map inferred catalog categories back to vault top-level folders. */
export function normalizeCategory(category: string): string {
  if (category === 'infrastructure' || category === 'devops-cloud') {
    return 'devops';
  }
  return category;
}

export function buildCatalogTree(notes: NoteMetadata[]): CatalogCategory[] {
  const byCategory = new Map<string, Map<string, NoteMetadata[]>>();

  for (const note of notes) {
    const categoryId = normalizeCategory(note.category);
    if (!byCategory.has(categoryId)) {
      byCategory.set(categoryId, new Map());
    }
    const subMap = byCategory.get(categoryId)!;
    if (!subMap.has(note.subcategory)) {
      subMap.set(note.subcategory, []);
    }
    subMap.get(note.subcategory)!.push(note);
  }

  const categories: CatalogCategory[] = [];

  for (const [categoryId, subMap] of byCategory) {
    const config = CATEGORY_CONFIG[categoryId];
    const subcategories = [...subMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([subId, subNotes]) => ({
        id: subId,
        title: subcategoryLabel(subId),
        notes: subNotes
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((n) => ({ title: n.title, slug: n.slug })),
      }));

    categories.push({
      id: categoryId,
      title: config?.title ?? categoryLabel(categoryId),
      icon: config?.icon ?? '📚',
      noteCount: subcategories.reduce((sum, sub) => sum + sub.notes.length, 0),
      subcategories,
    });
  }

  return categories.sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.id);
    const bi = CATEGORY_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function filterCatalogTree(categories: CatalogCategory[], query: string): CatalogCategory[] {
  const q = query.toLowerCase().trim();
  if (!q) return categories;

  return categories
    .map((category) => {
      const subcategories = category.subcategories
        .map((sub) => ({
          ...sub,
          notes: sub.notes.filter((note) => note.title.toLowerCase().includes(q)),
        }))
        .filter(
          (sub) =>
            sub.notes.length > 0 ||
            sub.title.toLowerCase().includes(q) ||
            sub.id.toLowerCase().includes(q),
        );

      const categoryMatches =
        category.title.toLowerCase().includes(q) || category.id.toLowerCase().includes(q);

      if (!categoryMatches && subcategories.length === 0) {
        return null;
      }

      return { ...category, subcategories };
    })
    .filter((category): category is CatalogCategory => category !== null);
}

export function subcategoryKey(categoryId: string, subcategoryId: string): string {
  return `${categoryId}:${subcategoryId}`;
}
