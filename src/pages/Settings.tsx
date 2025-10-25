import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { User, Key, CreditCard, Users, Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and project preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-20 w-20 rounded-full"
                />
                <Button variant="outline">Change Avatar</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-4">
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🐙</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect your GitHub account
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                    Connected
                  </span>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Slack</h4>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to Slack
                    </p>
                  </div>
                </div>
                <Button>Connect</Button>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jira</h4>
                    <p className="text-sm text-muted-foreground">
                      Create issues from failed builds
                    </p>
                  </div>
                </div>
                <Button>Connect</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage API keys for programmatic access
                </p>
              </div>
              <Button>Generate New Key</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Production Key', created: '2025-01-15', lastUsed: '2 hours ago' },
                { name: 'Development Key', created: '2025-01-10', lastUsed: '1 day ago' },
              ].map((key, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Created {key.created} • Last used {key.lastUsed}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Copy</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="text-2xl font-bold">Pro</p>
                  <p className="text-muted-foreground">$49/month</p>
                </div>
                <Button>Upgrade Plan</Button>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
              <div className="space-y-4">
                {[
                  { name: 'Log Analyses', used: 1247, limit: 'Unlimited', percentage: 0 },
                  { name: 'Projects', used: 8, limit: 'Unlimited', percentage: 0 },
                  { name: 'Team Members', used: 5, limit: 'Unlimited', percentage: 0 },
                  { name: 'API Calls', used: 45230, limit: 100000, percentage: 45 },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">
                        {item.used.toLocaleString()} / {typeof item.limit === 'number' ? item.limit.toLocaleString() : item.limit}
                      </span>
                    </div>
                    {item.percentage > 0 && (
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Team Members</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Invite and manage your team members
                </p>
              </div>
              <Button>Invite Member</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
                { name: 'Bob Johnson', email: 'bob@example.com', role: 'Developer' },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      className="px-3 py-1 rounded-lg border border-input bg-background text-sm"
                      defaultValue={member.role}
                    >
                      <option>Admin</option>
                      <option>Developer</option>
                      <option>Viewer</option>
                    </select>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-6">Preferences</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'auto', label: 'Auto', icon: SettingsIcon },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        className={`p-4 rounded-lg border transition-all ${
                          theme === option.value
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setTheme(option.value as any)}
                      >
                        <Icon className="h-5 w-5 mx-auto mb-2" />
                        <p className="text-sm font-medium">{option.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Notifications</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Email notifications for failed builds', checked: true },
                    { label: 'Slack notifications for deployments', checked: true },
                    { label: 'Weekly summary reports', checked: false },
                    { label: 'Security alerts', checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Label htmlFor={`notif-${index}`} className="cursor-pointer">
                        {item.label}
                      </Label>
                      <Switch id={`notif-${index}`} defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Regional Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full p-2 rounded-lg border border-input bg-background"
                    >
                      <option>UTC-05:00 (Eastern Time)</option>
                      <option>UTC-08:00 (Pacific Time)</option>
                      <option>UTC+00:00 (UTC)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateformat">Date Format</Label>
                    <select
                      id="dateformat"
                      className="w-full p-2 rounded-lg border border-input bg-background"
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
