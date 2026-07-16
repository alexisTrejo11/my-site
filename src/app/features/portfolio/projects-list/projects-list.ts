import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project';
import { ProjectsGrid } from '../../../shared/components/projects-grid/projects-grid';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProjectsGrid],
  templateUrl: './projects-list.html',
})
export class ProjectsList implements OnInit {
  private readonly projectsService = inject(ProjectsService);

  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  selectedStatus = 'all';
  selectedTech = 'all';
  loading = true;

  categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'backend', label: 'Backend' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'devops', label: 'DevOps' },
  ];

  statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'deployed', label: 'Deployed' },
    { value: 'develop', label: 'In Development' },
    { value: 'archived', label: 'Archived' },
  ] satisfies ({ value: Project['status'] | 'all'; label: string })[];

  techFilters = [
    { value: 'all', label: 'All Tech' },
    { value: 'java', label: 'Java' },
    { value: 'spring-boot', label: 'Spring Boot' },
    { value: 'python', label: 'Python' },
    { value: 'fastapi', label: 'FastAPI' },
    { value: 'go', label: 'Go' },
    { value: 'angular', label: 'Angular' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'rabbitmq', label: 'RabbitMQ' },
  ];

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectsService.getAllProjects().subscribe({
      next: (projects) => {
        this.allProjects = projects;
        this.filteredProjects = [...projects];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      },
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.allProjects.filter((project) => {
      // Search filter
      const matchesSearch =
        this.searchQuery === '' ||
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(this.searchQuery.toLowerCase()),
        ) ||
        project.framework.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        this.selectedCategory === 'all' || project.category === this.selectedCategory;

      // Status filter
      const matchesStatus = this.selectedStatus === 'all' || project.status === this.selectedStatus;

      // Tech filter
      const matchesTech =
        this.selectedTech === 'all' ||
        project.techStack.some(
          (tech) => tech.toLowerCase().replace(/\s+/g, '-') === this.selectedTech,
        );

      return matchesSearch && matchesCategory && matchesStatus && matchesTech;
    });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterProjects();
  }

  toggleCategoryFilter(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? 'all' : category;
    this.filterProjects();
  }

  toggleStatusFilter(status: string): void {
    this.selectedStatus = this.selectedStatus === status ? 'all' : status;
    this.filterProjects();
  }

  toggleTechFilter(tech: string): void {
    this.selectedTech = this.selectedTech === tech ? 'all' : tech;
    this.filterProjects();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedStatus = 'all';
    this.selectedTech = 'all';
    this.filterProjects();
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.searchQuery) count++;
    if (this.selectedCategory !== 'all') count++;
    if (this.selectedStatus !== 'all') count++;
    if (this.selectedTech !== 'all') count++;
    return count;
  }

  getFilteredStats(): { total: number; showing: number } {
    return {
      total: this.allProjects.length,
      showing: this.filteredProjects.length,
    };
  }

  onProjectClick(project: Project): void {
    void project;
    // this.router.navigate(['/projects', project.id]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
