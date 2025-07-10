# SuperClaude Genie UI Components

A comprehensive set of glassmorphic UI components built with React, TypeScript, Radix UI, and Tailwind CSS.

## Components

### Button
A versatile button component with multiple variants including glassmorphic styles.

```tsx
import { Button } from '@/components/ui/button'

<Button variant="glass" glow>Click me</Button>
```

Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `glass`, `glassPrimary`, `glassSecondary`, `holographic`, `chromatic`, `magic`

### Card
A flexible card component with glassmorphic variants and subcomponents.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card variant="glass" glow interactive>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Input
Accessible input component with glass variants and error states.

```tsx
import { Input } from '@/components/ui/input'

<Input variant="glass" placeholder="Enter text..." error={hasError} />
```

### Dialog
Modal dialog with portal support and glass variants.

```tsx
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent variant="glass">
    Content
  </DialogContent>
</Dialog>
```

### Select
Dropdown select component with glass styling.

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

<Select>
  <SelectTrigger variant="glass">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent variant="glass">
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Other Components
- **Badge**: Status indicators with glass variants
- **Label**: Form labels with accessibility support
- **Switch**: Toggle switches with glass effects
- **Tabs**: Tab navigation with glass styling
- **Tooltip**: Hover tooltips with glass variants
- **Separator**: Visual dividers with gradient options
- **DropdownMenu**: Context menus with glass styling

## Features

- 🎨 **Glassmorphic Design**: All components support glass morphism effects
- 🌗 **Dark Mode**: Built-in dark mode support via CSS variables
- ♿ **Accessibility**: ARIA attributes and keyboard navigation
- 📱 **Responsive**: Mobile-first responsive design
- 🎯 **TypeScript**: Full TypeScript support with proper types
- ⚡ **Performance**: Optimized with CSS containment and GPU acceleration
- 🎭 **Variants**: Multiple style variants for each component
- ✨ **Animations**: Smooth transitions and hover effects

## Usage

Import components from the UI directory:

```tsx
import { Button, Card, Input, Dialog } from '@/components/ui'
```

Or import individually:

```tsx
import { Button } from '@/components/ui/button'
```

## Theming

Components use CSS variables defined in `globals.css`. Key variables include:

- `--primary`: Primary brand color
- `--secondary`: Secondary brand color
- `--background`: Background color
- `--foreground`: Text color
- `--glass-white`: Glass overlay color
- `--glass-blur`: Blur intensity

## Examples

See `components/UIShowcase.tsx` for a comprehensive demo of all components.