import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SkillCategory {
  name: string;
  iconPath: string;
  description: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  tier:
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
    | 'Beginner-Intermediate'
    | 'Intermediate-Advanced';
  description?: string;
}

@Component({
  selector: 'app-skills-matrix',
  imports: [CommonModule],
  templateUrl: './skills-matrix.html',
})
export class SkillsMatrix {
  categories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      iconPath: 'icons/general/screen.svg',
      description: 'Building interfaces and user experiences',
      skills: [
        {
          name: 'HTML5 / CSS3 / JavaScript Vanilla',
          tier: 'Advanced',
          description: 'DOM manipulation, CSS Grid/Flexbox, native APIs, responsive design',
        },
        {
          name: 'TypeScript',
          tier: 'Intermediate',
          description: 'Static typing, interfaces, generics, framework integration',
        },
        {
          name: 'Angular',
          tier: 'Intermediate',
          description: 'Components, Services, RxJS, Routing, Forms (Reactive & Template)',
        },
        {
          name: 'Tailwind CSS',
          tier: 'Intermediate',
          description: 'Utility-first, responsive design, custom components',
        },
      ],
    },
    {
      name: 'Backend & APIs',
      iconPath: 'icons/general/gear.svg',
      description: 'Server logic, databases, and communication',
      skills: [
        {
          name: 'Node.js / Express',
          tier: 'Intermediate',
          description: 'RESTful APIs, middlewares, JWT authentication, MVC pattern',
        },
        {
          name: 'SQL Databases',
          tier: 'Intermediate',
          description: 'PostgreSQL, MySQL - Complex queries, relationships, optimization',
        },
        {
          name: 'Web Protocols',
          tier: 'Advanced',
          description: 'HTTP/HTTPS, WebSockets, TLS/SSL handshake, security methods',
        },
        {
          name: 'Python (Flask/Django)',
          tier: 'Beginner-Intermediate',
          description: 'Scripting, automation, basic APIs',
        },
      ],
    },
    {
      name: 'Architecture & Systems',
      iconPath: 'icons/general/infrastructure.svg',
      description: 'Design and structure of software solutions',
      skills: [
        {
          name: 'Design Patterns',
          tier: 'Intermediate',
          description: 'Singleton, Observer, Factory, Strategy - Applied in projects',
        },
        {
          name: 'Clean Architecture',
          tier: 'Intermediate',
          description: 'Separation of concerns, dependency injection',
        },
        {
          name: 'Git & Version Control',
          tier: 'Advanced',
          description: 'Branching strategies, rebase, merge, collaborative work',
        },
        {
          name: 'SOLID Principles',
          tier: 'Intermediate',
          description: 'Practical application in class and component design',
        },
      ],
    },
    {
      name: 'Tools & Methodologies',
      iconPath: 'icons/general/binary.svg',
      description: 'Workflows and development practices',
      skills: [
        {
          name: 'Agile Methodologies',
          tier: 'Intermediate',
          description: 'Scrum, Kanban - Experience in sprint-based projects',
        },
        {
          name: 'Docker',
          tier: 'Beginner-Intermediate',
          description: 'Basic containerization, Dockerfile, custom images',
        },
        {
          name: 'Testing',
          tier: 'Intermediate',
          description: 'Jest, Karma - Unit testing, integration, TDD principles',
        },
        {
          name: 'Analysis & Automation',
          tier: 'Advanced',
          description: 'Advanced Excel, Google Sheets, optimization scripts',
        },
      ],
    },
  ];

  getTierColor(tier: string): string {
    switch (tier) {
      case 'Advanced':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700';
      case 'Intermediate':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700';
      case 'Beginner':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700';
    }
  }

  getTierOrder(tier: string): number {
    switch (tier) {
      case 'Advanced':
        return 3;
      case 'Intermediate':
        return 2;
      case 'Beginner':
        return 1;
      default:
        return 0;
    }
  }
}
