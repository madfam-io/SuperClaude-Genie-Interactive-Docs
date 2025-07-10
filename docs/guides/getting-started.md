# Getting Started with SuperClaude Genie

This guide will help you get up and running with the SuperClaude Genie component library in your React or Next.js application.

## Prerequisites

- Node.js 18.0 or higher
- React 18.0 or higher
- Next.js 14.0 or higher (if using Next.js)
- Basic knowledge of React and TypeScript

## Installation

### 1. Install the core dependencies

```bash
npm install superclaude-genie-ui
# or
yarn add superclaude-genie-ui
# or
pnpm add superclaude-genie-ui
```

### 2. Install peer dependencies

```bash
npm install framer-motion class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

### 3. Configure Tailwind CSS

Add the component library to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... your other content paths
    './node_modules/superclaude-genie-ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Import the default theme extensions
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        // ... other colors
      },
    },
  },
  plugins: [],
}
```

### 4. Import global styles

Add to your global CSS file:

```css
@import 'superclaude-genie-ui/styles/globals.css';
@import 'superclaude-genie-ui/styles/themes.css';
```

Or if setting up manually:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 243 207 255;
    --primary-foreground: 255 255 255;
    --secondary: 139 92 246;
    --secondary-foreground: 255 255 255;
    --accent: 236 72 153;
    --accent-foreground: 255 255 255;
    --background: 15 23 42;
    --foreground: 241 245 249;
    --muted: 148 163 184;
    --muted-foreground: 203 213 225;
    --border: 51 65 85;
    --input: 51 65 85;
    --ring: 99 102 241;
  }
}
```

## Basic Setup

### 1. Wrap your app with providers

```tsx
// app/layout.tsx or _app.tsx
import { ThemeProvider } from 'superclaude-genie-ui/components/ThemeProvider'
import { NotificationProvider } from 'superclaude-genie-ui/components/NotificationProvider'
import { SmoothScrollProvider } from 'superclaude-genie-ui/components/SmoothScrollProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Import and use components

```tsx
import { Button, GlassmorphicCard, MagicText } from 'superclaude-genie-ui'

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <GlassmorphicCard variant="holographic" glow>
        <MagicText
          text="Welcome to SuperClaude Genie"
          className="text-4xl font-bold mb-4"
        />
        <p className="text-text-secondary mb-6">
          Modern React components with glassmorphism design
        </p>
        <Button variant="glassPrimary" size="lg" glow>
          Get Started
        </Button>
      </GlassmorphicCard>
    </div>
  )
}
```

## TypeScript Configuration

For the best TypeScript experience, add these configurations:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "superclaude-genie-ui": ["./node_modules/superclaude-genie-ui/dist"]
    }
  }
}
```

## Next Steps

- Read the [Component Documentation](../components/index.md)
- Explore the [Design System](../design-system/overview.md)
- Check out [Theming Guide](./theming.md)
- Learn about [Accessibility](./accessibility.md)

## Troubleshooting

### Common Issues

1. **Styles not loading**: Ensure you've imported the global styles and configured Tailwind correctly.
2. **Dark mode not working**: Check that you've wrapped your app with ThemeProvider.
3. **TypeScript errors**: Make sure all peer dependencies are installed.
4. **Animation issues**: Verify that Framer Motion is installed and properly configured.

### Getting Help

- [GitHub Issues](https://github.com/yourusername/superclaude-genie/issues)
- [Discord Community](https://discord.gg/superclaude)
- [Documentation](../index.md)