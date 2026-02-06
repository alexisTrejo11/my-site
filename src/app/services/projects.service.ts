import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Project } from '../core/models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private projectsUrl = 'data/projects.json';
  private projectsCache: Project[] | null = null;

  getAllProjects(): Observable<Project[]> {
    if (this.projectsCache) {
      return of(this.projectsCache);
    }

    return this.http.get<Project[]>(this.projectsUrl).pipe(
      map((projects) => {
        this.projectsCache = projects;
        return projects;
      }),
    );
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.getAllProjects().pipe(map((projects) => projects.find((p) => p.id === id)));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) =>
        projects.filter(
          (p) =>
            p.framework === 'Angular' || p.framework === 'Django' || p.framework === 'Spring_Boot',
        ),
      ),
    );
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.category === category)),
    );
  }

  getProjectsByStatus(status: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.status === status)),
    );
  }

  getProjectsBycategory(category: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => projects.filter((p) => p.category === category)),
    );
  }

  searchProjects(term: string): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        if (!term.trim()) return projects;

        const searchTerm = term.toLowerCase();
        return projects.filter(
          (project) =>
            project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm)),
        );
      }),
    );
  }

  filterProjects(filters: {
    category?: string;
    status?: string;
    technologies?: string[];
    year?: number;
    featured?: boolean;
  }): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        return projects.filter((project) => {
          if (filters.category && project.category !== filters.category) {
            return false;
          }

          if (filters.status && project.status !== filters.status) {
            return false;
          }

          if (filters.technologies && filters.technologies.length > 0) {
            const hasAllTech = filters.technologies.every((tech) =>
              project.techStack.includes(tech),
            );
            if (!hasAllTech) return false;
          }

          /*
          if (filters.year && project.year !== filters.year) {
            return false;
          }

          if (filters.featured !== undefined && project.featured !== filters.featured) {
            return false;
          }
            */

          return true;
        });
      }),
    );
  }

  getAllTechnologies(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const allTech = projects.flatMap((p) => p.techStack);
        return [...new Set(allTech)].sort();
      }),
    );
  }

  getProjectStats(): Observable<{
    total: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    bycategory: Record<string, number>;
  }> {
    return this.getAllProjects().pipe(
      map((projects) => {
        const byCategory: Record<string, number> = {};
        const byStatus: Record<string, number> = {};
        const bycategory: Record<string, number> = {};

        projects.forEach((project) => {
          // Contar por categoría
          byCategory[project.category] = (byCategory[project.category] || 0) + 1;

          // Contar por estado
          byStatus[project.status] = (byStatus[project.status] || 0) + 1;

          // Contar por tipo
          bycategory[project.category] = (bycategory[project.category] || 0) + 1;
        });

        return {
          total: projects.length,
          byCategory,
          byStatus,
          bycategory,
        };
      }),
    );
  }
}
