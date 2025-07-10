# Glassmorphism Design

Glassmorphism is a core design element of SuperClaude Genie, creating beautiful depth and hierarchy through translucent layers and blurred backgrounds.

## What is Glassmorphism?

Glassmorphism is a design trend that uses:
- **Transparency**: Semi-transparent backgrounds
- **Blur**: Backdrop blur effects
- **Borders**: Subtle borders for definition
- **Shadows**: Soft shadows for depth
- **Gradients**: Color gradients for vibrancy

## Core Glass Styles

### Basic Glass Effect

```css
.glass {
  /* Semi-transparent background */
  background: rgba(255, 255, 255, 0.1);
  
  /* Blur effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  /* Subtle border */
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Soft shadow */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Glass Variants

```css
/* Light glass for dark backgrounds */
.glass-light {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Dark glass for light backgrounds */
.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

/* Frosted glass with stronger blur */
.glass-frosted {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Colored glass variants */
.glass-primary {
  background: rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.glass-secondary {
  background: rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
}
```

## Advanced Effects

### Holographic Glass

```css
.glass-holographic {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.glass-holographic::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 0, 128, 0.1) 35%,
    rgba(255, 140, 0, 0.1) 40%,
    rgba(64, 224, 208, 0.1) 45%,
    transparent 50%
  );
  animation: holographic 3s linear infinite;
}

@keyframes holographic {
  0% { transform: translateX(-100%) translateY(-100%); }
  100% { transform: translateX(100%) translateY(100%); }
}
```

### Chromatic Aberration

```css
.glass-chromatic {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
}

.glass-chromatic::before,
.glass-chromatic::after {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  border-radius: inherit;
  pointer-events: none;
}

.glass-chromatic::before {
  background: rgba(255, 0, 0, 0.02);
  transform: translate(-2px, -2px);
}

.glass-chromatic::after {
  background: rgba(0, 0, 255, 0.02);
  transform: translate(2px, 2px);
}
```

### Neumorphic Glass

```css
.glass-neumorphic {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 
    inset 2px 2px 5px rgba(0, 0, 0, 0.1),
    inset -2px -2px 5px rgba(255, 255, 255, 0.1),
    4px 4px 10px rgba(0, 0, 0, 0.1),
    -4px -4px 10px rgba(255, 255, 255, 0.05);
}
```

## Interactive Effects

### Glow on Hover

```css
.glass-glow {
  transition: all 0.3s ease;
}

.glass-glow:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 0 20px rgba(99, 102, 241, 0.3),
    0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Aurora Effect

```css
.glass-aurora {
  position: relative;
  overflow: hidden;
}

.glass-aurora::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: radial-gradient(
    circle at center,
    rgba(120, 119, 198, 0.3) 0%,
    rgba(255, 119, 198, 0.3) 25%,
    rgba(255, 119, 119, 0.3) 50%,
    transparent 70%
  );
  animation: aurora 10s ease-in-out infinite;
}

@keyframes aurora {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.5); }
}
```

## Implementation in React

### Basic Glass Component

```tsx
function GlassCard({ children, variant = 'default' }) {
  return (
    <div className={`glass glass-${variant} rounded-xl p-6`}>
      {children}
    </div>
  )
}
```

### Dynamic Glass Effect

```tsx
function DynamicGlass({ intensity = 10, color = '255, 255, 255' }) {
  const style = {
    background: `rgba(${color}, ${intensity / 100})`,
    backdropFilter: `blur(${intensity}px)`,
    border: `1px solid rgba(${color}, ${intensity / 50})`,
  }
  
  return (
    <div style={style} className="rounded-xl p-6">
      {/* Content */}
    </div>
  )
}
```

### Animated Glass

```tsx
function AnimatedGlass({ children }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Best Practices

### 1. Background Considerations

Glass effects work best with:
- **Complex backgrounds**: Images, gradients, or patterns
- **Sufficient contrast**: Ensure readability
- **Movement**: Parallax or animated backgrounds

```tsx
// Good background for glass
<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
  <AnimatedBackground />
  <GlassCard className="relative z-10">
    Content
  </GlassCard>
</div>
```

### 2. Performance

Optimize glass effects for performance:

```css
/* Use will-change for animated glass */
.glass-animated {
  will-change: backdrop-filter, transform;
}

/* Disable on low-end devices */
@media (max-width: 768px) {
  .glass {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.9);
  }
}
```

### 3. Accessibility

Ensure sufficient contrast:

```tsx
function AccessibleGlass({ children }) {
  return (
    <div className="glass">
      {/* Ensure text has sufficient contrast */}
      <div className="relative z-10 text-white drop-shadow-lg">
        {children}
      </div>
    </div>
  )
}
```

### 4. Layering

Create depth with multiple glass layers:

```tsx
<div className="relative">
  {/* Background layer */}
  <div className="glass absolute inset-0 opacity-50" />
  
  {/* Middle layer */}
  <div className="glass absolute inset-4 opacity-70" />
  
  {/* Top layer */}
  <div className="glass relative z-10 m-8">
    Content
  </div>
</div>
```

## Color Theory for Glass

### Light Mode Glass

```css
.light-mode {
  /* Dark glass on light backgrounds */
  --glass-bg: rgba(0, 0, 0, 0.05);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-shadow: rgba(0, 0, 0, 0.1);
}
```

### Dark Mode Glass

```css
.dark-mode {
  /* Light glass on dark backgrounds */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: rgba(0, 0, 0, 0.3);
}
```

### Colored Glass

```css
/* Primary colored glass */
.glass-primary {
  --glass-bg: rgba(99, 102, 241, 0.1);
  --glass-border: rgba(99, 102, 241, 0.2);
  --glass-shadow: rgba(99, 102, 241, 0.2);
}

/* Success colored glass */
.glass-success {
  --glass-bg: rgba(16, 185, 129, 0.1);
  --glass-border: rgba(16, 185, 129, 0.2);
  --glass-shadow: rgba(16, 185, 129, 0.2);
}
```

## Common Patterns

### Glass Navigation

```tsx
<nav className="glass-frosted fixed top-0 w-full z-50">
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      <Logo />
      <NavigationMenu />
    </div>
  </div>
</nav>
```

### Glass Modal

```tsx
<div className="fixed inset-0 flex items-center justify-center">
  {/* Backdrop */}
  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
  
  {/* Modal */}
  <div className="glass-frosted relative z-10 p-8 rounded-2xl max-w-md">
    <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
    <p>Modal content goes here</p>
  </div>
</div>
```

### Glass Cards Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass hover:glass-glow transition-all duration-300"
    >
      {item.content}
    </motion.div>
  ))}
</div>
```

## Browser Support

### CSS Support

```css
/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(10px)) {
  .glass {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

### Progressive Enhancement

```tsx
function GlassWithFallback({ children }) {
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)')
  
  return (
    <div className={supportsBackdropFilter ? 'glass' : 'glass-fallback'}>
      {children}
    </div>
  )
}
```

## Resources

- [CSS Backdrop Filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Glassmorphism CSS Generator](https://glassmorphism.com/)
- [Can I Use: Backdrop Filter](https://caniuse.com/css-backdrop-filter)
- [Web.dev Performance Guide](https://web.dev/rendering-performance/)