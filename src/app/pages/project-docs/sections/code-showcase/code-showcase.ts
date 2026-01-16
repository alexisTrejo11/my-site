import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
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
import { IconComponent } from '../../../../shared/components/icon/icon';
import { ProjectDocsService } from '../../../../services/project-docs.service';
import { CodeExample, CodeFile } from './code-showcase.model';

// import 'prismjs/plugins/line-highlight/prism-line-highlight';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

declare var Prism: any; // For TypeScript

@Component({
  selector: 'app-code-showcase',
  imports: [CommonModule, IconComponent],
  templateUrl: './code-showcase.html',
})
export class CodeShowcase implements AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  docsService = inject(ProjectDocsService);

  projectId: string = '';
  selectedExample: CodeExample | null = null;
  selectedFile: CodeFile | null = null;
  isBrowser: boolean = false;

  codeExamples: CodeExample[] = [];

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

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    this.docsService.getCodeExamplesForProject(this.projectId).subscribe((examples) => {
      this.codeExamples = examples;
    });

    if (this.codeExamples.length > 0) {
      this.selectExample(this.codeExamples[0]);
    }
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
