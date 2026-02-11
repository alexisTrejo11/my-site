import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../../../core/models/project';

interface QuickLink {
  title: string;
  description: string;
  url: string;
  type: 'github' | 'demo' | 'docs' | 'architecture' | 'api' | 'deployment';
  external: boolean;
  iconColor?: string;
  badge?: string;
}

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-links.html',
})
export class QuickLinks {
  project = input.required<Project>();

  getLinks(): QuickLink[] {
    const links: QuickLink[] = [];
    const projectLinks = this.project().docs.overview.links;

    // GitHub
    if (projectLinks.github) {
      links.push({
        title: 'GitHub Repository',
        description: 'View source code, issues, and contributions',
        url: projectLinks.github,
        type: 'github',
        external: true,
        iconColor:
          'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
        badge: 'Open Source',
      });
    }

    // Demo
    if (projectLinks.demo) {
      links.push({
        title: 'Live Demo',
        description: 'Try the application in action',
        url: projectLinks.demo,
        type: 'demo',
        external: true,
        iconColor:
          'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300',
        badge: 'Interactive',
      });
    }

    // Documentation
    if (projectLinks.documentation) {
      links.push({
        title: 'API Documentation',
        description: 'Complete API reference with examples',
        url: projectLinks.documentation,
        type: 'docs',
        external: true,
        iconColor:
          'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
        badge: 'Swagger',
      });
    }

    // Docker Hub
    if (projectLinks.dockerHub) {
      links.push({
        title: 'Docker Image',
        description: 'Pull and run the containerized application',
        url: `https://hub.docker.com/r/${projectLinks.dockerHub}`,
        type: 'deployment',
        external: true,
        iconColor:
          'text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300',
        badge: 'Container',
      });
    }

    // Inner Links based on project type
    if (this.project().category === 'backend' || this.project().category === 'fullstack') {
      links.push({
        title: 'Architecture',
        description: 'Explore the system design and architecture',
        url: `/projects/${this.project().projectId}/architecture`,
        type: 'architecture',
        external: false,
        iconColor:
          'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300',
      });
    }

    if (this.project().category === 'backend') {
      links.push({
        title: 'API Explorer',
        description: 'Test endpoints with interactive playground',
        url: `/projects/${this.project().projectId}/api`,
        type: 'api',
        external: false,
        iconColor:
          'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300',
      });
    }

    // Additional link if more than 3 features
    if (this.project().docs.features.features.length > 3) {
      links.push({
        title: 'Features Breakdown',
        description: 'Detailed explanation of all features',
        url: `/projects/${this.project().projectId}/features`,
        type: 'docs',
        external: false,
        iconColor:
          'text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300',
      });
    }

    return links;
  }

  // Icon based on link type
  getIconPath(type: QuickLink['type']): string {
    const icons = {
      github: 'icons/general/github.svg',
      demo: 'icons/general/demo.svg',
      docs: 'icons/general/docs.svg',
      architecture: 'icons/general/architecture.svg',
      api: 'icons/general/api.svg',
      deployment: 'icons/tech/docker.svg',
    };
    return icons[type] || 'icons/general/docs.svg';
  }

  getBorderColor(type: QuickLink['type']): string {
    const colors = {
      github:
        'border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300',
      demo: 'border-blue-300 dark:border-blue-700 hover:border-blue-600 dark:hover:border-blue-400',
      docs: 'border-emerald-300 dark:border-emerald-700 hover:border-emerald-600 dark:hover:border-emerald-400',
      architecture:
        'border-purple-300 dark:border-purple-700 hover:border-purple-600 dark:hover:border-purple-400',
      api: 'border-cyan-300 dark:border-cyan-700 hover:border-cyan-600 dark:hover:border-cyan-400',
      deployment:
        'border-blue-400 dark:border-blue-600 hover:border-blue-500 dark:hover:border-blue-400',
    };
    return colors[type] || 'border-gray-300 dark:border-gray-700';
  }

  // Texto para enlace externo
  getExternalText(external: boolean): string {
    return external ? 'Opens in new tab' : 'Navigates within site';
  }
}
