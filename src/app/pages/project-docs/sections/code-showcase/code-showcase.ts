import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
  OnInit,
} from '@angular/core';
import * as Prism from 'prismjs';
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
import { ErrorLoading } from '../../../../shared/components/errors/error-loading/error-loading';
import { BaseDocComponent } from '../../../../shared/components/base-doc/base-doc';
import { Observable } from 'rxjs';

// import 'prismjs/plugins/line-highlight/prism-line-highlight';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

@Component({
  selector: 'app-code-showcase',
  imports: [CommonModule, IconComponent, ErrorLoading],
  templateUrl: './code-showcase.html',
})
export class CodeShowcase extends BaseDocComponent<ProjectCodeShowCase> implements AfterViewInit, OnInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef;

  private readonly platformId = inject(PLATFORM_ID);
  selectedExample: CodeExample | null = null;
  selectedFile: CodeFile | null = null;
  isBrowser = false;

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

  override ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    super.ngOnInit();
  }

  override fetchData(projectId: string): Observable<ProjectCodeShowCase> {
    return this.projectService.getProjectCodeShowcase(projectId) as Observable<ProjectCodeShowCase>;
  }

  protected override onDataLoaded(codeShowCase: ProjectCodeShowCase): void {
    this.selectedExample = codeShowCase.codeExamples[0] ?? null;
    this.selectedFile = this.selectedExample?.files[0] ?? null;
  }

  get codeExamples(): CodeExample[] {
    return this.data?.codeExamples || [];
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
        .then(() => undefined)
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
    Prism.highlightAll();
  }
}
