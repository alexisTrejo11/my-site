import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EndpointList } from './components/endpoint-list/endpoint-list';
import { EndpointDetail } from './components/endpoint-detail/endpoint-detail';
import { RequestBuilder } from './components/request-builder/request-builder';
import { ResponseViewer } from './components/response-viewer/response-viewer';
import { SchemaVisualizer } from './components/schema-visualizer/schema-visualizer';
import { ProjectsService } from '../../../../services/projects.service';
import { ApiEndpoint, APISchema } from '../../../../core/models/project-docs.models';
import { BaseDocComponent } from '../../../../shared/components/base-doc/base-doc';
import { Observable } from 'rxjs';

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
export class ApiExplorer extends BaseDocComponent<APISchema> implements OnInit {
  selectedEndpoint: ApiEndpoint | null = null;
  selectedTag = 'All';
  service = inject(ProjectsService);

  tags: string[] = [];

  override ngOnInit() {
    this.projectId = this.route.parent?.snapshot.params['projectId'] || '';
    this.service.getProjectApiDocumentation(this.projectId).subscribe((endpoints) => {
      if (endpoints) {
        this.data = endpoints;
      }
      this.initializeTagsAndSelection();
    });
  }

  override fetchData(projectId: string): Observable<APISchema> {
    return this.service.getProjectApiDocumentation(projectId);
  }

  initializeTagsAndSelection() {
    this.tags = ['All', ...new Set(this.endpoints.flatMap((e) => e.tags))];

    if (this.data!.httpEndpoints.length > 0) {
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
