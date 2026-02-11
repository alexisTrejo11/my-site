import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectHeader } from './components/project-header/project-header';
import { Project } from '../../../../core/models/project';
import { Observable, filter } from 'rxjs';
import { TechStackShowcase } from './components/tech-stack-showcase/tech-stack-showcase';
import { QuickLinks } from './components/quick-links/quick-links';
import { MediaGallery } from './components/media-gallery/media-gallery';
import { BaseDocComponent } from '../../../../shared/components/base-doc/base-doc';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, ProjectHeader, TechStackShowcase, QuickLinks, MediaGallery],
  templateUrl: './overview.html',
})
export class Overview extends BaseDocComponent<Project> implements OnInit {
  public fetchData(projectId: string): Observable<Project> {
    const project = this.projectService.getProjectById(projectId);
    return project.pipe(filter((p): p is Project => p !== undefined));
  }

  reload(): void {
    this.projectId = this.route.parent?.snapshot.params['projectId'];
    if (this.projectId) {
      this.loadData();
    }
  }
}
