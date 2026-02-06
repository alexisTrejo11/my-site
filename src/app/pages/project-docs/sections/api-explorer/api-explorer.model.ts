// REST API Explorer Models

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  tags: string[];
  authenticated: boolean;
  rateLimit: string;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponse[];
}

export interface ApiParameter {
  name: string;
  in: 'path' | 'query' | 'header';
  type: string;
  required: boolean;
  description: string;
  example?: any;
}

export interface ApiRequestBody {
  contentType: string;
  schema: any;
  example: any;
}

export interface ApiResponse {
  status: number;
  description: string;
  schema?: any;
  example: any;
}
