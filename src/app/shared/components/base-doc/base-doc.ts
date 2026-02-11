// base-doc.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../../services/projects.service';

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
        error: (err: any) => {
          this.isLoading = false;
          this.handleError(err);
        },
      });
  }

  protected onDataLoaded(data: T): void {}

  protected handleError(err: any): void {
    console.error('Error loading data:', err);
    this.setError(this.getErrorMessage(err));
  }

  protected getErrorMessage(err: any): string {
    if (err.status === 404) {
      return 'The requested resource was not found.';
    } else if (err.status === 403) {
      return 'You do not have permission to access this resource.';
    } else if (err.status === 0) {
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
