# Typography System

The SuperClaude Genie typography system provides a consistent and scalable approach to text styling across your application.

## Font Stack

### System Font Stack

We use a system font stack for optimal performance and native feel:

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, 
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", 
    "Noto Color Emoji";
  
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, 
    "Liberation Mono", Menlo, monospace;
}
```

### Custom Fonts (Optional)

```tsx
// Using Next.js Font Optimization
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

// Apply to your app
<body className={`${inter.variable} ${jetbrainsMono.variable}`}>
```

## Type Scale

### Heading Sizes

| Level | Class | Size | Line Height | Weight | Usage |
|-------|-------|------|-------------|--------|-------|
| Display | `text-6xl` | 3.75rem (60px) | 1 | 800 | Hero sections |
| H1 | `text-5xl` | 3rem (48px) | 1.2 | 700 | Page titles |
| H2 | `text-4xl` | 2.25rem (36px) | 1.25 | 700 | Section titles |
| H3 | `text-3xl` | 1.875rem (30px) | 1.25 | 600 | Subsections |
| H4 | `text-2xl` | 1.5rem (24px) | 1.3 | 600 | Card titles |
| H5 | `text-xl` | 1.25rem (20px) | 1.4 | 500 | Small headings |
| H6 | `text-lg` | 1.125rem (18px) | 1.4 | 500 | Labels |

### Body Text

| Style | Class | Size | Line Height | Usage |
|-------|-------|------|-------------|-------|
| Large | `text-lg` | 1.125rem (18px) | 1.75 | Intro text |
| Base | `text-base` | 1rem (16px) | 1.5 | Body content |
| Small | `text-sm` | 0.875rem (14px) | 1.5 | Secondary text |
| Extra Small | `text-xs` | 0.75rem (12px) | 1.5 | Captions |

## Typography Components

### Headings

```tsx
// Display heading
<h1 className="text-6xl font-extrabold tracking-tight">
  Welcome to SuperClaude
</h1>

// Page heading
<h1 className="text-5xl font-bold tracking-tight mb-4">
  Page Title
</h1>

// Section heading
<h2 className="text-4xl font-bold tracking-tight mb-3">
  Section Title
</h2>

// Subsection heading
<h3 className="text-3xl font-semibold mb-2">
  Subsection Title
</h3>
```

### Body Text

```tsx
// Lead paragraph
<p className="text-lg text-muted-foreground leading-relaxed">
  This is a lead paragraph with larger text for emphasis.
</p>

// Regular paragraph
<p className="text-base leading-relaxed mb-4">
  Regular body text with comfortable line height for readability.
</p>

// Small text
<p className="text-sm text-muted-foreground">
  Secondary information in smaller text.
</p>
```

### Text Utilities

```tsx
// Font weights
<span className="font-thin">Thin (100)</span>
<span className="font-light">Light (300)</span>
<span className="font-normal">Normal (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
<span className="font-bold">Bold (700)</span>
<span className="font-extrabold">Extra Bold (800)</span>

// Text alignment
<p className="text-left">Left aligned</p>
<p className="text-center">Center aligned</p>
<p className="text-right">Right aligned</p>
<p className="text-justify">Justified text</p>

// Text decoration
<span className="underline">Underlined</span>
<span className="line-through">Strikethrough</span>
<span className="no-underline">No underline</span>

// Text transform
<span className="uppercase">UPPERCASE</span>
<span className="lowercase">lowercase</span>
<span className="capitalize">Capitalize Each Word</span>
```

## Color System

### Text Colors

```tsx
// Semantic text colors
<p className="text-foreground">Primary text color</p>
<p className="text-muted-foreground">Muted/secondary text</p>
<p className="text-primary">Brand color text</p>
<p className="text-secondary">Secondary brand color</p>

// State colors
<p className="text-success">Success message</p>
<p className="text-warning">Warning message</p>
<p className="text-error">Error message</p>
<p className="text-info">Information</p>
```

### Dark Mode

```css
/* Automatic color switching */
.text-foreground {
  color: rgb(var(--foreground));
}

/* Light mode: dark text, Dark mode: light text */
```

## Line Height

### Line Height Scale

```tsx
// Tight line height for headings
<h1 className="text-5xl leading-none">
  Tight Heading
</h1>

// Normal line height
<p className="leading-normal">
  Standard paragraph text
</p>

// Relaxed line height for readability
<p className="leading-relaxed">
  Comfortable reading experience
</p>

// Loose line height
<p className="leading-loose">
  Extra spacing between lines
</p>
```

## Letter Spacing

```tsx
// Letter spacing (tracking)
<h1 className="tracking-tighter">Tighter Letter Spacing</h1>
<h1 className="tracking-tight">Tight Letter Spacing</h1>
<p className="tracking-normal">Normal Letter Spacing</p>
<p className="tracking-wide">Wide Letter Spacing</p>
<p className="tracking-wider">Wider Letter Spacing</p>
<p className="tracking-widest">Widest Letter Spacing</p>
```

## Lists

### Unordered Lists

```tsx
<ul className="list-disc list-inside space-y-2 text-muted-foreground">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

// Custom bullet style
<ul className="space-y-2">
  <li className="flex items-start">
    <span className="text-primary mr-2">•</span>
    <span>Custom bullet point</span>
  </li>
</ul>
```

### Ordered Lists

```tsx
<ol className="list-decimal list-inside space-y-2">
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

## Code Typography

### Inline Code

```tsx
<p>
  Use <code className="px-1 py-0.5 rounded bg-muted font-mono text-sm">
    npm install
  </code> to install dependencies.
</p>
```

### Code Blocks

```tsx
<pre className="p-4 rounded-lg bg-muted overflow-x-auto">
  <code className="font-mono text-sm">
{`function example() {
  return "Hello, World!"
}`}
  </code>
</pre>
```

## Responsive Typography

### Fluid Typography

```tsx
// Responsive heading sizes
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Heading
</h1>

// Responsive body text
<p className="text-sm md:text-base lg:text-lg">
  Text that scales with viewport
</p>
```

### Breakpoint-Based Sizing

```css
/* Custom fluid typography */
.fluid-text {
  font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem);
}

.fluid-heading {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}
```

## Special Typography

### Gradient Text

```tsx
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
  Gradient Text Effect
</h1>
```

### Glowing Text

```tsx
<h1 className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
  Glowing Text
</h1>
```

### Animated Text

```tsx
// Using MagicText component
<MagicText
  text="Animated Typography"
  className="text-4xl font-bold"
  duration={2}
/>
```

## Best Practices

### 1. Hierarchy

Create clear visual hierarchy:
```tsx
<article className="space-y-6">
  <header>
    <h1 className="text-4xl font-bold mb-2">Main Title</h1>
    <p className="text-lg text-muted-foreground">Subtitle or intro</p>
  </header>
  
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold">Section Title</h2>
    <p className="text-base leading-relaxed">Body content...</p>
  </section>
</article>
```

### 2. Readability

Optimal line length (45-75 characters):
```tsx
<article className="max-w-prose mx-auto">
  <p className="text-base leading-relaxed">
    Content with optimal line length for comfortable reading...
  </p>
</article>
```

### 3. Contrast

Ensure sufficient contrast:
```tsx
// High contrast for important text
<h1 className="text-foreground font-bold">High Contrast</h1>

// Lower contrast for secondary text
<p className="text-muted-foreground">Secondary information</p>
```

### 4. Consistency

Use consistent text styles:
```tsx
// Define reusable classes
const textStyles = {
  h1: "text-5xl font-bold tracking-tight",
  h2: "text-4xl font-bold tracking-tight",
  h3: "text-3xl font-semibold",
  body: "text-base leading-relaxed",
  small: "text-sm text-muted-foreground",
}

// Apply consistently
<h1 className={textStyles.h1}>Title</h1>
<p className={textStyles.body}>Content</p>
```

## Typography Tokens

### CSS Variables

```css
:root {
  /* Font families */
  --font-sans: system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  
  /* Line heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
  
  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

## Common Patterns

### Article Layout

```tsx
<article className="prose prose-lg max-w-none">
  <h1>Article Title</h1>
  <p className="lead">
    Introduction paragraph with larger text...
  </p>
  
  <h2>First Section</h2>
  <p>Regular body text...</p>
  
  <blockquote>
    <p>Important quote or callout</p>
  </blockquote>
  
  <h3>Subsection</h3>
  <p>More content...</p>
</article>
```

### Dashboard Typography

```tsx
// Metric display
<div className="space-y-2">
  <p className="text-sm text-muted-foreground">Total Revenue</p>
  <p className="text-4xl font-bold">$12,345</p>
  <p className="text-sm text-success">+12% from last month</p>
</div>
```

### Form Labels

```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-sm font-medium">
    Email Address
    <span className="text-error ml-1">*</span>
  </Label>
  <Input id="email" type="email" />
  <p className="text-xs text-muted-foreground">
    We'll never share your email
  </p>
</div>
```