import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockProjects, mockActivities, chartData } from '@/lib/mockData';
import { 
  Activity, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  ExternalLink,
  Play
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = {
    totalPipelines: 24,
    successRate: 94.2,
    avgBuildTime: '3m 42s',
    issuesToday: 3,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your CI/CD pipelines and AI insights at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pipelines"
          value={stats.totalPipelines}
          icon={Activity}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          icon={TrendingUp}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Avg Build Time"
          value={stats.avgBuildTime}
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          title="Issues Today"
          value={stats.issuesToday}
          icon={AlertTriangle}
          trend={{ value: 40, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Build Success Rate Chart */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Build Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.buildSuccessRate}>
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
                dataKey="rate" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Real-time Activity Feed */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Real-time Activity</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'failed' ? 'bg-destructive' :
                  activity.status === 'warning' ? 'bg-warning' :
                  'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  {activity.project && (
                    <p className="text-xs text-muted-foreground">{activity.project}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
          <Link to="/projects">
            <Button variant="ghost" size="sm">View All Projects</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Build</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.slice(0, 6).map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{project.lastBuild}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="py-3 px-4 text-sm">{project.duration}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/analysis">
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
