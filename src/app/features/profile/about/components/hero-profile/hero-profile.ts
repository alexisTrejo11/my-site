import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-profile',
  imports: [],
  template: `
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Animated Background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
      ></div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div class="order-2 lg:order-1">
            <!-- Availability Badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full mb-6 animate-slide-up"
            >
              <span class="relative flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span class="text-sm font-semibold">Available for opportunities</span>
            </div>

            <!-- Heading & Description -->
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up animation-delay-200"
            >
              Self-Taught Engineer,
              <span class="text-gradient">Limitless Passion</span>
            </h1>

            <p
              class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-slide-up animation-delay-400"
            >
              I didn't wait for permission to become an engineer. Through countless late nights,
              personal projects, and an insatiable curiosity, I mastered the art of building
              scalable systems that power modern businesses.
            </p>

            <!-- Call to Action Buttons -->
            <div class="flex flex-wrap gap-4 mb-12 animate-slide-up animation-delay-600">
              <a href="#journey" class="btn-primary"> My Journey </a>
              <a href="/projects" class="btn-secondary"> View Projects </a>
              <a href="/resume.pdf" download class="btn-ghost">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-4 gap-6 animate-slide-up animation-delay-800">
              @for (stat of stats; track stat.label) {
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ stat.value }}
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  {{ stat.label }}
                </div>
              </div>
              }
            </div>
          </div>

          <!-- Right: Profile Image/Brand -->
          <div class="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
            <div class="relative">
              <!-- Main Image Container -->
              <div class="relative w-80 h-80 lg:w-96 lg:h-96">
                <!-- Decorative Rings -->
                <div
                  class="absolute inset-0 rounded-full border-4 border-blue-600/20 dark:border-blue-400/20 animate-spin-slow"
                ></div>
                <div
                  class="absolute inset-4 rounded-full border-4 border-purple-600/20 dark:border-purple-400/20 animate-spin-reverse"
                ></div>

                <!-- Image/Logo Container -->
                <div
                  class="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl"
                >
                  <div
                    class="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden"
                  >
                    <img src="/cat-pc.jpg" alt="Alexis Trejo" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroProfile {
  stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Completed' },
    { value: '99.9%', label: 'System Uptime' },
    { value: '100%', label: 'Self-Taught' },
  ];
}
