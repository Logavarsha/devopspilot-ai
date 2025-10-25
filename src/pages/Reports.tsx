import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Download, Calendar as CalendarIcon, Clock, Users, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const templates = [
    { id: 'weekly', name: 'Weekly Summary', description: 'Overview of last 7 days' },
    { id: 'monthly', name: 'Monthly Performance', description: 'Detailed monthly report' },
    { id: 'incident', name: 'Incident Report', description: 'Failed builds and issues' },
  ];

  const scheduledReports = [
    { id: '1', name: 'Weekly Team Report', frequency: 'Every Monday', recipients: 3, active: true },
    { id: '2', name: 'Monthly Executive Summary', frequency: '1st of month', recipients: 5, active: true },
    { id: '3', name: 'Daily Build Status', frequency: 'Daily at 9 AM', recipients: 12, active: false },
  ];

  const handleGenerateReport = () => {
    toast.success('Report generated successfully!', {
      description: 'Your report is ready for download',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Generate and schedule custom reports for your team
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
          <div className="space-y-3 mb-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Custom Report Builder</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                      ) : (
                        format(dateRange.from, 'MMM dd, yyyy')
                      )
                    ) : (
                      'Select date range'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange(range || {})}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <Label>Metrics to Include</Label>
              <div className="space-y-2">
                {[
                  'Build success rate',
                  'Average build time',
                  'Failed builds',
                  'Deployment frequency',
                  'Error patterns',
                  'Team productivity',
                ].map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox id={metric} defaultChecked />
                    <Label htmlFor={metric} className="text-sm font-normal cursor-pointer">
                      {metric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projects">Projects</Label>
              <select
                id="projects"
                className="w-full p-2 rounded-lg border border-input bg-background"
                multiple
              >
                <option>All Projects</option>
                <option>E-Commerce API</option>
                <option>Mobile App CI</option>
                <option>Analytics Service</option>
              </select>
            </div>

            <Button onClick={handleGenerateReport} className="w-full">
              Generate Report
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Scheduled Reports</h3>
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Schedule New Report
          </Button>
        </div>
        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <Switch checked={report.active} />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {report.recipients} recipients
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Generated Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Weekly Summary - Jan 22', date: '2025-01-22', size: '2.4 MB' },
            { name: 'Monthly Performance - January', date: '2025-01-20', size: '5.1 MB' },
            { name: 'Incident Report - Jan 15', date: '2025-01-15', size: '1.8 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated on {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
