export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  iconPath: string;
  color: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  description?: string;
  projectsCount?: number;
  yearsExperience?: number;
}

export type TechCategory =
  | 'language'
  | 'backend-framework'
  | 'frontend-framework'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'tool'
  | 'other';

export interface TechCategoryInfo {
  id: TechCategory;
  name: string;
  description: string;
  iconPath: string;
  color: string;
  count: number;
}

export interface Expertise {
  title: string;
  description: string;
  iconPath: string;
  skills: string[];
  featured?: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  duration: number;
}
