import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Moon, Sun, Volume2, VolumeX, Wifi, WifiOff, Bell, BellOff } from 'lucide-react'
import { useState } from 'react'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle switch component for binary choices.

## Features
- Multiple style variants including glass effects
- Three size options
- Smooth toggle animation
- Full keyboard support
- Accessible with ARIA attributes
- Built with Radix UI
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual style variant of the switch',
      options: ['default', 'glass', 'glassDark', 'outline'],
    },
    size: {
      control: 'select',
      description: 'Size of the switch',
      options: ['sm', 'default', 'lg'],
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when checked state changes',
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const GlassDark: Story = {
  args: {
    variant: 'glassDark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

// States
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

// With labels
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const LabelFirst: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Label htmlFor="notifications">Enable Notifications</Label>
      <Switch id="notifications" />
    </div>
  ),
}

// With icons
export const DarkModeToggle: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false)
    return (
      <div className="flex items-center space-x-3">
        <Sun className="h-4 w-4" />
        <Switch 
          checked={isDark}
          onCheckedChange={setIsDark}
          aria-label="Toggle dark mode"
        />
        <Moon className="h-4 w-4" />
      </div>
    )
  },
}

export const SoundToggle: Story = {
  render: () => {
    const [isOn, setIsOn] = useState(true)
    return (
      <div className="flex items-center space-x-3">
        <VolumeX className="h-4 w-4 text-muted-foreground" />
        <Switch 
          checked={isOn}
          onCheckedChange={setIsOn}
          aria-label="Toggle sound"
        />
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  },
}

// Form examples
export const SettingsForm: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive notifications about updates
          </p>
        </div>
        <Switch id="notifications" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new features
          </p>
        </div>
        <Switch id="marketing" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="security">Security alerts</Label>
          <p className="text-sm text-muted-foreground">
            Get notified about security updates
          </p>
        </div>
        <Switch id="security" defaultChecked />
      </div>
    </div>
  ),
}

// Glass form
export const GlassSettingsForm: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-sm p-6 rounded-xl glass">
      <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="wifi" className="text-white">Wi-Fi</Label>
          <p className="text-sm text-white/60">
            <Wifi className="inline h-3 w-3 mr-1" />
            Connected to network
          </p>
        </div>
        <Switch id="wifi" variant="glass" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications-glass" className="text-white">Notifications</Label>
          <p className="text-sm text-white/60">
            <Bell className="inline h-3 w-3 mr-1" />
            Push notifications
          </p>
        </div>
        <Switch id="notifications-glass" variant="glass" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="dark-mode-glass" className="text-white">Dark Mode</Label>
          <p className="text-sm text-white/60">
            <Moon className="inline h-3 w-3 mr-1" />
            Use dark theme
          </p>
        </div>
        <Switch id="dark-mode-glass" variant="glass" defaultChecked />
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label className="w-24">Default:</Label>
        <Switch variant="default" />
      </div>
      <div className="flex items-center gap-4">
        <Label className="w-24">Glass:</Label>
        <Switch variant="glass" />
      </div>
      <div className="flex items-center gap-4">
        <Label className="w-24">Glass Dark:</Label>
        <Switch variant="glassDark" />
      </div>
      <div className="flex items-center gap-4">
        <Label className="w-24">Outline:</Label>
        <Switch variant="outline" />
      </div>
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Switch size="sm" />
        <Label className="text-xs">Small</Label>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch size="default" />
        <Label className="text-xs">Default</Label>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch size="lg" />
        <Label className="text-xs">Large</Label>
      </div>
    </div>
  ),
}

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [wifi, setWifi] = useState(true)
    const [sound, setSound] = useState(false)
    const [notifications, setNotifications] = useState(true)
    
    return (
      <div className="space-y-4 p-6 rounded-lg border">
        <h3 className="font-semibold mb-4">Quick Settings</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {wifi ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4 text-muted-foreground" />}
            <Label htmlFor="wifi-demo">Wi-Fi</Label>
          </div>
          <Switch 
            id="wifi-demo" 
            checked={wifi} 
            onCheckedChange={setWifi}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
            <Label htmlFor="sound-demo">Sound</Label>
          </div>
          <Switch 
            id="sound-demo" 
            checked={sound} 
            onCheckedChange={setSound}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
            <Label htmlFor="notif-demo">Notifications</Label>
          </div>
          <Switch 
            id="notif-demo" 
            checked={notifications} 
            onCheckedChange={setNotifications}
          />
        </div>
      </div>
    )
  },
}