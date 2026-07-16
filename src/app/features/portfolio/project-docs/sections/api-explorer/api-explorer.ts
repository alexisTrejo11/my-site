import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointList } from './components/endpoint-list/endpoint-list';
import { EndpointDetail } from './components/endpoint-detail/endpoint-detail';
import { RequestBuilder } from './components/request-builder/request-builder';
import { ResponseViewer } from './components/response-viewer/response-viewer';
import { SchemaVisualizer } from './components/schema-visualizer/schema-visualizer';
import { BaseDocComponent } from '../../../../../shared/components/base-doc/base-doc';
import { Observable } from 'rxjs';
import { ApiEndpoint, APISchema } from '../../../../../core/models/project-docs.models';

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
export class ApiExplorer extends BaseDocComponent<APISchema> {
  selectedEndpoint: ApiEndpoint | null = null;
  selectedTag = 'All';

  tags: string[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override fetchData(projectId: string): Observable<APISchema> {
    return this.projectService.getProjectApiDocumentation(projectId);
  }

  protected override onDataLoaded(): void {
    this.initializeTagsAndSelection();
  }

  initializeTagsAndSelection(): void {
    this.tags = ['All', ...new Set(this.endpoints.flatMap((e) => e.tags))];

    if (this.endpoints.length > 0) {
      this.selectedEndpoint = this.endpoints[0];
    }
  }

  get filteredEndpoints(): ApiEndpoint[] {
    if (this.selectedTag === 'All') {
      return this.endpoints;
    }
    return this.endpoints.filter((e) => e.tags.includes(this.selectedTag));
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }

  selectEndpoint(endpoint: ApiEndpoint) {
    this.selectedEndpoint = endpoint;
  }

  get endpoints(): ApiEndpoint[] {
    return this.data ? this.data.httpEndpoints : [];
  }
}
