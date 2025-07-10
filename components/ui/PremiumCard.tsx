'use client'

import { ReactNode, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'elegant' | 'cyber' | 'neural' | 'holographic' | 'premium'
  glow?: boolean
  hover?: boolean
  bordered?: boolean
  elevated?: boolean
  className?: string
}

const variants = {
  default: 'glass-elegance border-white/10',
  elegant: 'glass-premium border-white/10 shadow-elegant',
  cyber: 'glass-cyber border-cyber-cyan/20 shadow-cyber',
  neural: 'glass-neural border-cyber-purple/20 shadow-glow',
  holographic: 'glass-holographic border-white/20',
  premium: 'glass-premium-elevated border-white/20 shadow-premium',
}

const glowVariants = {
  default: 'hover:shadow-glow',
  elegant: 'hover:shadow-elegant hover:shadow-glow-lg',
  cyber: 'hover:shadow-cyber-lg',
  neural: 'hover:shadow-glow-lg',
  holographic: 'hover:shadow-glow-lg',
  premium: 'hover:shadow-premium',
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ 
    children, 
    variant = 'default',
    glow = false,
    hover = true,
    bordered = true,
    elevated = false,
    className,
    ...props 
  }, ref) => {
    const baseClasses = 'relative rounded-2xl transition-all duration-500 ease-out'
    const variantClasses = variants[variant]
    const glowClasses = glow ? glowVariants[variant] : ''
    const hoverClasses = hover ? 'hover:scale-[1.02] hover:-translate-y-1' : ''
    const borderedClasses = bordered ? 'border' : ''
    const elevatedClasses = elevated ? 'transform-gpu perspective-1000' : ''

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses,
          glowClasses,
          hoverClasses,
          borderedClasses,
          elevatedClasses,
          className
        )}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        viewport={{ once: true, margin: "-10%" }}
        whileHover={hover ? {
          scale: 1.02,
          y: -4,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
        } : undefined}
        {...props}
      >
        {/* Background Effects */}
        {variant === 'holographic' && (
          <motion.div
            className="absolute inset-0 bg-gradient-holographic opacity-20 rounded-2xl"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {variant === 'neural' && (
          <motion.div
            className="absolute inset-0 bg-gradient-neural opacity-10 rounded-2xl"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Hover Glow Effect */}
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: variant === 'cyber' 
                ? 'radial-gradient(circle at center, #00ffff, transparent 70%)'
                : variant === 'neural'
                ? 'radial-gradient(circle at center, #8b5cf6, transparent 70%)'
                : 'radial-gradient(circle at center, #6366f1, transparent 70%)'
            }}
          />
        )}
      </motion.div>
    )
  }
)

PremiumCard.displayName = 'PremiumCard'

// Specialized Card Components

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  variant = 'elegant',
  ...props 
}: {
  icon: ReactNode
  title: string
  description: string
  variant?: PremiumCardProps['variant']
} & Omit<PremiumCardProps, 'children'>) {
  return (
    <PremiumCard 
      variant={variant} 
      glow 
      hover 
      className="p-8 group" 
      {...props}
    >
      <div className="space-y-4">
        <motion.div 
          className="text-4xl group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-text-primary group-hover:text-cyber-cyan transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </PremiumCard>
  )
}

export function StatCard({ 
  value, 
  label, 
  change,
  variant = 'premium',
  ...props 
}: {
  value: string
  label: string
  change?: string
} & Omit<PremiumCardProps, 'children'>) {
  return (
    <PremiumCard 
      variant={variant} 
      glow 
      hover 
      className="p-6 text-center" 
      {...props}
    >
      <div className="space-y-2">
        <motion.div 
          className="text-3xl lg:text-4xl font-bold bg-gradient-cyber-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.div>
        <p className="text-text-secondary font-medium">{label}</p>
        {change && (
          <p className="text-sm text-cyber-lime">
            {change}
          </p>
        )}
      </div>
    </PremiumCard>
  )
}

export function CommandCard({ 
  command, 
  description, 
  example,
  variant = 'cyber',
  ...props 
}: {
  command: string
  description: string
  example?: string
} & Omit<PremiumCardProps, 'children'>) {
  return (
    <PremiumCard 
      variant={variant} 
      glow 
      hover 
      className="p-6 group" 
      {...props}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">⚡</span>
          <code className="text-lg font-mono font-semibold text-cyber-cyan group-hover:text-cyber-lime transition-colors duration-300">
            {command}
          </code>
        </div>
        <p className="text-text-muted leading-relaxed">
          {description}
        </p>
        {example && (
          <div className="glass-elegance p-4 rounded-xl border border-white/5">
            <code className="text-sm font-mono text-text-secondary">
              {example}
            </code>
          </div>
        )}
      </div>
    </PremiumCard>
  )
}

export function PersonaCard({ 
  emoji, 
  name, 
  description, 
  specialties,
  variant = 'neural',
  ...props 
}: {
  emoji: string
  name: string
  description: string
  specialties: string[]
} & Omit<PremiumCardProps, 'children'>) {
  return (
    <PremiumCard 
      variant={variant} 
      glow 
      hover 
      className="p-8 group" 
      {...props}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <motion.span 
            className="text-4xl group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.6 }}
          >
            {emoji}
          </motion.span>
          <h3 className="text-2xl font-bold text-text-primary group-hover:text-cyber-purple transition-colors duration-300">
            {name}
          </h3>
        </div>
        
        <p className="text-text-muted leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-text-secondary">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-xs font-medium glass-elegance rounded-full border border-white/10 text-text-secondary"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {specialty}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </PremiumCard>
  )
}