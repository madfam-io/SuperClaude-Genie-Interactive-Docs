import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Search, Mail, Lock, User, Calendar, CreditCard } from 'lucide-react'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile input component with multiple variants and sizes.

## Features
- Multiple style variants including glass effects
- Four size options
- Error state support
- Full HTML input attributes support
- Smooth focus transitions
- File input styling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the input',
      options: ['default', 'glass', 'glassDark', 'ghost', 'outline'],
    },
    inputSize: {
      control: 'select',
      description: 'Size of the input',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    type: {
      control: 'select',
      description: 'HTML input type',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'file'],
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
  },
}

export const Glass: Story = {
  args: {
    placeholder: 'Glass input...',
    variant: 'glass',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const GlassDark: Story = {
  args: {
    placeholder: 'Glass dark input...',
    variant: 'glassDark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Ghost: Story = {
  args: {
    placeholder: 'Ghost input...',
    variant: 'ghost',
  },
}

export const Outline: Story = {
  args: {
    placeholder: 'Outline input...',
    variant: 'outline',
  },
}

// Sizes
export const Small: Story = {
  args: {
    placeholder: 'Small input',
    inputSize: 'sm',
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    inputSize: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    placeholder: 'Extra large input',
    inputSize: 'xl',
  },
}

// States
export const ErrorState: Story = {
  args: {
    placeholder: 'Error input',
    error: true,
    defaultValue: 'Invalid input',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

// Input types
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
  },
}

export const DateInput: Story = {
  args: {
    type: 'date',
  },
}

export const FileInput: Story = {
  args: {
    type: 'file',
  },
}

// With icons (using wrapper)
export const WithIcon: Story = {
  render: () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-9" placeholder="Search..." />
    </div>
  ),
}

export const WithRightIcon: Story = {
  render: () => (
    <div className="relative">
      <Input className="pr-9" placeholder="Enter email..." type="email" />
      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  ),
}

// Form examples
export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email..." 
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter password..." 
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="username" 
            placeholder="Choose a username..." 
            className="pl-9"
          />
        </div>
      </div>
    </div>
  ),
}

// Glass form example
export const GlassFormExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4 p-6 rounded-xl glass">
      <h3 className="text-lg font-semibold text-white mb-4">Login Form</h3>
      
      <div className="space-y-2">
        <Label htmlFor="glass-email" className="text-white/80">Email</Label>
        <Input 
          id="glass-email" 
          type="email" 
          placeholder="Enter your email..." 
          variant="glass"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="glass-password" className="text-white/80">Password</Label>
        <Input 
          id="glass-password" 
          type="password" 
          placeholder="Enter password..." 
          variant="glass"
        />
      </div>
      
      <button className="w-full h-10 mt-4 glass-primary rounded-lg text-white font-medium hover:bg-primary/20 transition-colors">
        Sign In
      </button>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="glass" placeholder="Glass variant" />
      <Input variant="glassDark" placeholder="Glass dark variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
      <Input variant="outline" placeholder="Outline variant" />
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <Input inputSize="sm" placeholder="Small size" />
      <Input inputSize="default" placeholder="Default size" />
      <Input inputSize="lg" placeholder="Large size" />
      <Input inputSize="xl" placeholder="Extra large size" />
    </div>
  ),
}

// Validation states
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label>Valid Input</Label>
        <Input defaultValue="valid@example.com" className="border-green-500 focus-visible:ring-green-500" />
        <p className="text-sm text-green-600">Email is valid</p>
      </div>
      
      <div className="space-y-2">
        <Label>Invalid Input</Label>
        <Input defaultValue="invalid-email" error />
        <p className="text-sm text-destructive">Please enter a valid email</p>
      </div>
      
      <div className="space-y-2">
        <Label>Disabled Input</Label>
        <Input defaultValue="Cannot edit" disabled />
        <p className="text-sm text-muted-foreground">This field is disabled</p>
      </div>
    </div>
  ),
}