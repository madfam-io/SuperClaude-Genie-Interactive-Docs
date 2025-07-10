# Theming Guide

SuperClaude Genie provides a powerful and flexible theming system that allows you to customize the look and feel of all components to match your brand and design requirements.

## Overview

The theming system is built on:
- **CSS Custom Properties**: For runtime theme switching
- **Tailwind CSS**: For utility-first styling
- **Theme Provider**: For managing theme state
- **Dark Mode**: Built-in light/dark theme support

## Basic Setup

### 1. Install Theme Provider

Wrap your application with the ThemeProvider:

```tsx
// app/layout.tsx or _app.tsx
import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark', 'midnight', 'sunset']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Define CSS Variables

Create your theme variables in your global CSS:

```css
/* app/globals.css */
@layer base {
  /* Light Theme */
  :root {
    /* Primary Colors */
    --primary: 243 207 255;         /* rgb(243, 207, 255) */
    --primary-foreground: 24 24 27; /* rgb(24, 24, 27) */
    
    /* Secondary Colors */
    --secondary: 139 92 246;
    --secondary-foreground: 255 255 255;
    
    /* Background Colors */
    --background: 255 255 255;
    --foreground: 15 23 42;
    
    /* Component Colors */
    --card: 255 255 255;
    --card-foreground: 15 23 42;
    
    /* Semantic Colors */
    --muted: 249 250 251;
    --muted-foreground: 100 116 139;
    --accent: 236 72 153;
    --accent-foreground: 255 255 255;
    
    /* Borders and Inputs */
    --border: 226 232 240;
    --input: 226 232 240;
    --ring: 99 102 241;
    
    /* Border Radius */
    --radius: 0.5rem;
  }

  /* Dark Theme */
  .dark {
    /* Primary Colors */
    --primary: 99 102 241;
    --primary-foreground: 255 255 255;
    
    /* Secondary Colors */
    --secondary: 139 92 246;
    --secondary-foreground: 255 255 255;
    
    /* Background Colors */
    --background: 15 23 42;
    --foreground: 241 245 249;
    
    /* Component Colors */
    --card: 30 41 59;
    --card-foreground: 241 245 249;
    
    /* Semantic Colors */
    --muted: 51 65 85;
    --muted-foreground: 148 163 184;
    --accent: 236 72 153;
    --accent-foreground: 255 255 255;
    
    /* Borders and Inputs */
    --border: 51 65 85;
    --input: 51 65 85;
    --ring: 139 92 246;
  }
}
```

## Creating Custom Themes

### Theme Structure

```css
/* Custom theme: Sunset */
.theme-sunset {
  /* Primary Palette */
  --primary: 251 146 60;          /* Orange */
  --primary-foreground: 255 255 255;
  
  /* Secondary Palette */
  --secondary: 217 70 239;        /* Purple */
  --secondary-foreground: 255 255 255;
  
  /* Backgrounds */
  --background: 254 243 199;      /* Warm cream */
  --foreground: 92 45 5;          /* Dark brown */
  
  /* Accents */
  --accent: 239 68 68;           /* Red */
  --accent-foreground: 255 255 255;
  
  /* Add all other required variables... */
}

/* Custom theme: Midnight */
.theme-midnight {
  --primary: 129 140 248;        /* Indigo */
  --primary-foreground: 255 255 255;
  --secondary: 244 114 182;      /* Pink */
  --background: 3 7 18;          /* Near black */
  --foreground: 226 232 240;     /* Light gray */
  /* ... */
}
```

### Registering Custom Themes

```tsx
// theme-config.ts
export const themes = {
  light: {
    name: 'Light',
    class: 'light',
  },
  dark: {
    name: 'Dark',
    class: 'dark',
  },
  sunset: {
    name: 'Sunset',
    class: 'theme-sunset',
  },
  midnight: {
    name: 'Midnight',
    class: 'theme-midnight',
  },
}
```

## Component Theming

### Using Theme Variables

```tsx
// Using CSS variables in components
function ThemedCard({ children }) {
  return (
    <div 
      className="rounded-lg p-6"
      style={{
        backgroundColor: 'rgb(var(--card))',
        color: 'rgb(var(--card-foreground))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      {children}
    </div>
  )
}
```

### Tailwind Integration

Configure Tailwind to use CSS variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        // Add all other colors...
      },
    },
  },
}
```

## Theme Switching

### Theme Toggle Component

```tsx
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

### Theme Selector

```tsx
export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="sunset">Sunset</SelectItem>
        <SelectItem value="midnight">Midnight</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## Advanced Theming

### Dynamic Theme Generation

```tsx
// Generate theme from a base color
function generateTheme(baseColor: string) {
  const { h, s, l } = hexToHSL(baseColor)
  
  return {
    primary: `${h} ${s}% ${l}%`,
    primaryLight: `${h} ${s}% ${Math.min(l + 10, 95)}%`,
    primaryDark: `${h} ${s}% ${Math.max(l - 10, 5)}%`,
    secondary: `${(h + 60) % 360} ${s}% ${l}%`,
    accent: `${(h + 180) % 360} ${s}% ${l}%`,
  }
}

// Apply dynamic theme
function applyTheme(theme: ReturnType<typeof generateTheme>) {
  const root = document.documentElement
  
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
}
```

### Component-Specific Themes

```tsx
// Component with local theme overrides
function ThemedSection({ theme, children }) {
  return (
    <div 
      className="themed-section"
      style={{
        '--local-primary': theme.primary,
        '--local-secondary': theme.secondary,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// CSS
.themed-section {
  --primary: var(--local-primary, var(--primary));
  --secondary: var(--local-secondary, var(--secondary));
}
```

### Glassmorphism Theming

```css
/* Glass effect variations per theme */
.light {
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: rgba(0, 0, 0, 0.1);
}

.dark {
  --glass-bg: rgba(0, 0, 0, 0.3);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: rgba(255, 255, 255, 0.05);
}

.theme-sunset {
  --glass-bg: rgba(251, 146, 60, 0.1);
  --glass-border: rgba(251, 146, 60, 0.2);
  --glass-shadow: rgba(251, 146, 60, 0.1);
}
```

## Theme Persistence

### Local Storage

```tsx
// Save theme preference
const saveThemePreference = (theme: string) => {
  localStorage.setItem('theme-preference', theme)
}

// Load theme preference
const loadThemePreference = () => {
  return localStorage.getItem('theme-preference') || 'system'
}
```

### Cookie-Based (SSR)

```tsx
// For server-side rendering
import { cookies } from 'next/headers'

export async function getTheme() {
  const cookieStore = cookies()
  return cookieStore.get('theme')?.value || 'system'
}

export async function setTheme(theme: string) {
  cookies().set('theme', theme, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
```

## Performance Optimization

### CSS Variable Scoping

```css
/* Scope variables to reduce recalculation */
.card {
  --card-padding: 1.5rem;
  --card-radius: var(--radius);
  
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

/* Child elements use parent variables */
.card-header {
  margin: calc(var(--card-padding) * -1);
  margin-bottom: var(--card-padding);
  padding: var(--card-padding);
}
```

### Lazy Theme Loading

```tsx
// Load theme CSS on demand
async function loadTheme(themeName: string) {
  const theme = await import(`@/styles/themes/${themeName}.css`)
  return theme
}

// Usage
const handleThemeChange = async (newTheme: string) => {
  await loadTheme(newTheme)
  setTheme(newTheme)
}
```

## Testing Themes

### Visual Regression Testing

```tsx
// Test multiple themes
const themes = ['light', 'dark', 'sunset', 'midnight']

themes.forEach(theme => {
  test(`Component renders correctly in ${theme} theme`, async () => {
    render(
      <ThemeProvider defaultTheme={theme}>
        <Button>Test Button</Button>
      </ThemeProvider>
    )
    
    expect(screen.getByRole('button')).toMatchSnapshot()
  })
})
```

### Contrast Testing

```tsx
// Ensure contrast ratios meet WCAG standards
import { checkContrast } from '@/lib/contrast'

test('Theme colors meet accessibility standards', () => {
  const themes = getThemes()
  
  themes.forEach(theme => {
    const bgColor = theme.background
    const fgColor = theme.foreground
    const ratio = checkContrast(bgColor, fgColor)
    
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
```

## Best Practices

1. **Use semantic naming**: Name colors by purpose, not appearance
2. **Maintain consistency**: Use the same color tokens across themes
3. **Test all themes**: Ensure all themes work with all components
4. **Consider accessibility**: Maintain proper contrast ratios
5. **Document changes**: Keep a changelog of theme modifications
6. **Provide defaults**: Always have fallback values
7. **Optimize performance**: Use CSS variables efficiently

## Examples

### E-commerce Theme

```css
.theme-shop {
  /* Brand Colors */
  --primary: 34 197 94;        /* Green for CTA */
  --secondary: 59 130 246;     /* Blue for info */
  
  /* Semantic */
  --success: 34 197 94;
  --sale: 239 68 68;          /* Red for sales */
  --new: 168 85 247;          /* Purple for new items */
}
```

### Corporate Theme

```css
.theme-corporate {
  /* Professional Colors */
  --primary: 37 99 235;        /* Corporate blue */
  --secondary: 71 85 105;      /* Slate gray */
  
  /* Minimal accents */
  --accent: 16 185 129;        /* Subtle green */
}
```

## Resources

- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Tailwind CSS Theming](https://tailwindcss.com/docs/customizing-colors)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Color Theory for Developers](https://www.smashingmagazine.com/2021/07/color-theory-for-designers-and-developers/)