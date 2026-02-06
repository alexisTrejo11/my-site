import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DeploymentLayer } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-deployment-diagram',
  imports: [CommonModule],
  templateUrl: './deployment-diagram.html',
})
export class DeploymentDiagram {
  projectLayers = input.required<DeploymentLayer[]>();
}
