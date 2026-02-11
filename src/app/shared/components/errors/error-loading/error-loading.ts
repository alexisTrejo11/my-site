import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-error-loading',
  imports: [],
  template: `
    <div
      class="card border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-8 text-center animate-fade-in"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center"
        >
          <i class="ph ph-warning-circle text-3xl text-red-600 dark:text-red-400"></i>
        </div>
        <h2 class="text-xl font-bold text-red-700 dark:text-red-400">
          Failed to Load {{ entity() }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">{{ message() }}</p>
        <button class="btn-gradient-primary text-sm px-6 py-2.5 mt-2" (click)="retry()">
          <i class="ph ph-arrow-clockwise mr-2"></i>
          Retry
        </button>
      </div>
    </div>
  `,
})
export class ErrorLoading {
  message = input.required<string>();
  entity = input.required<string>();
  @Output() retryEvent = new EventEmitter<void>();

  retry(): void {
    this.retryEvent.emit();
  }
}
