import { inject, Injectable, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Project } from '../../core/models/project';
import {
  APISchema,
  InfrastructureModel,
  ProjectArchitectureModel,
  ProjectCodeShowCase,
  ProjectDocsModel,
  ProjectFeatures,
  ProjectOverview,
} from '../../core/models/project-docs.models';
import { ProjectRepository } from './repository/projectRepository';

export interface ProjectFilters {
  category?: string;
  status?: string;
  technologies?: string[];
  year?: number;
  featured?: boolean;
}

export interface ProjectStats {
  total: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly serviceName = 'ProjectsService';
  private readonly repository = inject(ProjectRepository);
  private projectsCache: Project[] | null = null;

  // ── Project CRUD ───────────────────────────────────────────────────

  getAllProjects(): Observable<Project[]> {
    if (this.projectsCache) {
      this.log('Returning cached projects', { count: this.projectsCache.length });
      return of(this.projectsCache);
    }

    this.log('Fetching projects from server');
    return this.repository.getProjects().pipe(
      retry({ count: 2, delay: 1000 }),
      tap((projects) => {
        this.projectsCache = projects;
        this.log('Projects fetched and cached', { count: projects.length });
      }),
      catchError((error: HttpErrorResponse) => this.handleError('getAllProjects', error)),
    );
  }

  getProjectById(id: string): Observable<Project | undefined> {
    if (!id?.trim()) {
      this.logWarning('getProjectById called with empty id');
      return of(undefined);
    }

    return this.getAllProjects().pipe(
      map((projects) => {
        const project = projects.find((p) => p.projectId === id);
        if (!project) {
          this.logWarning('Project not found', { id });
        }
        return project;
      }),
      catchError((error) => this.handleError('getProjectById', error)),
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.featured)),
      tap((featured) => this.log('Featured projects retrieved', { count: featured.length })),
      catchError((error) => this.handleError('getFeaturedProjects', error)),
    );
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    if (!category?.trim()) {
      this.logWarning('getProjectsByCategory called with empty category');
      return of([]);
    }

    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.category === category)),
      tap((results) =>
        this.log('Projects filtered by category', { category, count: results.length }),
      ),
      catchError((error) => this.handleError('getProjectsByCategory', error)),
    );
  }

  getProjectsByStatus(status: string): Observable<Project[]> {
    if (!status?.trim()) {
      this.logWarning('getProjectsByStatus called with empty status');
      return of([]);
    }

    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.status === status)),
      tap((results) => this.log('Projects filtered by status', { status, count: results.length })),
      catchError((error) => this.handleError('getProjectsByStatus', error)),
    );
  }

  searchProjects(term: string): Observable<Project[]> {
    if (!term?.trim()) {
      return this.getAllProjects();
    }

    const searchTerm = term.toLowerCase().trim();
    this.log('Searching projects', { term: searchTerm });

    return this.getAllProjects().pipe(
      map((projects) =>
        projects.filter(
          (project) =>
            project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm)),
        ),
      ),
      tap((results) =>
        this.log('Search completed', { term: searchTerm, resultsCount: results.length }),
      ),
      catchError((error) => this.handleError('searchProjects', error)),
    );
  }

  filterProjects(filters: ProjectFilters): Observable<Project[]> {
    if (!filters || Object.keys(filters).length === 0) {
      this.logWarning('filterProjects called with empty filters');
      return this.getAllProjects();
    }

    this.log('Filtering projects', { filters });

    return this.getAllProjects().pipe(
      map((projects) =>
        projects.filter((project) => {
          if (filters.category && project.category !== filters.category) return false;
          if (filters.status && project.status !== filters.status) return false;

          if (filters.technologies && filters.technologies.length > 0) {
            const hasAllTech = filters.technologies.every((tech) =>
              project.techStack.includes(tech),
            );
            if (!hasAllTech) return false;
          }

          if (filters.year) {
            const updatedYear = new Date(project.updatedAt).getFullYear();
            if (updatedYear !== filters.year) return false;
          }

          if (filters.featured !== undefined && project.featured !== filters.featured) return false;

          return true;
        }),
      ),
      tap((results) => this.log('Projects filtered', { filters, count: results.length })),
      catchError((error) => this.handleError('filterProjects', error)),
    );
  }

  // ── Project Docs Accessors ─────────────────────────────────────────

  getProjectDocs(projectId: string): Observable<ProjectDocsModel | undefined> {
    return this.getProjectById(projectId).pipe(
      map((project) => {
        if (!project) {
          this.logWarning('Cannot retrieve docs: project not found', { projectId });
          return undefined;
        }
        return project.docs;
      }),
      tap((docs) => {
        if (docs) this.log('Project docs retrieved', { projectId });
      }),
      catchError((error) => this.handleError('getProjectDocs', error)),
    );
  }

  getProjectArchitecture(projectId: string): Observable<ProjectArchitectureModel | undefined> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) => docs?.architecture),
      tap((architecture) => {
        if (architecture) {
          this.log('Architecture retrieved', {
            projectId,
            layers: architecture.layers?.length ?? 0,
            patterns: architecture.designPatterns?.length ?? 0,
          });
        } else {
          this.logWarning('Architecture data not available', { projectId });
        }
      }),
      catchError((error) => this.handleError('getProjectArchitecture', error)),
    );
  }

  getProjectOverview(projectId: string): Observable<ProjectOverview | undefined> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) => docs?.overview),
      tap((overview) => {
        if (overview) this.log('Overview retrieved', { projectId });
        else this.logWarning('Overview data not available', { projectId });
      }),
      catchError((error) => this.handleError('getProjectOverview', error)),
    );
  }

  getProjectInfrastructure(projectId: string): Observable<InfrastructureModel> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) => {
        const infra = docs?.infrastructure;
        if (!infra) {
          throw new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found',
            error: `Infrastructure data not found for project ${projectId}`,
          });
        }
        return infra;
      }),
      tap((infra) => {
        this.log('Infrastructure retrieved', {
          projectId,
          layers: infra.deploymentLayers?.length ?? 0,
          services: infra.cloudServices?.length ?? 0,
          metrics: infra.metrics?.length ?? 0,
        });
      }),
      catchError((error) => this.handleError('getProjectInfrastructure', error)),
    );
  }

  getProjectFeatures(projectId: string): Observable<ProjectFeatures | undefined> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) => docs?.features),
      tap((features) => {
        if (features) {
          this.log('Features retrieved', {
            projectId,
            count: features.features?.length ?? 0,
          });
        } else {
          this.logWarning('Features data not available', { projectId });
        }
      }),
      catchError((error) => this.handleError('getProjectFeatures', error)),
    );
  }

  // Check if works
  getProjectApiDocumentation(projectId: string): Observable<APISchema> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) =>
        docs?.apiSchema
          ? docs.apiSchema
          : (() => {
              throw new HttpErrorResponse({
                status: 404,
                statusText: 'Not Found',
                error: `API documentation not found for project ${projectId}`,
              });
            })(),
      ),
      tap((api) => {
        this.log('API documentation retrieved', {
          projectId,
          endpoints: api.httpEndpoints?.length ?? 0,
          type: api.type,
        });
      }),
      catchError((error) => this.handleError('getProjectApiDocumentation', error)),
    );
  }

  getProjectCodeShowcase(projectId: string): Observable<ProjectCodeShowCase | undefined> {
    return this.getProjectDocs(projectId).pipe(
      map((docs) => docs?.codeShowcase),
      tap((showcase) => {
        if (showcase) {
          this.log('Code showcase retrieved', {
            projectId,
            examples: showcase.codeExamples?.length ?? 0,
          });
        } else {
          this.logWarning('Code showcase data not available', { projectId });
        }
      }),
      catchError((error) => this.handleError('getProjectCodeShowcase', error)),
    );
  }

  // ── Aggregation ────────────────────────────────────────────────────

  getAllTechnologies(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const allTech = projects.flatMap((p) => p.techStack);
        return [...new Set(allTech)].sort();
      }),
      tap((techs) => this.log('Technologies retrieved', { count: techs.length })),
      catchError((error) => this.handleError('getAllTechnologies', error)),
    );
  }

  getProjectStats(): Observable<ProjectStats> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const byCategory: Record<string, number> = {};
        const byStatus: Record<string, number> = {};

        projects.forEach((project) => {
          byCategory[project.category] = (byCategory[project.category] || 0) + 1;
          byStatus[project.status] = (byStatus[project.status] || 0) + 1;
        });

        return { total: projects.length, byCategory, byStatus };
      }),
      tap((stats) => this.log('Project stats computed', { total: stats.total })),
      catchError((error) => this.handleError('getProjectStats', error)),
    );
  }

  clearCache(): void {
    this.projectsCache = null;
    this.log('Projects cache cleared');
  }

  // ── Private helpers ────────────────────────────────────────────────

  private handleError(operation: string, error: HttpErrorResponse | Error): Observable<never> {
    let userMessage: string;

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 0:
          userMessage = 'Unable to connect to the server. Please check your internet connection.';
          break;
        case 404:
          userMessage = 'The requested project data was not found.';
          break;
        case 500:
          userMessage = 'A server error occurred. Please try again later.';
          break;
        default:
          userMessage = `An unexpected error occurred (status: ${error.status}).`;
      }

      this.logError(operation, {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });
    } else {
      userMessage = 'An unexpected error occurred while processing your request.';
      this.logError(operation, { message: error.message, stack: error.stack });
    }

    return throwError(() => new Error(userMessage));
  }

  private log(message: string, data?: Record<string, unknown>): void {
    if (!isDevMode()) return;

    if (data) {
      console.log(`[${this.serviceName}] ${message}`, data);
    } else {
      console.log(`[${this.serviceName}] ${message}`);
    }
  }

  private logWarning(message: string, data?: Record<string, unknown>): void {
    if (!isDevMode()) return;

    if (data) {
      console.warn(`[${this.serviceName}] ${message}`, data);
    } else {
      console.warn(`[${this.serviceName}] ${message}`);
    }
  }

  private logError(operation: string, details: Record<string, unknown>): void {
    console.error(`[${this.serviceName}] Error in ${operation}:`, details);
  }
}
