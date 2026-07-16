import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { NoteMetadata } from './learning.model';

@Injectable({ providedIn: 'root' })
export class LearningDataService {
  private http = inject(HttpClient);

  /** Shared, cached catalog request — only one HTTP call per app lifetime. */
  private catalog$ = this.http
    .get<NoteMetadata[]>('data/notes-catalog.json')
    .pipe(shareReplay(1));

  /** Returns the full array of published note metadata from the compiled catalog. */
  getCatalog(): Observable<NoteMetadata[]> {
    return this.catalog$;
  }

  /** Looks up a single note's metadata by its slug. Emits `undefined` if not found. */
  getNoteBySlug(slug: string): Observable<NoteMetadata | undefined> {
    return this.catalog$.pipe(map((notes) => notes.find((n) => n.slug === slug)));
  }

  /** Returns the raw markdown content body for a given note's filePath. */
  getNoteContent(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }
}
