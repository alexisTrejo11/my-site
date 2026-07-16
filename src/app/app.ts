import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/portfolio/layout/header/header';
import { Footer } from './features/portfolio/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="flex-1 pt-20">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class App {
  protected readonly title = signal('alexis-trejo-portfolio');
}
