/**
 * Project Features Models
 * Models for documenting backend project features in an elegant way
 */

import {
  FeatureCategory,
  FeatureStatus,
  ProjectFeature,
} from '../../../../core/models/project-docs.models';

export interface FeatureCategoryInfo {
  id: FeatureCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
}

export const FEATURE_CATEGORIES: FeatureCategoryInfo[] = [
  {
    id: 'authentication',
    label: 'Authentication',
    icon: '🔐',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100',
    darkBgColor: 'dark:bg-emerald-900/30',
  },
  {
    id: 'database',
    label: 'Database',
    icon: '🗄️',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100',
    darkBgColor: 'dark:bg-blue-900/30',
  },
  {
    id: 'api',
    label: 'API',
    icon: '🔌',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100',
    darkBgColor: 'dark:bg-purple-900/30',
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🛡️',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100',
    darkBgColor: 'dark:bg-red-900/30',
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: '⚡',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100',
    darkBgColor: 'dark:bg-amber-900/30',
  },
  {
    id: 'integration',
    label: 'Integration',
    icon: '🔗',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-100',
    darkBgColor: 'dark:bg-cyan-900/30',
  },
  {
    id: 'messaging',
    label: 'Messaging',
    icon: '📨',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100',
    darkBgColor: 'dark:bg-indigo-900/30',
  },
  {
    id: 'caching',
    label: 'Caching',
    icon: '💾',
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100',
    darkBgColor: 'dark:bg-teal-900/30',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: '📊',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100',
    darkBgColor: 'dark:bg-orange-900/30',
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: '🧪',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100',
    darkBgColor: 'dark:bg-pink-900/30',
  },
];

export const FEATURE_STATUS_CONFIG: Record<
  FeatureStatus,
  { label: string; color: string; bgColor: string }
> = {
  stable: {
    label: 'Stable',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  beta: {
    label: 'Beta',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-100 dark:bg-blue-900/40',
  },
  experimental: {
    label: 'Experimental',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40',
  },
  deprecated: {
    label: 'Deprecated',
    color: 'text-gray-700 dark:text-gray-300',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
};

/**
 * Dummy data for demonstration
 */
export const DUMMY_PROJECT_FEATURES: ProjectFeature[] = [
  {
    id: 'jwt-auth',
    title: 'JWT Authentication',
    description:
      'Secure token-based authentication system with refresh tokens, role-based access control (RBAC), and multi-factor authentication support.',
    icon: '🔐',
    category: 'authentication',
    status: 'stable',
    highlights: [
      'Access & Refresh token rotation',
      'Role-based permissions (Admin, User, Guest)',
      'OAuth 2.0 integration (Google, GitHub)',
      'Session management & device tracking',
      'Password encryption with bcrypt',
    ],
    techStack: ['Spring Security', 'JWT', 'OAuth 2.0', 'Redis'],
    metrics: [
      { label: 'Token Expiry', value: '15min', icon: '⏱️' },
      { label: 'Refresh Window', value: '7 days', icon: '🔄' },
      { label: 'Auth Latency', value: '<50ms', icon: '⚡' },
    ],
  },
  {
    id: 'postgres-db',
    title: 'PostgreSQL Database',
    description:
      'Robust relational database design with optimized queries, connection pooling, and automated migrations using Flyway.',
    icon: '🗄️',
    category: 'database',
    status: 'stable',
    highlights: [
      'Normalized schema design (3NF)',
      'Indexed queries for fast lookups',
      'Connection pooling with HikariCP',
      'Automated migrations with Flyway',
      'Read replicas for scalability',
    ],
    techStack: ['PostgreSQL', 'HikariCP', 'Flyway', 'JPA/Hibernate'],
    metrics: [
      { label: 'Query Time', value: '<10ms', trend: 'down', icon: '📉' },
      { label: 'Pool Size', value: '20', icon: '🏊' },
      { label: 'Uptime', value: '99.99%', trend: 'stable', icon: '✅' },
    ],
  },
  {
    id: 'rest-api',
    title: 'RESTful API Design',
    description:
      'Well-documented REST API following OpenAPI 3.0 specifications with comprehensive error handling and versioning support.',
    icon: '🔌',
    category: 'api',
    status: 'stable',
    highlights: [
      'OpenAPI 3.0 documentation',
      'Semantic versioning (v1, v2)',
      'HATEOAS hypermedia links',
      'Rate limiting & throttling',
      'Comprehensive error responses',
    ],
    techStack: ['Spring Boot', 'OpenAPI', 'Swagger UI', 'Spring HATEOAS'],
    metrics: [
      { label: 'Endpoints', value: '45+', icon: '🎯' },
      { label: 'Avg Response', value: '120ms', trend: 'down', icon: '⚡' },
      { label: 'Rate Limit', value: '1000/hr', icon: '🚦' },
    ],
  },
  {
    id: 'security-layer',
    title: 'Security Layer',
    description:
      'Multi-layered security implementation including CORS, CSRF protection, SQL injection prevention, and security headers.',
    icon: '🛡️',
    category: 'security',
    status: 'stable',
    highlights: [
      'CORS configuration for allowed origins',
      'CSRF token validation',
      'SQL injection prevention',
      'XSS protection headers',
      'Content Security Policy (CSP)',
    ],
    techStack: ['Spring Security', 'OWASP', 'Helmet.js patterns'],
    metrics: [
      { label: 'Security Score', value: 'A+', icon: '🏆' },
      { label: 'Vulnerabilities', value: '0', trend: 'stable', icon: '🔒' },
      { label: 'Last Audit', value: '2 days', icon: '📋' },
    ],
  },
  {
    id: 'redis-cache',
    title: 'Redis Caching',
    description:
      'Distributed caching layer with Redis for session storage, API response caching, and real-time data structures.',
    icon: '💾',
    category: 'caching',
    status: 'stable',
    highlights: [
      'Session storage & management',
      'API response caching',
      'Cache invalidation strategies',
      'Pub/Sub for real-time events',
      'TTL-based expiration',
    ],
    techStack: ['Redis', 'Spring Cache', 'Lettuce Client'],
    metrics: [
      { label: 'Hit Rate', value: '94%', trend: 'up', icon: '🎯' },
      { label: 'Avg Latency', value: '<1ms', icon: '⚡' },
      { label: 'Memory', value: '512MB', icon: '💿' },
    ],
  },
  {
    id: 'kafka-messaging',
    title: 'Event-Driven Messaging',
    description:
      'Apache Kafka integration for asynchronous event processing, microservice communication, and event sourcing patterns.',
    icon: '📨',
    category: 'messaging',
    status: 'beta',
    highlights: [
      'Event-driven architecture',
      'Async message processing',
      'Dead letter queue handling',
      'Message serialization (Avro)',
      'Consumer group management',
    ],
    techStack: ['Apache Kafka', 'Spring Kafka', 'Avro', 'Schema Registry'],
    metrics: [
      { label: 'Throughput', value: '10K/s', trend: 'up', icon: '📈' },
      { label: 'Partitions', value: '12', icon: '📦' },
      { label: 'Lag', value: '<100', trend: 'down', icon: '📉' },
    ],
  },
  {
    id: 'performance-opt',
    title: 'Performance Optimization',
    description:
      'Comprehensive performance tuning including query optimization, lazy loading, pagination, and async processing.',
    icon: '⚡',
    category: 'performance',
    status: 'stable',
    highlights: [
      'N+1 query prevention',
      'Lazy loading strategies',
      'Cursor-based pagination',
      'Async/non-blocking I/O',
      'Response compression (gzip)',
    ],
    techStack: ['Spring WebFlux', 'Project Reactor', 'Micrometer'],
    metrics: [
      { label: 'P99 Latency', value: '200ms', trend: 'down', icon: '📊' },
      { label: 'Throughput', value: '5K RPS', trend: 'up', icon: '🚀' },
      { label: 'CPU Usage', value: '45%', trend: 'stable', icon: '💻' },
    ],
  },
  {
    id: 'monitoring',
    title: 'Observability Stack',
    description:
      'Full observability with distributed tracing, metrics collection, centralized logging, and alerting systems.',
    icon: '📊',
    category: 'monitoring',
    status: 'stable',
    highlights: [
      'Distributed tracing (Jaeger)',
      'Metrics with Prometheus',
      'Grafana dashboards',
      'ELK stack for logging',
      'PagerDuty alerting',
    ],
    techStack: ['Prometheus', 'Grafana', 'Jaeger', 'ELK Stack'],
    metrics: [
      { label: 'Metrics', value: '150+', icon: '📈' },
      { label: 'Trace Sample', value: '10%', icon: '🔍' },
      { label: 'Log Retention', value: '30 days', icon: '📅' },
    ],
  },
  {
    id: 'testing-suite',
    title: 'Comprehensive Testing',
    description:
      'Multi-layer testing strategy with unit tests, integration tests, contract tests, and end-to-end testing.',
    icon: '🧪',
    category: 'testing',
    status: 'stable',
    highlights: [
      'Unit tests with JUnit 5 & Mockito',
      'Integration tests with Testcontainers',
      'Contract tests with Pact',
      'E2E tests with REST Assured',
      'Mutation testing with PIT',
    ],
    techStack: ['JUnit 5', 'Mockito', 'Testcontainers', 'REST Assured'],
    metrics: [
      { label: 'Coverage', value: '87%', trend: 'up', icon: '📊' },
      { label: 'Unit Tests', value: '450+', icon: '✅' },
      { label: 'E2E Tests', value: '85', icon: '🔄' },
    ],
  },
  {
    id: 'third-party',
    title: 'Third-Party Integrations',
    description:
      'Seamless integration with external services including payment gateways, email providers, and cloud storage.',
    icon: '🔗',
    category: 'integration',
    status: 'stable',
    highlights: [
      'Stripe payment processing',
      'SendGrid email delivery',
      'AWS S3 file storage',
      'Twilio SMS notifications',
      'Webhook event handlers',
    ],
    techStack: ['Stripe SDK', 'AWS SDK', 'SendGrid', 'Twilio'],
    metrics: [
      { label: 'Integrations', value: '8', icon: '🔗' },
      { label: 'Webhook Success', value: '99.8%', trend: 'stable', icon: '✅' },
      { label: 'Retry Queue', value: '<10', trend: 'down', icon: '🔄' },
    ],
  },
];
