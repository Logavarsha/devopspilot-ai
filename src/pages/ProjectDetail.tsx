import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { mockProjects, generateBuildHistory } from '@/lib/mockData';
import { ArrowLeft, Github, ExternalLink, Play, Settings as SettingsIcon, Users } from 'lucide-react';
import { useState } from 'react';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === id);
  const [buildHistory] = useState(() => generateBuildHistory(id || '1', 50));

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        <Link to="/analysis">
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Analyze Logs
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <a 
          href={`https://${project.repo}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          {project.repo}
          <ExternalLink className="h-3 w-3" />
        </a>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">Last build {project.lastBuild}</span>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Build History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 shadow-card">
              <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
              <p className="text-3xl font-bold">{project.successRate}%</p>
              <p className="text-sm text-success mt-2">↑ 2.3% from last week</p>
            </Card>
            <Card className="p-6 shadow-card">
              <p className="text-sm text-muted-foreground mb-2">Avg Duration</p>
              <p className="text-3xl font-bold">{project.duration}</p>
              <p className="text-sm text-destructive mt-2">↓ 8% slower</p>
            </Card>
            <Card className="p-6 shadow-card">
              <p className="text-sm text-muted-foreground mb-2">Total Builds</p>
              <p className="text-3xl font-bold">{buildHistory.length}</p>
              <p className="text-sm text-muted-foreground mt-2">Last 30 days</p>
            </Card>
          </div>

          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Recent Builds</h3>
            <div className="space-y-3">
              {buildHistory.slice(0, 10).map((build) => (
                <div 
                  key={build.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <StatusBadge status={build.status} />
                    <div>
                      <p className="font-medium">Build #{build.number}</p>
                      <p className="text-sm text-muted-foreground">
                        {build.branch} • {build.commit} • {build.author}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{build.duration}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(build.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Build History</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Sort</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium">Build</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Branch</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Commit</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Author</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {buildHistory.map((build) => (
                    <tr key={build.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">#{build.number}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={build.status} />
                      </td>
                      <td className="py-3 px-4 text-sm">{build.branch}</td>
                      <td className="py-3 px-4 text-sm font-mono">{build.commit}</td>
                      <td className="py-3 px-4 text-sm">{build.author}</td>
                      <td className="py-3 px-4 text-sm">{build.duration}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(build.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-4">Project Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Webhook Configuration</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Configure webhook URL for build notifications
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background"
                    placeholder="https://api.devopspilot.com/webhook"
                    readOnly
                  />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Environment Variables</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Manage environment variables for this project
                </p>
                <Button variant="outline">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Manage Variables
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </div>
            <div className="space-y-3">
              {['John Doe', 'Jane Smith', 'Bob Johnson'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">{name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">
                        {i === 0 ? 'Admin' : 'Developer'}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
