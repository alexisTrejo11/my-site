import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
})
export class Hero implements OnDestroy, OnInit {
  private router = inject(Router);
  private typingTimeouts: ReturnType<typeof setTimeout>[] = [];
  private terminalInterval: ReturnType<typeof setInterval> | null = null;

  // Señales para efectos
  displayText = signal('');
  terminalLines = signal<string[]>([]);
  currentLine = signal(0);
  isTypingComplete = signal(false);

  // Textos configurables
  private fullText = 'Software Engineer specializing in Backend Development.';
  private typingSpeed = 50;
  private initialDelay = 300;

  // Texto del terminal
  private terminalCode = [
    '// System Architecture',
    'class BackendEngineer {',
    '  constructor() {',
    '    this.expertise = ["Java", "TypeScript", "Python"];',
    '    this.focus = "scalable systems";',
    '    this.cloud = ["AWS", "Docker", "Kubernetes"];',
    '  }',
    '  deploy() {',
    '    return pipeline',
    '      .withMicroservices()',
    '      .withCI_CD()',
    '      .toProduction();',
    '  }',
    '}',
    '',
    '// Current Status',
    'const engineer = new BackendEngineer();',
    'engineer.deploy().then(success => {',
    '  console.log("Systems operational");',
    '});',
  ];

  ngOnInit(): void {
    this.startTypingEffect();
    this.startTerminalEffect();
  }

  ngOnDestroy(): void {
    this.typingTimeouts.forEach((timeout) => clearTimeout(timeout));
    if (this.terminalInterval) {
      clearInterval(this.terminalInterval);
    }
  }

  private startTypingEffect(): void {
    let index = 0;
    this.displayText.set('');

    const typeCharacter = () => {
      if (index < this.fullText.length) {
        this.displayText.update((current) => current + this.fullText.charAt(index));
        index++;
        this.typingTimeouts.push(setTimeout(typeCharacter, this.typingSpeed));
      } else {
        this.isTypingComplete.set(true);
      }
    };

    this.typingTimeouts.push(setTimeout(typeCharacter, this.initialDelay));
  }

  private startTerminalEffect(): void {
    let lineIndex = 0;
    this.terminalInterval = setInterval(() => {
      if (lineIndex < this.terminalCode.length) {
        this.terminalLines.update((lines) => [...lines, this.terminalCode[lineIndex]]);
        lineIndex++;
        this.currentLine.set(lineIndex);
      } else {
        if (this.terminalInterval) {
          clearInterval(this.terminalInterval);
        }
      }
    }, 150);
  }

  scrollToProjects(): void {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/projects']);
    }
  }

  viewResume(): void {
    // TODO: Replace with actual resume link
    window.open('/assets/resume.pdf', '_blank');
  }
}
