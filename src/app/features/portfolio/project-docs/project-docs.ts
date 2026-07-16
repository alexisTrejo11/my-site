import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Project, ProjectNavItem } from '../../../core/models/project';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-project-docs',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-docs.html',
})
export class ProjectDocs implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  private destroy$ = new Subject<void>();

  projectId = '';
  project: Project | undefined;
  isSidebarOpen = false;

  navItems: ProjectNavItem[] = [
    { label: 'Overview', path: 'overview', iconPath: 'icons/general/overview.svg' },
    { label: 'Architecture', path: 'architecture', iconPath: 'icons/general/architecture.svg' },
    { label: 'Code Showcase', path: 'code', iconPath: 'icons/general/code.svg' },
    { label: 'API Explorer', path: 'api', iconPath: 'icons/general/api.svg' },
    { label: 'Features', path: 'features', iconPath: 'icons/general/features.svg' },
    {
      label: 'Infrastructure',
      path: 'infrastructure',
      iconPath: 'icons/tech/backend/tools.svg',
    },
  ];

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.projectId = params['projectId'];
      this.loadProject();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    // Evitar scroll en body cuando sidebar está abierto
    if (this.isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    document.body.style.overflow = '';
  }

  private loadProject(): void {
    if (!this.projectId) {
      this.project = undefined;
      return;
    }

    this.projectsService
      .getProjectById(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.project = project;
      });
  }
}
