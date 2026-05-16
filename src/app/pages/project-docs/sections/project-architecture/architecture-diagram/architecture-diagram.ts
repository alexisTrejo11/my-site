import { Component, OnInit, HostListener, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramConnection, DiagramNode } from '../../../../../core/models/project-docs.models';

@Component({
  selector: 'app-architecture-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-diagram.html',
})
export class ArchitectureDiagram implements OnInit {
  selectedNode: DiagramNode | null = null;
  hoveredConnection: string | null = null;
  viewBox = '0 0 100 100';
  isPanning = false;
  panStart: { x: number; y: number } = { x: 0, y: 0 };
  scale = 1;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  simulationActive = true;

  nodes = input.required<DiagramNode[]>();
  connections = input.required<DiagramConnection[]>();

  ngOnInit() {
    // Simular tráfico en las conexiones
    if (this.simulationActive) {
      setInterval(() => this.updateTrafficSimulation(), 2000);
    }
  }

  getNodeColor(type: string): string {
    const colors: Record<string, string> = {
      client: 'from-blue-500 to-cyan-500',
      gateway: 'from-purple-500 to-pink-500',
      service: 'from-emerald-500 to-teal-500',
      database: 'from-amber-500 to-orange-500',
      queue: 'from-rose-500 to-fuchsia-500',
      monitoring: 'from-indigo-500 to-violet-500',
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  }

  getNodeIcon(type: string): string {
    const icons: Record<string, string> = {
      client: '💻',
      gateway: '🚪',
      service: '⚙️',
      database: '🗄️',
      queue: '📮',
      monitoring: '📊',
    };
    return icons[type] || '📦';
  }

  getStatusColor(status?: string): string {
    const colors: Record<string, string> = {
      healthy: 'text-emerald-500 bg-emerald-500/10',
      warning: 'text-amber-500 bg-amber-500/10',
      error: 'text-rose-500 bg-rose-500/10',
    };
    return colors[status || 'healthy'] || colors['healthy'];
  }

  getProtocolColor(protocol: string): string {
    const colors: Record<string, string> = {
      REST: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
      GraphQL: 'bg-pink-500/20 text-pink-600 dark:text-pink-400',
      gRPC: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      SQL: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
      NoSQL: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
      Redis: 'bg-red-500/20 text-red-600 dark:text-red-400',
      AMQP: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
      Prometheus: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
      HTTP: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    };
    return colors[protocol] || 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
  }

  selectNode(node: DiagramNode) {
    this.selectedNode = this.selectedNode?.id === node.id ? null : node;
  }

  getNodeConnections(nodeId: string): DiagramConnection[] {
    return this.connections().filter((conn) => conn.from === nodeId || conn.to === nodeId);
  }

  getNodeDescription(node: DiagramNode): string {
    const descriptions: Record<string, string> = {
      web: 'React-based progressive web application served via CloudFront CDN',
      mobile: 'Cross-platform React Native app supporting iOS and Android',
      admin: 'Angular-based admin dashboard for internal operations',
      gateway: 'Kong API Gateway with OAuth2, rate limiting, and request routing',
      auth: 'Authentication and authorization service using JWT tokens',
      users: 'User profile management, preferences, and account settings',
      products: 'Product catalog with search, filtering, and inventory management',
      orders: 'Order processing, fulfillment, and status tracking',
      payments: 'Payment processing integration with Stripe and PayPal',
      queue: 'RabbitMQ message broker for async event processing',
      postgres: 'PostgreSQL relational database for transactional data',
      mongo: 'MongoDB document store for flexible product catalog',
      redis: 'Redis in-memory cache for sessions and frequent queries',
      s3: 'Amazon S3 for product images and file storage',
      monitoring: 'Prometheus + Grafana for metrics, logging, and alerts',
    };
    return descriptions[node.id] || 'System component';
  }

  updateTrafficSimulation() {
    if (!this.simulationActive) return;

    // Simular cambios aleatorios de tráfico
    this.nodes().forEach((node) => {
      if (Math.random() > 0.7) {
        const change = Math.random() * 20 - 10; // -10 to +10
        node.traffic = Math.max(0, Math.min(100, (node.traffic || 50) + change));
      }
    });
  }

  toggleSimulation() {
    this.simulationActive = !this.simulationActive;
  }

  resetView() {
    this.scale = 1;
    this.offset = { x: 0, y: 0 };
    this.viewBox = '0 0 100 100';
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.scale = Math.max(0.5, Math.min(2, this.scale + delta));
  }

  onPanStart(event: MouseEvent) {
    this.isPanning = true;
    this.panStart = { x: event.clientX, y: event.clientY };
  }

  onPanMove(event: MouseEvent) {
    if (!this.isPanning) return;

    const dx = event.clientX - this.panStart.x;
    const dy = event.clientY - this.panStart.y;

    this.offset.x += dx * 0.1;
    this.offset.y += dy * 0.1;

    this.panStart = { x: event.clientX, y: event.clientY };
  }

  onPanEnd() {
    this.isPanning = false;
  }

  getConnectionMidpoint(conn: DiagramConnection, axis: 'x' | 'y'): number {
    const fromNode = this.nodes().find((n) => n.id === conn.from);
    const toNode = this.nodes().find((n) => n.id === conn.to);
    if (!fromNode || !toNode) return 0;

    return axis === 'x' ? (fromNode.x + toNode.x) / 2 : (fromNode.y + toNode.y) / 2;
  }

  getNodeX(nodeId: string): number {
    const node = this.nodes().find((n) => n.id === nodeId);
    return node ? node.x : 0;
  }

  getNodeY(nodeId: string): number {
    const node = this.nodes().find((n) => n.id === nodeId);
    return node ? node.y : 0;
  }
}
