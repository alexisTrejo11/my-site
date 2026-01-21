export interface InfrastructureMetric {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface CloudService {
  name: string;
  purpose: string;
  icon: string;
  cost: string;
}

export interface DeploymentLayer {
  name: string;
  components: DeploymentComponent[];
  color: string;
}

export interface DeploymentComponent {
  name: string;
  icon: string;
  description: string;
}

export interface DockerFile {
  service: string;
  content: string;
  description: string;
}

export interface PipelineStage {
  name: string;
  steps: PipelineStep[];
  icon: string;
  duration: string;
}

export interface PipelineStep {
  name: string;
  description: string;
  status: 'success' | 'running' | 'pending';
}
