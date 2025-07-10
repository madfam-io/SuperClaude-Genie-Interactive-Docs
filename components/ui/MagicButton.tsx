'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagicButtonProps {
  children: ReactNode
  variant?: 'glass' | 'holographic' | 'neumorphic' | 'liquid' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  magic?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MagicButton({
  children,
  variant = 'glass',
  size = 'md',
  magic = false,
  className = '',
  onClick,
  disabled,
  type = 'button'
}: MagicButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    glass: 'glass hover:glass-light',
    holographic: 'glass-holographic',
    neumorphic: 'glass-neumorphic',
    liquid: 'glass-frosted animate-liquid',
    glow: 'glass glass-glow animate-glow-pulse'
  }

  const baseClasses = `
    relative
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    rounded-xl
    font-semibold
    transition-all
    duration-300
    transform-gpu
    hover:scale-105
    active:scale-95
    overflow-hidden
    ${magic ? 'magic-border' : ''}
    ${className}
  `

  return (
    <motion.button
      className={baseClasses}
      whileHover={{ 
        y: -2,
        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {/* Liquid Background Effect */}
      {variant === 'liquid' && (
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Holographic Shine */}
      {variant === 'holographic' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Magic Particles */}
      {magic && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%',
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Hover Wave Effect */}
      <motion.div
        className="absolute inset-0 -z-5"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 2, 
          opacity: 0.1,
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  )
}