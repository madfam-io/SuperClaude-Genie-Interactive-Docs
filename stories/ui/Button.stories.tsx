import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Heart, Loader2, Mail, Plus, Settings, Star } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states.

## Features
- Multiple style variants including glass, holographic, and chromatic effects
- Loading states with spinner animation
- Size variations from small to extra-large
- Icon support
- Accessibility features
- Smooth transitions and hover effects
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the button',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'glass',
        'glassPrimary',
        'glassSecondary',
        'holographic',
        'chromatic',
        'magic',
      ],
    },
    size: {
      control: 'select',
      description: 'Size of the button',
      options: ['sm', 'default', 'lg', 'xl', 'icon'],
    },
    glow: {
      control: 'boolean',
      description: 'Apply glow effect to the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
}

// Glass variants
export const Glass: Story = {
  args: {
    children: 'Glass Button',
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

export const GlassSecondary: Story = {
  args: {
    children: 'Glass Secondary',
    variant: 'glassSecondary',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Special effects
export const Holographic: Story = {
  args: {
    children: 'Holographic',
    variant: 'holographic',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Chromatic: Story = {
  args: {
    children: 'Chromatic',
    variant: 'chromatic',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Magic: Story = {
  args: {
    children: 'Magic Button',
    variant: 'magic',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// With glow effect
export const WithGlow: Story = {
  args: {
    children: 'Glowing Button',
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

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xl',
  },
}

// States
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    children: <Heart className="h-4 w-4" />,
    size: 'icon',
    variant: 'outline',
  },
}

export const IconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </>
    ),
  },
}

// Interactive examples
export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
        <Button variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="destructive">Delete Item</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="glass" glow>
          <Star className="mr-2 h-4 w-4" />
          Premium Feature
        </Button>
        <Button variant="holographic">
          Unlock Magic
        </Button>
        <Button variant="magic">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </Button>
      </div>
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
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="glassPrimary">Glass Primary</Button>
      <Button variant="glassSecondary">Glass Secondary</Button>
      <Button variant="holographic">Holographic</Button>
      <Button variant="chromatic">Chromatic</Button>
      <Button variant="magic">Magic</Button>
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
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
}