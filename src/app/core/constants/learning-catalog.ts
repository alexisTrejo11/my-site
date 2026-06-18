export interface CategoryConfig {
  title: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
  badgeClass: string;
  description: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  fundamentals: {
    title: 'Fundamentals',
    icon: '🧱',
    accentFrom: 'from-slate-500',
    accentTo: 'to-gray-400',
    badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
    description: 'Computer architecture, networking, operating systems, and distributed systems theory.',
  },
  languages: {
    title: 'Languages',
    icon: '💻',
    accentFrom: 'from-indigo-500',
    accentTo: 'to-blue-400',
    badgeClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    description: 'Python, Java, JavaScript/TypeScript, Go, and C# language deep-dives.',
  },
  backend: {
    title: 'Backend Engineering',
    icon: '⚙️',
    accentFrom: 'from-blue-500',
    accentTo: 'to-cyan-400',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    description: 'Frameworks, architecture patterns, messaging, and API design.',
  },
  devops: {
    title: 'DevOps & Cloud',
    icon: '☁️',
    accentFrom: 'from-violet-500',
    accentTo: 'to-purple-400',
    badgeClass: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    description: 'Containers, Kubernetes, AWS, and CI/CD tooling.',
  },
  databases: {
    title: 'Databases',
    icon: '🗄️',
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-400',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    description: 'SQL, NoSQL, PostgreSQL, Redis, and MongoDB.',
  },
  'data-science': {
    title: 'Data Science & AI',
    icon: '🤖',
    accentFrom: 'from-pink-500',
    accentTo: 'to-rose-400',
    badgeClass: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    description: 'Machine learning frameworks and AI tooling.',
  },
};

export const SUBCATEGORY_LABEL: Record<string, string> = {
  'spring-boot': 'Spring Boot',
  django: 'Django',
  fastapi: 'FastAPI',
  kafka: 'Kafka',
  java: 'Java',
  python: 'Python',
  javascript: 'JavaScript',
  go: 'Go',
  csharp: 'C#',
  aws: 'AWS',
  kubernetes: 'Kubernetes',
  docker: 'Docker',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  mongodb: 'MongoDB',
  networking: 'Networking',
  'computer-architecture': 'Computer Architecture',
  'operating-systems': 'Operating Systems',
  'software-engineer': 'Software Engineering',
  'architecture-patterns': 'Architecture Patterns',
  'communication-patterns': 'Communication Patterns',
  'observability-and-security': 'Observability & Security',
  introduction: 'Introduction',
  pytorch: 'PyTorch',
  containers: 'Containers',
  linux: 'Linux',
  typescript: 'TypeScript',
  databases: 'Foundations',
  'moc.md': 'Overview',
};

export const SUBCATEGORY_BADGE: Record<string, string> = {
  'spring-boot': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  django: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  fastapi: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  kafka: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  java: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  python: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  javascript: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  go: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  csharp: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  aws: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  kubernetes: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  docker: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  postgresql: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  redis: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  mongodb: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  networking: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'computer-architecture': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
  'operating-systems': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'software-engineer': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'architecture-patterns': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'communication-patterns': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'observability-and-security': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  introduction: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  pytorch: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
};

export function categoryLabel(category: string): string {
  return (
    CATEGORY_CONFIG[category]?.title ??
    category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function subcategoryLabel(subcategory: string): string {
  if (subcategory === 'all') return 'All';
  return (
    SUBCATEGORY_LABEL[subcategory] ??
    subcategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function subcategoryBadgeClass(subcategory: string): string {
  return (
    SUBCATEGORY_BADGE[subcategory] ??
    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  );
}
