import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-projects-grid',
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects-grid.html',
})
export class ProjectsGrid {
  projects = input<Project[]>([]);
  featured = input<boolean>(false);
  showMetrics = input<boolean>(true);
  maxTags = input<number>(3);
  buttonText = input<string | null>(null);
  icon = input.required<string>();
  variant = input<'default' | 'compact' | 'detailed'>('default');
  gridClasses = input<string>('');
  loading = input<boolean>(false);
  emptyMessage = input<string>();

  projectClick = new EventEmitter<Project>();

  onProjectClick(project: Project) {
    this.projectClick.emit(project);
  }
}
