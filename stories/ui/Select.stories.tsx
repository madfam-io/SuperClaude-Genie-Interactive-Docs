import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Globe, Palette, Calendar, Clock, User, Mail } from 'lucide-react'

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A select component for choosing from a list of options.

## Features
- Multiple style variants including glass effects
- Grouped options support
- Smooth animations
- Full keyboard navigation
- Accessible with ARIA attributes
- Built with Radix UI
- Custom scroll buttons for long lists
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
    value: {
      control: 'text',
      description: 'Controlled selected value',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic example
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
        <SelectItem value="option4">Option 4</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// With default value
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">First Option</SelectItem>
        <SelectItem value="option2">Second Option</SelectItem>
        <SelectItem value="option3">Third Option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// Glass variant
export const Glass: Story = {
  render: () => (
    <Select>
      <SelectTrigger variant="glass" className="w-[200px]">
        <SelectValue placeholder="Glass select" />
      </SelectTrigger>
      <SelectContent variant="glass">
        <SelectItem value="item1">Glass Item 1</SelectItem>
        <SelectItem value="item2">Glass Item 2</SelectItem>
        <SelectItem value="item3">Glass Item 3</SelectItem>
        <SelectItem value="item4">Glass Item 4</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Glass dark variant
export const GlassDark: Story = {
  render: () => (
    <Select>
      <SelectTrigger variant="glassDark" className="w-[200px]">
        <SelectValue placeholder="Glass dark select" />
      </SelectTrigger>
      <SelectContent variant="glassDark">
        <SelectItem value="item1">Dark Item 1</SelectItem>
        <SelectItem value="item2">Dark Item 2</SelectItem>
        <SelectItem value="item3">Dark Item 3</SelectItem>
        <SelectItem value="item4">Dark Item 4</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Outline variant
export const Outline: Story = {
  render: () => (
    <Select>
      <SelectTrigger variant="outline" className="w-[200px]">
        <SelectValue placeholder="Outline select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="item1">Outline Item 1</SelectItem>
        <SelectItem value="item2">Outline Item 2</SelectItem>
        <SelectItem value="item3">Outline Item 3</SelectItem>
        <SelectItem value="item4">Outline Item 4</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// With groups
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Citrus Fruits</SelectLabel>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="lemon">Lemon</SelectItem>
          <SelectItem value="lime">Lime</SelectItem>
          <SelectItem value="grapefruit">Grapefruit</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Tropical Fruits</SelectLabel>
          <SelectItem value="mango">Mango</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
          <SelectItem value="papaya">Papaya</SelectItem>
          <SelectItem value="coconut">Coconut</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Berries</SelectLabel>
          <SelectItem value="strawberry">Strawberry</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="raspberry">Raspberry</SelectItem>
          <SelectItem value="blackberry">Blackberry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

// Country selector
export const CountrySelector: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="country">
        <Globe className="inline h-4 w-4 mr-2" />
        Country
      </Label>
      <Select>
        <SelectTrigger id="country" className="w-[280px]">
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="us">🇺🇸 United States</SelectItem>
            <SelectItem value="ca">🇨🇦 Canada</SelectItem>
            <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
            <SelectItem value="fr">🇫🇷 France</SelectItem>
            <SelectItem value="de">🇩🇪 Germany</SelectItem>
            <SelectItem value="es">🇪🇸 Spain</SelectItem>
            <SelectItem value="it">🇮🇹 Italy</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="jp">🇯🇵 Japan</SelectItem>
            <SelectItem value="cn">🇨🇳 China</SelectItem>
            <SelectItem value="kr">🇰🇷 South Korea</SelectItem>
            <SelectItem value="in">🇮🇳 India</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Theme selector
export const ThemeSelector: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="theme">
        <Palette className="inline h-4 w-4 mr-2" />
        Theme
      </Label>
      <Select defaultValue="system">
        <SelectTrigger id="theme" className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">☀️ Light</SelectItem>
          <SelectItem value="dark">🌙 Dark</SelectItem>
          <SelectItem value="system">💻 System</SelectItem>
          <SelectSeparator />
          <SelectItem value="midnight">🌌 Midnight Blue</SelectItem>
          <SelectItem value="forest">🌲 Forest Green</SelectItem>
          <SelectItem value="sunset">🌅 Sunset Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Time zone selector
export const TimeZoneSelector: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="timezone">
        <Clock className="inline h-4 w-4 mr-2" />
        Time Zone
      </Label>
      <Select>
        <SelectTrigger id="timezone" className="w-[300px]">
          <SelectValue placeholder="Select your time zone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Americas</SelectLabel>
            <SelectItem value="pst">Pacific Time (PST) - UTC-8</SelectItem>
            <SelectItem value="mst">Mountain Time (MST) - UTC-7</SelectItem>
            <SelectItem value="cst">Central Time (CST) - UTC-6</SelectItem>
            <SelectItem value="est">Eastern Time (EST) - UTC-5</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT) - UTC+0</SelectItem>
            <SelectItem value="cet">Central European Time (CET) - UTC+1</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET) - UTC+2</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia Pacific</SelectLabel>
            <SelectItem value="jst">Japan Standard Time (JST) - UTC+9</SelectItem>
            <SelectItem value="cst-china">China Standard Time (CST) - UTC+8</SelectItem>
            <SelectItem value="ist">India Standard Time (IST) - UTC+5:30</SelectItem>
            <SelectItem value="aest">Australian Eastern Time (AEST) - UTC+10</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Form example
export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="manager">Reports To</Label>
        <Select>
          <SelectTrigger id="manager">
            <SelectValue placeholder="Select manager" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Engineering</SelectLabel>
              <SelectItem value="john">John Smith (CTO)</SelectItem>
              <SelectItem value="sarah">Sarah Johnson (VP Eng)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Product</SelectLabel>
              <SelectItem value="mike">Mike Davis (CPO)</SelectItem>
              <SelectItem value="emma">Emma Wilson (VP Product)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Select disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      
      <Select defaultValue="locked" disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="locked">Locked Value</SelectItem>
          <SelectItem value="other">Other Option</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[250px]">
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Default variant:</Label>
        <Select>
          <SelectTrigger variant="default">
            <SelectValue placeholder="Default select" />
          </SelectTrigger>
          <SelectContent variant="default">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Glass variant:</Label>
        <Select>
          <SelectTrigger variant="glass">
            <SelectValue placeholder="Glass select" />
          </SelectTrigger>
          <SelectContent variant="glass">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Glass dark variant:</Label>
        <Select>
          <SelectTrigger variant="glassDark">
            <SelectValue placeholder="Glass dark select" />
          </SelectTrigger>
          <SelectContent variant="glassDark">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Outline variant:</Label>
        <Select>
          <SelectTrigger variant="outline">
            <SelectValue placeholder="Outline select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}