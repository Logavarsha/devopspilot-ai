import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { chartData } from '@/lib/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';

export default function AIInsights() {
  const predictions = [
    {
      title: 'Potential Memory Leak',
      description: 'Analytics Service shows increasing memory usage trend',
      probability: 87,
      severity: 'high',
      timeframe: 'Next 3 days',
    },
    {
      title: 'Build Time Increase',
      description: 'Mobile App CI build times trending upward',
      probability: 72,
      severity: 'medium',
      timeframe: 'Next week',
    },
    {
      title: 'Test Flakiness',
      description: 'E-Commerce API tests showing inconsistent results',
      probability: 64,
      severity: 'low',
      timeframe: 'Next 5 days',
    },
  ];

  const recommendations = [
    {
      title: 'Optimize Docker Image',
      priority: 'high',
      impact: 'Reduce build time by ~40%',
      description: 'Use multi-stage builds and cache dependencies',
      projects: ['E-Commerce API', 'Analytics Service'],
    },
    {
      title: 'Upgrade Node.js Version',
      priority: 'medium',
      impact: 'Improve performance by ~15%',
      description: 'Upgrade from Node 16 to Node 20 LTS',
      projects: ['Mobile App CI'],
    },
    {
      title: 'Implement Test Parallelization',
      priority: 'medium',
      impact: 'Reduce test time by ~50%',
      description: 'Run tests in parallel using jest workers',
      projects: ['E-Commerce API', 'Admin Dashboard'],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-muted-foreground mt-1">
          Discover patterns, trends, and predictions powered by AI
        </p>
      </div>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Error Type Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.errorTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="type" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Error Frequency</h3>
              <div className="space-y-4">
                {chartData.errorTypes.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-muted-foreground">{item.count} occurrences</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(item.count / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Common Error Patterns</h3>
            <div className="space-y-3">
              {[
                { pattern: 'npm ERR! code ETIMEDOUT', count: 23, trend: 'up' },
                { pattern: 'FATAL ERROR: CALL_AND_RETRY_LAST', count: 18, trend: 'down' },
                { pattern: 'Error: connect ECONNREFUSED', count: 15, trend: 'stable' },
                { pattern: 'TypeError: Cannot read property', count: 12, trend: 'up' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-mono text-sm">{item.pattern}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.count} occurrences in last 30 days
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-destructive" />}
                    {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-success" />}
                    {item.trend === 'stable' && <span className="text-xs text-muted-foreground">Stable</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Build Time Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.buildTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Success Rate Trend</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-success">↑ 2.3%</span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Build success rate has improved steadily over the past 30 days. 
                  This correlates with recent dependency updates and infrastructure improvements.
                </p>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Deployment Frequency</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">↑ 12%</span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Deployment frequency increased to an average of 4.2 deploys per day, 
                  indicating improved development velocity.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6">
            {predictions.map((prediction, index) => (
              <Card key={index} className="p-6 shadow-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className={`h-5 w-5 ${
                        prediction.severity === 'high' ? 'text-destructive' :
                        prediction.severity === 'medium' ? 'text-warning' :
                        'text-muted-foreground'
                      }`} />
                      <h3 className="text-lg font-semibold">{prediction.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {prediction.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Timeframe: {prediction.timeframe}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prediction.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                        prediction.severity === 'medium' ? 'bg-warning/10 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {prediction.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 text-center">
                    <div className="relative h-20 w-20">
                      <svg className="transform -rotate-90 h-20 w-20">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - prediction.probability / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{prediction.probability}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Probability</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{rec.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {rec.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">{rec.impact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Affects:</span>
                    {rec.projects.map((project, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted">
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
