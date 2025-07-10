'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface MagicContainerProps {
  children: ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function MagicContainer({ 
  children, 
  className = '',
  glowColor = '#6366f1',
  intensity = 0.5
}: MagicContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        style={{
          boxShadow: `0 0 20px ${glowColor}${Math.round(intensity * 255).toString(16)}`,
        }}
        whileHover={{
          boxShadow: `0 0 40px ${glowColor}${Math.round(intensity * 0.8 * 255).toString(16)}`,
        }}
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Magic sparkles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${10 + (i * 15)}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}