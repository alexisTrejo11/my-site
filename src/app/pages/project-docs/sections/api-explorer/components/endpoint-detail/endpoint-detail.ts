import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ApiEndpoint } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-endpoint-detail',
  imports: [CommonModule],
  templateUrl: './endpoint-detail.html',
})
export class EndpointDetail {
  endpoint = input.required<ApiEndpoint>();

  getMethodColor(method: string): string {
    const colors: Record<string, string> = {
      GET: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      PATCH: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[method] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
}
