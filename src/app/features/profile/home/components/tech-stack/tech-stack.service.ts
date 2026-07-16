import { Injectable } from '@angular/core';
import { Technology, TechCategoryInfo, TechCategory } from './tech-stack.model';

@Injectable({
  providedIn: 'root',
})
export class TechStackService {
  /** Core stack shown by default on the home page. */
  readonly highlightedTechIds = [
    'spring-boot',
    'angular',
    'postgresql',
    'docker',
    'aws',
  ] as const;

  private technologies: Technology[] = [
    {
      id: 'python',
      name: 'Python',
      category: 'language',
      iconPath: 'icons/tech/python.svg',
      color: 'from-blue-400 to-blue-600',
      level: 'expert',
      description: 'Backend development, data processing, and automation',
      projectsCount: 12,
      yearsExperience: 4,
    },
    {
      id: 'java',
      name: 'Java',
      category: 'language',
      iconPath: 'icons/tech/java.svg',
      color: 'from-red-500 to-red-700',
      level: 'expert',
      description: 'Enterprise applications and microservices',
      projectsCount: 8,
      yearsExperience: 3,
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'language',
      iconPath: 'icons/tech/typescript.svg',
      color: 'from-blue-500 to-blue-700',
      level: 'advanced',
      description: 'Type-safe JavaScript for scalable applications',
      projectsCount: 15,
      yearsExperience: 3,
    },
    {
      id: 'go',
      name: 'Go',
      category: 'language',
      iconPath: 'icons/tech/go.svg',
      color: 'from-cyan-400 to-cyan-600',
      level: 'intermediate',
      description: 'Concurrent programming and microservices',
      projectsCount: 7,
      yearsExperience: 2,
    },
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      category: 'backend-framework',
      iconPath: 'icons/tech/spring.svg',
      color: 'from-green-500 to-green-700',
      level: 'expert',
      description: 'Java framework for building microservices',
      projectsCount: 6,
      yearsExperience: 3,
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'backend-framework',
      iconPath: 'icons/tech/fastapi.svg',
      color: 'from-pink-400 to-pink-600',
      level: 'advanced',
      description: 'Modern Python web framework for APIs',
      projectsCount: 5,
      yearsExperience: 2,
    },
    {
      id: 'angular',
      name: 'Angular',
      category: 'frontend-framework',
      iconPath: 'icons/tech/angular.svg',
      color: 'from-red-400 to-red-600',
      level: 'advanced',
      description: 'Enterprise frontend framework',
      projectsCount: 10,
      yearsExperience: 3,
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'devops',
      iconPath: 'icons/tech/docker.svg',
      color: 'from-blue-300 to-blue-500',
      level: 'advanced',
      description: 'Containerization platform',
      projectsCount: 15,
      yearsExperience: 3,
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'database',
      iconPath: 'icons/tech/postgresql.svg',
      color: 'from-indigo-400 to-indigo-600',
      level: 'expert',
      description: 'Advanced open-source relational database',
      projectsCount: 10,
      yearsExperience: 3,
    },
    {
      id: 'redis',
      name: 'Redis',
      category: 'database',
      iconPath: 'icons/tech/redis.svg',
      color: 'from-red-400 to-red-600',
      level: 'advanced',
      description: 'In-memory data structure store',
      projectsCount: 8,
      yearsExperience: 2,
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'database',
      iconPath: 'icons/tech/mongodb.svg',
      color: 'from-green-400 to-green-600',
      level: 'intermediate',
      description: 'NoSQL document database',
      projectsCount: 4,
      yearsExperience: 2,
    },
    {
      id: 'rabbitmq',
      name: 'RabbitMQ',
      category: 'devops',
      iconPath: 'icons/tech/rabbitmq.svg',
      color: 'from-orange-400 to-orange-600',
      level: 'advanced',
      description: 'Message broker for microservices',
      projectsCount: 5,
      yearsExperience: 2,
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'cloud',
      iconPath: 'icons/tech/aws.svg',
      color: 'from-yellow-400 to-yellow-600',
      level: 'intermediate',
      description: 'Cloud services and infrastructure',
      projectsCount: 6,
      yearsExperience: 2,
    },
    {
      id: 'git',
      name: 'Git',
      category: 'tool',
      iconPath: 'icons/tech/git.svg',
      color: 'from-orange-500 to-orange-700',
      level: 'expert',
      description: 'Version control system',
      projectsCount: 20,
      yearsExperience: 4,
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      category: 'tool',
      iconPath: 'icons/tech/graphql.svg',
      color: 'from-pink-500 to-pink-700',
      level: 'intermediate',
      description: 'Query language for APIs',
      projectsCount: 3,
      yearsExperience: 1,
    },
    {
      id: 'linux',
      name: 'Linux',
      category: 'tool',
      iconPath: 'icons/tech/linux.svg',
      color: 'from-gray-600 to-gray-800',
      level: 'advanced',
      description: 'Operating system for development',
      projectsCount: 15,
      yearsExperience: 4,
    },
  ];

  private categories: TechCategoryInfo[] = [
    {
      id: 'language',
      name: 'Languages',
      description: 'Programming languages I use daily',
      iconPath: '/icons/general/screen.svg',
      color: 'bg-blue-500',
      count: 3,
    },
    {
      id: 'backend-framework',
      name: 'Backend Frameworks',
      description: 'Server-side frameworks and libraries',
      iconPath: '/icons/general/gear.svg',
      color: 'bg-green-500',
      count: 3,
    },
    {
      id: 'frontend-framework',
      name: 'Frontend Frameworks',
      description: 'Client-side frameworks and libraries',
      iconPath: '/icons/general/screen.svg',
      color: 'bg-red-500',
      count: 1,
    },
    {
      id: 'database',
      name: 'Databases',
      description: 'Data storage and management systems',
      iconPath: '/icons/general/database.svg',
      color: 'bg-indigo-500',
      count: 3,
    },
    {
      id: 'devops',
      name: 'DevOps & Tools',
      description: 'Infrastructure and development tools',
      iconPath: '/icons/general/infrastructure.svg',
      color: 'bg-orange-500',
      count: 3,
    },
    {
      id: 'cloud',
      name: 'Cloud Services',
      description: 'Cloud platforms and services',
      iconPath: '/icons/general/cloud.svg',
      color: 'bg-yellow-500',
      count: 1,
    },
    {
      id: 'tool',
      name: 'Other Tools',
      description: 'Additional tools and technologies',
      iconPath: '/icons/general/tools.svg',
      color: 'bg-gray-500',
      count: 3,
    },
  ];

  getAllTechnologies(): Technology[] {
    return this.technologies;
  }

  getHighlightedTechnologies(): Technology[] {
    return this.highlightedTechIds
      .map((id) => this.technologies.find((tech) => tech.id === id))
      .filter((tech): tech is Technology => tech !== undefined);
  }

  isHighlighted(id: string): boolean {
    return (this.highlightedTechIds as readonly string[]).includes(id);
  }

  getTechnologiesByCategory(category: TechCategory): Technology[] {
    return this.technologies.filter((tech) => tech.category === category);
  }

  getCategories(): TechCategoryInfo[] {
    return this.categories.map((category) => ({
      ...category,
      count: this.getTechnologiesByCategory(category.id).length,
    }));
  }

  getTechnologyById(id: string): Technology | undefined {
    return this.technologies.find((tech) => tech.id === id);
  }

  getFeaturedTechnologies(count = 6): Technology[] {
    return this.technologies
      .filter((tech) => tech.level === 'expert' || tech.level === 'advanced')
      .slice(0, count);
  }

  getStatistics() {
    const total = this.technologies.length;
    const byLevel = {
      expert: this.technologies.filter((t) => t.level === 'expert').length,
      advanced: this.technologies.filter((t) => t.level === 'advanced').length,
      intermediate: this.technologies.filter((t) => t.level === 'intermediate').length,
      beginner: this.technologies.filter((t) => t.level === 'beginner').length,
    };
    const byCategory = this.categories.map((cat) => ({
      name: cat.name,
      count: this.getTechnologiesByCategory(cat.id).length,
    }));

    return { total, byLevel, byCategory };
  }
}
