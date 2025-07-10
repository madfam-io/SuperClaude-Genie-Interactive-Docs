'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagicTextProps {
  children: ReactNode
  variant?: 'gradient' | 'holographic' | 'shimmer' | 'glitch'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  animate?: boolean
  className?: string
}

export function MagicText({
  children,
  variant = 'gradient',
  size = 'md',
  animate = true,
  className = ''
}: MagicTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  }

  const variantClasses = {
    gradient: 'text-gradient',
    holographic: 'text-holographic',
    shimmer: 'text-shimmer',
    glitch: animate ? 'animate-glitch' : ''
  }

  const baseClasses = `
    font-bold
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `

  if (variant === 'glitch') {
    return (
      <div className={`relative ${baseClasses}`}>
        <span className="relative z-10">{children}</span>
        {animate && (
          <>
            <span 
              className="absolute top-0 left-0 text-cyan-400 opacity-70"
              style={{ 
                animation: 'glitch 3s infinite',
                animationDelay: '0.2s',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
              }}
            >
              {children}
            </span>
            <span 
              className="absolute top-0 left-0 text-pink-400 opacity-70"
              style={{ 
                animation: 'glitch 3s infinite',
                animationDelay: '0.4s',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
              }}
            >
              {children}
            </span>
          </>
        )}
      </div>
    )
  }

  return (
    <motion.span
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={animate ? {
        scale: 1.05,
        filter: 'brightness(1.2)',
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.span>
  )
}