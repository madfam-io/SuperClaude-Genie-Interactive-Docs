# Quick Start Guide

Get up and running with SuperClaude Genie in minutes. This guide will walk you through creating your first application using our component library.

## Prerequisites

Ensure you have the following installed:
- Node.js 18.0+
- npm, yarn, or pnpm
- Basic React knowledge

## Create a New Project

### Using Next.js (Recommended)

```bash
# Create a new Next.js app
npx create-next-app@latest my-superclaude-app --typescript --tailwind --app

# Navigate to project
cd my-superclaude-app

# Install SuperClaude Genie
npm install superclaude-genie-ui framer-motion class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

### Using Vite

```bash
# Create a new Vite app
npm create vite@latest my-superclaude-app -- --template react-ts

# Navigate to project
cd my-superclaude-app

# Install dependencies
npm install
npm install superclaude-genie-ui framer-motion class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

## Setup

### 1. Configure Tailwind CSS

Update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/superclaude-genie-ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        'bg-dark': '#0f172a',
        'bg-light': '#1e293b',
      },
    },
  },
  plugins: [],
}
```

### 2. Add Global Styles

Create or update your global CSS file:

```css
/* app/globals.css or src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 99 102 241;
    --primary-foreground: 255 255 255;
    --secondary: 139 92 246;
    --secondary-foreground: 255 255 255;
    --background: 255 255 255;
    --foreground: 15 23 42;
    --muted: 241 245 249;
    --muted-foreground: 100 116 139;
    --accent: 236 72 153;
    --accent-foreground: 255 255 255;
    --border: 226 232 240;
    --input: 226 232 240;
    --ring: 99 102 241;
  }

  .dark {
    --primary: 99 102 241;
    --primary-foreground: 255 255 255;
    --secondary: 139 92 246;
    --secondary-foreground: 255 255 255;
    --background: 15 23 42;
    --foreground: 241 245 249;
    --muted: 51 65 85;
    --muted-foreground: 148 163 184;
    --accent: 236 72 153;
    --accent-foreground: 255 255 255;
    --border: 51 65 85;
    --input: 51 65 85;
    --ring: 139 92 246;
  }
}

/* Glass effects */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-primary {
  background: rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.2);
}
```

### 3. Setup Providers

Wrap your app with necessary providers:

```tsx
// app/layout.tsx (Next.js App Router)
import { ThemeProvider } from 'superclaude-genie-ui'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Your First Component

Create a simple page using SuperClaude Genie components:

```tsx
// app/page.tsx or src/App.tsx
import { 
  Button, 
  GlassmorphicCard, 
  MagicText,
  AnimatedBackground 
} from 'superclaude-genie-ui'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero section */}
        <div className="text-center mb-16">
          <MagicText
            text="Welcome to SuperClaude Genie"
            className="text-5xl md:text-6xl font-bold mb-6"
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build beautiful, modern interfaces with our glassmorphic component library
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <GlassmorphicCard variant="default" glow>
            <h3 className="text-xl font-semibold mb-2">Beautiful Design</h3>
            <p className="text-muted-foreground">
              Modern glassmorphism effects with stunning visual appeal
            </p>
          </GlassmorphicCard>

          <GlassmorphicCard variant="holographic">
            <h3 className="text-xl font-semibold mb-2">Fully Typed</h3>
            <p className="text-muted-foreground">
              Complete TypeScript support for better development experience
            </p>
          </GlassmorphicCard>

          <GlassmorphicCard variant="chromatic">
            <h3 className="text-xl font-semibold mb-2">Accessible</h3>
            <p className="text-muted-foreground">
              WCAG 2.1 AA compliant components out of the box
            </p>
          </GlassmorphicCard>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="flex gap-4 justify-center">
            <Button variant="glassPrimary" size="lg" glow>
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Docs
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Add Navigation

Create a navigation component:

```tsx
// components/Navigation.tsx
import { Button, ThemeToggle } from 'superclaude-genie-ui'

export function Navigation() {
  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">My App</div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Features</Button>
            <Button variant="ghost" size="sm">Docs</Button>
            <Button variant="ghost" size="sm">Pricing</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
```

## Create a Form

Example form with validation:

```tsx
// components/ContactForm.tsx
import { useState } from 'react'
import { Button, Input, Label, GlassmorphicCard } from 'superclaude-genie-ui'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <GlassmorphicCard variant="frosted" className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            className="w-full min-h-[100px] px-3 py-2 rounded-lg bg-background border border-input"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <Button type="submit" variant="glassPrimary" className="w-full" glow>
          Send Message
        </Button>
      </form>
    </GlassmorphicCard>
  )
}
```

## Deploy Your App

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build your app
npm run build

# Drag and drop the build folder to Netlify
```

## Next Steps

Now that you have a basic app running:

1. **Explore Components**: Check out all available components in the [component docs](../components/button.md)
2. **Customize Theme**: Learn how to create custom themes in the [theming guide](./theming.md)
3. **Add Animations**: Enhance your app with animations from the [animation guide](../design-system/animations.md)
4. **Optimize Performance**: Follow our [performance guide](./performance.md)

## Common Patterns

### Dashboard Layout

```tsx
import { ResponsiveGrid, GlassmorphicCard, MagicText } from 'superclaude-genie-ui'

export function Dashboard() {
  return (
    <ResponsiveGrid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
      <GlassmorphicCard>
        <MagicText text="$12,345" className="text-3xl font-bold" />
        <p className="text-muted-foreground">Total Revenue</p>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="holographic">
        <MagicText text="1,234" className="text-3xl font-bold" />
        <p className="text-muted-foreground">Active Users</p>
      </GlassmorphicCard>
      
      <GlassmorphicCard variant="chromatic">
        <MagicText text="98.5%" className="text-3xl font-bold" />
        <p className="text-muted-foreground">Satisfaction Rate</p>
      </GlassmorphicCard>
    </ResponsiveGrid>
  )
}
```

## Troubleshooting

### CSS not loading
- Ensure you've imported the global CSS file
- Check that Tailwind is processing the component library files

### TypeScript errors
- Install all peer dependencies
- Update TypeScript to 4.5+

### Dark mode not working
- Verify ThemeProvider is wrapping your app
- Check that the `class` attribute is set on the html element

## Get Help

- [GitHub Issues](https://github.com/yourusername/superclaude-genie/issues)
- [Discord Community](https://discord.gg/superclaude)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/superclaude-genie)