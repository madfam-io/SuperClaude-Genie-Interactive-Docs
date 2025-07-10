# Spacing System

The SuperClaude Genie spacing system provides consistent spacing throughout your application using a harmonious scale based on rem units.

## Spacing Scale

Our spacing system uses a base unit of 4px (0.25rem) with a consistent scale:

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| `space-0` | 0 | 0px | No spacing |
| `space-1` | 0.25rem | 4px | Tight spacing, icon gaps |
| `space-2` | 0.5rem | 8px | Small gaps, compact padding |
| `space-3` | 0.75rem | 12px | Default small spacing |
| `space-4` | 1rem | 16px | Standard spacing |
| `space-5` | 1.25rem | 20px | Medium spacing |
| `space-6` | 1.5rem | 24px | Large spacing |
| `space-8` | 2rem | 32px | Extra large spacing |
| `space-10` | 2.5rem | 40px | Section spacing |
| `space-12` | 3rem | 48px | Major section spacing |
| `space-16` | 4rem | 64px | Page-level spacing |
| `space-20` | 5rem | 80px | Hero spacing |
| `space-24` | 6rem | 96px | Extra hero spacing |

## Using Spacing

### CSS Variables

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}

/* Usage */
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
}
```

### Tailwind Classes

```tsx
// Padding
<div className="p-4">      // 1rem padding all sides
<div className="px-6">     // 1.5rem horizontal padding
<div className="py-8">     // 2rem vertical padding
<div className="pt-2">     // 0.5rem top padding

// Margin
<div className="m-4">      // 1rem margin all sides
<div className="mx-auto">  // Auto horizontal margins
<div className="my-8">     // 2rem vertical margin
<div className="mb-4">     // 1rem bottom margin

// Gap (for flex/grid)
<div className="gap-4">    // 1rem gap
<div className="gap-x-6">  // 1.5rem horizontal gap
<div className="gap-y-2">  // 0.5rem vertical gap
```

## Component Spacing

### Cards

```tsx
// Standard card padding
<GlassmorphicCard className="p-6">
  <h3 className="mb-2">Card Title</h3>
  <p className="mb-4">Card description text</p>
  <Button>Action</Button>
</GlassmorphicCard>

// Compact card
<GlassmorphicCard className="p-4">
  <div className="space-y-2">
    <h4>Compact Title</h4>
    <p className="text-sm">Smaller content</p>
  </div>
</GlassmorphicCard>

// Spacious card
<GlassmorphicCard className="p-8 md:p-12">
  <div className="space-y-6">
    <h2 className="text-2xl">Large Title</h2>
    <p>More breathing room for important content</p>
  </div>
</GlassmorphicCard>
```

### Forms

```tsx
// Form field spacing
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
    <p className="text-sm text-muted">We'll never share your email</p>
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" />
  </div>
  
  <div className="flex gap-4">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </div>
</form>
```

### Lists

```tsx
// Vertical list spacing
<ul className="space-y-4">
  <li className="p-4 bg-card rounded-lg">Item 1</li>
  <li className="p-4 bg-card rounded-lg">Item 2</li>
  <li className="p-4 bg-card rounded-lg">Item 3</li>
</ul>

// Horizontal list spacing
<div className="flex gap-4">
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
</div>

// Grid spacing
<div className="grid grid-cols-3 gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

## Layout Spacing

### Page Layout

```tsx
// Typical page structure
<div className="min-h-screen">
  {/* Header */}
  <header className="px-6 py-4">
    <Navigation />
  </header>
  
  {/* Main content */}
  <main className="px-6 py-8 md:py-12">
    <div className="max-w-7xl mx-auto">
      {/* Page content */}
    </div>
  </main>
  
  {/* Footer */}
  <footer className="px-6 py-8 mt-16">
    <Footer />
  </footer>
</div>
```

### Section Spacing

```tsx
// Content sections
<article className="space-y-12">
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Section Title</h2>
    <p className="text-lg">Section introduction</p>
    <div className="grid grid-cols-2 gap-8">
      {/* Content grid */}
    </div>
  </section>
  
  <section className="space-y-6">
    <h2 className="text-3xl font-bold">Another Section</h2>
    {/* More content */}
  </section>
</article>
```

### Container Padding

```tsx
// Responsive container padding
<div className="px-4 sm:px-6 lg:px-8">
  {/* Content adapts to screen size */}
</div>

// Full-width with inner padding
<section className="w-full bg-muted">
  <div className="max-w-7xl mx-auto px-6 py-12">
    {/* Contained content */}
  </div>
</section>
```

## Responsive Spacing

### Mobile-First Approach

```tsx
// Spacing that adapts to screen size
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
    Responsive Title
  </h1>
  <div className="space-y-4 md:space-y-6 lg:space-y-8">
    {/* Content with responsive spacing */}
  </div>
</div>

// Responsive gaps in grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</div>
```

### Breakpoint-Specific Spacing

```tsx
// Different spacing at different breakpoints
<section className="py-8 md:py-16 lg:py-24">
  <div className="mb-8 md:mb-12 lg:mb-16">
    <h2>Section Title</h2>
  </div>
  {/* Content */}
</section>
```

## Spacing Patterns

### Card Grid

```tsx
// Consistent card grid spacing
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map(card => (
    <GlassmorphicCard key={card.id} className="p-6">
      <div className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-primary/20" />
        <h3 className="text-xl font-semibold">{card.title}</h3>
        <p className="text-muted">{card.description}</p>
      </div>
    </GlassmorphicCard>
  ))}
</div>
```

### Feature List

```tsx
// Feature list with consistent spacing
<div className="space-y-8">
  {features.map((feature, index) => (
    <div key={index} className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          {feature.icon}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="text-muted">{feature.description}</p>
      </div>
    </div>
  ))}
</div>
```

### Dashboard Layout

```tsx
// Dashboard with sidebar
<div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-card p-6 space-y-6">
    <Logo className="mb-8" />
    <Navigation className="space-y-2" />
  </aside>
  
  {/* Main content */}
  <main className="flex-1 overflow-auto">
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dashboard widgets */}
      </div>
    </div>
  </main>
</div>
```

## Best Practices

### 1. Consistency

Always use spacing tokens from the scale:
```tsx
// Good
<div className="p-4 mb-6">

// Avoid arbitrary values
<div className="p-[18px] mb-[27px]">
```

### 2. Hierarchy

Use spacing to create visual hierarchy:
```tsx
<article>
  <h1 className="mb-2">Main Title</h1>
  <p className="mb-8 text-muted">Subtitle</p>
  
  <section className="mb-12">
    <h2 className="mb-4">Section Title</h2>
    <p className="mb-6">Content</p>
  </section>
</article>
```

### 3. Grouping

Use less space within groups, more space between groups:
```tsx
<div className="space-y-8">
  {/* Group 1 */}
  <div className="space-y-2">
    <h3>Group Title</h3>
    <p>Related content</p>
    <p>More related content</p>
  </div>
  
  {/* Group 2 */}
  <div className="space-y-2">
    <h3>Another Group</h3>
    <p>Different content</p>
  </div>
</div>
```

### 4. Touch Targets

Ensure adequate spacing for touch targets:
```tsx
// Minimum 44x44px touch targets
<div className="flex gap-2">
  <Button size="icon" className="h-11 w-11">
    <Icon className="h-5 w-5" />
  </Button>
</div>
```

### 5. Responsive Scaling

Scale spacing proportionally:
```tsx
// Base: 16px, MD: 24px, LG: 32px
<section className="py-4 md:py-6 lg:py-8">
  <h2 className="mb-2 md:mb-3 lg:mb-4">
    Proportional Scaling
  </h2>
</section>
```

## Spacing Utilities

### Custom Spacing Hook

```tsx
// Hook for dynamic spacing
function useSpacing(base: number) {
  return {
    xs: `${base * 0.25}rem`,
    sm: `${base * 0.5}rem`,
    md: `${base}rem`,
    lg: `${base * 1.5}rem`,
    xl: `${base * 2}rem`,
  }
}

// Usage
function Component() {
  const spacing = useSpacing(1)
  
  return (
    <div style={{ padding: spacing.md, marginBottom: spacing.lg }}>
      Content
    </div>
  )
}
```

### Spacing Constants

```tsx
// spacing.ts
export const SPACING = {
  xs: 'space-1',  // 4px
  sm: 'space-2',  // 8px
  md: 'space-4',  // 16px
  lg: 'space-6',  // 24px
  xl: 'space-8',  // 32px
  '2xl': 'space-12', // 48px
  '3xl': 'space-16', // 64px
} as const

// Usage
<div className={`p-${SPACING.md} mb-${SPACING.lg}`}>
```

## Common Issues

### Collapsing Margins

Be aware of margin collapse:
```tsx
// Margins may collapse
<div className="mb-4">
  <p className="mt-4">Content</p>
</div>

// Use padding or flex gap instead
<div className="pb-4">
  <p className="pt-4">Content</p>
</div>
```

### Overflow Issues

Account for spacing in calculations:
```tsx
// Include padding in height calculations
<div className="h-screen p-8">
  <div className="h-full overflow-auto">
    {/* Scrollable content */}
  </div>
</div>
```