# Color System

The SuperClaude Genie color system is designed to be vibrant, accessible, and flexible. Our colors work seamlessly in both light and dark modes while maintaining WCAG 2.1 AA compliance.

## Color Tokens

### Primary Colors

```css
/* Primary Brand Colors */
--primary: rgb(99, 102, 241);        /* #6366f1 - Indigo */
--primary-dark: rgb(79, 70, 229);    /* #4f46e5 - Darker Indigo */
--primary-light: rgb(129, 140, 248); /* #818cf8 - Lighter Indigo */

/* Usage */
.button-primary {
  background-color: var(--primary);
  color: white;
}
```

**Usage**: Primary actions, brand identity, focus states

### Secondary Colors

```css
/* Secondary Brand Colors */
--secondary: rgb(139, 92, 246);      /* #8b5cf6 - Purple */
--secondary-dark: rgb(124, 58, 237); /* #7c3aed - Darker Purple */
--secondary-light: rgb(167, 139, 250); /* #a78bfa - Lighter Purple */

/* Usage */
.accent-element {
  background-color: var(--secondary);
}
```

**Usage**: Secondary actions, accents, highlights

### Accent Colors

```css
/* Accent Colors */
--accent: rgb(236, 72, 153);         /* #ec4899 - Pink */
--accent-dark: rgb(219, 39, 119);    /* #db2777 - Darker Pink */
--accent-light: rgb(244, 114, 182);  /* #f472b6 - Lighter Pink */

/* Usage */
.highlight {
  color: var(--accent);
}
```

**Usage**: Highlights, notifications, special elements

### Semantic Colors

```css
/* Success */
--success: rgb(16, 185, 129);        /* #10b981 - Green */
--success-dark: rgb(5, 150, 105);    /* #059669 */
--success-light: rgb(52, 211, 153);  /* #34d399 */

/* Warning */
--warning: rgb(245, 158, 11);        /* #f59e0b - Amber */
--warning-dark: rgb(217, 119, 6);    /* #d97706 */
--warning-light: rgb(251, 191, 36);  /* #fbbf24 */

/* Error */
--error: rgb(239, 68, 68);           /* #ef4444 - Red */
--error-dark: rgb(220, 38, 38);      /* #dc2626 */
--error-light: rgb(248, 113, 113);   /* #f87171 */

/* Info */
--info: rgb(59, 130, 246);           /* #3b82f6 - Blue */
--info-dark: rgb(29, 78, 216);       /* #1d4ed8 */
--info-light: rgb(96, 165, 250);     /* #60a5fa */
```

### Background Colors

```css
/* Dark Theme Backgrounds */
--bg-dark: rgb(15, 23, 42);          /* #0f172a - Darkest */
--bg-light: rgb(30, 41, 59);         /* #1e293b - Dark */
--bg-card: rgb(51, 65, 85);          /* #334155 - Card Background */
--bg-hover: rgb(71, 85, 105);        /* #475569 - Hover State */

/* Light Theme Backgrounds */
--bg-light-primary: rgb(255, 255, 255);    /* #ffffff */
--bg-light-secondary: rgb(249, 250, 251);  /* #f9fafb */
--bg-light-tertiary: rgb(243, 244, 246);   /* #f3f4f6 */
```

### Text Colors

```css
/* Text Colors */
--text-primary: rgb(241, 245, 249);   /* #f1f5f9 - Primary Text */
--text-secondary: rgb(203, 213, 225); /* #cbd5e1 - Secondary Text */
--text-muted: rgb(148, 163, 184);     /* #94a3b8 - Muted Text */
--text-disabled: rgb(100, 116, 139);  /* #64748b - Disabled Text */

/* Light Mode Text */
--text-light-primary: rgb(15, 23, 42);     /* #0f172a */
--text-light-secondary: rgb(51, 65, 85);   /* #334155 */
--text-light-muted: rgb(100, 116, 139);    /* #64748b */
```

## Glassmorphism Colors

### Glass Effects

```css
/* Glass Backgrounds */
--glass-white: rgba(255, 255, 255, 0.1);
--glass-black: rgba(0, 0, 0, 0.1);
--glass-primary: rgba(99, 102, 241, 0.1);
--glass-secondary: rgba(139, 92, 246, 0.1);

/* Glass Borders */
--glass-border-light: rgba(255, 255, 255, 0.2);
--glass-border-dark: rgba(0, 0, 0, 0.2);

/* Implementation */
.glass-card {
  background: var(--glass-white);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border-light);
}
```

### Gradient Colors

```css
/* Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-sunset: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--gradient-ocean: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);

/* Holographic Effect */
--gradient-holographic: linear-gradient(
  45deg,
  #ff0080,
  #ff8c00,
  #40e0d0,
  #ff0080
);
```

## Color Usage Guidelines

### Accessibility

All color combinations must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

```tsx
// Example: Checking contrast
import { checkContrast } from '@/lib/utils'

const isAccessible = checkContrast('#6366f1', '#ffffff') >= 4.5
```

### Dark Mode Considerations

```css
/* Automatic dark mode switching */
:root {
  --bg-primary: rgb(255, 255, 255);
  --text-primary: rgb(15, 23, 42);
}

[data-theme="dark"] {
  --bg-primary: rgb(15, 23, 42);
  --text-primary: rgb(241, 245, 249);
}
```

### Component Examples

```tsx
// Button with semantic colors
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="success">Success Action</Button>
<Button variant="error">Danger Action</Button>

// Glass effects
<GlassmorphicCard variant="primary">
  Primary glass effect
</GlassmorphicCard>

// Gradient backgrounds
<div className="bg-gradient-primary">
  Gradient content
</div>
```

## Color Palette Reference

### Quick Reference Table

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|--------|
| Primary | #6366f1 | #818cf8 | Main actions, links |
| Secondary | #8b5cf6 | #a78bfa | Secondary actions |
| Accent | #ec4899 | #f472b6 | Highlights |
| Success | #10b981 | #34d399 | Success states |
| Warning | #f59e0b | #fbbf24 | Warnings |
| Error | #ef4444 | #f87171 | Errors |
| Background | #ffffff | #0f172a | Page background |
| Surface | #f9fafb | #1e293b | Card background |
| Text | #0f172a | #f1f5f9 | Primary text |

## Best Practices

1. **Use semantic colors** for their intended purpose
2. **Test contrast ratios** when creating custom combinations
3. **Avoid pure black** (#000000) - use --bg-dark instead
4. **Use opacity** for subtle variations rather than new colors
5. **Stick to the palette** for consistency

## Tools & Resources

- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Palette Generator](https://coolors.co/)
- [Accessible Colors](https://accessible-colors.com/)
- [Dark Mode Testing](https://www.a11yproject.com/posts/operating-system-and-browser-accessibility-display-modes/)