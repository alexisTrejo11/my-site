// header.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styles: [
    `
      .logo-gradient {
        background: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
        background-size: 200% 200%;
        animation: gradient-shift 3s ease infinite;
      }

      @keyframes gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .theme-switch {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .theme-switch:hover {
        transform: rotate(15deg) scale(1.1);
      }
    `,
  ],
})
export class Header implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(this.platformId);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isDarkMode = signal(false);
  currentPath = signal('');

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Learning', path: '/learning' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  ngOnInit(): void {
    this.setupRouterListener();
    this.detectPreferredTheme();
  }

  private setupRouterListener(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath.set(event.urlAfterRedirects);
        this.isMobileMenuOpen.set(false);
      });
  }

  private detectPreferredTheme(): void {
    if (!this.isBrowser) return;

    // Verifica localStorage primero
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      // Si no hay tema guardado, usa la preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }

    this.applyTheme();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((state) => !state);
  }

  private applyTheme(): void {
    if (!this.isBrowser) return;

    const htmlElement = document.documentElement;

    if (this.isDarkMode()) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update((state) => !state);
    this.applyTheme();

    if (this.isBrowser) {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  isActiveLink(path: string): boolean {
    if (path === '/') {
      return this.currentPath() === '/';
    }
    return this.currentPath().startsWith(path);
  }
}
