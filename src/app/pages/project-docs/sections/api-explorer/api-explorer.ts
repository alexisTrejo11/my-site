import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoint } from './api-explorer.model';
import { EndpointList } from './components/endpoint-list/endpoint-list';
import { EndpointDetail } from './components/endpoint-detail/endpoint-detail';
import { RequestBuilder } from './components/request-builder/request-builder';
import { ResponseViewer } from './components/response-viewer/response-viewer';
import { SchemaVisualizer } from './components/schema-visualizer/schema-visualizer';

@Component({
  selector: 'app-api-explorer',
  standalone: true,
  imports: [
    CommonModule,
    EndpointList,
    EndpointDetail,
    RequestBuilder,
    ResponseViewer,
    SchemaVisualizer,
  ],
  templateUrl: './api-explorer.html',
})
export class ApiExplorer implements OnInit {
  projectId: string = '';
  selectedEndpoint: ApiEndpoint | null = null;
  selectedTag = 'All';

  endpoints = input.required<ApiEndpoint[]>();
  tags: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';

    this.tags = ['All', ...new Set(this.endpoints().flatMap((e) => e.tags))];

    if (this.endpoints.length > 0) {
      this.selectedEndpoint = this.endpoints()[0];
    }
  }

  get filteredEndpoints(): ApiEndpoint[] {
    if (this.selectedTag === 'All') {
      return this.endpoints();
    }
    return this.endpoints().filter((e) => e.tags.includes(this.selectedTag));
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }

  selectEndpoint(endpoint: ApiEndpoint) {
    this.selectedEndpoint = endpoint;
  }
}
