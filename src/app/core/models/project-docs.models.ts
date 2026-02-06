export interface ProjectDocsModel {
  codeShowcase: ProjectCodeShowCase;
  overview: ProjectOverview;
  infrastructure: InfrastructureModel;
  architecture: ProjectArchitectureModel;
  features: ProjectFeatures;
  apis: APIs;
}

// Section: Overview
export interface ProjectOverview {
  problemStatement: OverviewProblemStatement;
  solution: OverviewSolution;
  keyMetrics: OverviewKeyMetrics;
  links: ProjectLinks;
  mediaGallery: MediaGallerySection;
  mediaItems: ProjectMediaItem[];
  metrics: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  subsections?: ProjectSection[];
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  type?: string;
  technologies?: string[];
  year?: number;
  featured?: boolean;
  searchTerm?: string;
}

export interface ProjectLinks {
  github: string | null;
  demo: string | null;
  documentation: string | null;
  dockerHub: string | null;
}

export interface ProjectImages {
  cover: string | null;
  screenshots: string[];
  diagram: string | null;
}

export interface Technology {
  name: string;
  category: string;
  usage: string;
  iconPath: string;
  version?: string;
}

export interface QuickLink {
  title: string;
  description: string;
  url: string;
  iconPath: string;
  color: string;
  external: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  subsections?: ProjectSection[];
}

export interface ProjectMediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  alt?: string;
  category?: 'screenshot' | 'diagram' | 'demo' | 'architecture';
}

export interface MediaGallerySection {
  title: string;
  description?: string;
  items: ProjectMediaItem[];
}

export interface ProjectOverview {
  problemStatement: OverviewProblemStatement;
  solution: OverviewSolution;
  keyMetrics: OverviewKeyMetrics;
}

export interface OverviewProblemStatement {
  problemTitle: string;
  problemDescription: string;
  problemList: string[];
}

export interface OverviewSolution {
  solutionTitle: string;
  solutionList: Solution[];
}

export interface Solution {
  title: string;
  description: string;
}

export interface OverviewKeyMetrics {
  metricsTitle: string;
  metricsList: string[];
}

export interface Technology {
  name: string;
  category: string;
  usage: string;
  icon: string;
  version?: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  alt?: string;
}

export interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  external: boolean;
}

// Section: Code Showcase
export interface ProjectCodeShowCase {
  codeExamples: CodeExample[];
}

export interface CodeShowcase {
  examples: CodeExample[];
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  files: CodeFile[];
  duration?: string;
  views?: number;
  tags?: string[];
}

export interface CodeFile {
  name: string;
  path: string;
  language: string;
  content: string;
  highlighted?: boolean;
  explanation?: string;
}

// Section: Infrastructure
export interface InfrastructureModel {
  deploymentLayers: DeploymentLayer[];
  dockerFiles: DockerFile[];
  // TODO: Add In Existing Project Docs
  cloudServices: CloudService[];
  metrics: InfrastructureMetric[];
}

export interface InfrastructureMetric {
  label: string;
  value: string;
  icon: string;
  description: string;
}

export interface CloudService {
  name: string;
  purpose: string;
  icon: string;
  cost: string;
}

export interface DeploymentLayer {
  name: string;
  components: DeploymentComponent[];
  color: string;
}

export interface DeploymentComponent {
  name: string;
  icon: string;
  description: string;
}

export interface DockerFile {
  service: string;
  content: string;
  description: string;
}

export interface PipelineStage {
  name: string;
  steps: PipelineStep[];
  icon: string;
  duration: string;
}

export interface PipelineStep {
  name: string;
  description: string;
  status: 'success' | 'running' | 'pending';
}

// Section: Features
export interface ProjectFeatures {
  features: ProjectFeature[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: FeatureCategory;
  status: FeatureStatus;
  highlights: string[];
  techStack?: string[];
  metrics?: FeatureMetric[];
  codeSnippet?: CodeSnippet;
}

export interface FeatureMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export type FeatureCategory =
  | 'authentication'
  | 'database'
  | 'api'
  | 'security'
  | 'performance'
  | 'integration'
  | 'messaging'
  | 'caching'
  | 'monitoring'
  | 'testing';

export type FeatureStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

// Section: Architecture
export interface ProjectArchitectureModel {
  layers: ArchitectureLayer[];
  designPatterns: DesignPattern[];
  scalabilityStrategies: StrategyItem[];
  securityStrategies: StrategyItem[];
  cacheStrategies: CacheStrategy[];
  architectureFeatures: ArchitectureFeature[];

  architectureDiagram: ArchitectureDiagramModel;
  dataFlow: DataFlowModel;
  techDecisions: TechDecisionsModel;
}

// Base Architecture Models
export interface ArchitectureLayer {
  name: string;
  description: string;
  components: string[];
  color: string;
  expanded?: boolean;
  responsibilities?: string[];
  technologies?: string[];
}

export interface DesignPattern {
  title: string;
  emoji: string;
  description: string;
  category: string;
  badge: string;
}

export interface StrategyItem {
  title: string;
  description: string;
}

export interface CacheStrategy {
  name: string;
  description: string;
  ttl: string;
  coverage: string;
}

export interface ArchitectureFeature {
  title: string;
  emoji: string;
  description: string;
}

export interface ArchitectureDiagramModel {
  legendItems: LegendItem[];
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

export interface DiagramNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'service' | 'database' | 'queue' | 'monitoring';
  x: number;
  y: number;
  connections?: string[];
  status?: 'healthy' | 'warning' | 'error';
  traffic?: number; // simulated traffic
}

export interface DiagramConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  protocol?: string;
  isActive?: boolean;
}

export interface LegendItem {
  type: string;
  label: string;
  color: string;
  icon: string;
}

export interface DataFlowModel {
  requestFlow: FlowStep[];
  eventFlow: FlowStep[];
}

export interface FlowStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface TechDecisionsModel {
  decisions: TechDecisionModel[];
}

export interface TechDecisionModel {
  title: string;
  problem: string;
  solution: string;
  alternatives: string[];
  outcome: string;
  icon: string;
}

// Section: APIs
// TODO: Need To Create a Adapter Between Swagger and GraphQL Docs to API EXPLORER
interface APIs {
  rest?: RESTAPI;
  graphql?: GraphQLAPI;
  grpc?: GRPCAPI;
  websocket?: WebSocketAPI;
}

// REST API
interface RESTAPI {
  enabled: boolean;
  openapi: Record<string, any>;
  schemaUrl: string | null;
  swaggerUiUrl: string | null;
  redocUrl: string | null;
  basePath: string | null;
  endpointCount: number;
  authenticatedEndpoints: number;
  rateLimits: Record<string, any>;
  authenticationMethods: string[];
  supportedFormats: string[];
  corsEnabled: boolean;
  pagination: Record<string, any>;
  versioning: Record<string, any>;
}

// GraphQL API
interface GraphQLAPI {
  enabled: boolean;
  schema: string;
  schemaUrl: string;
  sdlUrl: string;
  endpoint: string;
  subscriptionEndpoint: string | null;
  playgroundUrl: string;
  voyagerUrl: string | null;
  introspectionEnabled: boolean;
  queries: number;
  mutations: number;
  subscriptions: number;
  types: number;
  directives: string[];
  interfaces: number;
  unions: number;
  enums: number;
  scalars: string[];
  complexityLimit: number | null;
  depthLimit: number | null;
  queryCost: QueryCost;
  caching: GraphQLCaching;
  batching: GraphQLBatching;
  queryDetails: QueryDetails;
  mutationDetails: MutationDetails;
  typeDetails: TypeDetail[];
  inputTypes: InputType[];
}

interface QueryCost {
  maxCost: number | null;
  defaultComplexity: number;
}

interface GraphQLCaching {
  enabled: boolean;
  strategy: string;
}

interface GraphQLBatching {
  enabled: boolean;
  maxBatchSize: number;
}

interface QueryDetails {
  artists: QueryItem[];
  music: QueryItem[];
  users: QueryItem[];
  playlists: QueryItem[];
  interactions: QueryItem[];
}

interface MutationDetails {
  artists: MutationItem[];
  music: MutationItem[];
  users: MutationItem[];
  playlists: MutationItem[];
  interactions: MutationItem[];
}

interface QueryItem {
  name: string;
  description: string;
}

interface MutationItem {
  name: string;
  description: string;
}

interface TypeDetail {
  name: string;
  model?: string;
  description?: string;
  app: string;
}

interface InputType {
  name: string;
  app: string;
  purpose: string;
}

// gRPC API
interface GRPCAPI {
  enabled: boolean;
  protoUrl: string | null;
  reflectionEnabled: boolean;
  services: number;
  methods: number;
}

// WebSocket API
interface WebSocketAPI {
  enabled: boolean;
  endpoint: string | null;
  protocols: string[];
  events: any[];
}
