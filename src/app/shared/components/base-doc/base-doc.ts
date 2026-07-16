// base-doc.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../../core/services/projects.service';

interface LoadError {
  status?: number;
}

@Component({
  selector: 'app-base-doc',
  template: '',
})
export abstract class BaseDocComponent<T> implements OnInit, OnDestroy {
  protected readonly route = inject(ActivatedRoute);
  protected readonly projectService = inject(ProjectsService);
  protected destroy$ = new Subject<void>();

  projectId = '';
  isLoading = false;
  error: string | null = null;
  data: T | null = null;

  abstract fetchData(projectId: string): Observable<T>;

  ngOnInit(): void {
    this.route.parent?.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.projectId = params['projectId'] || '';

      if (!this.projectId) {
        this.setError('No project ID provided in the route.');
        return;
      }

      this.loadData();
    });
  }

  protected loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.fetchData(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: T) => {
          this.data = response;
          this.isLoading = false;
          this.onDataLoaded(response);
        },
        error: (err: unknown) => {
          this.isLoading = false;
          this.handleError(err);
        },
      });
  }

  protected onDataLoaded(data: T): void {
    void data;
  }

  protected handleError(err: unknown): void {
    console.error('Error loading data:', err);
    this.setError(this.getErrorMessage(err));
  }

  protected getErrorMessage(err: unknown): string {
    const error = err as LoadError;
    if (error.status === 404) {
      return 'The requested resource was not found.';
    } else if (error.status === 403) {
      return 'You do not have permission to access this resource.';
    } else if (error.status === 0) {
      return 'Network error. Please check your connection.';
    }
    return 'Failed to load data. Please try again later.';
  }

  protected setError(message: string): void {
    this.error = message;
    this.isLoading = false;
  }

  retry(): void {
    if (this.projectId) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
