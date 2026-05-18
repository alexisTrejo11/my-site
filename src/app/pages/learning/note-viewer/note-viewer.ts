import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
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
  'architecture-patterns': 'Architecture Patterns',
  'communication-patterns': 'Communication Patterns',
  'observability-and-security': 'Observability & Security',
  introduction: 'Introduction',
};

@Component({
  selector: 'app-note-viewer',
  standalone: true,
  imports: [RouterModule, CommonModule, MarkdownComponent],
  templateUrl: './note-viewer.html',
  styleUrl: './note-viewer.scss',
})
export class NoteViewer implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(LearningDataService);

  note = signal<NoteMetadata | undefined>(undefined);
  markdownContent = signal('');
  isLoading = signal(true);
  hasError = signal(false);
  notFound = signal(false);

  // ── Derived display values ──────────────────────────────────────────────────

  readonly title = computed(() => this.note()?.title ?? 'Engineering Reference');
  readonly description = computed(() => this.note()?.description ?? '');
  readonly subcategory = computed(() => this.note()?.subcategory ?? '');
  readonly difficulty = computed(() => this.note()?.difficulty ?? 'beginner');
  readonly tags = computed(() => this.note()?.tags ?? []);

  /** Estimate reading time from word count at 200 wpm. */
  readonly readingMinutes = computed(() => {
    const words = this.markdownContent().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  readonly breadcrumb = computed<string[]>(() => {
    const n = this.note();
    if (!n) return ['Learning Hub', 'Reference'];
    return [
      'Learning Hub',
      'Backend Engineering',
      this.subcategoryLabel(n.subcategory),
      n.title,
    ];
  });

  readonly badgeClass = computed(
    () =>
      SUBCATEGORY_BADGE[this.subcategory()] ??
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      this.loadNote(slug);
    });
  }

  private loadNote(slug: string): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.notFound.set(false);
    this.note.set(undefined);
    this.markdownContent.set('');

    this.service.getNoteBySlug(slug).subscribe({
      next: (note) => {
        if (!note) {
          this.notFound.set(true);
          this.isLoading.set(false);
          return;
        }
        this.note.set(note);
        this.service.getNoteContent(note.filePath).subscribe({
          next: (content) => {
            this.markdownContent.set(content);
            this.isLoading.set(false);
          },
          error: () => {
            this.hasError.set(true);
            this.isLoading.set(false);
          },
        });
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  subcategoryLabel(sub: string): string {
    return (
      SUBCATEGORY_LABEL[sub] ??
      sub.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    );
  }
}
