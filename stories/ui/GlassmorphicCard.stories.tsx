import type { Meta, StoryObj } from '@storybook/react'
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Zap, Heart, ArrowRight, Sparkles, Code, Rocket } from 'lucide-react'

const meta = {
  title: 'UI/GlassmorphicCard',
  component: GlassmorphicCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: `
A beautiful glassmorphic card component with multiple variants and effects.

## Features
- 7 distinct variants: default, light, dark, frosted, holographic, chromatic, and neumorphic
- Optional glow effect
- Magic border animation
- Hover animations
- Particle effects
- Holographic shimmer
- Built with Framer Motion
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the card',
      options: ['default', 'light', 'dark', 'frosted', 'holographic', 'chromatic', 'neumorphic'],
    },
    glow: {
      control: 'boolean',
      description: 'Apply aurora glow effect',
    },
    magic: {
      control: 'boolean',
      description: 'Apply magic border and particles',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover animations',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
} satisfies Meta<typeof GlassmorphicCard>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Default Glass</h3>
        <p className="text-white/80">A standard glassmorphic card with subtle transparency.</p>
      </div>
    ),
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Light Glass</h3>
        <p className="text-white/80">A lighter glass variant with increased opacity.</p>
      </div>
    ),
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Dark Glass</h3>
        <p className="text-white/80">A darker glass variant for high contrast.</p>
      </div>
    ),
  },
}

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Frosted Glass</h3>
        <p className="text-white/80">Enhanced blur effect for a frosted appearance.</p>
      </div>
    ),
  },
}

export const Holographic: Story = {
  args: {
    variant: 'holographic',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Holographic</h3>
        <p className="text-white/80">Iridescent colors with shimmer effect on hover.</p>
      </div>
    ),
  },
}

export const Chromatic: Story = {
  args: {
    variant: 'chromatic',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Chromatic</h3>
        <p className="text-white/80">Vibrant chromatic aberration effect.</p>
      </div>
    ),
  },
}

export const Neumorphic: Story = {
  args: {
    variant: 'neumorphic',
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Neumorphic</h3>
        <p className="text-white/80">Soft shadows for a neumorphic design.</p>
      </div>
    ),
  },
}

// With effects
export const WithGlow: Story = {
  args: {
    variant: 'default',
    glow: true,
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Aurora Glow</h3>
        <p className="text-white/80">Card with animated aurora glow background.</p>
      </div>
    ),
  },
}

export const WithMagic: Story = {
  args: {
    variant: 'default',
    magic: true,
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Magic Border</h3>
        <p className="text-white/80">Animated border with floating particles.</p>
      </div>
    ),
  },
}

export const NoHover: Story = {
  args: {
    variant: 'default',
    hover: false,
    children: (
      <div className="text-white">
        <h3 className="text-xl font-semibold mb-2">Static Card</h3>
        <p className="text-white/80">No hover animations for static layouts.</p>
      </div>
    ),
  },
}

// Complex content examples
export const FeatureCard: Story = {
  args: {
    variant: 'holographic',
    glow: true,
    children: (
      <div className="text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-white/10">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">Lightning Fast</h3>
        </div>
        <p className="text-white/80 mb-4">
          Experience blazing fast performance with our optimized rendering engine.
        </p>
        <Button variant="glass" size="sm">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
}

export const PricingCard: Story = {
  args: {
    variant: 'holographic',
    magic: true,
    children: (
      <div className="text-white text-center">
        <Badge variant="holographic" className="mb-4">Most Popular</Badge>
        <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
        <div className="text-4xl font-bold mb-1">$29</div>
        <p className="text-white/60 mb-6">per month</p>
        <ul className="space-y-2 mb-6 text-left">
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Unlimited projects</span>
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Priority support</span>
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>Advanced analytics</span>
          </li>
        </ul>
        <Button variant="holographic" className="w-full">
          Get Started
        </Button>
      </div>
    ),
  },
}

export const StatsCard: Story = {
  args: {
    variant: 'chromatic',
    children: (
      <div className="text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance</h3>
          <Badge variant="success">+12.5%</Badge>
        </div>
        <div className="text-3xl font-bold mb-2">98.5%</div>
        <p className="text-white/60 mb-4">Uptime this month</p>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[98.5%] bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
        </div>
      </div>
    ),
  },
}

// Interactive showcase
export const InteractiveShowcase: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassmorphicCard variant="holographic" glow>
        <div className="text-white">
          <Sparkles className="h-8 w-8 mb-4 text-yellow-400" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
          <p className="text-white/80">Harness the power of artificial intelligence.</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="chromatic" magic>
        <div className="text-white">
          <Code className="h-8 w-8 mb-4 text-blue-400" />
          <h3 className="text-xl font-semibold mb-2">Developer First</h3>
          <p className="text-white/80">Built by developers, for developers.</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="frosted">
        <div className="text-white">
          <Rocket className="h-8 w-8 mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold mb-2">Launch Ready</h3>
          <p className="text-white/80">Deploy your projects with confidence.</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="neumorphic" glow>
        <div className="text-white">
          <Heart className="h-8 w-8 mb-4 text-red-400" />
          <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
          <p className="text-white/80">Intuitive design that users love.</p>
        </div>
      </GlassmorphicCard>
    </div>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl">
      {['default', 'light', 'dark', 'frosted', 'holographic', 'chromatic', 'neumorphic'].map((variant) => (
        <GlassmorphicCard key={variant} variant={variant as any}>
          <div className="text-white">
            <h4 className="font-semibold capitalize">{variant}</h4>
            <p className="text-sm text-white/60 mt-1">Variant style</p>
          </div>
        </GlassmorphicCard>
      ))}
    </div>
  ),
}

// Effects showcase
export const EffectsShowcase: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <GlassmorphicCard variant="default">
        <div className="text-white">
          <h4 className="font-semibold">Basic Card</h4>
          <p className="text-sm text-white/60 mt-1">No effects</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="default" glow>
        <div className="text-white">
          <h4 className="font-semibold">With Glow</h4>
          <p className="text-sm text-white/60 mt-1">Aurora effect</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="default" magic>
        <div className="text-white">
          <h4 className="font-semibold">With Magic</h4>
          <p className="text-sm text-white/60 mt-1">Border & particles</p>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="default" glow magic>
        <div className="text-white">
          <h4 className="font-semibold">All Effects</h4>
          <p className="text-sm text-white/60 mt-1">Glow & magic combined</p>
        </div>
      </GlassmorphicCard>
    </div>
  ),
}