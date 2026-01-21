import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeploymentDiagram } from './deployment-diagram/deployment-diagram';
import { DockerConfig } from './docker-config/docker-config';
import { CicdPipeline } from './cicd-pipeline/cicd-pipeline';
import {
  InfrastructureMetric,
  CloudService,
  DeploymentLayer,
  DockerFile,
} from '../../../../core/models/docs/infrastructure';
import { ProjectDocsService } from '../../../../services/project-docs.service';

@Component({
  selector: 'app-infrastructure',
  imports: [DeploymentDiagram, DockerConfig, CicdPipeline],
  templateUrl: './infrastructure.html',
})
export class Infrastructure implements OnInit {
  deploymentLayers: DeploymentLayer[] = [];
  dockerFiles: DockerFile[] = [];
  projectId: string = '';

  projectDocsService = inject(ProjectDocsService);

  metrics: InfrastructureMetric[] = [
    {
      label: 'Deployment Frequency',
      value: '15+ / day',
      icon: '🚀',
      description: 'Automated deployments to production',
    },
    {
      label: 'Lead Time',
      value: '< 30 min',
      icon: '⏱️',
      description: 'From commit to production',
    },
    {
      label: 'MTTR',
      value: '< 15 min',
      icon: '🔧',
      description: 'Mean Time To Recovery',
    },
    {
      label: 'Change Failure Rate',
      value: '< 5%',
      icon: '✅',
      description: 'Failed deployments percentage',
    },
  ];

  cloudServices: CloudService[] = [
    {
      name: 'AWS EKS',
      purpose: 'Kubernetes cluster orchestration',
      icon: '☸️',
      cost: '$250/month',
    },
    {
      name: 'AWS RDS',
      purpose: 'Managed PostgreSQL databases',
      icon: '🗄️',
      cost: '$180/month',
    },
    {
      name: 'ElastiCache',
      purpose: 'Redis managed caching layer',
      icon: '⚡',
      cost: '$50/month',
    },
    {
      name: 'CloudFront CDN',
      purpose: 'Global content delivery',
      icon: '🌐',
      cost: '$30/month',
    },
    {
      name: 'S3',
      purpose: 'Object storage for assets',
      icon: '📦',
      cost: '$20/month',
    },
    {
      name: 'CloudWatch',
      purpose: 'Logging and monitoring',
      icon: '📊',
      cost: '$40/month',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    this.projectDocsService.getDeploymentDiagramsForProject(this.projectId).subscribe((layers) => {
      this.deploymentLayers = layers;
    });

    this.projectDocsService.getDockerFilesForProject(this.projectId).subscribe((files) => {
      this.dockerFiles = files;
    });
  }

  get totalMonthlyCost(): number {
    return this.cloudServices.reduce((sum, service) => {
      const cost = parseFloat(service.cost.replace('$', '').replace('/month', ''));
      return sum + cost;
    }, 0);
  }
}
