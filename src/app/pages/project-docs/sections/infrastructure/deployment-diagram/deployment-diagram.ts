import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { ProjectDocsService } from '../../../../../services/project-docs.service';
import { DeploymentLayer } from '../../../../../core/models/docs/infrastructure';

@Component({
  selector: 'app-deployment-diagram',
  imports: [CommonModule],
  templateUrl: './deployment-diagram.html',
})
export class DeploymentDiagram {
  projectLayers = input.required<DeploymentLayer[]>();
}
