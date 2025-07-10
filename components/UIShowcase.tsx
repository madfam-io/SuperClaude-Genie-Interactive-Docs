'use client'

import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { ChevronDown, Copy, Mail, Settings, User } from 'lucide-react'

export function UIShowcase() {
  const [switchChecked, setSwitchChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  return (
    <TooltipProvider>
      <div className="space-y-12">
        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="glassPrimary" glow>Glass Primary</Button>
            <Button variant="glassSecondary">Glass Secondary</Button>
            <Button variant="holographic">Holographic</Button>
            <Button variant="chromatic">Chromatic</Button>
            <Button variant="magic">Magic</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Settings className="h-4 w-4" /></Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>This is a default card variant</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="glass" glow>
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>With glow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Glassmorphic design</p>
              </CardContent>
            </Card>

            <Card variant="glassFrosted">
              <CardHeader>
                <CardTitle>Frosted Glass</CardTitle>
                <CardDescription>Interactive hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover me!</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs & Forms Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Inputs & Forms</h2>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="default-input">Default Input</Label>
              <Input 
                id="default-input" 
                placeholder="Enter text..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glass-input" required>Glass Input (Required)</Label>
              <Input 
                id="glass-input" 
                variant="glass" 
                placeholder="Glass variant..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-input" variant="destructive">Input with Error</Label>
              <Input 
                id="error-input" 
                placeholder="Error state..." 
                error
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="select-demo">Select Component</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger id="select-demo" variant="glass">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent variant="glass">
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="glass-switch" 
                variant="glass"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <Label htmlFor="glass-switch">Glass Switch</Label>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="glass">Glass</Badge>
            <Badge variant="glassPrimary" glow>Glow</Badge>
            <Badge variant="holographic">Holographic</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </section>

        {/* Dialog Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Dialog</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Default Dialog</DialogTitle>
                  <DialogDescription>
                    This is a default dialog with standard styling.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="glass">Glass Dialog</Button>
              </DialogTrigger>
              <DialogContent variant="glass">
                <DialogHeader>
                  <DialogTitle>Glass Dialog</DialogTitle>
                  <DialogDescription>
                    A glassmorphic dialog variant.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Beautiful glass effect!</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Dropdown Menu Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Dropdown Menu</h2>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Default Menu <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass">
                  Glass Menu <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent variant="glass">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Tabs</h2>
          <Tabs defaultValue="tab1" className="w-full max-w-lg">
            <TabsList variant="glass">
              <TabsTrigger value="tab1" variant="glass">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2" variant="glass">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3" variant="glass">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Tab 1 Content</CardTitle>
                  <CardDescription>This is the first tab</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content for tab 1</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Tab 2 Content</CardTitle>
                  <CardDescription>This is the second tab</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content for tab 2</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Tab 3 Content</CardTitle>
                  <CardDescription>This is the third tab</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content for tab 3</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Tooltip Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Tooltips</h2>
          <div className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Default Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a default tooltip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="glass">Glass Tooltip</Button>
              </TooltipTrigger>
              <TooltipContent variant="glass">
                <p>Glassmorphic tooltip!</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* Separator Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Separators</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2">Default Separator</p>
              <Separator />
            </div>
            <div>
              <p className="mb-2">Glass Separator</p>
              <Separator variant="glass" />
            </div>
            <div>
              <p className="mb-2">Gradient Separator</p>
              <Separator variant="gradient" />
            </div>
            <div className="flex items-center gap-4">
              <span>Vertical</span>
              <Separator orientation="vertical" className="h-8" />
              <span>Separator</span>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  )
}