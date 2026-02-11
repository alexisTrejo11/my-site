import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiEndpoint } from '../../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-request-builder',
  imports: [CommonModule, FormsModule],
  templateUrl: './request-builder.html',
})
export class RequestBuilder {
  endpoint = input.required<ApiEndpoint>();

  baseUrl = 'https://api.example.com';
  authToken = '';
  requestBody = '';
  isLoading = false;
  response: any = null;
  error: string | null = null;

  parameterValues: Record<string, any> = {};

  ngOnInit() {
    // Initialize parameter values
    this.endpoint().parameters?.forEach((param) => {
      this.parameterValues[param.name] = param.example || '';
    });

    // Initialize request body
    if (this.endpoint().requestBody) {
      this.requestBody = JSON.stringify(this.endpoint().requestBody?.example, null, 2);
    }
  }

  get fullUrl(): string {
    let url = this.baseUrl + this.endpoint().urlPath;

    // Replace path parameters
    this.endpoint()
      .parameters?.filter((p) => p.in === 'path')
      .forEach((param) => {
        url = url.replace(`{${param.name}}`, this.parameterValues[param.name] || `{${param.name}}`);
      });

    // Add query parameters
    const queryParams = this.endpoint().parameters?.filter(
      (p) => p.in === 'query' && this.parameterValues[p.name],
    );
    if (queryParams && queryParams.length > 0) {
      const query = queryParams
        .map((p) => `${p.name}=${encodeURIComponent(this.parameterValues[p.name])}`)
        .join('&');
      url += `?${query}`;
    }

    return url;
  }

  async sendRequest() {
    this.isLoading = true;
    this.error = null;
    this.response = null;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful response
      const mockResponse = this.endpoint().responses.find(
        (r) => r.status === 200 || r.status === 201,
      );
      this.response = {
        status: mockResponse?.status || 200,
        statusText: mockResponse?.description || 'OK',
        data: mockResponse?.example,
      };
    } catch (err: any) {
      this.error = err.message || 'Request failed';
    } finally {
      this.isLoading = false;
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
}
