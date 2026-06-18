# UI pattern examples

## CTA section (reuse)

Import `CtaSection` from `pages/home/components/cta-section` on About and similar pages. Uses `PERSONAL_DATA` for email/social links.

## Glass stat card

```html
<div
  class="text-center p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50"
>
  <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">50+</div>
  <div class="text-sm text-gray-600 dark:text-gray-400">Projects</div>
</div>
```

## Doc sidebar link

```html
<a
  routerLink="/projects/{{ projectId }}/overview"
  routerLinkActive="bg-blue-600 !text-white dark:bg-blue-500"
  class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
>
  <span>Overview</span>
</a>
```

## app-badge

```html
<app-badge type="success" size="sm">deployed</app-badge>
```

## app-error-loading

```html
@if (error) {
  <app-error-loading
    entity="Architecture"
    [message]="error"
    (retryEvent)="retry()"
  />
}
```
