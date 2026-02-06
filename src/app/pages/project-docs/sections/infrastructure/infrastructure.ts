import { Component, input } from '@angular/core';
import { DeploymentDiagram } from './deployment-diagram/deployment-diagram';
import { DockerConfig } from './docker-config/docker-config';
import { CicdPipeline } from './cicd-pipeline/cicd-pipeline';
import {
  CloudService,
  InfrastructureModel,
  InfrastructureMetric,
} from '../../../../core/models/project-docs.models';

@Component({
  selector: 'app-infrastructure',
  imports: [DeploymentDiagram, DockerConfig, CicdPipeline],
  templateUrl: './infrastructure.html',
})
export class Infrastructure {
  model = input.required<InfrastructureModel>();

  get totalMonthlyCost(): number {
    return this.model().cloudServices.reduce((sum, service) => {
      const cost = parseFloat(service.cost.replace('$', '').replace('/month', ''));
      return sum + cost;
    }, 0);
  }
}

const METRICS_DUMMY: InfrastructureMetric[] = [
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

const CLOUDE_SERVICES_DUMMY: CloudService[] = [
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
