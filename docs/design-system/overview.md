# SuperClaude Genie Design System

The SuperClaude Genie design system is built on modern design principles with a focus on glassmorphism, fluid animations, and accessibility. This guide provides an overview of our design philosophy and core principles.

## Design Philosophy

### Core Principles

1. **Clarity Through Transparency**: We use glassmorphism to create depth while maintaining visual hierarchy
2. **Fluid Motion**: Every interaction is enhanced with purposeful animation
3. **Accessible by Default**: All components meet WCAG 2.1 AA standards
4. **Consistent Yet Flexible**: Predictable patterns with room for customization
5. **Performance First**: Beautiful design that doesn't compromise performance

## Visual Language

### Glassmorphism

Our signature design element featuring:
- **Backdrop blur effects** for depth
- **Subtle transparency** for layering
- **Soft borders** for definition
- **Dynamic lighting** for interactivity

### Color Philosophy

- **Vibrant Primaries**: Bold colors for actions and focus
- **Muted Backgrounds**: Dark tones that don't compete with content
- **Semantic Colors**: Consistent meaning across all contexts
- **Accessibility First**: All color combinations meet contrast requirements

### Typography

- **Clear Hierarchy**: Distinct sizes for different content levels
- **Readable Fonts**: Optimized for screen reading
- **Consistent Spacing**: Predictable rhythm and flow
- **Responsive Scaling**: Adapts to different screen sizes

## Component Architecture

### Atomic Design

We follow atomic design principles:

1. **Atoms**: Basic building blocks (Button, Input, Badge)
2. **Molecules**: Simple combinations (Form fields, Card headers)
3. **Organisms**: Complex components (Cards, Dashboards, Forms)
4. **Templates**: Page-level patterns
5. **Pages**: Complete experiences

### Variant System

Components use a consistent variant system:

```tsx
// Example variants
variant: 'default' | 'primary' | 'secondary' | 'ghost' | 'glass'
size: 'sm' | 'md' | 'lg' | 'xl'
state: 'default' | 'hover' | 'active' | 'disabled'
```

## Motion Design

### Animation Principles

1. **Purpose**: Every animation has meaning
2. **Performance**: 60fps smooth animations
3. **Consistency**: Similar actions have similar animations
4. **Subtlety**: Enhance, don't distract
5. **Accessibility**: Respect prefers-reduced-motion

### Common Animations

- **Entrance**: Fade up with slight scale
- **Exit**: Fade down with slight scale
- **Hover**: Subtle lift and glow
- **Active**: Slight depression
- **Loading**: Smooth pulse or spin

## Theming System

### CSS Variables

Our theming system uses CSS custom properties:

```css
:root {
  /* Colors */
  --primary: 243 207 255;
  --secondary: 139 92 246;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

### Dark Mode

Built-in dark mode support with:
- System preference detection
- Manual toggle option
- Smooth transitions
- Consistent contrast ratios

## Responsive Design

### Breakpoints

```scss
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;
```

### Mobile-First

All components are designed mobile-first:
1. Base styles for mobile
2. Progressive enhancement for larger screens
3. Touch-friendly interactions
4. Optimized performance

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color Contrast**: 4.5:1 minimum for normal text
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and ARIA labels
- **Focus Indicators**: Clear visible focus states
- **Motion Preferences**: Respects user preferences

### Best Practices

1. Use semantic HTML elements
2. Provide alternative text for images
3. Ensure interactive elements are clearly identifiable
4. Test with keyboard navigation
5. Validate with screen readers

## Implementation Guidelines

### Component Structure

```tsx
// Consistent component pattern
interface ComponentProps {
  // Visual variants
  variant?: 'default' | 'primary' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  
  // State
  disabled?: boolean
  loading?: boolean
  
  // Styling
  className?: string
  style?: React.CSSProperties
  
  // Accessibility
  'aria-label'?: string
  role?: string
}
```

### Naming Conventions

- **Components**: PascalCase (Button, GlassmorphicCard)
- **Props**: camelCase (isLoading, hasError)
- **CSS Classes**: kebab-case (button-primary, card-glass)
- **Constants**: UPPER_SNAKE_CASE (MAX_WIDTH, DEFAULT_TIMEOUT)

## Next Steps

- Explore [Color Tokens](./colors.md)
- Learn about [Typography](./typography.md)
- Understand [Spacing System](./spacing.md)
- Master [Animation Principles](./animations.md)
- Deep dive into [Glassmorphism](./glassmorphism.md)