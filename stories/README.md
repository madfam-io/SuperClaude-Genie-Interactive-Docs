# SuperClaude Genie UI Component Stories

This directory contains Storybook stories for all UI components in the SuperClaude Genie Interactive Docs application.

## 📁 Structure

```
stories/
├── Introduction.mdx          # Welcome page and overview
├── ui/                      # UI component stories
│   ├── Button.stories.tsx   # Button component variations
│   ├── Badge.stories.tsx    # Badge component variations
│   ├── Input.stories.tsx    # Input field variations
│   ├── Select.stories.tsx   # Select dropdown variations
│   ├── Switch.stories.tsx   # Toggle switch variations
│   ├── Tabs.stories.tsx     # Tab navigation variations
│   ├── Tooltip.stories.tsx  # Tooltip variations
│   ├── GlassmorphicCard.stories.tsx  # Card component variations
│   └── UIShowcase.stories.tsx        # Complete component showcase
└── assets/                  # Static assets for stories

```

## 🚀 Running Storybook

```bash
# Install dependencies
npm install

# Run Storybook in development mode
npm run storybook

# Build Storybook for production
npm run build-storybook
```

## 📝 Writing Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from '@/components/ui/component-name'

const meta = {
  title: 'UI/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component description here',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Default props
  },
}
```

### Best Practices

1. **Organization**: Group related stories in the same file
2. **Naming**: Use descriptive names for story exports
3. **Documentation**: Include component descriptions and usage examples
4. **Controls**: Add argTypes for interactive prop exploration
5. **Variants**: Show all component variants and states
6. **Examples**: Include real-world usage examples

## 🎨 Component Categories

### Core Components
- **Button**: Action triggers with multiple variants
- **Badge**: Status indicators and labels
- **Input**: Form inputs with validation states
- **Select**: Dropdown menus with grouped options
- **Switch**: Toggle switches for settings
- **Tabs**: Content organization

### Special Components
- **GlassmorphicCard**: Advanced card with effects
- **Tooltip**: Contextual information on hover

### Showcase
- **UIShowcase**: Complete demonstration of all components working together

## 🔧 Customization

All components support:
- Dark/Light mode
- Multiple variants (default, glass, holographic, etc.)
- Multiple sizes
- Custom styling via className
- Responsive design

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Source Code](../components/ui/)
- [Design System Guidelines](../docs/design-system.md)