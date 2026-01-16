import { inject, Injectable } from '@angular/core';
import { ApiEndpoint } from '../pages/project-docs/sections/api-explorer/api-explorer.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CodeExample } from '../pages/project-docs/sections/code-showcase/code-showcase.model';

@Injectable({ providedIn: 'root' })
export class ProjectDocsService {
  private endpointsUrl = '/data/projects-endpoints.json';
  private codeExamplesUrl = '/data/projects-code-examples.json';
  private http = inject(HttpClient);

  getEndpointsForProject(projectId: string): Observable<ApiEndpoint[]> {
    return this.http.get<{ projectId: string; endpoints: ApiEndpoint[] }[]>(this.endpointsUrl).pipe(
      map((data) => {
        const project = (data || []).find((p) => p.projectId === projectId);
        return project?.endpoints ?? [];
      })
    );
  }

  getCodeExamplesForProject(projectId: string): Observable<CodeExample[]> {
    return this.http
      .get<{ projectId: string; codeExamples: CodeExample[] }[]>(this.codeExamplesUrl)
      .pipe(
        map((data) => {
          const project = (data || []).find((p) => p.projectId === projectId);
          return project?.codeExamples ?? [];
        })
      );
  }
}
