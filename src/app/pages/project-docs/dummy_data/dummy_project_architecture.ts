import {
  DiagramConnection,
  DiagramNode,
  FlowStep,
  LegendItem,
  TechDecisionModel,
  ArchitectureFeature,
  ArchitectureLayer,
  DesignPattern,
  StrategyItem,
  CacheStrategy,
} from '../../../core/models/project-docs.models';

export const ARCHITECURE_FEATURES_DUMMY: ArchitectureFeature[] = [
  {
    title: 'Domain-Driven',
    emoji: '🎯',
    description: 'Services by domain',
  },
  {
    title: 'Event-Driven',
    emoji: '🔄',
    description: 'Async communication',
  },
  {
    title: 'Auto-Scaling',
    emoji: '📈',
    description: 'Based on traffic',
  },
];

export const ARCHITECTURE_LAYER_DUMMY: ArchitectureLayer[] = [
  {
    name: 'Client Layer',
    description: 'Frontend applications and mobile clients consuming our APIs',
    components: ['Web App (React)', 'Mobile App (React Native)', 'Admin Dashboard', 'PWA'],
    color: 'from-blue-500 to-cyan-500',
    expanded: false,
    responsibilities: [
      'Render user interfaces',
      'Handle user input and interactions',
      'Client-side validation',
      'Manage local state and caching',
      'API communication and error handling',
    ],
    technologies: ['Angular 17', 'React 18', 'Vue 3', 'Tailwind CSS', 'RxJS', 'React Query'],
  },
  {
    name: 'API Gateway',
    description: 'Entry point handling authentication, rate limiting, and request routing',
    components: ['Kong Gateway', 'OAuth2 Service', 'Rate Limiter', 'Load Balancer', 'API Gateway'],
    color: 'from-purple-500 to-pink-500',
    expanded: false,
    responsibilities: [
      'Request routing and composition',
      'Authentication and authorization',
      'Rate limiting and throttling',
      'Request/response transformation',
      'Caching and logging',
    ],
    technologies: ['Kong', 'Apache APISIX', 'OAuth 2.0', 'JWT', 'OpenID Connect'],
  },
  {
    name: 'Microservices',
    description: 'Domain-driven services handling business logic with bounded contexts',
    components: [
      'User Service',
      'Product Service',
      'Order Service',
      'Payment Service',
      'Notification Service',
      'Inventory Service',
      'Analytics Service',
    ],
    color: 'from-emerald-500 to-teal-500',
    expanded: false,
    responsibilities: [
      'Domain business logic implementation',
      'Data persistence and management',
      'Inter-service communication',
      'Event publishing and consumption',
      'Health checks and monitoring',
    ],
    technologies: ['NestJS', 'Spring Boot', 'Go', 'gRPC', 'GraphQL', 'RabbitMQ', 'Kafka'],
  },
  {
    name: 'Data Layer',
    description: 'Polyglot persistent storage and distributed caching systems',
    components: [
      'PostgreSQL (Primary)',
      'MongoDB (Catalog)',
      'Redis (Cache)',
      'S3 (Files)',
      'Elasticsearch',
    ],
    color: 'from-orange-500 to-amber-500',
    expanded: false,
    responsibilities: [
      'Relational data storage and transactions',
      'Document storage for flexible schemas',
      'In-memory caching for performance',
      'File and blob storage',
      'Search indexing and queries',
    ],
    technologies: [
      'PostgreSQL 15',
      'MongoDB 7',
      'Redis 7',
      'AWS S3',
      'Elasticsearch 8',
      'TimescaleDB',
    ],
  },
  {
    name: 'Infrastructure',
    description: 'Cloud-native DevOps, orchestration, and observability platform',
    components: [
      'Kubernetes',
      'Docker',
      'Prometheus',
      'Grafana',
      'ELK Stack',
      'CI/CD Pipeline',
      'Service Mesh',
    ],
    color: 'from-rose-500 to-fuchsia-500',
    expanded: false,
    responsibilities: [
      'Container orchestration and scaling',
      'Monitoring and alerting',
      'Log aggregation and analysis',
      'Continuous integration/deployment',
      'Service discovery and networking',
    ],
    technologies: ['Kubernetes', 'Docker', 'Helm', 'Prometheus', 'Grafana', 'Istio', 'GitLab CI'],
  },
];

export const DESING_PATTERN_DUMMY: DesignPattern[] = [
  {
    title: 'API Gateway Pattern',
    emoji: '🎯',
    description:
      'Single entry point for all client requests, handling cross-cutting concerns like authentication and rate limiting.',
    category: 'Integration',
    badge: 'Kong Gateway',
  },
  {
    title: 'Database per Service',
    emoji: '🗄️',
    description:
      'Each microservice owns its database, ensuring loose coupling and independent scalability.',
    category: 'Persistence',
    badge: 'Polyglot Persistence',
  },
  {
    title: 'Event Sourcing',
    emoji: '🔄',
    description:
      'Critical operations stored as immutable events, enabling audit trails and temporal queries.',
    category: 'Event-Driven',
    badge: 'Event Store',
  },
  {
    title: 'Circuit Breaker',
    emoji: '🛡️',
    description:
      'Prevents cascading failures by detecting and isolating failing services automatically.',
    category: 'Resilience',
    badge: 'Fault Tolerance',
  },
  {
    title: 'CQRS Pattern',
    emoji: '📦',
    description:
      'Separates read and write operations for optimized query performance and scalability.',
    category: 'Query',
    badge: 'Read/Write Separation',
  },
  {
    title: 'Saga Pattern',
    emoji: '🔐',
    description: 'Manages distributed transactions across microservices with compensating actions.',
    category: 'Transaction',
    badge: 'Distributed Transactions',
  },
  {
    title: 'Sidecar Pattern',
    emoji: '🚗',
    description: 'Deploy helper components alongside main service for cross-cutting concerns.',
    category: 'Deployment',
    badge: 'Service Mesh',
  },
  {
    title: 'BFF Pattern',
    emoji: '👥',
    description:
      'Backend for Frontend - specialized APIs per client type for optimal data delivery.',
    category: 'API Design',
    badge: 'Client-Specific APIs',
  },
];

export const SCALING_STRATEGIES_DUMMY: StrategyItem[] = [
  {
    title: 'Auto-scaling',
    description: 'Based on CPU (70% threshold) and memory metrics with predictive scaling',
  },
  {
    title: 'Load Balancing',
    description: 'Round-robin, least connections, and IP hash algorithms across instances',
  },
  {
    title: 'Stateless Design',
    description: 'All services stateless for easy horizontal replication and scaling',
  },
  {
    title: 'Read Replicas',
    description: 'Database read replicas for high-volume query workloads',
  },
];

// Estrategias de caching
export const CACHING_STRATEGY_DUMMY: CacheStrategy[] = [
  {
    name: 'Redis Cache',
    description: 'Distributed in-memory cache for frequently accessed data and session storage',
    ttl: '15min - 24h',
    coverage: '80%',
  },
  {
    name: 'CDN Edge Cache',
    description: 'Global CDN for static assets, images, and media with edge locations',
    ttl: '1h - 1y',
    coverage: '95%',
  },
  {
    name: 'Database Query Cache',
    description: 'Optimized query caching with intelligent invalidation strategies',
    ttl: '5min - 1h',
    coverage: '60%',
  },
  {
    name: 'Browser Cache',
    description: 'HTTP caching headers for client-side caching of static resources',
    ttl: '1h - 7d',
    coverage: '90%',
  },
];

export const DECISIONS_DUMMY: TechDecisionModel[] = [
  {
    title: 'Why Microservices over Monolith?',
    problem: 'Need for independent scaling and team autonomy as the system grows',
    solution: 'Adopted microservices architecture with domain-driven design principles',
    alternatives: ['Monolithic architecture', 'Modular monolith', 'Serverless functions'],
    outcome:
      'Services can be scaled independently, deployed separately, and teams work autonomously. 99.9% uptime achieved.',
    icon: '🏗️',
  },
  {
    title: 'PostgreSQL for Transactional Data',
    problem: 'Required ACID compliance and complex relational queries for orders and users',
    solution: 'PostgreSQL with read replicas for horizontal read scaling',
    alternatives: ['MySQL', 'MongoDB', 'CockroachDB'],
    outcome:
      'Strong consistency guarantees, excellent query performance with proper indexing. Handles 10K+ queries/sec.',
    icon: '🐘',
  },
  {
    title: 'Redis for Distributed Caching',
    problem: 'Database load was high due to repeated queries for frequently accessed data',
    solution: 'Implemented Redis with TTL-based cache invalidation strategy',
    alternatives: ['Memcached', 'Application-level caching', 'Database query cache'],
    outcome: 'Reduced database load by 70%, improved API response time from 200ms to <50ms.',
    icon: '⚡',
  },
  {
    title: 'RabbitMQ for Message Queue',
    problem: 'Need for reliable async communication between services with retry logic',
    solution: 'RabbitMQ with topic exchanges and dead letter queues',
    alternatives: ['Apache Kafka', 'AWS SQS', 'Redis Pub/Sub'],
    outcome:
      'Reliable message delivery with automatic retries. Handles 100K+ messages/day with zero data loss.',
    icon: '📮',
  },
  {
    title: 'Kubernetes for Orchestration',
    problem: 'Managing deployments across 12+ services with auto-scaling requirements',
    solution: 'Kubernetes with Helm charts and horizontal pod autoscaling',
    alternatives: ['Docker Swarm', 'AWS ECS', 'Nomad'],
    outcome:
      'Zero-downtime deployments, automatic scaling based on metrics, self-healing capabilities.',
    icon: '☸️',
  },
  {
    title: 'Kong as API Gateway',
    problem: 'Cross-cutting concerns (auth, rate limiting) repeated across services',
    solution: 'Kong Gateway with OAuth2 plugin and rate limiting policies',
    alternatives: ['AWS API Gateway', 'NGINX Plus', 'Traefik'],
    outcome:
      'Centralized auth and rate limiting. Reduced service complexity and improved security posture.',
    icon: '🚪',
  },
];

// Dummy export to make this a module
export const LEGEND_ITEMS_DUMMY: LegendItem[] = [
  {
    type: 'client',
    label: 'Client Applications',
    color: 'from-blue-500 to-cyan-500',
    icon: '💻',
  },
  { type: 'gateway', label: 'API Gateway', color: 'from-purple-500 to-pink-500', icon: '🚪' },
  { type: 'service', label: 'Microservices', color: 'from-emerald-500 to-teal-500', icon: '⚙️' },
  { type: 'database', label: 'Databases', color: 'from-amber-500 to-orange-500', icon: '🗄️' },
  { type: 'queue', label: 'Message Queue', color: 'from-rose-500 to-fuchsia-500', icon: '📮' },
  { type: 'monitoring', label: 'Monitoring', color: 'from-indigo-500 to-violet-500', icon: '📊' },
];

export const NODES_DUMMY: DiagramNode[] = [
  // Client Layer
  { id: 'web', label: 'Web App', type: 'client', x: 15, y: 10, status: 'healthy', traffic: 85 },
  {
    id: 'mobile',
    label: 'Mobile App',
    type: 'client',
    x: 35,
    y: 10,
    status: 'healthy',
    traffic: 75,
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    type: 'client',
    x: 55,
    y: 10,
    status: 'healthy',
    traffic: 40,
  },

  // API Gateway Layer
  {
    id: 'gateway',
    label: 'API Gateway',
    type: 'gateway',
    x: 35,
    y: 25,
    status: 'healthy',
    traffic: 95,
  },

  // Services Layer
  {
    id: 'auth',
    label: 'Auth Service',
    type: 'service',
    x: 10,
    y: 45,
    status: 'healthy',
    traffic: 65,
  },
  {
    id: 'users',
    label: 'Users Service',
    type: 'service',
    x: 25,
    y: 45,
    status: 'healthy',
    traffic: 70,
  },
  {
    id: 'products',
    label: 'Products Service',
    type: 'service',
    x: 40,
    y: 45,
    status: 'warning',
    traffic: 85,
  },
  {
    id: 'orders',
    label: 'Orders Service',
    type: 'service',
    x: 55,
    y: 45,
    status: 'healthy',
    traffic: 90,
  },
  {
    id: 'payments',
    label: 'Payments Service',
    type: 'service',
    x: 70,
    y: 45,
    status: 'healthy',
    traffic: 80,
  },

  // Message Queue
  {
    id: 'queue',
    label: 'Message Queue',
    type: 'queue',
    x: 85,
    y: 35,
    status: 'healthy',
    traffic: 60,
  },

  // Data Layer
  {
    id: 'postgres',
    label: 'PostgreSQL',
    type: 'database',
    x: 15,
    y: 70,
    status: 'healthy',
    traffic: 55,
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    type: 'database',
    x: 35,
    y: 70,
    status: 'healthy',
    traffic: 45,
  },
  {
    id: 'redis',
    label: 'Redis Cache',
    type: 'database',
    x: 55,
    y: 70,
    status: 'healthy',
    traffic: 90,
  },

  // Monitoring
  {
    id: 'monitoring',
    label: 'Monitoring',
    type: 'monitoring',
    x: 85,
    y: 65,
    status: 'healthy',
    traffic: 25,
  },
];

export const CONNECTIONS_DUMMY: DiagramConnection[] = [
  // Client to Gateway
  {
    id: 'web-gateway',
    from: 'web',
    to: 'gateway',
    label: 'HTTPS',
    protocol: 'REST',
    isActive: true,
  },
  {
    id: 'mobile-gateway',
    from: 'mobile',
    to: 'gateway',
    label: 'HTTPS',
    protocol: 'REST',
    isActive: true,
  },
  {
    id: 'admin-gateway',
    from: 'admin',
    to: 'gateway',
    label: 'HTTPS',
    protocol: 'REST',
    isActive: true,
  },

  // Gateway to Services
  {
    id: 'gateway-auth',
    from: 'gateway',
    to: 'auth',
    label: 'JWT Auth',
    protocol: 'gRPC',
    isActive: true,
  },
  {
    id: 'gateway-users',
    from: 'gateway',
    to: 'users',
    label: 'User Data',
    protocol: 'REST',
    isActive: true,
  },
  {
    id: 'gateway-products',
    from: 'gateway',
    to: 'products',
    label: 'Products',
    protocol: 'GraphQL',
    isActive: true,
  },
  {
    id: 'gateway-orders',
    from: 'gateway',
    to: 'orders',
    label: 'Orders',
    protocol: 'REST',
    isActive: true,
  },
  {
    id: 'gateway-payments',
    from: 'gateway',
    to: 'payments',
    label: 'Payments',
    protocol: 'gRPC',
    isActive: true,
  },

  // Service to Service
  {
    id: 'users-auth',
    from: 'users',
    to: 'auth',
    label: 'Auth Check',
    protocol: 'gRPC',
    isActive: true,
  },
  {
    id: 'orders-products',
    from: 'orders',
    to: 'products',
    label: 'Stock Check',
    protocol: 'REST',
    isActive: true,
  },
  {
    id: 'orders-payments',
    from: 'orders',
    to: 'payments',
    label: 'Process Payment',
    protocol: 'gRPC',
    isActive: true,
  },

  // Service to Queue
  {
    id: 'orders-queue',
    from: 'orders',
    to: 'queue',
    label: 'Order Events',
    protocol: 'AMQP',
    isActive: true,
  },
  {
    id: 'products-queue',
    from: 'products',
    to: 'queue',
    label: 'Inventory Events',
    protocol: 'AMQP',
    isActive: true,
  },

  // Service to Database
  {
    id: 'users-postgres',
    from: 'users',
    to: 'postgres',
    label: 'User Data',
    protocol: 'SQL',
    isActive: true,
  },
  {
    id: 'products-mongo',
    from: 'products',
    to: 'mongo',
    label: 'Product Catalog',
    protocol: 'NoSQL',
    isActive: true,
  },
  {
    id: 'orders-postgres',
    from: 'orders',
    to: 'postgres',
    label: 'Order Data',
    protocol: 'SQL',
    isActive: true,
  },
  {
    id: 'payments-postgres',
    from: 'payments',
    to: 'postgres',
    label: 'Transaction Log',
    protocol: 'SQL',
    isActive: true,
  },
  {
    id: 'auth-redis',
    from: 'auth',
    to: 'redis',
    label: 'Session Cache',
    protocol: 'Redis',
    isActive: true,
  },
  {
    id: 'products-redis',
    from: 'products',
    to: 'redis',
    label: 'Product Cache',
    protocol: 'Redis',
    isActive: true,
  },
  {
    id: 'products-s3',
    from: 'products',
    to: 's3',
    label: 'Product Images',
    protocol: 'HTTP',
    isActive: true,
  },

  // Monitoring
  {
    id: 'monitoring-all',
    from: 'monitoring',
    to: 'gateway',
    label: 'Metrics',
    protocol: 'Prometheus',
    isActive: true,
  },
];

export const REQUEST_FLOW_DUMMY: FlowStep[] = [
  {
    number: 1,
    title: 'Client Request',
    description:
      'User initiates action from web/mobile app. Request includes JWT token for authentication.',
    icon: '📱',
  },
  {
    number: 2,
    title: 'API Gateway',
    description:
      'Gateway validates token, checks rate limits, and routes to appropriate microservice.',
    icon: '🚪',
  },
  {
    number: 3,
    title: 'Service Layer',
    description:
      'Microservice processes business logic, validates data, and checks cache for existing data.',
    icon: '⚙️',
  },
  {
    number: 4,
    title: 'Data Access',
    description: 'Query database if cache miss. Update cache with fresh data (TTL: 15min).',
    icon: '🗄️',
  },
  {
    number: 5,
    title: 'Event Publishing',
    description:
      'For state-changing operations, publish event to message queue for async processing.',
    icon: '📮',
  },
  {
    number: 6,
    title: 'Response',
    description:
      'Return formatted response through gateway. Includes pagination, metadata, and links.',
    icon: '✅',
  },
];

export const EVENT_FLOW_DUMY: FlowStep[] = [
  {
    number: 1,
    title: 'Event Trigger',
    description: 'Service publishes event to RabbitMQ (e.g., "OrderPlaced", "UserRegistered").',
    icon: '🔔',
  },
  {
    number: 2,
    title: 'Event Routing',
    description: 'Message broker routes event to all subscribed services based on routing keys.',
    icon: '🔀',
  },
  {
    number: 3,
    title: 'Consumer Processing',
    description:
      'Each subscriber processes event independently (notifications, analytics, inventory update).',
    icon: '⚡',
  },
  {
    number: 4,
    title: 'Retry & DLQ',
    description:
      'Failed messages retry 3x with exponential backoff, then move to Dead Letter Queue.',
    icon: '🔄',
  },
];
