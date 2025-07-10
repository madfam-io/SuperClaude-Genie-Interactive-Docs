'use client'

import { ReactNode, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

// Typography variants following Stripe/Linear/Vercel patterns
const headingVariants = {
  h1: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight',
  h2: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  h3: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  h4: 'text-2xl md:text-3xl font-bold tracking-tight',
  h5: 'text-xl md:text-2xl font-semibold tracking-tight',
  h6: 'text-lg md:text-xl font-semibold tracking-tight',
}

const textVariants = {
  'display-lg': 'text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight',
  'display-md': 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
  'display-sm': 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  'headline': 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  'title-lg': 'text-3xl md:text-4xl font-bold tracking-tight',
  'title-md': 'text-2xl md:text-3xl font-bold tracking-tight',
  'title-sm': 'text-xl md:text-2xl font-semibold tracking-tight',
  'body-lg': 'text-lg md:text-xl leading-relaxed',
  'body-md': 'text-base md:text-lg leading-relaxed',
  'body-sm': 'text-sm md:text-base leading-relaxed',
  'caption': 'text-sm leading-normal',
  'overline': 'text-xs uppercase tracking-wider font-medium',
  'code': 'font-mono text-sm',
}

const colorVariants = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  'ultra-muted': 'text-text-ultra-muted',
  cyber: 'bg-gradient-cyber-primary bg-clip-text text-transparent',
  neural: 'bg-gradient-cyber-secondary bg-clip-text text-transparent',
  accent: 'bg-gradient-cyber-accent bg-clip-text text-transparent',
  holographic: 'bg-gradient-holographic bg-clip-text text-transparent bg-[length:200%_200%] animate-neural-flow',
  white: 'text-white',
  success: 'text-cyber-lime',
  warning: 'text-cyber-orange',
  error: 'text-red-400',
}

const weightVariants = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
}

interface TypographyProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: keyof typeof textVariants
  color?: keyof typeof colorVariants
  weight?: keyof typeof weightVariants
  align?: 'left' | 'center' | 'right' | 'justify'
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  animate?: boolean
  gradient?: boolean
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    children, 
    variant = 'body-md',
    color = 'primary',
    weight,
    align = 'left',
    className,
    as = 'div',
    animate = false,
    gradient = false,
    ...props 
  }, ref) => {
    const Component = motion[as] as any
    
    const baseClasses = textVariants[variant]
    const colorClasses = colorVariants[color]
    const weightClasses = weight ? weightVariants[weight] : ''
    const alignClasses = `text-${align}`
    
    const combinedClasses = cn(
      baseClasses,
      colorClasses,
      weightClasses,
      alignClasses,
      gradient && 'bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent',
      className
    )

    const animationProps = animate ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    } : {}

    return (
      <Component
        ref={ref}
        className={combinedClasses}
        {...animationProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

// Specialized heading components
export const Heading = forwardRef<HTMLHeadingElement, {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  color?: keyof typeof colorVariants
  className?: string
  animate?: boolean
} & Omit<HTMLMotionProps<'h1'>, 'children'>>(
  ({ level, children, color = 'primary', className, animate = true, ...props }, ref) => {
    const Component = motion[`h${level}` as keyof typeof motion] as any
    const variant = `h${level}` as keyof typeof headingVariants
    
    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants[variant],
          colorVariants[color],
          className
        )}
        initial={animate ? { opacity: 0, y: 30 } : undefined}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={animate ? { once: true, margin: "-10%" } : undefined}
        transition={animate ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : undefined}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

// Text component with enhanced features
export const Text = forwardRef<HTMLElement, TypographyProps>(
  ({ children, ...props }, ref) => {
    return <Typography ref={ref} {...props}>{children}</Typography>
  }
)

Text.displayName = 'Text'

// Gradient text component
export const GradientText = forwardRef<HTMLSpanElement, {
  children: ReactNode
  variant?: 'cyber' | 'neural' | 'accent' | 'holographic' | 'premium'
  className?: string
  animate?: boolean
} & Omit<HTMLMotionProps<'span'>, 'children'>>(
  ({ children, variant = 'cyber', className, animate = false, ...props }, ref) => {
    const gradientMap = {
      cyber: 'bg-gradient-cyber-primary',
      neural: 'bg-gradient-cyber-secondary',
      accent: 'bg-gradient-cyber-accent',
      holographic: 'bg-gradient-holographic',
      premium: 'bg-gradient-premium',
    }
    
    return (
      <motion.span
        ref={ref}
        className={cn(
          gradientMap[variant],
          'bg-clip-text text-transparent bg-[length:200%_200%]',
          animate && 'animate-neural-flow',
          className
        )}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

GradientText.displayName = 'GradientText'

// Code text component
export const CodeText = forwardRef<HTMLElement, {
  children: ReactNode
  inline?: boolean
  className?: string
} & Omit<HTMLMotionProps<'code'>, 'children'>>(
  ({ children, inline = true, className, ...props }, ref) => {
    if (inline) {
      return (
        <motion.code
          ref={ref as any}
          className={cn(
            'font-mono px-2 py-1 bg-background-card/50 rounded-md text-cyber-cyan text-sm',
            className
          )}
          {...props}
        >
          {children}
        </motion.code>
      )
    }
    
    return (
      <motion.pre
        ref={ref as any}
        className={cn(
          'font-mono p-4 bg-background-card/50 rounded-xl border border-white/10 text-sm overflow-x-auto',
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </motion.pre>
    )
  }
)

CodeText.displayName = 'CodeText'

// Link component with premium styling
export const Link = forwardRef<HTMLAnchorElement, {
  href: string
  children: ReactNode
  external?: boolean
  variant?: 'default' | 'cyber' | 'subtle'
  className?: string
} & Omit<HTMLMotionProps<'a'>, 'children'>>(
  ({ href, children, external = false, variant = 'default', className, ...props }, ref) => {
    const variantClasses = {
      default: 'text-cyber-cyan hover:text-cyber-lime underline underline-offset-4 decoration-cyber-cyan/50 hover:decoration-cyber-lime transition-colors duration-300',
      cyber: 'text-cyber-cyan hover:text-cyber-lime font-medium transition-colors duration-300',
      subtle: 'text-text-secondary hover:text-text-primary transition-colors duration-300',
    }
    
    return (
      <motion.a
        ref={ref}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(variantClasses[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
        {external && <span className="ml-1 text-xs">↗</span>}
      </motion.a>
    )
  }
)

Link.displayName = 'Link'

// List component with premium styling
export const List = forwardRef<HTMLUListElement, {
  children: ReactNode
  ordered?: boolean
  className?: string
} & Omit<HTMLMotionProps<'ul'>, 'children'>>(
  ({ children, ordered = false, className, ...props }, ref) => {
    if (ordered) {
      return (
        <motion.ol
          ref={ref as any}
          className={cn(
            'space-y-2 list-decimal list-inside',
            className
          )}
          {...props}
        >
          {children}
        </motion.ol>
      )
    }
    
    return (
      <motion.ul
        ref={ref}
        className={cn(
          'space-y-2 list-none',
          className
        )}
        {...props}
      >
        {children}
      </motion.ul>
    )
  }
)

List.displayName = 'List'

export const ListItem = forwardRef<HTMLLIElement, {
  children: ReactNode
  icon?: ReactNode
  className?: string
} & Omit<HTMLMotionProps<'li'>, 'children'>>(
  ({ children, icon, className, ...props }, ref) => {
    return (
      <motion.li
        ref={ref}
        className={cn(
          'flex items-start space-x-3 text-text-secondary',
          className
        )}
        {...props}
      >
        {icon && <span className="text-cyber-cyan mt-0.5 flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </motion.li>
    )
  }
)

ListItem.displayName = 'ListItem'