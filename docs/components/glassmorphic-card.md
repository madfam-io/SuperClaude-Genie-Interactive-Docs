# GlassmorphicCard Component

The GlassmorphicCard component creates stunning glass-effect containers with various visual styles, animations, and interactive effects.

## Import

```tsx
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard'
```

## Basic Usage

```tsx
<GlassmorphicCard>
  <h2>Glass Card</h2>
  <p>Beautiful glassmorphism effect</p>
</GlassmorphicCard>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'light' \| 'dark' \| 'frosted' \| 'holographic' \| 'chromatic' \| 'neumorphic'` | `'default'` | Visual style variant |
| `glow` | `boolean` | `false` | Adds aurora glow effect |
| `magic` | `boolean` | `false` | Adds magical particle effects |
| `hover` | `boolean` | `true` | Enables hover animations |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `() => void` | `undefined` | Click handler |
| `children` | `ReactNode` | `undefined` | Card content |

### Motion Props

The component extends Framer Motion's `MotionProps`, allowing you to use any Framer Motion animation properties:

```tsx
<GlassmorphicCard
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</GlassmorphicCard>
```

## Variants

### Default Glass

```tsx
<GlassmorphicCard variant="default">
  <h3>Default Glass</h3>
  <p>Standard glassmorphism with backdrop blur</p>
</GlassmorphicCard>
```

### Light Glass

```tsx
<GlassmorphicCard variant="light">
  <h3>Light Glass</h3>
  <p>Lighter glass effect for bright backgrounds</p>
</GlassmorphicCard>
```

### Dark Glass

```tsx
<GlassmorphicCard variant="dark">
  <h3>Dark Glass</h3>
  <p>Darker glass effect for light content</p>
</GlassmorphicCard>
```

### Frosted Glass

```tsx
<GlassmorphicCard variant="frosted">
  <h3>Frosted Glass</h3>
  <p>Heavy frost effect with strong blur</p>
</GlassmorphicCard>
```

### Holographic

```tsx
<GlassmorphicCard variant="holographic">
  <h3>Holographic</h3>
  <p>Iridescent holographic effect with shimmer</p>
</GlassmorphicCard>
```

### Chromatic

```tsx
<GlassmorphicCard variant="chromatic">
  <h3>Chromatic</h3>
  <p>Rainbow chromatic aberration effect</p>
</GlassmorphicCard>
```

### Neumorphic

```tsx
<GlassmorphicCard variant="neumorphic">
  <h3>Neumorphic</h3>
  <p>Soft neumorphism style with depth</p>
</GlassmorphicCard>
```

## Special Effects

### Glow Effect

```tsx
<GlassmorphicCard glow>
  <h3>Aurora Glow</h3>
  <p>Animated aurora borealis glow effect</p>
</GlassmorphicCard>
```

### Magic Particles

```tsx
<GlassmorphicCard magic>
  <h3>Magic Particles</h3>
  <p>Floating sparkle particles</p>
</GlassmorphicCard>
```

### Combined Effects

```tsx
<GlassmorphicCard
  variant="holographic"
  glow
  magic
>
  <h3>Full Effects</h3>
  <p>All effects combined for maximum impact</p>
</GlassmorphicCard>
```

## Examples

### Feature Card

```tsx
<GlassmorphicCard variant="glassPrimary" glow>
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
      <RocketIcon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold">Fast Performance</h3>
  </div>
  <p className="text-text-secondary">
    Optimized for speed with lazy loading and efficient animations.
  </p>
</GlassmorphicCard>
```

### Interactive Card

```tsx
function InteractiveCard() {
  const [isActive, setIsActive] = useState(false)

  return (
    <GlassmorphicCard
      variant={isActive ? 'holographic' : 'default'}
      glow={isActive}
      onClick={() => setIsActive(!isActive)}
      className="cursor-pointer"
    >
      <h3>Click me!</h3>
      <p>I change when clicked</p>
    </GlassmorphicCard>
  )
}
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <GlassmorphicCard
      key={feature.id}
      variant="frosted"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </GlassmorphicCard>
  ))}
</div>
```

### Notification Card

```tsx
<GlassmorphicCard
  variant="dark"
  glow
  className="border-l-4 border-success"
>
  <div className="flex items-center gap-3">
    <CheckCircleIcon className="w-5 h-5 text-success" />
    <div>
      <h4 className="font-semibold">Success!</h4>
      <p className="text-sm text-text-secondary">
        Your changes have been saved.
      </p>
    </div>
  </div>
</GlassmorphicCard>
```

## Styling

### Custom Background

```tsx
<GlassmorphicCard
  className="bg-gradient-to-br from-primary/10 to-secondary/10"
>
  Gradient background
</GlassmorphicCard>
```

### Custom Padding

```tsx
<GlassmorphicCard className="p-8 md:p-12">
  Extra padding for emphasis
</GlassmorphicCard>
```

### No Hover Effect

```tsx
<GlassmorphicCard hover={false}>
  Static card without hover animations
</GlassmorphicCard>
```

## Animation Examples

### Stagger Animation

```tsx
{items.map((item, i) => (
  <GlassmorphicCard
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      delay: i * 0.1,
      type: "spring",
      stiffness: 100
    }}
  >
    {item.content}
  </GlassmorphicCard>
))}
```

### Hover Scale

```tsx
<GlassmorphicCard
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive scaling
</GlassmorphicCard>
```

## Accessibility

### Focus States

The component includes proper focus styles for keyboard navigation:

```tsx
<GlassmorphicCard
  onClick={handleClick}
  tabIndex={0}
  role="button"
  aria-label="Interactive card"
>
  Keyboard accessible card
</GlassmorphicCard>
```

### Reduced Motion

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    animation: none;
    transition: none;
  }
}
```

## Performance Tips

1. **Use lazy loading** for cards below the fold
2. **Limit particle effects** on mobile devices
3. **Consider static variants** for better performance
4. **Use CSS containment** for large card grids

```tsx
// Optimized card grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cards.map((card) => (
    <LazySection key={card.id}>
      <GlassmorphicCard
        variant="default"
        magic={!isMobile}
        className="contain-layout"
      >
        {card.content}
      </GlassmorphicCard>
    </LazySection>
  ))}
</div>
```

## Common Patterns

### Dashboard Widget

```tsx
<GlassmorphicCard variant="frosted">
  <div className="flex justify-between items-start mb-4">
    <h3 className="text-lg font-semibold">Revenue</h3>
    <TrendingUpIcon className="w-5 h-5 text-success" />
  </div>
  <p className="text-3xl font-bold">$12,345</p>
  <p className="text-sm text-text-secondary mt-1">
    +12% from last month
  </p>
</GlassmorphicCard>
```

### Content Preview

```tsx
<GlassmorphicCard
  variant="light"
  hover
  onClick={() => router.push(`/post/${post.id}`)}
  className="cursor-pointer"
>
  <article>
    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
    <p className="text-text-secondary line-clamp-3">
      {post.excerpt}
    </p>
    <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
      <span>{post.author}</span>
      <span>•</span>
      <time>{post.date}</time>
    </div>
  </article>
</GlassmorphicCard>
```

## Related Components

- [Card](./card.md) - Basic card component
- [Card3D](./card-3d.md) - 3D interactive cards
- [MagicContainer](./magic-container.md) - Animated containers