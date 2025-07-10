import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Star, Zap, Heart, Settings, Bell, User, Mail, Lock, 
  ArrowRight, Download, Plus, Search, Filter, Grid, List,
  Moon, Sun, ChevronRight, Sparkles, Code, Rocket
} from 'lucide-react'
import { useState } from 'react'

const meta = {
  title: 'UI/Complete Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive showcase of all UI components in the design system.

## Included Components
- Buttons (all variants and sizes)
- Badges (status indicators and tags)
- Inputs (form fields and search)
- Switches (toggles and settings)
- Tabs (navigation and content organization)
- Select (dropdowns and menus)
- Cards (glassmorphic containers)
- And more...

This showcase demonstrates how components work together in real-world scenarios.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Complete UI showcase
export const CompleteShowcase: Story = {
  render: () => {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [notifications, setNotifications] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState('pro')
    
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'} p-8`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                UI Component Showcase
              </h1>
              <p className="text-muted-foreground mt-1">
                Complete design system demonstration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Sun className="h-4 w-4" />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode}
                variant={isDarkMode ? 'glass' : 'default'}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          <Separator />

          {/* Main Navigation */}
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="grid w-full grid-cols-4" variant={isDarkMode ? 'glass' : 'default'}>
              <TabsTrigger value="components" variant={isDarkMode ? 'glass' : 'default'}>
                <Grid className="h-4 w-4 mr-2" />
                Components
              </TabsTrigger>
              <TabsTrigger value="forms" variant={isDarkMode ? 'glass' : 'default'}>
                <Settings className="h-4 w-4 mr-2" />
                Forms
              </TabsTrigger>
              <TabsTrigger value="cards" variant={isDarkMode ? 'glass' : 'default'}>
                <Sparkles className="h-4 w-4 mr-2" />
                Cards
              </TabsTrigger>
              <TabsTrigger value="interactive" variant={isDarkMode ? 'glass' : 'default'}>
                <Code className="h-4 w-4 mr-2" />
                Interactive
              </TabsTrigger>
            </TabsList>

            {/* Components Tab */}
            <TabsContent value="components" className="space-y-8 mt-8">
              {/* Buttons Section */}
              <GlassmorphicCard variant={isDarkMode ? 'dark' : 'light'}>
                <h2 className="text-xl font-semibold mb-4">Buttons</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="glass">Glass</Button>
                    <Button variant="glass" glow>Glass Primary</Button>
                    <Button variant="holographic">Holographic</Button>
                    <Button variant="chromatic">Chromatic</Button>
                    <Button variant="magic">Magic</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                    <Button size="icon"><Heart className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button loading>Loading...</Button>
                    <Button disabled>Disabled</Button>
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      With Icon
                    </Button>
                  </div>
                </div>
              </GlassmorphicCard>

              {/* Badges Section */}
              <GlassmorphicCard variant={isDarkMode ? 'dark' : 'light'}>
                <h2 className="text-xl font-semibold mb-4">Badges</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="glass">Glass</Badge>
                    <Badge variant="glass" glow>Glass Primary</Badge>
                    <Badge variant="holographic">Holographic</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="default">Default</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>
              </GlassmorphicCard>

              {/* Inputs Section */}
              <GlassmorphicCard variant={isDarkMode ? 'dark' : 'light'}>
                <h2 className="text-xl font-semibold mb-4">Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Default input" />
                  <Input variant="glass" placeholder="Glass input" />
                  <Input variant="glassDark" placeholder="Glass dark input" />
                  <Input variant="ghost" placeholder="Ghost input" />
                  <Input variant="outline" placeholder="Outline input" />
                  <Input error placeholder="Error state" />
                  <Input disabled placeholder="Disabled input" />
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search..." />
                  </div>
                </div>
              </GlassmorphicCard>
            </TabsContent>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Login Form */}
                <GlassmorphicCard variant="holographic" glow>
                  <h3 className="text-xl font-semibold mb-6">Sign In</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          className="pl-9"
                          variant={isDarkMode ? 'glass' : 'default'}
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
                          placeholder="Enter password" 
                          className="pl-9"
                          variant={isDarkMode ? 'glass' : 'default'}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="remember" />
                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                      </div>
                      <Button variant="link" size="sm">Forgot password?</Button>
                    </div>
                    <Button className="w-full" variant="glass">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </GlassmorphicCard>

                {/* Settings Form */}
                <GlassmorphicCard variant="chromatic">
                  <h3 className="text-xl font-semibold mb-6">Preferences</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger id="theme" variant={isDarkMode ? 'glass' : 'default'}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent variant={isDarkMode ? 'glass' : 'default'}>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates
                          </p>
                        </div>
                        <Switch 
                          checked={notifications}
                          onCheckedChange={setNotifications}
                          variant={isDarkMode ? 'glass' : 'default'}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing</Label>
                          <p className="text-sm text-muted-foreground">
                            Product news and offers
                          </p>
                        </div>
                        <Switch variant={isDarkMode ? 'glass' : 'default'} />
                      </div>
                    </div>
                    
                    <Button variant="holographic" className="w-full">
                      Save Preferences
                    </Button>
                  </div>
                </GlassmorphicCard>
              </div>
            </TabsContent>

            {/* Cards Tab */}
            <TabsContent value="cards" className="space-y-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pricing Cards */}
                <GlassmorphicCard variant="default">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-4">Basic</Badge>
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <p className="text-muted-foreground mb-6">Perfect for getting started</p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li>✓ 5 projects</li>
                      <li>✓ Basic support</li>
                      <li>✓ 1GB storage</li>
                    </ul>
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </div>
                </GlassmorphicCard>

                <GlassmorphicCard variant="holographic" glow>
                  <div className="text-center">
                    <Badge variant="holographic" className="mb-4">Popular</Badge>
                    <h3 className="text-2xl font-bold mb-2">$29/mo</h3>
                    <p className="text-muted-foreground mb-6">Best for professionals</p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li>✓ Unlimited projects</li>
                      <li>✓ Priority support</li>
                      <li>✓ 100GB storage</li>
                      <li>✓ Advanced analytics</li>
                    </ul>
                    <Button variant="holographic" className="w-full">
                      <Star className="mr-2 h-4 w-4" />
                      Go Pro
                    </Button>
                  </div>
                </GlassmorphicCard>

                <GlassmorphicCard variant="chromatic">
                  <div className="text-center">
                    <Badge variant="glass" className="mb-4">Enterprise</Badge>
                    <h3 className="text-2xl font-bold mb-2">Custom</h3>
                    <p className="text-muted-foreground mb-6">For large teams</p>
                    <ul className="space-y-2 mb-6 text-sm">
                      <li>✓ Everything in Pro</li>
                      <li>✓ Dedicated support</li>
                      <li>✓ Unlimited storage</li>
                      <li>✓ Custom features</li>
                    </ul>
                    <Button variant="chromatic" className="w-full">Contact Sales</Button>
                  </div>
                </GlassmorphicCard>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassmorphicCard variant="frosted" magic>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                      <p className="text-muted-foreground mb-4">
                        Experience blazing fast performance with our optimized engine.
                      </p>
                      <Button variant="glass" size="sm">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassmorphicCard>

                <GlassmorphicCard variant="neumorphic" glow>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary/10">
                      <Rocket className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Ready to Scale</h3>
                      <p className="text-muted-foreground mb-4">
                        Built to grow with your business from day one.
                      </p>
                      <Button variant="glass" size="sm">
                        Explore Features <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassmorphicCard>
              </div>
            </TabsContent>

            {/* Interactive Tab */}
            <TabsContent value="interactive" className="space-y-8 mt-8">
              <GlassmorphicCard variant={isDarkMode ? 'dark' : 'light'}>
                <h2 className="text-xl font-semibold mb-6">Interactive Demo</h2>
                
                {/* Tooltips */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Tooltips</h3>
                    <TooltipProvider>
                      <div className="flex gap-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Star className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to favorites</p>
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
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open settings</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>

                  <Separator />

                  {/* Interactive Controls */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Interactive Controls</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Plan Selection</Label>
                          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="pro">Pro</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-sm">
                            Selected plan: <Badge variant="outline">{selectedPlan}</Badge>
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => alert('Button clicked!')}
                          >
                            Click Me
                          </Button>
                          <Button 
                            variant="glass" 
                            size="sm"
                            onClick={() => alert('Glass button clicked!')}
                          >
                            Glass Action
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch id="demo-switch" />
                          <Label htmlFor="demo-switch">Toggle this switch</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}