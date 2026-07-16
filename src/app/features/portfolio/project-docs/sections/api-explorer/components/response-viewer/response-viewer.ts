import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-response-viewer',
  imports: [CommonModule],
  templateUrl: './response-viewer.html',
})
export class ResponseViewer implements OnInit {
  @Input({ required: true }) responses: ApiResponse[] = [];
  selectedResponse: ApiResponse | null = null;

  ngOnInit() {
    if (this.responses && this.responses.length > 0) {
      this.selectedResponse = this.responses[0];
    }
  }

  selectResponse(response: ApiResponse) {
    this.selectedResponse = response;
  }

  getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return 'badge-success';
    if (status >= 300 && status < 400) return 'badge-primary';
    if (status >= 400 && status < 500) return 'badge-warning';
    return 'badge-error';
  }
}
