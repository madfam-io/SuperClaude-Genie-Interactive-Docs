'use client'

import { useState, ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'

interface GlassmorphicCardProps extends MotionProps {
  children: ReactNode
  variant?: 'default' | 'light' | 'dark' | 'frosted' | 'holographic' | 'chromatic' | 'neumorphic'
  glow?: boolean
  magic?: boolean
  hover?: boolean
  className?: string
  onClick?: () => void
}

export function GlassmorphicCard({
  children,
  variant = 'default',
  glow = false,
  magic = false,
  hover = true,
  className = '',
  onClick,
  ...motionProps
}: GlassmorphicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = `
    relative
    ${variant === 'default' ? 'glass' : ''}
    ${variant === 'light' ? 'glass-light' : ''}
    ${variant === 'dark' ? 'glass-dark' : ''}
    ${variant === 'frosted' ? 'glass-frosted' : ''}
    ${variant === 'holographic' ? 'glass-holographic' : ''}
    ${variant === 'chromatic' ? 'glass-chromatic' : ''}
    ${variant === 'neumorphic' ? 'glass-neumorphic' : ''}
    ${glow ? 'glass-glow' : ''}
    ${magic ? 'magic-border' : ''}
    rounded-xl
    overflow-hidden
    transition-all
    duration-300
    ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''}
    ${className}
  `

  return (
    <motion.div
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      whileHover={hover ? {
        y: -5,
        transition: {
          duration: 0.2,
          ease: 'easeOut'
        }
      } : {}}
      {...motionProps}
    >
      {/* Aurora Glow Background */}
      {(glow || variant === 'holographic') && (
        <div className="absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 glow-aurora" />
        </div>
      )}

      {/* Magic Particles */}
      {magic && (
        <div className="particles absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>

      {/* Holographic Shimmer */}
      {variant === 'holographic' && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      )}
    </motion.div>
  )
}