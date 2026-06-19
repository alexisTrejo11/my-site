import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stat } from '../../../../core/models/hero';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-stats',
  imports: [CommonModule],
  templateUrl: './quick-stats.html',
})
export class QuickStats implements OnInit, OnDestroy {
  stats: Stat[] = [
    { label: 'Years Experience', value: 0, suffix: '+', duration: 2000 },
    { label: 'Projects Delivered', value: 0, suffix: '+', duration: 2500 },
    { label: 'API Endpoints Built', value: 0, suffix: '+', duration: 3000 },
    { label: 'System Uptime', value: 0, suffix: '%', duration: 2000 },
  ];

  // MAYBE LATER: Get these values from the data
  private targetValues = [3, 15, 500, 99.9];
  private intervals: ReturnType<typeof setInterval>[] = [];

  ngOnInit() {
    this.animateStats();
  }

  ngOnDestroy() {
    this.intervals.forEach((interval) => clearInterval(interval));
  }

  private animateStats() {
    this.stats.forEach((stat, index) => {
      const target = this.targetValues[index];
      const increment = target / (stat.duration / 16);

      const interval = setInterval(() => {
        if (stat.value < target) {
          stat.value = Math.min(stat.value + increment, target);
        } else {
          clearInterval(interval);
          stat.value = target;
        }
      }, 16);

      this.intervals.push(interval);
    });
  }
}
