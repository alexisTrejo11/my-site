import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipelineStage } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-cicd-pipeline',
  imports: [CommonModule],
  templateUrl: './cicd-pipeline.html',
})
export class CicdPipeline {
  stages: PipelineStage[] = [
    {
      name: 'Build',
      icon: '🔨',
      duration: '~3 min',
      steps: [
        {
          name: 'Checkout Code',
          description: 'Clone repository from GitHub',
          status: 'success',
        },
        {
          name: 'Install Dependencies',
          description: 'npm ci for clean install',
          status: 'success',
        },
        {
          name: 'TypeScript Compilation',
          description: 'Build TypeScript to JavaScript',
          status: 'success',
        },
        {
          name: 'Build Docker Image',
          description: 'Multi-stage Docker build',
          status: 'success',
        },
      ],
    },
    {
      name: 'Test',
      icon: '🧪',
      duration: '~5 min',
      steps: [
        {
          name: 'Unit Tests',
          description: 'Jest test suite with coverage',
          status: 'success',
        },
        {
          name: 'Integration Tests',
          description: 'API and database integration tests',
          status: 'success',
        },
        {
          name: 'E2E Tests',
          description: 'End-to-end workflow testing',
          status: 'success',
        },
        {
          name: 'Code Coverage',
          description: 'Ensure >80% coverage',
          status: 'success',
        },
      ],
    },
    {
      name: 'Security',
      icon: '🔒',
      duration: '~2 min',
      steps: [
        {
          name: 'Dependency Scan',
          description: 'Snyk vulnerability scanning',
          status: 'success',
        },
        {
          name: 'SAST Analysis',
          description: 'Static application security testing',
          status: 'success',
        },
        {
          name: 'Secret Detection',
          description: 'Scan for exposed credentials',
          status: 'success',
        },
      ],
    },
    {
      name: 'Deploy',
      icon: '🚀',
      duration: '~4 min',
      steps: [
        {
          name: 'Push to Registry',
          description: 'Upload Docker image to ECR',
          status: 'success',
        },
        {
          name: 'Update K8s Manifests',
          description: 'Update deployment with new image tag',
          status: 'success',
        },
        {
          name: 'Rolling Update',
          description: 'Zero-downtime deployment',
          status: 'success',
        },
        {
          name: 'Health Check',
          description: 'Verify deployment health',
          status: 'success',
        },
      ],
    },
  ];

  pipelineConfig = `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Build
        run: npm run build
      
      - name: Security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
  
  deploy:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Build and push Docker image
        run: |
          docker build -t myapp:latest .
          docker push myregistry/myapp:latest
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/myapp \\
            myapp=myregistry/myapp:latest`;

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      success: '✅',
      running: '⏳',
      pending: '⏸️',
    };
    return icons[status] || '❓';
  }
}
