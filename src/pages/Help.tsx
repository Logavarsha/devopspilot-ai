import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, BookOpen, Video, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);

  const faqs = [
    {
      question: 'How do I connect my GitHub repository?',
      answer: 'Navigate to Settings > Integrations and click the "Connect" button next to GitHub. Follow the OAuth flow to authorize DevOps Pilot to access your repositories.',
    },
    {
      question: 'What file formats are supported for log analysis?',
      answer: 'We support .log, .txt, and direct text paste. You can also connect directly to GitHub Actions workflows for automatic log retrieval.',
    },
    {
      question: 'How does the multi-agent AI system work?',
      answer: 'Our system uses four specialized AI agents: Monitor (detects anomalies), Analyzer (finds root causes), Fixer (generates solutions), and Reporter (creates summaries). They work sequentially to provide comprehensive analysis.',
    },
    {
      question: 'Can I export analysis reports?',
      answer: 'Yes! You can export reports in PDF, JSON, or Markdown format. Navigate to the analysis page and click the export button after analysis is complete.',
    },
    {
      question: 'How do I invite team members?',
      answer: 'Go to Settings > Team and click "Invite Member". Enter their email address and select their role (Admin, Developer, or Viewer).',
    },
    {
      question: 'What\'s the difference between the plans?',
      answer: 'Free includes 3 projects and 100 analyses/month. Pro offers unlimited projects and analyses with advanced features. Enterprise includes dedicated support and custom training.',
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI models achieve 94%+ accuracy in root cause identification, trained on millions of build logs across various tech stacks.',
    },
    {
      question: 'Can I use DevOps Pilot with private repositories?',
      answer: 'Absolutely! All data is encrypted end-to-end, and we never store your source code. We only analyze build logs with your explicit permission.',
    },
    {
      question: 'How do I set up Slack notifications?',
      answer: 'Navigate to Settings > Integrations, click "Connect" next to Slack, and authorize the app. You can then configure which notifications to send.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You can export all your data before canceling. After cancellation, data is retained for 30 days before permanent deletion.',
    },
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent!', {
      description: 'Our team will get back to you within 24 hours.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground mt-1">
          Find answers and get support
        </p>
      </div>

      <Card className="p-6 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-10 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Complete guides and API references
          </p>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
          <p className="text-sm text-muted-foreground">
            Step-by-step visual guides
          </p>
        </Card>

        <Card className="p-6 shadow-card hover:shadow-elevated transition-all cursor-pointer">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <p className="text-sm text-muted-foreground">
            Join discussions and share tips
          </p>
        </Card>
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs
            .filter(faq =>
              searchQuery === '' ||
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold mb-4">Getting Started Guide</h3>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Connect Your Repository',
              description: 'Link your GitHub account to start monitoring your CI/CD pipelines.',
            },
            {
              step: 2,
              title: 'Create Your First Project',
              description: 'Set up a project and configure webhook notifications.',
            },
            {
              step: 3,
              title: 'Analyze Your First Log',
              description: 'Upload a log file or trigger analysis from a GitHub workflow.',
            },
            {
              step: 4,
              title: 'Review AI Insights',
              description: 'Explore the multi-agent analysis results and suggested fixes.',
            },
            {
              step: 5,
              title: 'Set Up Notifications',
              description: 'Configure Slack or email alerts for your team.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold mb-4">Video Tutorials</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Getting Started', duration: '5:32' },
            { title: 'Log Analysis Deep Dive', duration: '12:15' },
            { title: 'GitHub Integration', duration: '8:47' },
            { title: 'Custom Reports', duration: '6:23' },
            { title: 'Team Collaboration', duration: '9:41' },
            { title: 'Advanced Tips & Tricks', duration: '15:18' },
          ].map((video, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Video className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-medium text-sm">{video.title}</p>
                <p className="text-xs opacity-80">{video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
        <form onSubmit={handleSubmitContact} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue or question..."
              className="min-h-[150px]"
              required
            />
          </div>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </Card>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChat && (
          <Card className="w-80 h-96 mb-4 shadow-elevated flex flex-col animate-scale-in">
            <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-semibold">Live Chat</span>
                </div>
                <button onClick={() => setShowChat(false)} className="hover:opacity-80">
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hi! How can I help you today?</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-elevated"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
