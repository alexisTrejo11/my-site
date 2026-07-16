import { Component } from '@angular/core';
import { PERSONAL_DATA } from '../../../../../core/constants/personal-data';

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-contact-info',
  imports: [],
  template: `<div class="space-y-8">
    <!-- Contact Methods -->
    <div class="card p-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Other Ways to Reach Me</h2>

      <div class="space-y-4">
        @for(method of contactMethods; track $index) {

        <a
          [href]="method.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-start gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 group"
        >
          <div
            class="text-4xl transform group-hover:scale-110 transition-transform bg-gray-200 dark:bg-gray-400 p-3 rounded-full"
          >
            <img
              [alt]="method.title"
              [src]="'icons/general/' + method.title.toLowerCase() + '.svg'"
              class="w-10 h-10 "
            />
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">
              {{ method.title }}
            </h3>
            <p class="text-blue-600 dark:text-blue-400 font-mono text-sm mb-1">
              {{ method.value }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ method.description }}
            </p>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
        }
      </div>
    </div>

    <!-- Availability Card -->
    <div
      class="card p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-200 dark:border-green-800"
    >
      <div class="flex items-start gap-4">
        <img src="icons/general/check.svg" alt="Availability" class="w-12 h-12 mt-1" />
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Currently Available</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            I'm open to new opportunities and projects. Whether you need a backend engineer for your
            team or help with a specific project, let's chat!
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-success">Backend Development</span>
            <span class="badge badge-success">API Design</span>
            <span class="badge badge-success">Cloud Infrastructure</span>
            <span class="badge badge-success">Consulting</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location & Timezone -->
    <div class="card p-8">
      <h3 class="font-bold text-gray-900 dark:text-white mb-4">Location & Availability</h3>
      <div class="space-y-3 text-gray-600 dark:text-gray-400">
        <p class="flex items-center gap-2">
          <span class="font-semibold">Based in:</span>
          Mexico City, Mexico
        </p>
        <p class="flex items-center gap-2">
          <span class="font-semibold">Timezone:</span>
          CST (UTC-6)
        </p>
        <p class="flex items-center gap-2">
          <span class="font-semibold">Remote:</span>
          Available worldwide
        </p>
      </div>
    </div>
  </div>`,
})
export class ContactInfo {
  contactMethods: ContactMethod[] = [
    {
      icon: 'email',
      title: 'Email',
      value: PERSONAL_DATA.email,
      link: `mailto:${PERSONAL_DATA.email}`,
      description: 'Best for detailed project discussions',
    },
    {
      icon: 'linkedin',
      title: 'LinkedIn',
      value: PERSONAL_DATA.linkedin.substring(PERSONAL_DATA.linkedin.lastIndexOf('/') + 1),
      link: PERSONAL_DATA.linkedin,
      description: "Let's connect professionally",
    },
    {
      icon: 'github',
      title: 'GitHub',
      value: `@${PERSONAL_DATA.github.substring(PERSONAL_DATA.github.lastIndexOf('/') + 1)}`,
      link: PERSONAL_DATA.github,
      description: 'Check out my open source work',
    },
    {
      icon: 'x',
      title: 'X',
      value: `@${PERSONAL_DATA.x.substring(PERSONAL_DATA.x.lastIndexOf('/') + 1)}`,
      link: PERSONAL_DATA.x,
      description: 'Follow for tech insights',
    },
  ];
}
