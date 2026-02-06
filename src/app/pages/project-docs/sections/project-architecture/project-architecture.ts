import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFlow } from './data-flow/data-flow';
import { ArchitectureDiagram } from './architecture-diagram/architecture-diagram';
import { TechDecisions } from './tech-decisions/tech-decisions';
import { CommonModule } from '@angular/common';
import { ProjectArchitectureModel } from '../../../../core/models/project-docs.models';

@Component({
  selector: 'app-project-architecture',
  imports: [DataFlow, ArchitectureDiagram, TechDecisions, CommonModule],
  templateUrl: './project-architecture.html',
})
export class ProjectArchitecture implements OnInit {
  projectId: string = '';

  model = input.required<ProjectArchitectureModel>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';
    console.log('Loaded architecture for project:', this.projectId);
  }

  // Método para expandir/contraer capas
  toggleLayer(index: number): void {
    const architecture = this.model();

    architecture.layers[index].expanded = !architecture.layers[index].expanded;
  }

  getBadgeColor(category: string): string {
    const colors: { [key: string]: string } = {
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
    const layers = this.model()?.layers || [];
    return {
      totalServices: layers[2]?.components.length || 0,
      totalComponents: layers.reduce((sum, layer) => sum + layer.components.length, 0),
      dataStores: layers[3]?.components.length || 0,
      infrastructureComponents: layers[4]?.components.length || 0,
    };
  }

  // Expandir/contraer todas las capas
  expandAllLayers(expand: boolean): void {
    const layers = this.model()?.layers;
    layers?.forEach((layer) => {
      layer.expanded = expand;
    });
  }

  // Método para manejar clics en componentes
  onComponentClick(component: string, layerName: string): void {
    console.log(`Clicked on ${component} in ${layerName}`);
    // Aquí puedes implementar lógica para mostrar detalles, navegar, etc.
  }

  // Método para obtener estadísticas
  getArchitectureStats(): any {
    const architecture = this.model();
    const layers = architecture?.layers || [];
    return {
      totalLayers: layers.length,
      totalComponents: layers.reduce((sum, layer) => sum + layer.components.length, 0),
      totalServices: layers[2]?.components.length || 0,
      totalPatterns: architecture?.designPatterns?.length || 0,
      scalingStrategies: architecture.scalabilityStrategies.length || 0,
      cachingLayers: architecture.cacheStrategies.length || 0,
    };
  }
}
