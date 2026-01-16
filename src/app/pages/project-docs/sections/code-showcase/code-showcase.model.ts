export interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  files: CodeFile[];
  duration?: string;
  views?: number;
  tags?: string[];
}

export interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
  highlighted?: boolean;
  explanation?: string;
}
