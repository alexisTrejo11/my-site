import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeploymentDiagram } from './deployment-diagram/deployment-diagram';
import { DockerConfig } from './docker-config/docker-config';
import { CicdPipeline } from './cicd-pipeline/cicd-pipeline';
import { InfrastructureModel } from '../../../../core/models/project-docs.models';
import { BaseDocComponent } from '../../../../shared/components/base-doc/base-doc';
import { ErrorLoading } from '../../../../shared/components/errors/error-loading/error-loading';

@Component({
  selector: 'app-infrastructure',
  imports: [DeploymentDiagram, DockerConfig, CicdPipeline, ErrorLoading],
  templateUrl: './infrastructure.html',
})
export class Infrastructure extends BaseDocComponent<InfrastructureModel> implements OnInit {
  override ngOnInit(): void {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    if (!this.projectId) {
      this.error = 'No project ID provided in the route.';
      this.isLoading = false;
      return;
    }

    this.fetchData();
  }

  fetchData(): Observable<InfrastructureModel> {
    this.isLoading = true;
    this.error = null;

    const project = this.projectService.getProjectInfrastructure(this.projectId);
    project.subscribe({
      next: (data) => {
        console.log('Infrastructure data received:', data);
        this.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching infrastructure data:', err);
        this.error = 'Failed to load infrastructure data. Please try again later.';
        this.isLoading = false;
      },
    });
    return project;
  }

  get totalMonthlyCost(): number {
    return this.cloudServices.reduce((sum, service) => {
      const cost = parseFloat(service.cost.replace('$', '').replace('/month', ''));
      return sum + cost;
    }, 0);
  }

  get metrics() {
    return this.data?.metrics || [];
  }

  get cloudServices() {
    return this.data?.cloudServices || [];
  }

  get deploymentLayers() {
    return this.data?.deploymentLayers || [];
  }

  get dockerFiles() {
    return this.data?.dockerFiles || [];
  }

  get hasData(): boolean {
    return (
      !!this.data &&
      (this.data.metrics?.length > 0 ||
        this.data.cloudServices?.length > 0 ||
        this.data.deploymentLayers?.length > 0)
    );
  }
}
