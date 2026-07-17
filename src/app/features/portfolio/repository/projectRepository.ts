import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../../core/models/project';
import { ALL_PROJECTS } from './data/projects.index';

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository {
  private readonly projects: Project[] = ALL_PROJECTS;

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
