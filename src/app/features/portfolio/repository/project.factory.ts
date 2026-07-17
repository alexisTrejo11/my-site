import { Project } from '../../../core/models/project';
import { ProjectDocsModel } from '../../../core/models/project-docs.models';

export type ProjectMetadata = Omit<Project, 'docs'>;

export function createEmptyDocs(): ProjectDocsModel {
  return {
    overview: {
      problemStatement: {
        problemTitle: '',
        problemDescription: '',
        problemList: [],
      },
      solution: {
        solutionTitle: '',
        solutionList: [],
      },
      keyMetrics: {
        metricsTitle: '',
        metricsList: [],
      },
      links: {
        github: null,
        demo: null,
        documentation: null,
        dockerHub: null,
      },
      mediaGallery: {
        title: '',
        items: [],
      },
      mediaItems: [],
      metrics: [],
    },
    codeShowcase: {
      codeExamples: [],
    },
    infrastructure: {
      deploymentLayers: [],
      dockerFiles: [],
      cloudServices: [],
      metrics: [],
    },
    architecture: {
      layers: [],
      designPatterns: [],
      scalabilityStrategies: [],
      securityStrategies: [],
      cacheStrategies: [],
      architectureFeatures: [],
      architectureDiagram: {
        legendItems: [],
        nodes: [],
        connections: [],
      },
      dataFlow: {
        requestFlow: [],
        eventFlow: [],
      },
      techDecisions: {
        decisions: [],
      },
    },
    features: {
      features: [],
    },
    apiSchema: {
      httpEndpoints: [],
      type: 'REST',
    },
  };
}

export function createEmptyProject(projectId: string): Project {
  const now = new Date();
  return {
    projectId,
    featured: false,
    name: '',
    language: '',
    category: 'backend',
    framework: '',
    version: '0.0.0',
    repositoryUrl: '',
    liveDemoUrl: null,
    description: '',
    techStack: [],
    status: 'develop',
    createdAt: now,
    updatedAt: now,
    docs: createEmptyDocs(),
  };
}
