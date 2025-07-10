'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25',
        destructive:
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass:
          'glass border border-white/10 text-white shadow-lg hover:bg-white/10 hover:border-white/20 hover:shadow-xl',
        glassPrimary:
          'glass-primary border border-primary/20 text-white shadow-lg shadow-primary/20 hover:bg-primary/20 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/30',
        glassSecondary:
          'glass-secondary border border-secondary/20 text-white shadow-lg shadow-secondary/20 hover:bg-secondary/20 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/30',
        holographic:
          'glass-holographic text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105',
        chromatic:
          'glass-chromatic text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105',
        magic:
          'magic-border bg-gradient-to-r from-primary/20 to-secondary/20 text-white font-semibold hover:from-primary/30 hover:to-secondary/30 hover:shadow-xl hover:scale-105',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-lg px-8',
        xl: 'h-12 rounded-lg px-10 text-base',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'glass-glow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }