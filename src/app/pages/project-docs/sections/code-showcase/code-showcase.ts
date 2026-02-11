import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
  input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'prismjs/prism'; // Core de Prism
import 'prismjs/components/prism-typescript'; // For TypeScript
import 'prismjs/components/prism-javascript'; // For JavaScript
import 'prismjs/components/prism-json'; // For JSON
import 'prismjs/components/prism-css'; // For CSS
import 'prismjs/components/prism-scss'; // For SCSS
import 'prismjs/components/prism-markup'; // For HTML/XML
import 'prismjs/components/prism-bash'; // For Bash
import 'prismjs/components/prism-python'; // For Python
import { IconComponent } from '../../../../shared/components/icon/icon';
import {
  CodeExample,
  CodeFile,
  ProjectCodeShowCase,
} from '../../../../core/models/project-docs.models';
import { ProjectsService } from '../../../../services/projects.service';
import { ErrorLoading } from '../../../../shared/components/errors/error-loading/error-loading';

// import 'prismjs/plugins/line-highlight/prism-line-highlight';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

declare var Prism: any; // For TypeScript

@Component({
  selector: 'app-code-showcase',
  imports: [CommonModule, IconComponent, ErrorLoading],
  templateUrl: './code-showcase.html',
})
export class CodeShowcase implements AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  error = '';
  projectService = inject(ProjectsService);
  codeShowCase: ProjectCodeShowCase | undefined;

  projectId: string = '';
  selectedExample: CodeExample | null = null;
  selectedFile: CodeFile | null = null;
  isBrowser: boolean = false;

  categories = [
    'All',
    'ORM',
    'Database',
    'Business Logic',
    'API',
    'Architecture',
    'Security',
    'Performance',
  ];

  selectedCategory: string | null = 'All';

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    if (!this.projectId) {
      this.error = 'No project ID provided in the route.';
      return;
    }

    this.projectService.getProjectCodeShowcase(this.projectId).subscribe({
      next: (data) => {
        this.codeShowCase = data;

        if (this.codeShowCase && this.codeShowCase.codeExamples.length > 0) {
          this.selectedExample = this.codeShowCase.codeExamples[0];

          if (this.selectedExample.files.length > 0) {
            this.selectedFile = this.selectedExample.files[0];
          }
        }
      },
      // TODO: Fix error handling to show a user-friendly message and possibly a retry button
      error: (err) => {
        console.error('Error fetching code showcase:', err);
        this.error = 'Failed to load code examples. Please try again later.';
      },
    });
  }

  get codeExamples(): CodeExample[] {
    return this.codeShowCase?.codeExamples || [];
  }

  get filteredExamples(): CodeExample[] {
    if (this.selectedCategory === 'All' || this.selectedCategory === null) {
      return this.codeExamples;
    }
    return this.codeExamples.filter((ex) => ex.category === this.selectedCategory);
  }

  get totalExamples(): number {
    return this.codeExamples.length;
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    // Clear selection when changing category
    if (this.selectedExample && category !== 'All' && this.selectedExample.category !== category) {
      this.selectedExample = null;
      this.selectedFile = null;
    }
  }

  selectExample(example: CodeExample) {
    this.selectedExample = example;
    this.selectedFile = example.files[0] || null;
  }

  copyCode() {
    if (this.selectedFile) {
      navigator.clipboard
        .writeText(this.selectedFile.content)
        .then(() => {
          // You could add a toast notification here
          console.log('Code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy code: ', err);
        });
    }
  }

  // Prism.js highlighting after view init
  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.highlightCode();
      }, 100);
    }
  }

  selectFile(file: CodeFile) {
    this.selectedFile = file;
    setTimeout(() => {
      this.highlightCode();
    }, 0);
  }

  private highlightCode() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }
}
