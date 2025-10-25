import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { mockLogAnalyses } from '@/lib/mockData';
import { 
  Upload, 
  Github, 
  FileText, 
  Search, 
  AlertCircle,
  CheckCircle,
  Copy,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Agent {
  name: string;
  icon: string;
  status: 'pending' | 'processing' | 'complete';
  progress: number;
  result?: string;
}

export default function LogAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    { name: 'Monitor Agent', icon: '🔍', status: 'pending', progress: 0, result: 'Found 3 anomalies in 1,247 log lines' },
    { name: 'Analyzer Agent', icon: '🤖', status: 'pending', progress: 0, result: 'Root cause: Dependency timeout in npm install' },
    { name: 'Fixer Agent', icon: '🔧', status: 'pending', progress: 0, result: '2 solutions generated' },
    { name: 'Reporter Agent', icon: '📋', status: 'pending', progress: 0, result: 'Summary ready for export' },
  ]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowResults(true);

    // Simulate agent processing
    for (let i = 0; i < agents.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAgents(prev => prev.map((agent, index) => {
        if (index === i) {
          return { ...agent, status: 'processing' as const, progress: 0 };
        }
        return agent;
      }));

      // Progress animation
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setAgents(prev => prev.map((agent, index) => 
          index === i ? { ...agent, progress } : agent
        ));
      }

      setAgents(prev => prev.map((agent, index) => 
        index === i ? { ...agent, status: 'complete' as const, progress: 100 } : agent
      ));
    }

    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Upload logs or connect GitHub to analyze with AI-powered agents
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="github">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="paste">
            <FileText className="mr-2 h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="p-8 shadow-card">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Drop log files here</h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse (.log, .txt files supported)
              </p>
              <Button>Select Files</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="github">
          <Card className="p-6 shadow-card">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Repository</label>
                <select className="w-full p-2 rounded-lg border border-input bg-background">
                  <option>acme/ecommerce-api</option>
                  <option>acme/mobile-app</option>
                  <option>acme/analytics</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Workflow</label>
                <select className="w-full p-2 rounded-lg border border-input bg-background">
                  <option>CI Pipeline</option>
                  <option>Deploy to Production</option>
                  <option>Run Tests</option>
                </select>
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
                Fetch & Analyze
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="paste">
          <Card className="p-6 shadow-card">
            <Textarea
              placeholder="Paste your log content here..."
              className="min-h-[300px] font-mono text-sm"
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full mt-4">
              {isAnalyzing ? 'Analyzing...' : 'Analyze Logs'}
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      {showResults && (
        <div className="space-y-6 animate-slide-up">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent, index) => (
              <Card key={index} className="p-6 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{agent.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {agent.status === 'pending' && 'Waiting...'}
                      {agent.status === 'processing' && 'Processing...'}
                      {agent.status === 'complete' && 'Complete ✓'}
                    </p>
                  </div>
                  {agent.status === 'complete' && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                </div>
                <Progress value={agent.progress} className="mb-2" />
                {agent.status === 'complete' && agent.result && (
                  <p className="text-xs text-muted-foreground">{agent.result}</p>
                )}
              </Card>
            ))}
          </div>

          {!isAnalyzing && (
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export JSON
                  </Button>
                </div>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="monitor" className="border rounded-lg px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔍</span>
                      <span className="font-semibold">Monitor Agent Report</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm font-medium mb-2">Anomalies Detected</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Line 234: Unexpected timeout in npm install</li>
                        <li>• Line 567: Memory usage spike to 94%</li>
                        <li>• Line 892: Connection refused to database</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analyzer" className="border rounded-lg px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🤖</span>
                      <span className="font-semibold">Analyzer Agent Report</span>
                      <span className="ml-auto px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                        HIGH SEVERITY
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-3">
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm font-medium mb-2 text-destructive">Root Cause Analysis</p>
                      <p className="text-sm">
                        The npm install process exceeded the configured timeout of 60 seconds. 
                        This is likely due to slow network connectivity or a large dependency tree.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fixer" className="border rounded-lg px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔧</span>
                      <span className="font-semibold">Fixer Agent - Suggested Solutions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <div className="p-4 rounded-lg bg-muted border">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">Solution 1: Increase timeout</p>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy('npm config set timeout 120000')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <pre className="p-3 rounded bg-background text-xs font-mono overflow-x-auto">
                        npm config set timeout 120000
                      </pre>
                      <Button size="sm" className="mt-3">Apply Fix</Button>
                    </div>

                    <div className="p-4 rounded-lg bg-muted border">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">Solution 2: Use yarn instead</p>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy('yarn install')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <pre className="p-3 rounded bg-background text-xs font-mono overflow-x-auto">
                        yarn install
                      </pre>
                      <Button size="sm" className="mt-3">Apply Fix</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reporter" className="border rounded-lg px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📋</span>
                      <span className="font-semibold">Reporter Agent Summary</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-3 text-sm">
                      <p><strong>Issue:</strong> Build failure due to dependency installation timeout</p>
                      <p><strong>Severity:</strong> High</p>
                      <p><strong>Affected:</strong> E-Commerce API build #145</p>
                      <p><strong>Recommended Action:</strong> Implement timeout increase or switch to yarn</p>
                      <p><strong>Estimated Fix Time:</strong> 5 minutes</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          )}
        </div>
      )}

      {/* History Tab */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Analyses</h3>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search History
          </Button>
        </div>
        <div className="space-y-3">
          {mockLogAnalyses.map((analysis) => (
            <div 
              key={analysis.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <AlertCircle className={`h-5 w-5 ${
                  analysis.severity === 'critical' ? 'text-destructive' :
                  analysis.severity === 'high' ? 'text-warning' :
                  'text-muted-foreground'
                }`} />
                <div>
                  <p className="font-medium">{analysis.filename}</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.errorType} • {analysis.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  analysis.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
                  analysis.severity === 'high' ? 'bg-warning/10 text-warning' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {analysis.severity.toUpperCase()}
                </span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
