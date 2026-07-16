import { Component } from '@angular/core';
import { Expertise } from './expertise.model';

@Component({
  selector: 'app-backend-expertise',
  imports: [],
  templateUrl: './backend-expertise.html',
})
export class BackendExpertise {
  expertiseAreas: Expertise[] = [
    {
      title: 'Backend Engineering',
      description:
        'End-to-end server-side development — REST and GraphQL APIs, microservices and event-driven systems, authentication and security hardening, and performance tuning with caching, load balancing, and database optimization.',
      iconPath: 'icons/general/server.svg',
      skills: [
        'REST & GraphQL',
        'Microservices',
        'OAuth2 & JWT',
        'PostgreSQL & Redis',
        'Caching & Performance',
      ],
      featured: true,
    },
    {
      title: 'DevOps & Infrastructure',
      description:
        'Server management, Linux administration, and networking — plus containerized deployments, cloud infrastructure, and CI/CD pipelines for reliable production systems.',
      iconPath: 'icons/general/infrastructure.svg',
      skills: ['Linux', 'Networking', 'Docker', 'AWS', 'CI/CD'],
    },
    {
      title: 'AI Integration',
      description:
        'Building with modern AI tooling — MCP servers, coding agents, reusable agent skills, and spec-driven development workflows.',
      iconPath: 'icons/general/brain.svg',
      skills: ['MCP', 'Coding Agents', 'Agent Skills', 'Spec-Driven Dev'],
    },
    {
      title: 'Design & UI',
      description:
        'Crafting clean, responsive interfaces with solid HTML and CSS foundations and an eye for graphical and visual design.',
      iconPath: 'icons/general/screen.svg',
      skills: ['HTML', 'CSS', 'UI Design', 'Visual Design'],
    },
  ];

  readonly featuredArea = this.expertiseAreas.find((area) => area.featured)!;
  readonly supportingAreas = this.expertiseAreas.filter((area) => !area.featured);
}
