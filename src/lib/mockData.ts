export interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  lastBuild: string;
  status: 'success' | 'failed' | 'running' | 'cancelled';
  duration: string;
  successRate: number;
  buildHistory: Build[];
}

export interface Build {
  id: string;
  number: number;
  status: 'success' | 'failed' | 'running' | 'cancelled';
  duration: string;
  timestamp: string;
  branch: string;
  commit: string;
  author: string;
}

export interface Activity {
  id: string;
  type: 'build' | 'deploy' | 'alert' | 'team';
  message: string;
  project?: string;
  timestamp: string;
  status?: 'success' | 'failed' | 'warning' | 'info';
}

export interface LogAnalysis {
  id: string;
  filename: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  errorType: string;
  rootCause: string;
  suggestedFixes: string[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce API',
    description: 'Main REST API for e-commerce platform',
    repo: 'github.com/acme/ecommerce-api',
    lastBuild: '2 minutes ago',
    status: 'success',
    duration: '3m 42s',
    successRate: 94.2,
    buildHistory: [],
  },
  {
    id: '2',
    name: 'Mobile App CI',
    description: 'React Native mobile application',
    repo: 'github.com/acme/mobile-app',
    lastBuild: '15 minutes ago',
    status: 'failed',
    duration: '8m 12s',
    successRate: 87.5,
    buildHistory: [],
  },
  {
    id: '3',
    name: 'Analytics Service',
    description: 'Data analytics microservice',
    repo: 'github.com/acme/analytics',
    lastBuild: '1 hour ago',
    status: 'success',
    duration: '2m 18s',
    successRate: 96.8,
    buildHistory: [],
  },
  {
    id: '4',
    name: 'Admin Dashboard',
    description: 'Internal admin panel',
    repo: 'github.com/acme/admin-dashboard',
    lastBuild: '3 hours ago',
    status: 'success',
    duration: '4m 55s',
    successRate: 91.3,
    buildHistory: [],
  },
  {
    id: '5',
    name: 'Payment Gateway',
    description: 'Payment processing service',
    repo: 'github.com/acme/payment-gateway',
    lastBuild: '5 hours ago',
    status: 'running',
    duration: '1m 23s',
    successRate: 98.2,
    buildHistory: [],
  },
  {
    id: '6',
    name: 'Email Service',
    description: 'Email notification microservice',
    repo: 'github.com/acme/email-service',
    lastBuild: '1 day ago',
    status: 'success',
    duration: '1m 45s',
    successRate: 99.1,
    buildHistory: [],
  },
  {
    id: '7',
    name: 'Search Engine',
    description: 'Elasticsearch-based search service',
    repo: 'github.com/acme/search-engine',
    lastBuild: '2 days ago',
    status: 'success',
    duration: '6m 32s',
    successRate: 93.7,
    buildHistory: [],
  },
  {
    id: '8',
    name: 'Chat Service',
    description: 'Real-time chat functionality',
    repo: 'github.com/acme/chat-service',
    lastBuild: '3 days ago',
    status: 'cancelled',
    duration: '0m 45s',
    successRate: 89.4,
    buildHistory: [],
  },
];

export const generateBuildHistory = (projectId: string, count: number = 50): Build[] => {
  const statuses: ('success' | 'failed' | 'running' | 'cancelled')[] = ['success', 'success', 'success', 'success', 'failed'];
  const branches = ['main', 'develop', 'feature/auth', 'hotfix/payment'];
  const authors = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const duration = status === 'failed' ? 
      `${Math.floor(Math.random() * 10)}m ${Math.floor(Math.random() * 60)}s` :
      `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`;
    
    return {
      id: `${projectId}-build-${i}`,
      number: count - i,
      status,
      duration,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      branch: branches[Math.floor(Math.random() * branches.length)],
      commit: Math.random().toString(36).substring(2, 9),
      author: authors[Math.floor(Math.random() * authors.length)],
    };
  });
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'build',
    message: 'Build #145 completed successfully',
    project: 'E-Commerce API',
    timestamp: '2 minutes ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'alert',
    message: 'High memory usage detected',
    project: 'Analytics Service',
    timestamp: '15 minutes ago',
    status: 'warning',
  },
  {
    id: '3',
    type: 'build',
    message: 'Build #89 failed - dependency timeout',
    project: 'Mobile App CI',
    timestamp: '1 hour ago',
    status: 'failed',
  },
  {
    id: '4',
    type: 'deploy',
    message: 'Deployed to production',
    project: 'Payment Gateway',
    timestamp: '3 hours ago',
    status: 'success',
  },
  {
    id: '5',
    type: 'team',
    message: 'Sarah Chen joined the workspace',
    timestamp: '5 hours ago',
    status: 'info',
  },
];

export const mockLogAnalyses: LogAnalysis[] = [
  {
    id: '1',
    filename: 'build-2024-01-15.log',
    timestamp: '2 hours ago',
    status: 'completed',
    severity: 'high',
    errorType: 'Dependency Timeout',
    rootCause: 'npm install timeout after 60 seconds',
    suggestedFixes: [
      'Increase npm timeout configuration',
      'Use yarn instead of npm',
      'Add retry logic to package installation',
    ],
  },
  {
    id: '2',
    filename: 'deploy-prod-2024-01-14.log',
    timestamp: '1 day ago',
    status: 'completed',
    severity: 'critical',
    errorType: 'Out of Memory',
    rootCause: 'Node.js heap exceeded maximum size during build',
    suggestedFixes: [
      'Increase Node.js max memory: --max-old-space-size=4096',
      'Optimize build process to reduce memory usage',
      'Use incremental builds',
    ],
  },
  {
    id: '3',
    filename: 'test-suite-2024-01-13.log',
    timestamp: '2 days ago',
    status: 'completed',
    severity: 'medium',
    errorType: 'Test Flakiness',
    rootCause: 'Race condition in async test suite',
    suggestedFixes: [
      'Add proper await statements',
      'Increase test timeout',
      'Mock external API calls',
    ],
  },
];

export const chartData = {
  buildSuccessRate: [
    { date: 'Jan 1', rate: 92 },
    { date: 'Jan 5', rate: 88 },
    { date: 'Jan 10', rate: 91 },
    { date: 'Jan 15', rate: 94 },
    { date: 'Jan 20', rate: 93 },
    { date: 'Jan 25', rate: 95 },
    { date: 'Jan 30', rate: 94 },
  ],
  buildTimes: [
    { date: 'Jan 1', time: 4.2 },
    { date: 'Jan 5', time: 3.8 },
    { date: 'Jan 10', time: 4.1 },
    { date: 'Jan 15', time: 3.5 },
    { date: 'Jan 20', time: 3.9 },
    { date: 'Jan 25', time: 3.4 },
    { date: 'Jan 30', time: 3.7 },
  ],
  errorTypes: [
    { type: 'Dependency', count: 45 },
    { type: 'Memory', count: 23 },
    { type: 'Network', count: 18 },
    { type: 'Test', count: 34 },
    { type: 'Lint', count: 12 },
  ],
};
