# Button Component

The Button component is a versatile, accessible, and highly customizable component that supports multiple variants, sizes, and states.

## Import

```tsx
import { Button } from '@/components/ui/button'
```

## Basic Usage

```tsx
<Button>Click me</Button>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'glass' \| 'glassPrimary' \| 'glassSecondary' \| 'holographic' \| 'chromatic' \| 'magic'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xl' \| 'icon'` | `'default'` | Button size |
| `glow` | `boolean` | `false` | Adds glow effect |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `disabled` | `boolean` | `false` | Disables the button |
| `asChild` | `boolean` | `false` | Renders as child component |
| `className` | `string` | `undefined` | Additional CSS classes |
| `onClick` | `() => void` | `undefined` | Click handler |
| `children` | `ReactNode` | `undefined` | Button content |

### Extends

The Button component extends all native HTML button attributes (`React.ButtonHTMLAttributes<HTMLButtonElement>`).

## Variants

### Default Variants

```tsx
// Primary action button
<Button variant="default">Default</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Outlined button
<Button variant="outline">Outline</Button>

// Secondary action
<Button variant="secondary">Secondary</Button>

// Ghost button (no background)
<Button variant="ghost">Ghost</Button>

// Link style
<Button variant="link">Link</Button>
```

### Glass Variants

```tsx
// Basic glass effect
<Button variant="glass">Glass</Button>

// Primary colored glass
<Button variant="glassPrimary">Glass Primary</Button>

// Secondary colored glass
<Button variant="glassSecondary">Glass Secondary</Button>

// Holographic effect
<Button variant="holographic">Holographic</Button>

// Chromatic effect
<Button variant="chromatic">Chromatic</Button>

// Magic border effect
<Button variant="magic">Magic</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">
  <IconComponent />
</Button>
```

## States

### Loading State

```tsx
<Button loading>
  Saving...
</Button>

// With custom loading text
<Button loading disabled>
  Processing...
</Button>
```

### Disabled State

```tsx
<Button disabled>
  Disabled
</Button>
```

### Glow Effect

```tsx
<Button glow variant="glassPrimary">
  Glowing Button
</Button>
```

## Examples

### With Icons

```tsx
import { PlusIcon, ArrowRightIcon } from '@radix-ui/react-icons'

// Icon on the left
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Icon on the right
<Button>
  Next
  <ArrowRightIcon className="ml-2 h-4 w-4" />
</Button>

// Icon only
<Button size="icon" variant="ghost">
  <PlusIcon className="h-4 w-4" />
</Button>
```

### Button Groups

```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button variant="glassPrimary" glow>Save</Button>
</div>
```

### As Link

```tsx
import Link from 'next/link'

<Button asChild>
  <Link href="/dashboard">
    Go to Dashboard
  </Link>
</Button>
```

### Custom Styling

```tsx
<Button
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>
  Gradient Button
</Button>
```

## Accessibility

### Keyboard Navigation

- `Tab`: Navigate to button
- `Space` or `Enter`: Activate button
- Disabled buttons are skipped in tab order

### ARIA Attributes

```tsx
<Button
  aria-label="Save document"
  aria-pressed={isPressed}
  aria-busy={isLoading}
>
  Save
</Button>
```

### Focus Management

```tsx
const buttonRef = useRef<HTMLButtonElement>(null)

// Focus button programmatically
useEffect(() => {
  buttonRef.current?.focus()
}, [])

<Button ref={buttonRef}>
  Focused Button
</Button>
```

## Theming

### CSS Variables

```css
/* Customize button colors */
:root {
  --button-primary: 243 207 255;
  --button-primary-hover: 233 197 245;
  --button-primary-foreground: 255 255 255;
}
```

### Custom Variants

```tsx
// Create custom variant with className
<Button
  className={cn(
    "bg-gradient-to-r from-orange-500 to-red-500",
    "hover:from-orange-600 hover:to-red-600",
    "text-white font-semibold",
    "shadow-lg hover:shadow-xl"
  )}
>
  Custom Variant
</Button>
```

## Best Practices

1. **Use semantic variants**: Choose variants that match the action's purpose
2. **Provide loading feedback**: Use the loading prop for async actions
3. **Include accessible labels**: Add aria-label for icon-only buttons
4. **Consider mobile**: Ensure touch targets are at least 44x44 pixels
5. **Group related actions**: Use consistent variants for related buttons

## Common Patterns

### Form Submission

```tsx
function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await submitForm()
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        variant="glassPrimary"
        glow
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
```

### Confirmation Dialog

```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Related Components

- [IconButton](./icon-button.md) - Optimized for icon-only buttons
- [ButtonGroup](./button-group.md) - Group multiple buttons
- [ToggleButton](./toggle-button.md) - Toggle state buttons