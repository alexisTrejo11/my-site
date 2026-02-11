import { ProjectDocsModel } from './project-docs.models';

// Legacy
export interface ProjectLegacy {
  id: string;

  // general info
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'devops';
  type: 'microservices' | 'api' | 'web-app' | 'mobile' | 'library';
  status: 'production' | 'development' | 'archived';
  featured: boolean;
  year: number;

  // Featured tags
  technologies: string[];
  tags: string[];
  features: string[];
}

export interface Project {
  projectId: string;
  featured: boolean;
  name: string;
  language: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'devops';
  framework: string;
  version: string;
  repositoryUrl: string;
  liveDemoUrl: string | null;
  description: string;
  techStack: string[];
  status: 'develop' | 'deployed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  docs: ProjectDocsModel;
}

export enum ProjectCategory {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  FULLSTACK = 'Fullstack',
  DEVOPS = 'DevOps',
}

export interface ProjectNavItem {
  label: string;
  path: string;
  iconPath: string;
}
