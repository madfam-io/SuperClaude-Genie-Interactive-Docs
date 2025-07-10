# Animation Principles

SuperClaude Genie uses thoughtful animations to enhance user experience, provide feedback, and create a polished interface. Our animation system is built on Framer Motion and CSS animations.

## Core Principles

### 1. Purpose-Driven
Every animation should have a clear purpose:
- **Guide attention**: Direct focus to important elements
- **Provide feedback**: Confirm user actions
- **Show relationships**: Connect related elements
- **Enhance personality**: Add delight without distraction

### 2. Performance First
- Target 60fps for smooth animations
- Use GPU-accelerated properties (transform, opacity)
- Implement lazy loading for heavy animations
- Respect user preferences (reduced motion)

### 3. Natural Motion
- Use easing curves that feel natural
- Follow real-world physics
- Maintain consistent timing across the app

## Animation Timing

### Duration Scale

| Type | Duration | Usage |
|------|----------|-------|
| Micro | 100-200ms | Hover states, small transitions |
| Short | 200-300ms | Most UI animations |
| Medium | 300-500ms | Page transitions, complex animations |
| Long | 500-1000ms | Emphasis animations, first-time experiences |

### Easing Functions

```tsx
// Framer Motion easing presets
const easings = {
  // Default easing for most animations
  default: [0.25, 0.46, 0.45, 0.94],
  
  // Smooth acceleration
  easeOut: [0, 0, 0.58, 1],
  
  // Smooth deceleration
  easeIn: [0.42, 0, 1, 1],
  
  // Smooth both ways
  easeInOut: [0.42, 0, 0.58, 1],
  
  // Bouncy spring
  spring: { type: "spring", stiffness: 300, damping: 30 },
  
  // Gentle spring
  gentle: { type: "spring", stiffness: 100, damping: 20 },
}
```

## Common Animations

### Entrance Animations

```tsx
// Fade up entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: easings.default }}
>
  Content
</motion.div>

// Scale entrance
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Slide in from side
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Hover Animations

```tsx
// Lift on hover
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  Hover me
</motion.div>

// Glow on hover
<motion.div
  whileHover={{ 
    boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)" 
  }}
  transition={{ duration: 0.3 }}
>
  Glowing element
</motion.div>

// Color transition
<motion.div
  whileHover={{ 
    backgroundColor: "rgba(99, 102, 241, 0.1)" 
  }}
  transition={{ duration: 0.2 }}
>
  Color change
</motion.div>
```

### Loading States

```tsx
// Skeleton pulse
<div className="animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-muted rounded w-1/2"></div>
</div>

// Spinning loader
<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 1, 
    repeat: Infinity, 
    ease: "linear" 
  }}
  className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
/>

// Progress bar
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 0.3 }}
  className="h-1 bg-primary"
/>
```

### Stagger Animations

```tsx
// Stagger children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

## CSS Animations

### Keyframe Animations

```css
/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Shimmer animation */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Glow animation */
@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
  50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.8); }
  100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5); }
}
```

### Utility Classes

```css
/* Animation utilities */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Transition utilities */
.transition-all {
  transition: all 0.3s ease;
}

.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}
```

## Complex Animations

### Parallax Effects

```tsx
// Parallax scrolling
function ParallaxSection({ children, offset = 50 }) {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.div
      style={{
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Morphing Animations

```tsx
// Shape morphing
<motion.div
  initial={{ borderRadius: "0%" }}
  animate={{ borderRadius: "50%" }}
  transition={{ duration: 0.5 }}
  className="w-32 h-32 bg-primary"
/>

// Path morphing
<motion.svg viewBox="0 0 100 100">
  <motion.path
    d={isOpen ? openPath : closedPath}
    transition={{ duration: 0.3 }}
  />
</motion.svg>
```

### 3D Animations

```tsx
// 3D card flip
<motion.div
  whileHover={{ rotateY: 180 }}
  transition={{ duration: 0.6 }}
  style={{ transformStyle: "preserve-3d" }}
>
  <div className="absolute inset-0 backface-hidden">
    Front
  </div>
  <div 
    className="absolute inset-0 backface-hidden"
    style={{ transform: "rotateY(180deg)" }}
  >
    Back
  </div>
</motion.div>
```

## Gesture Animations

### Drag Interactions

```tsx
// Draggable element
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
>
  Drag me
</motion.div>
```

### Swipe Gestures

```tsx
// Swipeable cards
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, { offset, velocity }) => {
    if (offset.x > 100) {
      // Swiped right
    } else if (offset.x < -100) {
      // Swiped left
    }
  }}
>
  Swipe me
</motion.div>
```

## Performance Optimization

### GPU Acceleration

```tsx
// Use transform instead of position
// Good - GPU accelerated
<motion.div
  animate={{ x: 100, y: 100 }}
/>

// Avoid - Not GPU accelerated
<motion.div
  animate={{ left: 100, top: 100 }}
/>
```

### Lazy Loading

```tsx
// Lazy load heavy animations
const HeavyAnimation = lazy(() => import('./HeavyAnimation'))

function App() {
  const [showAnimation, setShowAnimation] = useState(false)
  
  return (
    <>
      {showAnimation && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyAnimation />
        </Suspense>
      )}
    </>
  )
}
```

### Reduced Motion

```tsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
>
  Content
</motion.div>
```

## Animation Patterns

### Page Transitions

```tsx
// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Modal Animations

```tsx
// Modal with backdrop
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-card p-6 rounded-lg">
          {content}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### List Animations

```tsx
// Animated list with reordering
<AnimatePresence>
  {items.map((item) => (
    <motion.li
      key={item.id}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      {item.content}
    </motion.li>
  ))}
</AnimatePresence>
```

## Best Practices

1. **Keep it subtle**: Less is often more
2. **Be consistent**: Use similar timings and easings
3. **Provide feedback**: Acknowledge user interactions
4. **Test performance**: Monitor frame rates
5. **Consider accessibility**: Always respect reduced motion
6. **Use the right tool**: CSS for simple, Framer Motion for complex
7. **Optimize for mobile**: Test on real devices

## Common Issues

### Animation Jank

```tsx
// Avoid animating expensive properties
// Bad - causes reflow
<motion.div animate={{ width: 200 }} />

// Good - GPU accelerated
<motion.div animate={{ scaleX: 2 }} />
```

### Memory Leaks

```tsx
// Clean up animations on unmount
useEffect(() => {
  const animation = animate(/* ... */)
  
  return () => {
    animation.stop()
  }
}, [])
```

### Z-Index Issues

```tsx
// Manage z-index during animations
<motion.div
  initial={{ zIndex: 0 }}
  animate={{ zIndex: 10 }}
  style={{ position: 'relative' }}
>
  Animated element
</motion.div>
```