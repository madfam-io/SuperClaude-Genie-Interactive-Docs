import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Info, HelpCircle, AlertCircle, Copy, Download, Share2, 
  Settings, User, Heart, Star, Trash2, Edit, Plus
} from 'lucide-react'

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A tooltip component for displaying helpful information on hover.

## Features
- Multiple style variants including glass effects
- Customizable positioning
- Smooth animations
- Keyboard accessible
- Built with Radix UI
- Supports any trigger element
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// Basic example
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

// Variants
export const Secondary: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Secondary tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="secondary">
        <p>Secondary variant tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </TooltipTrigger>
      <TooltipContent variant="destructive">
        <p>This action cannot be undone</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const Outline: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Outline tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="outline">
        <p>Outline variant tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

export const Glass: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="glass">Glass tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="glass">
        <p>Glass variant tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const GlassDark: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="glass">Glass dark tooltip</Button>
      </TooltipTrigger>
      <TooltipContent variant="glassDark">
        <p>Glass dark variant tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Positioning
export const Positioning: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// With icons
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download file</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// With different triggers
export const DifferentTriggers: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="cursor-help">
            Beta
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is in beta testing</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm text-muted-foreground cursor-help flex items-center gap-1">
            Need help?
            <HelpCircle className="h-3 w-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to open documentation</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-2 rounded-full bg-muted cursor-pointer">
            <User className="h-4 w-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>User profile</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Complex content
export const ComplexContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Info className="h-4 w-4 mr-2" />
          More Info
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="font-semibold">Keyboard Shortcuts</p>
          <div className="text-xs space-y-1">
            <div>⌘ + K - Open search</div>
            <div>⌘ + S - Save changes</div>
            <div>⌘ + Z - Undo last action</div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
}

// Delay timing
export const DelayTiming: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant (0ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>No delay</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button variant="outline">Fast (300ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>300ms delay</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button variant="outline">Default (700ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>700ms delay</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>
          <Button variant="outline">Slow (1000ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>1 second delay</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// Practical examples
export const FormHelpers: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex items-center gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Must be 3-20 characters, alphanumeric only</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="flex items-center gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertCircle className="h-3 w-3 text-yellow-500 cursor-help" />
          </TooltipTrigger>
          <TooltipContent variant="outline">
            <div className="space-y-1">
              <p className="font-semibold">Password must contain:</p>
              <ul className="text-xs space-y-0.5">
                <li>• At least 8 characters</li>
                <li>• One uppercase letter</li>
                <li>• One number</li>
                <li>• One special character</li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
}

// Action toolbar
export const ActionToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 p-2 rounded-lg border">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit item</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Duplicate</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to favorites</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
      
      <div className="w-px h-4 bg-border mx-1" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent variant="destructive">
          <p>Delete permanently</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Default</Button>
        </TooltipTrigger>
        <TooltipContent variant="default">
          <p>Default variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Secondary</Button>
        </TooltipTrigger>
        <TooltipContent variant="secondary">
          <p>Secondary variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Destructive</Button>
        </TooltipTrigger>
        <TooltipContent variant="destructive">
          <p>Destructive variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Outline</Button>
        </TooltipTrigger>
        <TooltipContent variant="outline">
          <p>Outline variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Glass</Button>
        </TooltipTrigger>
        <TooltipContent variant="glass">
          <p>Glass variant</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Glass Dark</Button>
        </TooltipTrigger>
        <TooltipContent variant="glassDark">
          <p>Glass dark variant</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}