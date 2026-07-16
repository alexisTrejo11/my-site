import { Component } from '@angular/core';
import { HeroProfile } from './components/hero-profile/hero-profile';
import { JourneyTimeline } from './components/journey-timeline/journey-timeline';
import { SkillsMatrix } from './components/skills-matrix/skills-matrix';
import { Philosophy } from './components/philosophy/philosophy';
import { CtaSection } from '../home/components/cta-section/cta-section';

@Component({
  selector: 'app-about',
  imports: [HeroProfile, JourneyTimeline, SkillsMatrix, Philosophy, CtaSection],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-950">
      <app-hero-profile />
      <app-journey-timeline />
      <app-skills-matrix />
      <app-philosophy />
      <app-cta-section />
    </div>
  `,
})
export class About {}
