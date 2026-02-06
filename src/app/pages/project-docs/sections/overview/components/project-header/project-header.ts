import { Component, input } from '@angular/core';
import { Project } from '../../../../../../core/models/project';
import { CommonModule } from '@angular/common';
import { Badge } from '../../../../../../shared/components/badge/badge';
import { ProjectOverview } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-project-header',
  imports: [CommonModule, Badge],
  templateUrl: './project-header.html',
})
export class ProjectHeader {
  project = input.required<Project>();

  getStatusDisplay(status: Project['status']): string {
    const statusMap: Record<Project['status'], string> = {
      deployed: 'Deployed',
      develop: 'In Development',
      archived: 'Archived',
    };
    return statusMap[status] || status;
  }

  getStatusColor(status: Project['status']): string {
    const colors: Record<Project['status'], string> = {
      deployed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      develop: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return colors[status] || colors.develop;
  }

  getTypeDisplay(type: Project['category']): string {
    const typeMap: Record<Project['category'], string> = {
      backend: 'Backend',
      frontend: 'Frontend',
      devops: 'DevOps & Infrastructure',
      fullstack: 'Full Stack',
    };
    return typeMap[type] || type;
  }

  getCategoryDisplay(category: Project['category']): string {
    const categoryMap: Record<Project['category'], string> = {
      backend: 'Backend',
      frontend: 'Frontend',
      fullstack: 'Full Stack',
      devops: 'DevOps & Infrastructure',
    };
    return categoryMap[category] || category;
  }

  getProjectStats() {
    return {
      technologiesCount: this.project().techStack.length,
      featuresCount: this.project().docs.features.features.length,
      metricsCount: this.project().docs.overview.metrics.length,
    };
  }

  getActionLinks() {
    return {
      github: this.project().repositoryUrl,
      demo: this.project().liveDemoUrl,
      documentation: this.project().docs.overview.links.documentation,
      dockerHub: this.project().docs.overview.links.dockerHub,
    };
  }

  getMainMetrics(): ProjectOverview['metrics'] {
    return this.project().docs.overview.metrics.slice(0, 3);
  }

  get CreatedAtYear(): number {
    return new Date(this.project().createdAt).getFullYear();
  }

  get isFeatured(): boolean {
    const project = this.project().framework.toLowerCase();
    return project === 'django' || project === 'angular' || project === 'spring_boot';
  }
}
