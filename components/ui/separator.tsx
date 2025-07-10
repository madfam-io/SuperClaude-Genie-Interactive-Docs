'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const separatorVariants = cva(
  'shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-border',
        muted: 'bg-muted',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        glass: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
        glassDark: 'bg-gradient-to-r from-transparent via-white/10 to-transparent',
        gradient: 'bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20',
      },
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  }
)

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, 'orientation'>,
    VariantProps<typeof separatorVariants> {
  orientation?: "horizontal" | "vertical"
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = 'horizontal', decorative = true, variant, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant, orientation }), className)}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }