import { Component, input } from '@angular/core';
import { Project } from '../../../../../../core/models/project';
import { CommonModule } from '@angular/common';

interface TechItem {
  name: string;
  category: string;
  usage?: string;
  experience?: string;
  svgIcon?: string;
  color?: string;
}

@Component({
  selector: 'app-tech-stack-showcase',
  imports: [CommonModule],
  templateUrl: './tech-stack-showcase.html',
})
export class TechStackShowcase {
  project = input.required<Project>();

  categories = [
    { id: 'backend', name: 'Backend & Runtime' },
    { id: 'frontend', name: 'Frontend & UI' },
    { id: 'database', name: 'Databases & Storage' },
    { id: 'infra', name: 'Infrastructure & DevOps' },
    { id: 'tools', name: 'Tools & Services' },
  ];

  private techCategories: Record<string, string> = {
    // Backend
    nodejs: 'backend',
    python: 'backend',
    java: 'backend',
    go: 'backend',
    'spring-boot': 'backend',
    express: 'backend',
    fastapi: 'backend',
    django: 'backend',
    gin: 'backend',
    fiber: 'backend',

    // Frontend
    angular: 'frontend',
    react: 'frontend',
    vue: 'frontend',
    typescript: 'frontend',
    javascript: 'frontend',
    tailwind: 'frontend',

    // Databases
    postgresql: 'database',
    mongodb: 'database',
    mysql: 'database',
    redis: 'database',
    sqlite: 'database',

    // Infrastructure
    docker: 'infra',
    kubernetes: 'infra',
    aws: 'infra',
    azure: 'infra',
    gcp: 'infra',
    terraform: 'infra',
    rabbitmq: 'infra',
    nginx: 'infra',

    // Tools
    git: 'tools',
    github: 'tools',
    gitlab: 'tools',
    jenkins: 'tools',
    graphql: 'tools',
  };

  getTechnologiesByCategory(): Record<string, TechItem[]> {
    const grouped: Record<string, TechItem[]> = {};

    this.categories.forEach((cat) => {
      grouped[cat.id] = [];
    });

    this.project().techStack.forEach((tech) => {
      const categoryId = this.techCategories[tech.toLowerCase()] || 'tools';
      const techItem: TechItem = {
        name: tech,
        category: this.getTechCategoryName(tech),
        // Puedes agregar más datos aquí
        svgIcon: this.getTechSvgPath(tech),
      };

      if (grouped[categoryId]) {
        grouped[categoryId].push(techItem);
      } else {
        grouped[categoryId] = [techItem];
      }
    });

    return grouped;
  }

  private getTechCategoryName(tech: string): string {
    const categoryMap: Record<string, string> = {
      nodejs: 'JavaScript Runtime',
      python: 'Programming Language',
      java: 'Programming Language',
      'spring-boot': 'Java Framework',
      angular: 'Frontend Framework',
      postgresql: 'Relational Database',
      mongodb: 'NoSQL Database',
      docker: 'Containerization',
      kubernetes: 'Orchestration',
      aws: 'Cloud Platform',
      redis: 'In-Memory Database',
      rabbitmq: 'Message Broker',
    };
    return categoryMap[tech.toLowerCase()] || 'Technology';
  }

  private getTechSvgPath(tech: string): string {
    return `icons/tech/${tech.toLowerCase()}.svg`;
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat?.name || categoryId;
  }

  hasTechnologiesInCategory(categoryId: string): boolean {
    const grouped = this.getTechnologiesByCategory();
    return grouped[categoryId]?.length > 0;
  }

  getMainStackCount(): number {
    return this.project().techStack.length;
  }

  getInfraCount(): number {
    const grouped = this.getTechnologiesByCategory();
    return grouped['infra']?.length || 0;
  }
}
