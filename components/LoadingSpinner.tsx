'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'dots' | 'spinner' | 'pulse' | 'magic'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'magic',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizeClasses[size]} bg-blue-500 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'spinner') {
    return (
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    )
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-blue-500 rounded-full ${className}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    )
  }

  // Magic variant
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 border-2 border-transparent border-b-pink-500 border-l-cyan-500 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Center dot */}
      <motion.div
        className="absolute inset-1/2 w-2 h-2 -ml-1 -mt-1 bg-yellow-400 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      
      {/* Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: `${20 + i * 10}px 0`,
          }}
          animate={{
            rotate: 360,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}