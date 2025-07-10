import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Info, Star, Zap } from 'lucide-react'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A badge component for displaying labels, statuses, and tags.

## Features
- Multiple style variants including glass and holographic effects
- Three size options
- Glow effect support
- Perfect for status indicators, tags, and labels
- Smooth transitions and hover effects
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the badge',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'glass',
        'glassPrimary',
        'holographic',
      ],
    },
    size: {
      control: 'select',
      description: 'Size of the badge',
      options: ['sm', 'default', 'lg'],
    },
    glow: {
      control: 'boolean',
      description: 'Apply glow effect to the badge',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
}

// Glass variants
export const Glass: Story = {
  args: {
    children: 'Glass',
    variant: 'glass',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const GlassPrimary: Story = {
  args: {
    children: 'Glass Primary',
    variant: 'glassPrimary',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Holographic: Story = {
  args: {
    children: 'Holographic',
    variant: 'holographic',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// With glow
export const WithGlow: Story = {
  args: {
    children: 'Glowing',
    variant: 'glassPrimary',
    glow: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CheckCircle className="mr-1 h-3 w-3" />
        Active
      </>
    ),
    variant: 'success',
  },
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CheckCircle className="mr-1 h-3 w-3" />
        Active
      </Badge>
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3 w-3" />
        Inactive
      </Badge>
      <Badge variant="warning">
        <AlertCircle className="mr-1 h-3 w-3" />
        Pending
      </Badge>
      <Badge variant="secondary">
        <Info className="mr-1 h-3 w-3" />
        Info
      </Badge>
    </div>
  ),
}

// Use cases
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="outline">Next.js</Badge>
      <Badge variant="outline">Tailwind CSS</Badge>
      <Badge variant="outline">Storybook</Badge>
    </div>
  ),
}

export const FeatureBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="glassPrimary" glow>
        <Star className="mr-1 h-3 w-3" />
        Premium
      </Badge>
      <Badge variant="holographic">
        <Zap className="mr-1 h-3 w-3" />
        New
      </Badge>
      <Badge variant="glass">Beta</Badge>
      <Badge variant="warning">Coming Soon</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="glass">Glass</Badge>
      <Badge variant="glassPrimary">Glass Primary</Badge>
      <Badge variant="holographic">Holographic</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

// Notification badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative inline-flex">
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <Info className="h-5 w-5" />
        </button>
        <Badge 
          className="absolute -top-2 -right-2"
          variant="destructive"
          size="sm"
        >
          3
        </Badge>
      </div>
      <div className="relative inline-flex">
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <AlertCircle className="h-5 w-5" />
        </button>
        <Badge 
          className="absolute -top-2 -right-2"
          variant="warning"
          size="sm"
        >
          12
        </Badge>
      </div>
      <div className="relative inline-flex">
        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <Star className="h-5 w-5" />
        </button>
        <Badge 
          className="absolute -top-2 -right-2"
          variant="success"
          size="sm"
        >
          99+
        </Badge>
      </div>
    </div>
  ),
}