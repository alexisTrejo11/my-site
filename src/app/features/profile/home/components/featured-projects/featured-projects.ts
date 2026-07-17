import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ProjectsGrid } from '../../../../../shared/components/projects-grid/projects-grid';
import { ProjectsService } from '../../../../portfolio/projects.service';
import { Project } from '../../../../../core/models/project';

@Component({
  selector: 'app-featured-projects',
  imports: [RouterModule, ProjectsGrid],
  templateUrl: './featured-projects.html',
})
export class FeaturedProjects {
  private readonly projectsService = inject(ProjectsService);

  featuredProjects: Project[] = [];

  constructor() {
    this.projectsService
      .getFeaturedProjects()
      .pipe(
        map((projects) => projects.slice(0, 3)),
        catchError((err) => {
          console.error('Error fetching featured projects:', err);
          return of([]);
        }),
      )
      .subscribe((projects) => {
        this.featuredProjects = projects;
      });
  }
}
