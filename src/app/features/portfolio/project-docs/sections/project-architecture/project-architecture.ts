import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFlow } from './data-flow/data-flow';
import { ArchitectureDiagram } from './architecture-diagram/architecture-diagram';
import { TechDecisions } from './tech-decisions/tech-decisions';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../../../core/services/projects.service';
import { ErrorLoading } from '../../../../../shared/components/errors/error-loading/error-loading';
import { ProjectArchitectureModel } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-project-architecture',
  imports: [DataFlow, ArchitectureDiagram, TechDecisions, CommonModule, ErrorLoading],
  templateUrl: './project-architecture.html',
})
export class ProjectArchitecture implements OnInit {
  projectId = '';
  isLoading = true;
  errorMessage: string | null = null;

  model: ProjectArchitectureModel | undefined;

  private readonly projectService = inject(ProjectsService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    if (!this.projectId) {
      this.errorMessage = 'No project ID provided in the route.';
      this.isLoading = false;
      return;
    }

    this.fetchArchitecture();
  }

  retryFetch(): void {
    this.errorMessage = null;
    this.fetchArchitecture();
  }

  toggleLayer(index: number): void {
    if (!this.model?.layers[index]) return;
    this.model.layers[index].expanded = !this.model.layers[index].expanded;
  }

  expandAllLayers(expand: boolean): void {
    this.model?.layers?.forEach((layer) => {
      layer.expanded = expand;
    });
  }

  getBadgeColor(category: string): string {
    const colors: Record<string, string> = {
      Integration: 'badge-primary',
      Persistence: 'badge-success',
      'Event-Driven': 'badge-warning',
      Resilience: 'badge-error',
      Query: 'badge-primary',
      Transaction: 'badge-success',
      Deployment: 'badge-warning',
      'API Design': 'badge-error',
    };
    return colors[category] || 'badge-gray';
  }

  calculateMetrics() {
    const layers = this.model?.layers || [];
    return {
      totalServices: layers[2]?.components.length || 0,
      totalComponents: layers.reduce((sum, layer) => sum + layer.components.length, 0),
      dataStores: layers[3]?.components.length || 0,
      infrastructureComponents: layers[4]?.components.length || 0,
    };
  }

  getArchitectureStats() {
    const layers = this.model?.layers || [];
    return {
      totalLayers: layers.length,
      totalComponents: layers.reduce((sum, layer) => sum + layer.components.length, 0),
      totalServices: layers[2]?.components.length || 0,
      totalPatterns: this.model?.designPatterns?.length || 0,
      scalingStrategies: this.model?.scalabilityStrategies?.length || 0,
      cachingLayers: this.model?.cacheStrategies?.length || 0,
    };
  }

  onComponentClick(component: string, layerName: string): void {
    void component;
    void layerName;
  }

  private fetchArchitecture(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.projectService.getProjectArchitecture(this.projectId).subscribe({
      next: (architecture) => {
        this.model = architecture;
        this.isLoading = false;

        if (!architecture) {
          this.errorMessage = `Architecture data is not available for project "${this.projectId}".`;
        }
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.errorMessage =
          err.message || 'An unexpected error occurred while loading architecture data.';
        console.error('[ProjectArchitecture] Failed to load architecture:', err);
      },
    });
  }
}
