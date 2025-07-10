# Accessibility Guide

SuperClaude Genie is built with accessibility as a core principle. This guide covers how to ensure your applications using our components are accessible to all users.

## Overview

All components in SuperClaude Genie are designed to meet WCAG 2.1 Level AA standards. This includes:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Meets minimum contrast ratios
- **Focus Management**: Clear focus indicators
- **Motion Preferences**: Respects reduced motion settings

## Keyboard Navigation

### Navigation Patterns

All interactive components support standard keyboard navigation:

- `Tab` / `Shift + Tab`: Navigate between focusable elements
- `Enter` / `Space`: Activate buttons and links
- `Arrow Keys`: Navigate within components (menus, tabs, etc.)
- `Escape`: Close modals, dropdowns, and popups

### Focus Management

```tsx
// Example: Managing focus in a modal
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement>()

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousActiveElement.current = document.activeElement as HTMLElement
      // Focus modal
      modalRef.current?.focus()
    } else {
      // Restore focus
      previousActiveElement.current?.focus()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={modalRef} tabIndex={-1}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

### Skip Links

Implement skip links for keyboard users:

```tsx
// In your layout
<body>
  <a href="#main-content" className="sr-only focus:not-sr-only">
    Skip to main content
  </a>
  <Navigation />
  <main id="main-content">
    {children}
  </main>
</body>
```

## Screen Reader Support

### Semantic HTML

Always use semantic HTML elements:

```tsx
// Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Avoid
<div class="navigation">
  <div class="nav-item">Home</div>
  <div class="nav-item">About</div>
</div>
```

### ARIA Labels

Use ARIA labels to provide context:

```tsx
// Icon-only button
<Button
  size="icon"
  aria-label="Delete item"
  onClick={handleDelete}
>
  <TrashIcon />
</Button>

// Form fields
<div>
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <p id="email-error" className="text-error">
      {errors.email}
    </p>
  )}
</div>
```

### Live Regions

Announce dynamic content changes:

```tsx
// Notification component with live region
function Notification({ message, type }) {
  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className="notification"
    >
      {message}
    </div>
  )
}

// Status updates
<div aria-live="polite" aria-atomic="true">
  <p>{itemCount} items in your cart</p>
</div>
```

## Color Contrast

### Contrast Requirements

- **Normal text**: 4.5:1 contrast ratio
- **Large text** (18pt+): 3:1 contrast ratio
- **UI components**: 3:1 contrast ratio

### Testing Contrast

```tsx
// Utility function to check contrast
import { checkContrast } from '@/lib/utils'

function AccessibleText({ background, color, children }) {
  const ratio = checkContrast(background, color)
  
  if (ratio < 4.5) {
    console.warn(`Low contrast ratio: ${ratio}`)
  }
  
  return (
    <p style={{ backgroundColor: background, color }}>
      {children}
    </p>
  )
}
```

### Color-Only Information

Never rely on color alone to convey information:

```tsx
// Bad: Color only
<span className="text-red-500">Error</span>

// Good: Color + Icon + Text
<span className="text-error flex items-center gap-2">
  <AlertIcon aria-hidden="true" />
  <span>Error: Invalid input</span>
</span>
```

## Motion and Animation

### Respecting User Preferences

```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### React Implementation

```tsx
// Hook to detect motion preference
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Usage in component
function AnimatedCard({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Form Accessibility

### Label Association

```tsx
// Explicit label association
<div>
  <Label htmlFor="username">Username</Label>
  <Input id="username" name="username" />
</div>

// Required fields
<div>
  <Label htmlFor="email">
    Email <span aria-label="required">*</span>
  </Label>
  <Input
    id="email"
    name="email"
    required
    aria-required="true"
  />
</div>
```

### Error Handling

```tsx
function AccessibleForm() {
  const [errors, setErrors] = useState({})

  return (
    <form aria-label="Contact form">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-error">
            {errors.name}
          </p>
        )}
      </div>

      {/* Form summary for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {Object.keys(errors).length > 0 && (
          <p>
            The form has {Object.keys(errors).length} errors. 
            Please review and correct them.
          </p>
        )}
      </div>
    </form>
  )
}
```

## Component-Specific Guidelines

### Dialogs and Modals

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Settings</Button>
  </DialogTrigger>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogHeader>
      <DialogTitle id="dialog-title">Settings</DialogTitle>
      <DialogDescription id="dialog-description">
        Manage your account settings and preferences.
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Navigation Menus

```tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <a 
        href="/dashboard" 
        aria-current={pathname === '/dashboard' ? 'page' : undefined}
      >
        Dashboard
      </a>
    </li>
  </ul>
</nav>
```

### Data Tables

```tsx
<table>
  <caption>User Account Information</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <Button
            size="sm"
            aria-label={`Edit ${user.name}`}
          >
            Edit
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

## Testing Accessibility

### Automated Testing

```bash
# Install testing tools
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-axe

# Run accessibility tests
npm run test:a11y
```

```tsx
// Example test
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Button should be accessible', async () => {
  const { container } = render(
    <Button>Click me</Button>
  )
  
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist

- [ ] Navigate using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast ratios
- [ ] Verify focus indicators are visible
- [ ] Test with browser zoom at 200%
- [ ] Disable CSS and check content structure
- [ ] Test with reduced motion enabled

### Tools and Resources

- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools
- **NVDA**: Free screen reader for Windows
- **VoiceOver**: Built-in screen reader for macOS/iOS

## Best Practices

1. **Start with semantic HTML**: Use the right elements for the job
2. **Test early and often**: Don't wait until the end
3. **Use automated tools**: But don't rely on them exclusively
4. **Get user feedback**: Include users with disabilities in testing
5. **Document accessibility features**: Help users understand available features

## Common Pitfalls

### Avoid These Mistakes

- Using `div` and `span` for interactive elements
- Removing focus indicators without providing alternatives
- Using placeholder text as labels
- Auto-playing media with sound
- Creating keyboard traps
- Using color as the only indicator
- Ignoring zoom and text scaling

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)