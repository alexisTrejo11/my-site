export interface NoteMetadata {
  title: string;
  category: string;
  subcategory: string;
  slug: string;
  difficulty: string;
  tags: string[];
  description: string;
  /** Relative URL path served from the Angular project's public root, e.g. "notes/spring-boot/spring-core-ioc.md" */
  filePath: string;
}
