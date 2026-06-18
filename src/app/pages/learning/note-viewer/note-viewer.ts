import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { LearningDataService } from '../../../services/learning-data.service';
import { NoteMetadata } from '../../../core/models/note-metadata';
import {
  categoryLabel,
  subcategoryBadgeClass,
  subcategoryLabel,
} from '../../../core/constants/learning-catalog';
import { stripDuplicateNoteHeader } from '../../../core/utils/note-content';

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

  readonly title = computed(() => this.note()?.title ?? 'Engineering Reference');
  readonly description = computed(() => this.note()?.description ?? '');
  readonly subcategory = computed(() => this.note()?.subcategory ?? '');
  readonly difficulty = computed(() => this.note()?.difficulty ?? 'beginner');
  readonly tags = computed(() => this.note()?.tags ?? []);

  readonly readingMinutes = computed(() => {
    const words = this.markdownContent().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  readonly breadcrumb = computed<string[]>(() => {
    const n = this.note();
    if (!n) return ['Learning Hub', 'Reference'];
    return [
      'Learning Hub',
      categoryLabel(n.category),
      subcategoryLabel(n.subcategory),
      n.title,
    ];
  });

  readonly badgeClass = computed(() => subcategoryBadgeClass(this.subcategory()));

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
            this.markdownContent.set(
              stripDuplicateNoteHeader(content, note.title, note.description),
            );
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

  subcategoryLabel = subcategoryLabel;
}
