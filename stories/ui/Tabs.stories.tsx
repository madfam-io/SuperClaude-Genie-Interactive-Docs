import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Settings, Bell, Shield, CreditCard, Code, Image, FileText } from 'lucide-react'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A tab component for organizing content into multiple panels.

## Features
- Multiple style variants including glass effects
- Smooth transitions between tabs
- Full keyboard navigation support
- Accessible with ARIA attributes
- Built with Radix UI
- Customizable trigger and content styling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab',
    },
    value: {
      control: 'text',
      description: 'Controlled active tab value',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when active tab changes',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// Basic example
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Manage your notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

// Glass variant
export const Glass: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList variant="glass">
        <TabsTrigger value="overview" variant="glass">Overview</TabsTrigger>
        <TabsTrigger value="analytics" variant="glass">Analytics</TabsTrigger>
        <TabsTrigger value="reports" variant="glass">Reports</TabsTrigger>
        <TabsTrigger value="settings" variant="glass">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-white">
        <div className="p-6 rounded-lg glass">
          <h3 className="text-lg font-medium mb-2">Dashboard Overview</h3>
          <p className="text-white/80">
            View your key metrics and performance indicators.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="text-white">
        <div className="p-6 rounded-lg glass">
          <h3 className="text-lg font-medium mb-2">Analytics</h3>
          <p className="text-white/80">
            Deep dive into your data and trends.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="text-white">
        <div className="p-6 rounded-lg glass">
          <h3 className="text-lg font-medium mb-2">Reports</h3>
          <p className="text-white/80">
            Generate and download detailed reports.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="text-white">
        <div className="p-6 rounded-lg glass">
          <h3 className="text-lg font-medium mb-2">Settings</h3>
          <p className="text-white/80">
            Configure your dashboard preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="profile" className="gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="gap-2">
          <Shield className="h-4 w-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-4">Profile content with icon</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">Settings content with icon</div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4">Notifications content with icon</div>
      </TabsContent>
      <TabsContent value="security">
        <div className="p-4">Security content with icon</div>
      </TabsContent>
    </Tabs>
  ),
}

// With badges
export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="inbox" className="gap-2">
          Inbox
          <Badge variant="destructive" size="sm">3</Badge>
        </TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="drafts" className="gap-2">
          Drafts
          <Badge variant="secondary" size="sm">7</Badge>
        </TabsTrigger>
        <TabsTrigger value="spam">Spam</TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="p-4">You have 3 new messages</div>
      </TabsContent>
      <TabsContent value="sent">
        <div className="p-4">Sent messages</div>
      </TabsContent>
      <TabsContent value="drafts">
        <div className="p-4">7 draft messages</div>
      </TabsContent>
      <TabsContent value="spam">
        <div className="p-4">Spam folder is empty</div>
      </TabsContent>
    </Tabs>
  ),
}

// Form example
export const FormTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Account Information</h3>
          <p className="text-sm text-muted-foreground">
            Update your account details and profile information.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="payment" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <p className="text-sm text-muted-foreground">
            Add or update your payment information.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <Button>Update Payment Method</Button>
        </div>
      </TabsContent>
      <TabsContent value="preferences" className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Customize your experience and notification settings.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotif">Email Notifications</Label>
            <input type="checkbox" id="emailNotif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotif">SMS Notifications</Label>
            <input type="checkbox" id="smsNotif" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing">Marketing Communications</Label>
            <input type="checkbox" id="marketing" />
          </div>
          <Button>Save Preferences</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

// Code editor tabs
export const CodeEditor: Story = {
  render: () => (
    <Tabs defaultValue="html" className="w-[600px]">
      <TabsList variant="outline">
        <TabsTrigger value="html" variant="outline" className="gap-2">
          <Code className="h-3 w-3" />
          HTML
        </TabsTrigger>
        <TabsTrigger value="css" variant="outline" className="gap-2">
          <FileText className="h-3 w-3" />
          CSS
        </TabsTrigger>
        <TabsTrigger value="js" variant="outline" className="gap-2">
          <Code className="h-3 w-3" />
          JavaScript
        </TabsTrigger>
        <TabsTrigger value="preview" variant="outline" className="gap-2">
          <Image className="h-3 w-3" />
          Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="html" className="mt-4">
        <pre className="p-4 bg-muted rounded-lg">
          <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`}</code>
        </pre>
      </TabsContent>
      <TabsContent value="css" className="mt-4">
        <pre className="p-4 bg-muted rounded-lg">
          <code>{`body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
}`}</code>
        </pre>
      </TabsContent>
      <TabsContent value="js" className="mt-4">
        <pre className="p-4 bg-muted rounded-lg">
          <code>{`console.log('Hello World');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded');
});`}</code>
        </pre>
      </TabsContent>
      <TabsContent value="preview" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h1 className="text-2xl font-bold">Hello World</h1>
          <p className="text-muted-foreground mt-2">This is the preview pane</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default variant:</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1" variant="default">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="default">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="default">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Glass variant:</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="glass">
            <TabsTrigger value="tab1" variant="glass">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="glass">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="glass">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Glass Dark variant:</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="glassDark">
            <TabsTrigger value="tab1" variant="glassDark">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="glassDark">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="glassDark">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Outline variant:</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="outline">
            <TabsTrigger value="tab1" variant="outline">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="outline">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="outline">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Ghost variant:</p>
        <Tabs defaultValue="tab1">
          <TabsList variant="ghost">
            <TabsTrigger value="tab1" variant="ghost">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" variant="ghost">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" variant="ghost">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
}