import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiEndpoint } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-endpoint-list',
  imports: [CommonModule],
  templateUrl: './endpoint-list.html',
})
export class EndpointList {
  endpoints = input<ApiEndpoint[]>([]);
  selectedEndpoint = input<ApiEndpoint | null>(null);
  endpointSelected = output<ApiEndpoint>();

  selectEndpoint(endpoint: ApiEndpoint) {
    this.endpointSelected.emit(endpoint);
  }

  getMethodColor(method: string): string {
    const colors: Record<string, string> = {
      GET: 'badge-success',
      POST: 'badge-primary',
      PUT: 'badge-warning',
      PATCH: 'badge-warning',
      DELETE: 'badge-error',
    };
    return colors[method] || 'badge-gray';
  }
}
